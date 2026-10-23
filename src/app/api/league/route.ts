import { apiJson, apiOptions, ensureSchema, getAuthenticatedUser, getPool, getUserStats, maskEmail, originAllowed, tehranDayKey } from "../account/_lib";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function OPTIONS(request: Request) { return apiOptions(request); }

type Period = "today" | "yesterday" | "month" | "all";
type Activity = "all" | "vocabulary" | "reading" | "listening" | "writing" | "speaking" | "grammar" | "conversation" | "games" | "warmup";
const PERIOD_LABELS: Record<Period, string> = { today: "امروز", yesterday: "دیروز", month: "این ماه", all: "همیشه" };
const ACTIVITY_TYPES: Record<Exclude<Activity, "all">, string[]> = {
  vocabulary: ["vocabulary_learned"],
  reading: ["reading_completed", "reading_quiz_completed"],
  listening: ["listening_completed"],
  writing: ["writing_completed"],
  speaking: ["speaking_completed"],
  grammar: ["grammar_completed"],
  conversation: ["conversation_completed"],
  games: ["game_completed"],
  warmup: ["warmup_quiz_completed"],
};

export async function GET(request: Request) {
  if (!originAllowed(request)) return apiJson(request, { error: "مبدأ درخواست مجاز نیست." }, { status: 403 });
  try {
    await ensureSchema();
    const url = new URL(request.url);
    const allowedPeriods = new Set<Period>(["today", "yesterday", "month", "all"]);
    const allowedActivities = new Set<Activity>(["all", "vocabulary", "reading", "listening", "writing", "speaking", "grammar", "conversation", "games", "warmup"]);
    const rawPeriod = url.searchParams.get("period") as Period | null;
    const period: Period = rawPeriod && allowedPeriods.has(rawPeriod) ? rawPeriod : "all";
    const rawGrade = url.searchParams.get("grade") || "all";
    const grade = ["all", "7", "8", "9"].includes(rawGrade) ? rawGrade : "all";
    const rawActivity = url.searchParams.get("activity") as Activity | null;
    const activity: Activity = rawActivity && allowedActivities.has(rawActivity) ? rawActivity : "all";
    const day = tehranDayKey();
    const yesterday = tehranDayKey(new Date(Date.now() - 24 * 60 * 60 * 1000));
    const monthStart = `${day.slice(0, 7)}-01`;
    const params: (string | string[] | null)[] = [];
    let dateClause = "";
    if (period === "today" || period === "yesterday") {
      params.push(period === "today" ? day : yesterday);
      dateClause = `AND c.day_key = $${params.length}`;
    } else if (period === "month") {
      params.push(monthStart, day);
      dateClause = `AND c.day_key >= $${params.length - 1} AND c.day_key <= $${params.length}`;
    }
    let activityClause = "";
    if (activity !== "all") {
      params.push(ACTIVITY_TYPES[activity]);
      activityClause = `AND c.activity_type = ANY($${params.length}::text[])`;
    }
    params.push(grade);
    const gradeIndex = params.length;
    let user: Awaited<ReturnType<typeof getAuthenticatedUser>> = null;
    try { user = await getAuthenticatedUser(request); } catch { /* keep public rankings readable */ }
    params.push(user?.id || null);
    const userIndex = params.length;

    // The activity ledger is append-only. Date filters never delete points.
    // For the all-time/all-activity view use the canonical lifetime balance, so
    // balances accumulated before the ledger migration are included as well.
    const lifetimeBalance = period === "all" && activity === "all";
    const scoreExpression = lifetimeBalance ? "u.total_coins" : "COALESCE(SUM(c.coins), 0)";
    const scoreHaving = lifetimeBalance ? "u.total_coins > 0" : "COALESCE(SUM(c.coins), 0) > 0";
    const result = await getPool().query<{ id: string; rank: number; display_name: string; email: string; coins: number; total_coins: number; grade: number }>(`
      WITH scores AS (
        SELECT u.id, u.display_name, u.email, u.grade, u.total_coins,
          (${scoreExpression})::int AS coins
        FROM lp_users u
        LEFT JOIN lp_activity_claims c ON c.user_id=u.id ${dateClause} ${activityClause}
        WHERE ($${gradeIndex}::text = 'all' OR u.grade::text = $${gradeIndex}::text)
        GROUP BY u.id, u.display_name, u.email, u.grade, u.total_coins
        HAVING ${scoreHaving}
      ), ranked AS (
        SELECT ROW_NUMBER() OVER (ORDER BY coins DESC, total_coins DESC, id ASC)::int AS rank,
          id, display_name, email, grade, coins, total_coins
        FROM scores
      )
      SELECT id,rank,display_name,email,coins,total_coins,grade
      FROM ranked WHERE rank <= 50 OR id = $${userIndex}
      ORDER BY rank
      LIMIT 51
    `, params);

    const mapEntry = (row: { id: string; rank: number; display_name: string; email: string; coins: number; total_coins: number; grade: number }) => ({
      rank: Number(row.rank), displayName: row.display_name?.trim() || maskEmail(row.email),
      coins: Number(row.coins || 0), totalCoins: Number(row.total_coins || 0), grade: Number(row.grade || 7),
    });
    const top = result.rows.filter((row) => Number(row.rank) <= 50).map(mapEntry);
    const ownRow = user ? result.rows.find((row) => row.id === user!.id) : undefined;
    let me: null | { rank: number | null; periodCoins: number; todayCoins: number; totalCoins: number; grade: number; displayName: string; matchesGradeFilter: boolean } = null;
    if (user) {
      const stats = await getUserStats(user.id, day);
      me = {
        rank: ownRow ? Number(ownRow.rank) : null,
        periodCoins: ownRow ? Number(ownRow.coins || 0) : 0,
        todayCoins: stats.todayCoins,
        totalCoins: Number(user.total_coins || 0),
        grade: Number(user.grade || 7),
        displayName: user.display_name?.trim() || maskEmail(user.email),
        matchesGradeFilter: grade === "all" || String(user.grade || 7) === grade,
      };
    }
    return apiJson(request, { day, period, periodLabel: PERIOD_LABELS[period], timeZone: "Asia/Tehran", historicalScoresPreserved: true, top, me });
  } catch (error) {
    return apiJson(request, { error: error instanceof Error ? error.message : "دریافت لیگ ناموفق بود." }, { status: 503 });
  }
}
