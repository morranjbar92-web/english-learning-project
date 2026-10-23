import { apiJson, apiOptions, ensureSchema, getAuthenticatedUser, getPool, getUserStats, originAllowed, REWARD_RULES, tehranDayKey } from "../../account/_lib";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function OPTIONS(request: Request) { return apiOptions(request); }

export async function POST(request: Request) {
  if (!originAllowed(request)) return apiJson(request, { error: "مبدأ درخواست مجاز نیست." }, { status: 403 });
  try {
    await ensureSchema();
    const user = await getAuthenticatedUser(request);
    if (!user) return apiJson(request, { error: "برای ثبت سکه در لیگ باید وارد حساب شوی." }, { status: 401 });
    const body = await request.json().catch(() => null) as { type?: unknown; activityId?: unknown } | null;
    const type = typeof body?.type === "string" ? body.type : "";
    const rawId = typeof body?.activityId === "string" ? body.activityId : "";
    const activityId = rawId.toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100);
    const rule = REWARD_RULES[type];
    if (!rule || !activityId) return apiJson(request, { error: "نوع فعالیت معتبر نیست." }, { status: 400 });
    const day = tehranDayKey();
    const client = await getPool().connect();
    let awarded = 0;
    try {
      await client.query("BEGIN");
      await client.query("SELECT id FROM lp_users WHERE id=$1 FOR UPDATE", [user.id]);
      const duplicate = await client.query("SELECT 1 FROM lp_activity_claims WHERE user_id=$1 AND day_key=$2 AND activity_type=$3 AND activity_id=$4", [user.id, day, type, activityId]);
      if (duplicate.rowCount) {
        await client.query("COMMIT");
        const stats = await getUserStats(user.id, day);
        return apiJson(request, { awarded: 0, duplicate: true, ...stats, day });
      }
      const countResult = await client.query<{ [column: string]: any; count: string }>("SELECT COUNT(*)::text AS count FROM lp_activity_claims WHERE user_id=$1 AND day_key=$2 AND activity_type=$3", [user.id, day, type]);
      if (Number(countResult.rows[0]?.count || 0) >= rule.dailyLimit) {
        await client.query("COMMIT");
        const stats = await getUserStats(user.id, day);
        return apiJson(request, { awarded: 0, limitReached: true, ...stats, day });
      }
      const insert = await client.query("INSERT INTO lp_activity_claims(user_id,day_key,activity_type,activity_id,coins) VALUES($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING RETURNING coins", [user.id, day, type, activityId, rule.coins]);
      if (insert.rowCount) {
        awarded = Number(insert.rows[0].coins);
        await client.query(`INSERT INTO lp_daily_points(user_id,day_key,coins) VALUES($1,$2,$3)
          ON CONFLICT(user_id,day_key) DO UPDATE SET coins=lp_daily_points.coins+EXCLUDED.coins`, [user.id, day, awarded]);
        await client.query("UPDATE lp_users SET total_coins=total_coins+$2 WHERE id=$1", [user.id, awarded]);
      }
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK").catch(() => undefined);
      throw error;
    } finally { client.release(); }
    const stats = await getUserStats(user.id, day);
    return apiJson(request, { awarded, duplicate: awarded === 0, ...stats, day });
  } catch (error) {
    return apiJson(request, { error: error instanceof Error ? error.message : "ثبت سکه انجام نشد." }, { status: 503 });
  }
}
