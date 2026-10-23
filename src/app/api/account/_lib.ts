import { createHash, createHmac, randomBytes, randomInt, randomUUID, timingSafeEqual, scrypt as scryptCallback } from "node:crypto";
import { Pool } from "pg";
import { NextResponse } from "next/server";

export type AccountUser = { [column: string]: any; id: string; email: string; display_name: string; total_coins: number };

type Globals = typeof globalThis & { __linguaproPool?: Pool; __linguaproSchema?: Promise<void> };
const globals = globalThis as Globals;

export const ALLOWED_ORIGINS = new Set<string>((process.env.ACCOUNT_ALLOWED_ORIGINS || "https://morranjbar92-web.github.io,https://english-learning-project.onrender.com,http://localhost:3000,http://localhost:3002,http://127.0.0.1:3000,http://127.0.0.1:3002").split(",").map((x) => x.trim()).filter(Boolean));

function pool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL تنظیم نشده است. دیتابیس PostgreSQL را در Render متصل کن.");
  if (!globals.__linguaproPool) {
    const isLocal = /localhost|127\.0\.0\.1/.test(connectionString);
    globals.__linguaproPool = new Pool({
      connectionString,
      ssl: isLocal ? false : { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 8_000,
    });
  }
  return globals.__linguaproPool;
}

export async function ensureSchema(): Promise<void> {
  if (!globals.__linguaproSchema) {
    globals.__linguaproSchema = pool().query(`
      CREATE TABLE IF NOT EXISTS lp_users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        display_name TEXT NOT NULL DEFAULT '',
        total_coins INTEGER NOT NULL DEFAULT 0 CHECK (total_coins >= 0),
        password_hash TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      ALTER TABLE lp_users ADD COLUMN IF NOT EXISTS password_hash TEXT;
      CREATE TABLE IF NOT EXISTS lp_email_codes (
        email TEXT PRIMARY KEY,
        code_hash TEXT NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        window_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        send_count INTEGER NOT NULL DEFAULT 1,
        display_name TEXT NOT NULL DEFAULT ''
      );
      CREATE TABLE IF NOT EXISTS lp_sessions (
        token_hash TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES lp_users(id) ON DELETE CASCADE,
        expires_at TIMESTAMPTZ NOT NULL,
        auth_method TEXT NOT NULL DEFAULT 'email_code',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      ALTER TABLE lp_sessions ADD COLUMN IF NOT EXISTS auth_method TEXT NOT NULL DEFAULT 'email_code';
      CREATE INDEX IF NOT EXISTS lp_sessions_user_idx ON lp_sessions(user_id);
      CREATE TABLE IF NOT EXISTS lp_password_attempts (
        email TEXT PRIMARY KEY,
        failed_attempts INTEGER NOT NULL DEFAULT 0,
        window_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        locked_until TIMESTAMPTZ
      );
      CREATE TABLE IF NOT EXISTS lp_progress (
        user_id TEXT PRIMARY KEY REFERENCES lp_users(id) ON DELETE CASCADE,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS lp_daily_points (
        user_id TEXT NOT NULL REFERENCES lp_users(id) ON DELETE CASCADE,
        day_key TEXT NOT NULL,
        coins INTEGER NOT NULL DEFAULT 0 CHECK (coins >= 0),
        PRIMARY KEY (user_id, day_key)
      );
      CREATE INDEX IF NOT EXISTS lp_daily_points_rank_idx ON lp_daily_points(day_key, coins DESC);
      CREATE TABLE IF NOT EXISTS lp_activity_claims (
        user_id TEXT NOT NULL REFERENCES lp_users(id) ON DELETE CASCADE,
        day_key TEXT NOT NULL,
        activity_type TEXT NOT NULL,
        activity_id TEXT NOT NULL,
        coins INTEGER NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (user_id, day_key, activity_type, activity_id)
      );
      CREATE INDEX IF NOT EXISTS lp_activity_claims_daily_idx ON lp_activity_claims(user_id, day_key, activity_type);
    `).then(() => undefined).catch((error) => {
      globals.__linguaproSchema = undefined;
      throw error;
    });
  }
  await globals.__linguaproSchema;
}

export function originAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  return !origin || ALLOWED_ORIGINS.has(origin);
}

export function apiJson(request: Request, body: unknown, init?: ResponseInit): NextResponse {
  const response = NextResponse.json(body, init);
  const origin = request.headers.get("origin");
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Max-Age", "86400");
  }
  response.headers.set("Vary", "Origin");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export function apiOptions(request: Request): NextResponse {
  const response = new NextResponse(null, { status: 204 });
  const origin = request.headers.get("origin");
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Max-Age", "86400");
  }
  response.headers.set("Vary", "Origin");
  return response;
}

export function normalizedEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

export function cleanDisplayName(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[<>\u0000-\u001f]/g, "").trim().slice(0, 32);
}

function authSecret(): string {
  const value = process.env.AUTH_TOKEN_SECRET;
  if (!value || value.length < 32) throw new Error("AUTH_TOKEN_SECRET تنظیم نشده یا کوتاه است؛ یک راز تصادفی حداقل ۳۲ کاراکتری قرار بده.");
  return value;
}

export function otpHash(email: string, code: string): string {
  return createHmac("sha256", authSecret()).update(`${email}:${code}`).digest("hex");
}
export function otpMatches(email: string, code: string, storedHash: string): boolean {
  const candidate = Buffer.from(otpHash(email, code), "hex");
  const stored = Buffer.from(storedHash, "hex");
  return candidate.length === stored.length && timingSafeEqual(candidate, stored);
}
export function hashToken(token: string): string { return createHash("sha256").update(token).digest("hex"); }
export function createOtp(): string { return String(randomInt(0, 1_000_000)).padStart(6, "0"); }
export function createSessionToken(): string { return randomBytes(32).toString("hex"); }

const PASSWORD_HASH_SCHEME = "scrypt";
const PASSWORD_HASH_LENGTH = 64;
// Valid-format dummy hash keeps unknown accounts on the same expensive verification path.
export const DUMMY_PASSWORD_HASH = `scrypt$00000000000000000000000000000000$${"00".repeat(PASSWORD_HASH_LENGTH)}`;

function derivePasswordKey(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, PASSWORD_HASH_LENGTH, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey as Buffer);
    });
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const key = await derivePasswordKey(password, salt);
  return `${PASSWORD_HASH_SCHEME}$${salt}$${key.toString("hex")}`;
}

export async function verifyPassword(password: string, encoded: string): Promise<boolean> {
  const [scheme, salt, keyHex, extra] = encoded.split("$");
  if (scheme !== PASSWORD_HASH_SCHEME || extra !== undefined || !/^[a-f0-9]{32}$/i.test(salt || "") || !/^[a-f0-9]{128}$/i.test(keyHex || "")) return false;
  const derived = await derivePasswordKey(password, salt);
  const expected = Buffer.from(keyHex, "hex");
  return derived.length === expected.length && timingSafeEqual(derived, expected);
}

export async function sendLoginCode(email: string, code: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    throw new Error("ارسال کد ایمیل هنوز تنظیم نشده است؛ مدیر سایت باید RESEND_API_KEY و EMAIL_FROM را در تنظیمات محرمانهٔ Render قرار دهد.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "کد ورود LinguaPro",
      text: `کد ورود شما: ${code}\nاین کد ۱۰ دقیقه اعتبار دارد. اگر این درخواست را انجام نداده‌ای، این ایمیل را نادیده بگیر.`,
      html: `<div style="font-family:Tahoma,Arial,sans-serif;direction:rtl;max-width:520px;margin:auto;padding:24px;color:#242345"><h2>ورود به LinguaPro</h2><p>برای ورود این کد را در سایت وارد کن:</p><div style="direction:ltr;text-align:center;font-size:32px;letter-spacing:8px;font-weight:bold;padding:18px;background:#f3f1ff;border-radius:12px;color:#5144bb">${code}</div><p>کد تا ۱۰ دقیقه معتبر است. این کد را به کسی نده.</p><small>اگر این درخواست را انجام نداده‌ای، ایمیل را نادیده بگیر.</small></div>`,
    }),
    signal: AbortSignal.timeout(12_000),
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => ({})) as Record<string, unknown>;
    const providerMessage = typeof detail.message === "string" ? detail.message : typeof detail.error === "string" ? detail.error : `HTTP ${response.status}`;
    throw new Error(`ارسال ایمیل از سرویس Resend ناموفق بود: ${providerMessage}`);
  }
}

export async function getAuthenticatedUser(request: Request): Promise<AccountUser | null> {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+([a-f0-9]{64})$/i);
  if (!match) return null;
  await ensureSchema();
  const result = await pool().query<AccountUser>(`
    SELECT u.id, u.email, u.display_name, u.total_coins
    FROM lp_sessions s JOIN lp_users u ON u.id=s.user_id
    WHERE s.token_hash=$1 AND s.expires_at > NOW() LIMIT 1
  `, [hashToken(match[1])]);
  return result.rows[0] || null;
}

export async function getUserStats(userId: string, dayKey: string): Promise<{ todayCoins: number; totalCoins: number; rank: number | null }> {
  const result = await pool().query<{ [column: string]: any; today_coins: number | null; total_coins: number; rank: string | null }>(`
    SELECT d.coins AS today_coins, u.total_coins,
      CASE WHEN d.user_id IS NULL THEN NULL ELSE (
        SELECT COUNT(*) + 1 FROM lp_daily_points x
        WHERE x.day_key=$2 AND (x.coins > d.coins OR (x.coins = d.coins AND x.user_id < d.user_id))
      )::text END AS rank
    FROM lp_users u LEFT JOIN lp_daily_points d ON d.user_id=u.id AND d.day_key=$2
    WHERE u.id=$1
  `, [userId, dayKey]);
  const row = result.rows[0];
  return { todayCoins: Number(row?.today_coins || 0), totalCoins: Number(row?.total_coins || 0), rank: row?.rank === null || row?.rank === undefined ? null : Number(row.rank) };
}

export function tehranDayKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tehran", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const part = (name: string) => parts.find((item) => item.type === name)?.value || "00";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function maskEmail(email: string): string {
  const [name, domain = ""] = email.split("@");
  return `${(name || "u").slice(0, 1)}***@${domain}`;
}

export const REWARD_RULES: Record<string, { coins: number; dailyLimit: number }> = {
  activity_opened: { coins: 1, dailyLimit: 20 },
  vocabulary_learned: { coins: 2, dailyLimit: 30 },
  reading_completed: { coins: 12, dailyLimit: 10 },
  reading_quiz_completed: { coins: 8, dailyLimit: 10 },
  listening_completed: { coins: 12, dailyLimit: 10 },
  writing_completed: { coins: 15, dailyLimit: 10 },
  speaking_completed: { coins: 15, dailyLimit: 5 },
  grammar_completed: { coins: 10, dailyLimit: 10 },
  conversation_completed: { coins: 5, dailyLimit: 10 },
  game_completed: { coins: 8, dailyLimit: 10 },
  warmup_quiz_completed: { coins: 10, dailyLimit: 5 },
};

function mergeProgressObjects(current: Record<string, unknown>, incoming: Record<string, unknown>): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...current };
  for (const [key, value] of Object.entries(incoming)) {
    const oldValue = merged[key];
    if (Array.isArray(oldValue) && Array.isArray(value)) {
      const seen = new Set<string>();
      merged[key] = [...oldValue, ...value].filter((item) => { const signature = JSON.stringify(item); if (seen.has(signature)) return false; seen.add(signature); return true; });
    } else if (oldValue && value && typeof oldValue === "object" && typeof value === "object" && !Array.isArray(oldValue) && !Array.isArray(value)) {
      merged[key] = { ...(oldValue as Record<string, unknown>), ...(value as Record<string, unknown>) };
    } else {
      merged[key] = value;
    }
  }
  return merged;
}

export async function mergeProgress(userId: string, incoming: unknown): Promise<Record<string, unknown>> {
  if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) throw new Error("ساختار پیشرفت نامعتبر است.");
  const input = incoming as Record<string, unknown>;
  const filtered: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (!/^linguapro-[a-z0-9._-]{1,110}$/i.test(key) || /(?:auth|token|coin|api-base|claim|session|account|sync|profile|email)/i.test(key)) continue;
    const serialized = JSON.stringify(value);
    if (serialized !== undefined && serialized.length <= 250_000) filtered[key] = value;
  }
  if (JSON.stringify(filtered).length > 450_000) throw new Error("حجم پیشرفت بیش از حد مجاز است.");

  // Lock the single progress row so two devices cannot overwrite each other's
  // changes when they sync at nearly the same time.
  const client = await pool().connect();
  try {
    await client.query("BEGIN");
    await client.query("INSERT INTO lp_progress(user_id,data) VALUES($1,'{}'::jsonb) ON CONFLICT(user_id) DO NOTHING", [userId]);
    const existing = await client.query<{ [column: string]: any; data: Record<string, unknown> }>("SELECT data FROM lp_progress WHERE user_id=$1 FOR UPDATE", [userId]);
    const current = existing.rows[0]?.data || {};
    const merged = mergeProgressObjects(current, filtered);
    if (JSON.stringify(merged).length > 450_000) throw new Error("حجم پیشرفت نهایی بیش از حد مجاز است.");
    await client.query("UPDATE lp_progress SET data=$2::jsonb,updated_at=NOW() WHERE user_id=$1", [userId, JSON.stringify(merged)]);
    await client.query("COMMIT");
    return merged;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

export function poolQuery<T extends Record<string, any> = Record<string, any>>(sql: string, params: any[] = []) {
  return pool().query<T>(sql, params);
}

export function getPool(): Pool { return pool(); }
