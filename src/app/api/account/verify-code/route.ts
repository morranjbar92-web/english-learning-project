import { randomUUID } from "node:crypto";
import { apiJson, apiOptions, cleanDisplayName, createSessionToken, ensureSchema, getUserStats, hashToken, normalizedEmail, originAllowed, otpMatches, poolQuery, tehranDayKey } from "../_lib";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function OPTIONS(request: Request) { return apiOptions(request); }

export async function POST(request: Request) {
  if (!originAllowed(request)) return apiJson(request, { error: "مبدأ درخواست مجاز نیست." }, { status: 403 });
  try {
    const body = await request.json().catch(() => null) as { email?: unknown; code?: unknown; displayName?: unknown } | null;
    const email = normalizedEmail(body?.email);
    const code = typeof body?.code === "string" ? body.code.trim() : "";
    if (!email || !/^\d{6}$/.test(code)) return apiJson(request, { error: "ایمیل و کد شش‌رقمی را بررسی کن." }, { status: 400 });
    if (!process.env.AUTH_TOKEN_SECRET || process.env.AUTH_TOKEN_SECRET.length < 32) return apiJson(request, { error: "سرویس حساب هنوز تنظیم نشده است." }, { status: 503 });
    await ensureSchema();
    const codeResult = await poolQuery<{ code_hash: string; expires_at: Date; attempts: number; display_name: string }>("SELECT code_hash,expires_at,attempts,display_name FROM lp_email_codes WHERE email=$1", [email]);
    const row = codeResult.rows[0];
    if (!row) return apiJson(request, { error: "کد وجود ندارد یا منقضی شده است؛ دوباره درخواست کد بده." }, { status: 400 });
    if (new Date(row.expires_at).getTime() <= Date.now()) {
      await poolQuery("DELETE FROM lp_email_codes WHERE email=$1", [email]);
      return apiJson(request, { error: "کد منقضی شده است؛ کد تازه بگیر." }, { status: 400 });
    }
    if (Number(row.attempts) >= 5) {
      await poolQuery("DELETE FROM lp_email_codes WHERE email=$1", [email]);
      return apiJson(request, { error: "تعداد تلاش‌ها تمام شده است؛ کد تازه بگیر." }, { status: 429 });
    }
    if (!otpMatches(email, code, row.code_hash)) {
      await poolQuery("UPDATE lp_email_codes SET attempts=attempts+1 WHERE email=$1", [email]);
      return apiJson(request, { error: "کد اشتباه است. حداکثر ۵ تلاش مجاز است." }, { status: 400 });
    }
    const displayName = cleanDisplayName(body?.displayName) || cleanDisplayName(row.display_name);
    const id = randomUUID();
    const userResult = await poolQuery<{ id: string; email: string; display_name: string; total_coins: number; grade: number; password_configured: boolean }>(`
      INSERT INTO lp_users(id,email,display_name) VALUES($1,$2,$3)
      ON CONFLICT(email) DO UPDATE SET display_name=CASE WHEN EXCLUDED.display_name<>'' THEN EXCLUDED.display_name ELSE lp_users.display_name END
      RETURNING id,email,display_name,total_coins,grade,(password_hash IS NOT NULL) AS password_configured
    `, [id, email, displayName]);
    const user = userResult.rows[0];
    await poolQuery("DELETE FROM lp_email_codes WHERE email=$1", [email]);
    // Expired sessions are pruned, but existing sessions on other devices stay valid.
    await poolQuery("DELETE FROM lp_sessions WHERE expires_at <= NOW()");
    const token = createSessionToken();
    await poolQuery("INSERT INTO lp_sessions(token_hash,user_id,expires_at,auth_method) VALUES($1,$2,NOW()+INTERVAL '30 days','email_code')", [hashToken(token), user.id]);
    const stats = await getUserStats(user.id, tehranDayKey());
    return apiJson(request, { ok: true, token, profile: { id: user.id, email: user.email, displayName: user.display_name, grade: Number(user.grade || 7), passwordConfigured: Boolean(user.password_configured), authMethod: "email_code", totalCoins: stats.totalCoins, todayCoins: stats.todayCoins, rank: stats.rank } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "تأیید کد انجام نشد.";
    return apiJson(request, { error: message }, { status: 503 });
  }
}
