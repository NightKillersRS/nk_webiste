import type {
  WomAchievement,
  WomGainedEntry,
  WomGroupDetails,
  WomGroupSnapshot,
  WomRecordEntry,
  WomGroupStatistics,
  WomHiscoresEntry
} from "@/types/wom";

const WOM_API_BASE = "https://api.wiseoldman.net/v2";
const REVALIDATE_SECONDS = 3600;

async function fetchWom<T>(path: string): Promise<T> {
  const response = await fetch(`${WOM_API_BASE}${path}`, {
    headers: {
      Accept: "application/json"
    },
    next: {
      revalidate: REVALIDATE_SECONDS
    }
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Wise Old Man request failed: ${response.status} for ${path}${errorBody ? ` - ${errorBody}` : ""}`
    );
  }

  return (await response.json()) as T;
}

export function getGroupDetails(groupId: number) {
  return fetchWom<WomGroupDetails>(`/groups/${groupId}`);
}

export function getGroupStatistics(groupId: number) {
  return fetchWom<WomGroupStatistics>(`/groups/${groupId}/statistics`);
}

export function getGroupAchievements(groupId: number, limit = 12) {
  return fetchWom<WomAchievement[]>(
    `/groups/${groupId}/achievements?limit=${limit}`
  );
}

export function getGroupGained(
  groupId: number,
  metric = "overall",
  period = "week",
  limit = 10
) {
  return fetchWom<WomGainedEntry[]>(
    `/groups/${groupId}/gained?metric=${metric}&period=${period}&limit=${limit}`
  );
}

export function getGroupHiscores(
  groupId: number,
  metric = "overall",
  limit = 10
) {
  return fetchWom<WomHiscoresEntry[]>(
    `/groups/${groupId}/hiscores?metric=${metric}&limit=${limit}`
  );
}

export function getGroupRecords(
  groupId: number,
  metric = "overall",
  period = "week",
  limit = 10
) {
  return fetchWom<WomRecordEntry[]>(
    `/groups/${groupId}/records?metric=${metric}&period=${period}&limit=${limit}`
  );
}

export function buildGroupSnapshot(
  details: WomGroupDetails,
  statistics: WomGroupStatistics
): WomGroupSnapshot {
  const totals = details.memberships.reduce(
    (accumulator, membership) => {
      accumulator.totalXp += membership.player.exp ?? 0;
      accumulator.totalEhp += membership.player.ehp ?? 0;
      accumulator.totalEhb += membership.player.ehb ?? 0;

      return accumulator;
    },
    {
      totalXp: 0,
      totalEhp: 0,
      totalEhb: 0
    }
  );

  return {
    name: details.name,
    description: details.description,
    verified: details.verified,
    homeworld: details.homeworld,
    memberCount: details.memberCount,
    totalXp: totals.totalXp,
    totalEhp: totals.totalEhp,
    totalEhb: totals.totalEhb,
    averageTotalLevel: statistics.averageStats.data.skills.overall.level,
    maxedCombatCount: statistics.maxedCombatCount,
    updatedAt: details.updatedAt
  };
}
