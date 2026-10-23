import { apiJson, apiOptions, ensureSchema, getAuthenticatedUser, getUserStats, originAllowed, tehranDayKey } from "../_lib";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function OPTIONS(request: Request) { return apiOptions(request); }
export async function GET(request: Request) {
  if (!originAllowed(request)) return apiJson(request, { error: "مبدأ درخواست مجاز نیست." }, { status: 403 });
  try {
    await ensureSchema();
    const user = await getAuthenticatedUser(request);
    if (!user) return apiJson(request, { error: "نشست معتبر نیست؛ دوباره وارد شو." }, { status: 401 });
    const stats = await getUserStats(user.id, tehranDayKey());
    return apiJson(request, { profile: { id: user.id, email: user.email, displayName: user.display_name, grade: Number(user.grade || 7), passwordConfigured: Boolean(user.password_configured), authMethod: user.auth_method || "email_code", ...stats } });
  } catch (error) {
    return apiJson(request, { error: error instanceof Error ? error.message : "دریافت حساب ناموفق بود." }, { status: 503 });
  }
}
