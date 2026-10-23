import {
  apiJson, apiOptions, ensureSchema, hashPassword, hashToken,
  normalizedEmail, originAllowed, poolQuery, verifyPassword,
} from "../_lib";
import { getAuthenticatedUser } from "../_lib";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function OPTIONS(request: Request) { return apiOptions(request); }

type SessionPasswordRow = {
  password_hash: string | null;
  auth_method: string;
  created_at: Date;
};

export async function POST(request: Request) {
  if (!originAllowed(request)) return apiJson(request, { error: "مبدأ درخواست مجاز نیست." }, { status: 403 });
  try {
    const body = await request.json().catch(() => null) as { password?: unknown; currentPassword?: unknown } | null;
    const password = typeof body?.password === "string" ? body.password : "";
    const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : "";
    if (password.length < 10 || password.length > 128) {
      return apiJson(request, { error: "رمز جدید باید حداقل ۱۰ و حداکثر ۱۲۸ نویسه باشد." }, { status: 400 });
    }
    if (currentPassword.length > 128) return apiJson(request, { error: "رمز فعلی معتبر نیست." }, { status: 400 });

    await ensureSchema();
    const user = await getAuthenticatedUser(request);
    if (!user) return apiJson(request, { error: "نشست معتبر نیست؛ دوباره با رمز یا کد ایمیل وارد شو." }, { status: 401 });
    const bearer = (request.headers.get("authorization") || "").match(/^Bearer\s+([a-f0-9]{64})$/i)?.[1];
    if (!bearer) return apiJson(request, { error: "نشست معتبر نیست." }, { status: 401 });

    const result = await poolQuery<SessionPasswordRow>(`
      SELECT u.password_hash,s.auth_method,s.created_at
      FROM lp_users u JOIN lp_sessions s ON s.user_id=u.id
      WHERE u.id=$1 AND s.token_hash=$2 AND s.expires_at>NOW() LIMIT 1
    `, [user.id, hashToken(bearer)]);
    const auth = result.rows[0];
    if (!auth) return apiJson(request, { error: "نشست معتبر نیست؛ دوباره وارد شو." }, { status: 401 });

    const recentEmailCode = auth.auth_method === "email_code" && Date.now() - new Date(auth.created_at).getTime() <= 10 * 60_000;
    let authorized = !auth.password_hash && recentEmailCode;
    if (auth.password_hash && currentPassword) {
      authorized = await verifyPassword(currentPassword, auth.password_hash);
    }
    // A recently verified email code can set an initial password or reset a forgotten one.
    if (recentEmailCode && !currentPassword) authorized = true;
    if (!authorized) {
      return apiJson(request, {
        error: "برای تغییر رمز، رمز فعلی را وارد کن. اگر آن را فراموش کرده‌ای، خارج شو و با کد تازهٔ ایمیل وارد شو تا رمز را بازیابی کنی.",
      }, { status: 403 });
    }

    const passwordHash = await hashPassword(password);
    await poolQuery("UPDATE lp_users SET password_hash=$2 WHERE id=$1", [user.id, passwordHash]);
    // A verified email-code reset invalidates other sessions to protect the account.
    if (recentEmailCode && !currentPassword && auth.password_hash) {
      await poolQuery("DELETE FROM lp_sessions WHERE user_id=$1 AND token_hash<>$2", [user.id, hashToken(bearer)]);
    }
    await poolQuery("DELETE FROM lp_password_attempts WHERE email=$1", [normalizedEmail(user.email)]);
    return apiJson(request, { ok: true, message: "رمز عبور به‌صورت امن ذخیره شد. از ورود بعدی می‌توانی از ایمیل و رمز استفاده کنی." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "ذخیرهٔ رمز عبور انجام نشد.";
    return apiJson(request, { error: message }, { status: 503 });
  }
}
