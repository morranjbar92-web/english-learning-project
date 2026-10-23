import { apiJson, apiOptions, createOtp, ensureSchema, normalizedEmail, cleanDisplayName, originAllowed, otpHash, poolQuery, sendLoginCode } from "../_lib";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function OPTIONS(request: Request) { return apiOptions(request); }

export async function POST(request: Request) {
  if (!originAllowed(request)) return apiJson(request, { error: "مبدأ درخواست مجاز نیست." }, { status: 403 });
  try {
    const body = await request.json().catch(() => null) as { email?: unknown; displayName?: unknown } | null;
    const email = normalizedEmail(body?.email);
    if (!email) return apiJson(request, { error: "ایمیل معتبر وارد کن." }, { status: 400 });
    if (!process.env.AUTH_TOKEN_SECRET || process.env.AUTH_TOKEN_SECRET.length < 32) return apiJson(request, { error: "سرویس حساب هنوز تنظیم نشده است؛ مدیر سایت باید AUTH_TOKEN_SECRET را در Render تنظیم کند." }, { status: 503 });
    await ensureSchema();
    const previous = await poolQuery<{ sent_at: Date; window_started_at: Date; send_count: number }>("SELECT sent_at,window_started_at,send_count FROM lp_email_codes WHERE email=$1", [email]);
    const now = Date.now();
    const old = previous.rows[0];
    if (old && now - new Date(old.sent_at).getTime() < 60_000) return apiJson(request, { error: "برای ارسال دوبارهٔ کد، یک دقیقه صبر کن." }, { status: 429 });
    const sameWindow = old && now - new Date(old.window_started_at).getTime() < 60 * 60_000;
    if (sameWindow && Number(old.send_count) >= 5) return apiJson(request, { error: "تعداد درخواست‌های این ایمیل زیاد شده است؛ یک ساعت بعد دوباره تلاش کن." }, { status: 429 });
    const windowStarted = sameWindow ? new Date(old!.window_started_at) : new Date();
    const sendCount = sameWindow ? Number(old!.send_count) + 1 : 1;
    const code = createOtp();
    const hash = otpHash(email, code);
    await poolQuery(`INSERT INTO lp_email_codes(email,code_hash,expires_at,attempts,sent_at,window_started_at,send_count,display_name)
      VALUES($1,$2,NOW()+INTERVAL '10 minutes',0,NOW(),$3,$4,$5)
      ON CONFLICT(email) DO UPDATE SET code_hash=EXCLUDED.code_hash,expires_at=EXCLUDED.expires_at,attempts=0,sent_at=NOW(),window_started_at=EXCLUDED.window_started_at,send_count=EXCLUDED.send_count,display_name=EXCLUDED.display_name`,
      [email, hash, windowStarted, sendCount, cleanDisplayName(body?.displayName)]);
    try {
      await sendLoginCode(email, code);
    } catch (mailError) {
      await poolQuery("DELETE FROM lp_email_codes WHERE email=$1 AND code_hash=$2", [email, hash]);
      const message = mailError instanceof Error ? mailError.message : "تنظیمات ایمیل کامل نیست.";
      return apiJson(request, { error: message }, { status: 503 });
    }
    return apiJson(request, { ok: true, message: "کد ورود فرستاده شد. تا ۱۰ دقیقه معتبر است." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "درخواست کد ورود انجام نشد.";
    return apiJson(request, { error: message }, { status: 503 });
  }
}
