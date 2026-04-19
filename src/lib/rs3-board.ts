import { unstable_cache } from "next/cache";

import {
  buildRs3MilestoneSubjectOptions,
  buildRs3SubjectOption,
  getRunePixelsFeedKind,
  getRunePixelsRange,
  normalizeDisplayKey
} from "@/lib/achievement-media";
import {
  buildRs3Snapshot,
  buildRunePixelsFeaturedEntries,
  buildRunepixelsHonors,
  getRs3Clan,
  getRs3ClanLatestActivity,
  normalizeRunepixelsActivityFeed
} from "@/lib/runepixels";
import type {
  Rs3BoardApiResponse,
  Rs3SubjectOption,
  RunePixelsFeaturedEntry,
  RunePixelsFeedKind,
  RunePixelsRangeKey,
  RunepixelsActivityEntry,
  RunepixelsBoardItem,
  RunepixelsClan,
  RunepixelsHonorCard,
  RunepixelsRs3Snapshot
} from "@/types/runepixels";

export function normalizeRs3Selection(input: {
  feed?: string | null;
  range?: string | null;
  subject?: string | null;
}) {
  return {
    feed: getRunePixelsFeedKind(input.feed),
    range: getRunePixelsRange(input.range),
    subject:
      input.subject && input.subject !== "all"
        ? normalizeDisplayKey(input.subject)
        : null
  };
}

type Rs3DashboardData = {
  clan: RunepixelsClan;
  snapshot: RunepixelsRs3Snapshot;
  honors: RunepixelsHonorCard[];
  featuredEntries: RunePixelsFeaturedEntry[];
  feedBundles: Record<RunePixelsFeedKind, RunepixelsBoardItem[] | null>;
};

const getCachedRs3DashboardData = unstable_cache(
  async (clanSlug: string): Promise<Rs3DashboardData> => {
    const clan = await getRs3Clan(clanSlug);
    const [
      allResult,
      skillsResult,
      dropsResult,
      killsResult,
      clanResult,
      achievementsResult,
      petsResult,
      questsResult,
      cluesResult
    ] = await Promise.allSettled([
      getRs3ClanLatestActivity(clan.id, -1),
      getRs3ClanLatestActivity(clan.id, 1),
      getRs3ClanLatestActivity(clan.id, 3),
      getRs3ClanLatestActivity(clan.id, 4),
      getRs3ClanLatestActivity(clan.id, 7),
      getRs3ClanLatestActivity(clan.id, 0),
      getRs3ClanLatestActivity(clan.id, 2),
      getRs3ClanLatestActivity(clan.id, 5),
      getRs3ClanLatestActivity(clan.id, 6)
    ]);

    const allActivity = getSettledValue(allResult);
    const skillActivity = getSettledValue(skillsResult);
    const dropActivity = getSettledValue(dropsResult);
    const killActivity = getSettledValue(killsResult);
    const clanActivity = getSettledValue(clanResult);
    const achievementActivity = getSettledValue(achievementsResult);
    const petActivity = getSettledValue(petsResult);
    const questActivity = getSettledValue(questsResult);
    const clueActivity = getSettledValue(cluesResult);

    return {
      clan,
      snapshot: buildRs3Snapshot(clan),
      honors: buildRunepixelsHonors(clan.highestRanks, 6),
      featuredEntries: allActivity ? buildRunePixelsFeaturedEntries(allActivity, 4) : [],
      feedBundles: {
        all: allActivity ? normalizeRunepixelsActivityFeed(allActivity, 24) : null,
        skills: skillActivity ? normalizeRunepixelsActivityFeed(skillActivity, 24) : null,
        pvm: normalizeMergedActivityFeed([dropActivity, killActivity]),
        clan: clanActivity ? normalizeRunepixelsActivityFeed(clanActivity, 24) : null,
        milestones: normalizeMergedActivityFeed([
          achievementActivity,
          petActivity,
          questActivity,
          clueActivity
        ])
      }
    };
  },
  ["rs3-dashboard-data"],
  { revalidate: 3600 }
);

export function getRs3DashboardData(clanSlug: string) {
  return getCachedRs3DashboardData(clanSlug);
}

export async function getRs3BoardApiResponse(
  clanSlug: string,
  input: {
    feed?: string | null;
    range?: string | null;
    subject?: string | null;
  }
): Promise<Rs3BoardApiResponse> {
  const dashboard = await getRs3DashboardData(clanSlug);
  return buildRs3BoardApiResponseFromDashboard(dashboard, input);
}

export function buildRs3BoardApiResponseFromDashboard(
  dashboard: Rs3DashboardData,
  input: {
    feed?: string | null;
    range?: string | null;
    subject?: string | null;
  }
): Rs3BoardApiResponse {
  const selection = normalizeRs3Selection(input);
  const boardItems = dashboard.feedBundles[selection.feed];
  const subjectOptions = buildRs3SubjectOptions(selection.feed, boardItems ?? []);
  const selectedSubject =
    selection.subject &&
    subjectOptions.some((entry) => entry.value === selection.subject)
      ? selection.subject
      : null;

  return {
    selection: {
      feed: selection.feed,
      range: selection.range,
      subject: selectedSubject
    },
    subjectOptions,
    items:
      boardItems === null
        ? null
        : filterRs3BoardItems(boardItems, selection.feed, selectedSubject)
  };
}

function buildRs3SubjectOptions(
  feed: RunePixelsFeedKind,
  items: RunepixelsBoardItem[]
): Rs3SubjectOption[] {
  if (feed === "skills") {
    return [
      buildRs3SubjectOption("all", "All skills"),
      ...buildUniqueSubjectOptions(items)
    ];
  }

  if (feed === "pvm") {
    return [buildRs3SubjectOption("all", "All PvM"), ...buildUniqueSubjectOptions(items)];
  }

  if (feed === "milestones") {
    return buildRs3MilestoneSubjectOptions();
  }

  return [];
}

function buildUniqueSubjectOptions(items: RunepixelsBoardItem[]) {
  const seen = new Set<string>();

  return items
    .filter((item) => item.subjectKey && item.subjectLabel)
    .filter((item) => {
      const key = item.subjectKey!;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .map((item) => buildRs3SubjectOption(item.subjectKey!, item.subjectLabel!, item.media))
    .sort((left, right) => left.label.localeCompare(right.label));
}

function filterRs3BoardItems(
  items: RunepixelsBoardItem[],
  feed: RunePixelsFeedKind,
  subject: string | null
) {
  if (!subject) {
    return items.slice(0, 12);
  }

  if (feed === "milestones") {
    return items.filter((item) => item.subtype === subject).slice(0, 12);
  }

  return items.filter((item) => item.subjectKey === subject).slice(0, 12);
}

function getSettledValue<T>(
  result: PromiseSettledResult<T>
): T | null {
  return result.status === "fulfilled" ? result.value : null;
}

function normalizeMergedActivityFeed(
  feeds: Array<RunepixelsActivityEntry[] | null>
) {
  const mergedEntries = feeds.flatMap((entries) => entries ?? []);

  if (mergedEntries.length === 0) {
    return null;
  }

  return normalizeRunepixelsActivityFeed(
    mergedEntries.sort(
      (left, right) =>
        new Date(right.date).getTime() - new Date(left.date).getTime()
    ),
    24
  );
}
