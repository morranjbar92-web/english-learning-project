import {
  apiJson, apiOptions, DUMMY_PASSWORD_HASH, ensureSchema, createSessionToken,
  getUserStats, hashToken, normalizedEmail, originAllowed, poolQuery,
  tehranDayKey, verifyPassword,
} from "../_lib";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function OPTIONS(request: Request) { return apiOptions(request); }

type UserRow = { id: string; email: string; display_name: string; total_coins: number; password_hash: string | null };
type FailureRow = { failed_attempts: number; window_started_at: Date; locked_until: Date | null };

export async function POST(request: Request) {
  if (!originAllowed(request)) return apiJson(request, { error: "مبدأ درخواست مجاز نیست." }, { status: 403 });
  try {
    const body = await request.json().catch(() => null) as { email?: unknown; password?: unknown } | null;
    const email = normalizedEmail(body?.email);
    const password = typeof body?.password === "string" ? body.password : "";
    if (!email || password.length < 1 || password.length > 128) {
      return apiJson(request, { error: "ایمیل و رمز عبور را بررسی کن." }, { status: 400 });
    }

    await ensureSchema();
    const throttle = await poolQuery<FailureRow>(
      "SELECT failed_attempts,window_started_at,locked_until FROM lp_password_attempts WHERE email=$1",
      [email],
    );
    const lockUntil = throttle.rows[0]?.locked_until ? new Date(throttle.rows[0].locked_until).getTime() : 0;
    if (lockUntil > Date.now()) {
      return apiJson(request, { error: "تلاش‌های ورود زیاد شده است؛ ۱۵ دقیقه بعد دوباره امتحان کن یا با کد ایمیل وارد شو." }, { status: 429 });
    }

    const result = await poolQuery<UserRow>(
      "SELECT id,email,display_name,total_coins,password_hash FROM lp_users WHERE email=$1 LIMIT 1",
      [email],
    );
    const user = result.rows[0];
    const matches = await verifyPassword(password, user?.password_hash || DUMMY_PASSWORD_HASH);
    if (!user || !user.password_hash || !matches) {
      const previous = throttle.rows[0];
      const inWindow = !!previous && Date.now() - new Date(previous.window_started_at).getTime() < 15 * 60_000;
      const attempts = inWindow ? Number(previous!.failed_attempts) + 1 : 1;
      const windowStart = inWindow ? previous!.window_started_at : new Date();
      await poolQuery(`
        INSERT INTO lp_password_attempts(email,failed_attempts,window_started_at,locked_until)
        VALUES($1,$2,$3,CASE WHEN $2 >= 8 THEN NOW()+INTERVAL '15 minutes' ELSE NULL END)
        ON CONFLICT(email) DO UPDATE SET failed_attempts=EXCLUDED.failed_attempts,
          window_started_at=EXCLUDED.window_started_at,locked_until=EXCLUDED.locked_until
      `, [email, attempts, windowStart]);
      if (attempts >= 8) {
        return apiJson(request, { error: "تلاش‌های ورود زیاد شده است؛ ۱۵ دقیقه بعد دوباره امتحان کن یا با کد ایمیل وارد شو." }, { status: 429 });
      }
      return apiJson(request, { error: "ایمیل یا رمز عبور درست نیست. اگر هنوز رمز نداری یا فراموش کرده‌ای، از کد ایمیل استفاده کن." }, { status: 401 });
    }

    await poolQuery("DELETE FROM lp_password_attempts WHERE email=$1", [email]);
    await poolQuery("DELETE FROM lp_sessions WHERE expires_at <= NOW()");
    const token = createSessionToken();
    await poolQuery(
      "INSERT INTO lp_sessions(token_hash,user_id,expires_at,auth_method) VALUES($1,$2,NOW()+INTERVAL '30 days','password')",
      [hashToken(token), user.id],
    );
    const stats = await getUserStats(user.id, tehranDayKey());
    return apiJson(request, {
      ok: true,
      token,
      profile: {
        id: user.id, email: user.email, displayName: user.display_name,
        totalCoins: stats.totalCoins, todayCoins: stats.todayCoins, rank: stats.rank,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "ورود با رمز انجام نشد.";
    return apiJson(request, { error: message }, { status: 503 });
  }
}
