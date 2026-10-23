import { apiJson, apiOptions, ensureSchema, getAuthenticatedUser, getPool, getUserStats, maskEmail, originAllowed, tehranDayKey } from "../account/_lib";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function OPTIONS(request: Request) { return apiOptions(request); }

export async function GET(request: Request) {
  if (!originAllowed(request)) return apiJson(request, { error: "مبدأ درخواست مجاز نیست." }, { status: 403 });
  try {
    await ensureSchema();
    const day = tehranDayKey();
    const result = await getPool().query<{ [column: string]: any; rank: string; display_name: string; email: string; coins: number; total_coins: number }>(`
      SELECT ROW_NUMBER() OVER (ORDER BY d.coins DESC, u.id ASC)::text AS rank,
        u.display_name, u.email, d.coins, u.total_coins
      FROM lp_daily_points d JOIN lp_users u ON u.id=d.user_id
      WHERE d.day_key=$1
      ORDER BY d.coins DESC, u.id ASC LIMIT 20
    `, [day]);
    const top = result.rows.map((row) => ({
      rank: Number(row.rank),
      displayName: row.display_name?.trim() || maskEmail(row.email),
      coins: Number(row.coins || 0),
      totalCoins: Number(row.total_coins || 0),
    }));
    let me: { rank: number | null; todayCoins: number; totalCoins: number } | null = null;
    try {
      const user = await getAuthenticatedUser(request);
      if (user) me = await getUserStats(user.id, day);
    } catch { /* public board remains readable while account configuration is being fixed */ }
    return apiJson(request, { day, timeZone: "Asia/Tehran", resetsAt: "00:00 Asia/Tehran", top, me });
  } catch (error) {
    return apiJson(request, { error: error instanceof Error ? error.message : "دریافت لیگ ناموفق بود." }, { status: 503 });
  }
}
