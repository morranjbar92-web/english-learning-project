import { apiJson, apiOptions, cleanDisplayName, ensureSchema, getAuthenticatedUser, getUserStats, hashPassword, originAllowed, poolQuery, tehranDayKey, verifyPassword } from "../_lib";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function OPTIONS(request: Request) { return apiOptions(request); }

export async function POST(request: Request) {
  if (!originAllowed(request)) return apiJson(request, { error: "مبدأ درخواست مجاز نیست." }, { status: 403 });
  try {
    await ensureSchema();
    const user = await getAuthenticatedUser(request);
    if (!user) return apiJson(request, { error: "نشست معتبر نیست؛ دوباره وارد شو." }, { status: 401 });
    const body = await request.json().catch(() => null) as { displayName?: unknown; grade?: unknown; currentPassword?: unknown; newPassword?: unknown } | null;
    const displayName = body?.displayName === undefined ? user.display_name : cleanDisplayName(body.displayName);
    if (body?.displayName !== undefined && displayName.length < 2) return apiJson(request, { error: "نام نمایشی باید حداقل ۲ حرف باشد." }, { status: 400 });
    const grade = body?.grade === undefined ? Number(user.grade || 7) : Number(body.grade);
    if (![7, 8, 9].includes(grade)) return apiJson(request, { error: "پایه باید هفتم، هشتم یا نهم باشد." }, { status: 400 });

    const newPassword = typeof body?.newPassword === "string" ? body.newPassword : "";
    let newHash: string | null = null;
    if (newPassword) {
      if (newPassword.length < 10 || newPassword.length > 128) return apiJson(request, { error: "رمز باید بین ۱۰ تا ۱۲۸ کاراکتر باشد." }, { status: 400 });
      const current = await poolQuery<{ password_hash: string | null }>("SELECT password_hash FROM lp_users WHERE id=$1", [user.id]);
      const existingHash = current.rows[0]?.password_hash || null;
      const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : "";
      if (existingHash && user.auth_method === "password" && !verifyPassword(currentPassword, existingHash)) {
        return apiJson(request, { error: "برای تغییر رمز، رمز فعلی را درست وارد کن؛ یا با کد ایمیل وارد شو و سپس رمز را بازنشانی کن." }, { status: 400 });
      }
      if (existingHash && currentPassword && !verifyPassword(currentPassword, existingHash)) return apiJson(request, { error: "رمز فعلی درست نیست." }, { status: 400 });
      newHash = hashPassword(newPassword);
    }
    await poolQuery("UPDATE lp_users SET display_name=$2,grade=$3,password_hash=COALESCE($4,password_hash) WHERE id=$1", [user.id, displayName, grade, newHash]);
    const stats = await getUserStats(user.id, tehranDayKey());
    return apiJson(request, { ok: true, message: newHash ? "تنظیمات و رمز حساب ذخیره شد." : "تنظیمات حساب ذخیره شد.", profile: { id: user.id, email: user.email, displayName, grade, passwordConfigured: Boolean(newHash || user.password_configured), authMethod: user.auth_method || "email_code", ...stats } });
  } catch (error) {
    return apiJson(request, { error: error instanceof Error ? error.message : "ذخیرهٔ تنظیمات ناموفق بود." }, { status: 503 });
  }
}
