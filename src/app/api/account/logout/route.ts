import { apiJson, apiOptions, ensureSchema, getAuthenticatedUser, hashToken, originAllowed, poolQuery } from "../_lib";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function OPTIONS(request: Request) { return apiOptions(request); }
export async function POST(request: Request) {
  if (!originAllowed(request)) return apiJson(request, { error: "مبدأ درخواست مجاز نیست." }, { status: 403 });
  try {
    await ensureSchema();
    const user = await getAuthenticatedUser(request);
    if (!user) return apiJson(request, { ok: true });
    const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    if (/^[a-f0-9]{64}$/i.test(token)) await poolQuery("DELETE FROM lp_sessions WHERE token_hash=$1", [hashToken(token)]);
    return apiJson(request, { ok: true });
  } catch (error) {
    return apiJson(request, { error: error instanceof Error ? error.message : "خروج انجام نشد." }, { status: 503 });
  }
}
