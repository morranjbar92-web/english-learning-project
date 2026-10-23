import { apiJson, apiOptions, ensureSchema, getAuthenticatedUser, mergeProgress, originAllowed, poolQuery } from "../_lib";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function OPTIONS(request: Request) { return apiOptions(request); }
export async function GET(request: Request) {
  if (!originAllowed(request)) return apiJson(request, { error: "مبدأ درخواست مجاز نیست." }, { status: 403 });
  try {
    await ensureSchema();
    const user = await getAuthenticatedUser(request);
    if (!user) return apiJson(request, { error: "برای همگام‌سازی وارد حساب شو." }, { status: 401 });
    const result = await poolQuery<{ data: Record<string, unknown> }>("SELECT data FROM lp_progress WHERE user_id=$1", [user.id]);
    return apiJson(request, { progress: result.rows[0]?.data || {}, updated: true });
  } catch (error) {
    return apiJson(request, { error: error instanceof Error ? error.message : "دریافت پیشرفت ناموفق بود." }, { status: 503 });
  }
}
export async function POST(request: Request) {
  if (!originAllowed(request)) return apiJson(request, { error: "مبدأ درخواست مجاز نیست." }, { status: 403 });
  try {
    await ensureSchema();
    const user = await getAuthenticatedUser(request);
    if (!user) return apiJson(request, { error: "برای همگام‌سازی وارد حساب شو." }, { status: 401 });
    const body = await request.json().catch(() => null) as { progress?: unknown } | null;
    const progress = await mergeProgress(user.id, body?.progress);
    return apiJson(request, { ok: true, progress, syncedAt: new Date().toISOString() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "ذخیرهٔ پیشرفت ناموفق بود.";
    const status = /حجم پیشرفت/.test(message) ? 413 : 400;
    return apiJson(request, { error: message }, { status });
  }
}
