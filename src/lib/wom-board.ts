import { unstable_cache } from "next/cache";

import {
  buildWomMetricOptions,
  getWomBoardKey,
  getWomPeriodKey,
  normalizeMetricKey
} from "@/lib/achievement-media";
import {
  getGroupAchievements,
  getGroupGained,
  getGroupHiscores,
  getGroupRecords
} from "@/lib/wom";
import type {
  WomBoardApiResponse,
  WomBoardKey,
  WomPeriodKey
} from "@/types/wom";

export function normalizeWomSelection(input: {
  metric?: string | null;
  period?: string | null;
  board?: string | null;
}) {
  return {
    metric: input.metric ? normalizeMetricKey(input.metric) : "overall",
    period: getWomPeriodKey(input.period),
    board: getWomBoardKey(input.board)
  };
}

const getCachedWomRecentAchievements = unstable_cache(
  async (groupId: number) => getGroupAchievements(groupId, 50),
  ["wom-recent-achievements"],
  { revalidate: 3600 }
);

const getCachedWomMetricOptions = unstable_cache(
  async (groupId: number) => {
    const achievements = await getCachedWomRecentAchievements(groupId);
    return buildWomMetricOptions(achievements.map((entry) => entry.metric));
  },
  ["wom-metric-options"],
  { revalidate: 3600 }
);

export async function getWomBoardApiResponse(
  groupId: number,
  input: {
    metric?: string | null;
    period?: string | null;
    board?: string | null;
  }
): Promise<WomBoardApiResponse> {
  const selection = normalizeWomSelection(input);

  if (selection.board === "achievements") {
    const achievements = await getCachedWomRecentAchievements(groupId);
    const metricOptions = buildWomMetricOptions(achievements.map((entry) => entry.metric));

    return {
      selection,
      metricOptions,
      items:
        selection.metric === "overall"
          ? achievements.slice(0, 18)
          : achievements
              .filter((entry) => entry.metric === selection.metric)
              .slice(0, 18)
    };
  }

  const [metricDiscovery, items] = await Promise.all([
    getCachedWomMetricOptions(groupId),
    getWomBoardItems(
      groupId,
      selection.board,
      selection.metric,
      selection.period
    )
  ]);

  return {
    selection,
    metricOptions: metricDiscovery,
    items
  };
}

async function getWomBoardItems(
  groupId: number,
  board: WomBoardKey,
  metric: string,
  period: WomPeriodKey
) {
  if (board === "gains") {
    return getGroupGained(groupId, metric, period, 12);
  }

  if (board === "hiscores") {
    return getGroupHiscores(groupId, metric, 12);
  }

  return getGroupRecords(groupId, metric, period, 12);
}
