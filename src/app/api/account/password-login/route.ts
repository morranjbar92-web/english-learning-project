import { apiJson, apiOptions, createSessionToken, ensureSchema, getUserStats, hashToken, normalizedEmail, originAllowed, poolQuery, tehranDayKey, verifyPassword } from "../_lib";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function OPTIONS(request: Request) { return apiOptions(request); }

export async function POST(request: Request) {
  if (!originAllowed(request)) return apiJson(request, { error: "مبدأ درخواست مجاز نیست." }, { status: 403 });
  try {
    const body = await request.json().catch(() => null) as { email?: unknown; password?: unknown } | null;
    const email = normalizedEmail(body?.email);
    const password = typeof body?.password === "string" ? body.password : "";
    if (!email || !password || password.length > 128) return apiJson(request, { error: "ایمیل یا رمز عبور درست نیست." }, { status: 400 });
    await ensureSchema();
    const attemptResult = await poolQuery<{ attempts: number; window_started_at: Date; blocked_until: Date | null }>("SELECT attempts,window_started_at,blocked_until FROM lp_password_attempts WHERE email=$1", [email]);
    const previous = attemptResult.rows[0];
    const now = Date.now();
    if (previous?.blocked_until && new Date(previous.blocked_until).getTime() > now) {
      return apiJson(request, { error: "تلاش‌های ورود زیاد بوده؛ ۱۵ دقیقه دیگر دوباره امتحان کن یا با کد ایمیل وارد شو." }, { status: 429 });
    }
    const userResult = await poolQuery<{ id: string; email: string; display_name: string; total_coins: number; grade: number; password_hash: string | null }>(
      "SELECT id,email,display_name,total_coins,grade,password_hash FROM lp_users WHERE email=$1 LIMIT 1", [email]);
    const user = userResult.rows[0];
    if (!user || !verifyPassword(password, user.password_hash)) {
      const sameWindow = previous && now - new Date(previous.window_started_at).getTime() < 15 * 60_000;
      const attempts = sameWindow ? Number(previous!.attempts) + 1 : 1;
      const blockedUntil = attempts >= 5 ? new Date(now + 15 * 60_000) : null;
      await poolQuery(`INSERT INTO lp_password_attempts(email,attempts,window_started_at,blocked_until)
        VALUES($1,$2,NOW(),$3) ON CONFLICT(email) DO UPDATE SET attempts=$2,window_started_at=CASE WHEN $4 THEN lp_password_attempts.window_started_at ELSE NOW() END,blocked_until=$3`,
        [email, attempts, blockedUntil, Boolean(sameWindow)]);
      return apiJson(request, { error: attempts >= 5 ? "تلاش‌های ورود زیاد بوده؛ ۱۵ دقیقه دیگر یا با کد ایمیل وارد شو." : "ایمیل یا رمز عبور درست نیست." }, { status: attempts >= 5 ? 429 : 401 });
    }
    await poolQuery("DELETE FROM lp_password_attempts WHERE email=$1", [email]);
    await poolQuery("DELETE FROM lp_sessions WHERE expires_at <= NOW()");
    const token = createSessionToken();
    await poolQuery("INSERT INTO lp_sessions(token_hash,user_id,expires_at,auth_method) VALUES($1,$2,NOW()+INTERVAL '30 days','password')", [hashToken(token), user.id]);
    const stats = await getUserStats(user.id, tehranDayKey());
    return apiJson(request, { ok: true, token, profile: { id: user.id, email: user.email, displayName: user.display_name, grade: Number(user.grade || 7), passwordConfigured: true, authMethod: "password", totalCoins: stats.totalCoins, todayCoins: stats.todayCoins, rank: stats.rank } });
  } catch (error) {
    return apiJson(request, { error: error instanceof Error ? error.message : "ورود با رمز ناموفق بود." }, { status: 503 });
  }
}
