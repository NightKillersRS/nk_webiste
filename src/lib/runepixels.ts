import {
  normalizeDisplayKey,
  normalizeText,
  resolveRunepixelsActivityMedia
} from "@/lib/achievement-media";
import { formatDateLabel, formatInteger } from "@/lib/format";
import type {
  RunePixelsFeaturedEntry,
  RunepixelsActivityEntry,
  RunepixelsBoardItem,
  RunepixelsClan,
  RunepixelsClanHiscoreEntry,
  RunepixelsClanRankingEntry,
  RunepixelsHighestRank,
  RunepixelsHiscoreRequest,
  RunepixelsHonorCard,
  RunepixelsRankingRequest,
  RunepixelsRs3Snapshot
} from "@/types/runepixels";

const RUNEPIXELS_API_BASE = "https://api.runepixels.com";
const REVALIDATE_SECONDS = 3600;
const integerFormatter = new Intl.NumberFormat("en-US");

async function fetchRunepixels<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");

  if (init?.body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${RUNEPIXELS_API_BASE}${path}`, {
    ...init,
    headers,
    next: {
      revalidate: REVALIDATE_SECONDS
    }
  });

  if (!response.ok) {
    throw new Error(`RunePixels request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export function getRs3Clan(slug: string) {
  return fetchRunepixels<RunepixelsClan>(`/clans/${slug}`);
}

export function getRs3ClanLatestActivity(clanId: number, activityType = -1) {
  return fetchRunepixels<RunepixelsActivityEntry[]>(
    `/clans/${clanId}/players/activities/latest?activitytype=${activityType}`
  );
}

export function getRs3ClanRanking(
  clanId: number,
  body: RunepixelsRankingRequest
) {
  return fetchRunepixels<RunepixelsClanRankingEntry[]>(
    `/clans/${clanId}/players/ranking`,
    {
      body: JSON.stringify(body),
      method: "POST"
    }
  );
}

export function getRs3ClanHiscore(
  clanId: number,
  body: RunepixelsHiscoreRequest
) {
  return fetchRunepixels<RunepixelsClanHiscoreEntry[]>(
    `/clans/${clanId}/players/hiscore`,
    {
      body: JSON.stringify(body),
      method: "POST"
    }
  );
}

export function buildRs3Snapshot(clan: RunepixelsClan): RunepixelsRs3Snapshot {
  return {
    clanId: clan.id,
    name: clan.name,
    memberCount: clan.totalMembers,
    totalXp: clan.totalXP,
    averageTotalLevel: clan.totalLevelAverage,
    killDeathRatio: clan.killDeathRatio,
    citadelLevel: clan.citadelLevel,
    lastTrackedAt: clan.lastTrack
  };
}

export function getRunepixelsClanRankLabel(rank: number) {
  switch (rank) {
    case 0:
      return "Recruit";
    case 1:
      return "Corporal";
    case 2:
      return "Sergeant";
    case 3:
      return "Lieutenant";
    case 4:
      return "Captain";
    case 5:
      return "General";
    case 6:
      return "Admin";
    case 7:
      return "Organiser";
    case 8:
      return "Coordinator";
    case 9:
      return "Overseer";
    case 10:
      return "Deputy Owner";
    case 11:
      return "Owner";
    default:
      return "Clan rank";
  }
}

export function buildRunepixelsHonors(
  ranks: RunepixelsHighestRank[],
  limit = 6
): RunepixelsHonorCard[] {
  return [...ranks]
    .sort((left, right) => right.rank - left.rank)
    .slice(0, limit)
    .map((entry) => ({
      id: `${entry.name}-${entry.rank}`,
      name: entry.name,
      rank: entry.rank,
      rankLabel: getRunepixelsClanRankLabel(entry.rank),
      note: `Rank ${entry.rank}`
    }));
}

export function normalizeRunepixelsActivityFeed(
  entries: RunepixelsActivityEntry[],
  limit = 12
): RunepixelsBoardItem[] {
  return [...entries]
    .sort(
      (left, right) =>
        new Date(right.date).getTime() - new Date(left.date).getTime()
    )
    .slice(0, limit)
    .map((entry, index) => normalizeRunepixelsActivityEntry(entry, index));
}

export function buildRunePixelsFeaturedEntries(
  entries: RunepixelsActivityEntry[],
  limit = 4
): RunePixelsFeaturedEntry[] {
  return entries
    .map((entry, index) => {
      const normalized = normalizeRunepixelsActivityEntry(entry, index);

      return {
        ...normalized,
        weight: getRunepixelsFeatureWeight(entry)
      };
    })
    .sort((left, right) => {
      if (right.weight !== left.weight) {
        return right.weight - left.weight;
      }

      return new Date(right.date).getTime() - new Date(left.date).getTime();
    })
    .slice(0, limit);
}

export function normalizeRunepixelsRankingEntries(
  entries: RunepixelsClanRankingEntry[],
  limit = 10
): RunepixelsBoardItem[] {
  return entries.slice(0, limit).map((entry, index) => {
    const title =
      extractString(entry, ["playerName", "name", "username", "displayName"]) ??
      `Clan member ${index + 1}`;
    const rank = extractNumber(entry, ["rank", "position", "ranking"]) ?? index + 1;
    const value = extractNumber(entry, [
      "data",
      "value",
      "experience",
      "xp",
      "level",
      "kills",
      "score"
    ]);
    const chips = [`Rank ${rank}`];

    if (value !== null) {
      chips.push(integerFormatter.format(value));
    }

    return {
      id: `ranking-${title}-${rank}-${index}`,
      eyebrow: "Weekly progress",
      title,
      description:
        value !== null
          ? "RunePixels reported a tracked weekly progress entry."
          : "RunePixels reported a live clan progress entry.",
      accent: "amber",
      chips,
      date: new Date().toISOString(),
      media: {
        label: "Progress",
        fallbackIconSrc: "/assets/game/categories/skill.svg",
        accent: "amber",
        category: "skill"
      }
    };
  });
}

export function normalizeRunepixelsHiscoreEntries(
  entries: RunepixelsClanHiscoreEntry[],
  limit = 10
): RunepixelsBoardItem[] {
  return entries.slice(0, limit).map((entry, index) => {
    const title =
      extractString(entry, ["playerName", "name", "username", "displayName"]) ??
      `Clan member ${index + 1}`;
    const rank = extractNumber(entry, ["rank", "position", "ranking"]) ?? index + 1;
    const level = extractNumber(entry, ["level", "value", "score"]);
    const experience = extractNumber(entry, ["experience", "xp", "data"]);
    const chips = [`Rank ${rank}`];

    if (level !== null) {
      chips.push(`Level ${integerFormatter.format(level)}`);
    }

    if (experience !== null) {
      chips.push(`${integerFormatter.format(experience)} XP`);
    }

    return {
      id: `hiscore-${title}-${rank}-${index}`,
      eyebrow: "RS3 hiscores",
      title,
      description:
        experience !== null
          ? "RunePixels reported a top tracked RS3 account."
          : "RunePixels reported a top clan account.",
      accent: "emerald",
      chips,
      date: new Date().toISOString(),
      media: {
        label: "Hiscores",
        fallbackIconSrc: "/assets/game/categories/trophy.svg",
        accent: "emerald",
        category: "milestone"
      }
    };
  });
}

function normalizeRunepixelsActivityEntry(
  entry: RunepixelsActivityEntry,
  index: number
): RunepixelsBoardItem {
  const label = getRunepixelsActivityLabel(entry.type);
  const media = resolveRunepixelsActivityMedia(entry);
  const detail = normalizeText(entry.data);
  const title = getRunepixelsActivityTitle(entry.type, entry.text, entry.data);
  const chips = [formatDateLabel(entry.date)];
  const supplementalChip = getSupplementalChip(entry.type, detail);
  const metadata = getRunepixelsActivityMetadata(entry.type, title, detail);

  if (supplementalChip) {
    chips.push(supplementalChip);
  }

  return {
    id: `${entry.playerName}-${entry.type}-${entry.date}-${index}`,
    eyebrow: `${entry.playerName} - ${label}`,
    title,
    description: describeRunepixelsActivity(entry.type, entry.playerName, title, detail),
    accent: media.accent,
    chips,
    date: entry.date,
    media,
    subjectKey: metadata.subjectKey,
    subjectLabel: metadata.subjectLabel,
    subtype: metadata.subtype
  };
}

function getRunepixelsActivityLabel(type: number) {
  switch (type) {
    case 0:
      return "Achievement milestone";
    case 1:
      return "Skill progress";
    case 2:
      return "Pet unlock";
    case 3:
      return "Rare drop";
    case 4:
      return "Boss kills";
    case 5:
      return "Quest completion";
    case 6:
      return "Clue progress";
    case 7:
      return "Clan activity";
    default:
      return "Live activity";
  }
}

function getRunepixelsActivityTitle(type: number, text: string, data: string) {
  const normalizedText = normalizeText(text);
  const normalizedData = normalizeText(data).replace(/\.$/, "");

  if (type === 1) {
    const formattedValue = /^\d+$/.test(normalizedText)
      ? `${formatInteger(Number(normalizedText))} XP`
      : normalizedText;

    return normalizedData
      ? `${normalizedData} - ${formattedValue}`
      : formattedValue || "Skill progress";
  }

  if (type === 6) {
    return `${normalizedText || "Clue"} clue`;
  }

  return normalizedText || normalizedData || "Tracked activity";
}

function getSupplementalChip(type: number, detail: string) {
  if (!detail) {
    return null;
  }

  if (type === 1 || type === 3) {
    return detail.replace(/\.$/, "");
  }

  if (type === 2) {
    return detail.replace(/^I found\s*/i, "").replace(/,$/, "").trim();
  }

  return null;
}

function getRunepixelsActivityMetadata(
  type: number,
  title: string,
  detail: string
) {
  if (type === 1) {
    const skillLabel = title.split(" - ")[0];

    return {
      subjectKey: normalizeDisplayKey(skillLabel),
      subjectLabel: skillLabel,
      subtype: "skill"
    };
  }

  if (type === 3) {
    const sourceLabel = detail || title;

    return {
      subjectKey: normalizeDisplayKey(sourceLabel),
      subjectLabel: sourceLabel,
      subtype: "drop"
    };
  }

  if (type === 4) {
    const bossLabel = parseBossLabel(title);

    return {
      subjectKey: normalizeDisplayKey(bossLabel),
      subjectLabel: bossLabel,
      subtype: "boss"
    };
  }

  if (type === 0) {
    return {
      subjectKey: "achievement",
      subjectLabel: "Achievements",
      subtype: "achievement"
    };
  }

  if (type === 2) {
    return {
      subjectKey: "pet",
      subjectLabel: "Pets",
      subtype: "pet"
    };
  }

  if (type === 5) {
    return {
      subjectKey: "quest",
      subjectLabel: "Quests",
      subtype: "quest"
    };
  }

  if (type === 6) {
    return {
      subjectKey: "clue",
      subjectLabel: "Clues",
      subtype: "clue"
    };
  }

  if (type === 7) {
    return {
      subjectKey: "clan",
      subjectLabel: "Clan",
      subtype: "clan"
    };
  }

  return {};
}

function describeRunepixelsActivity(
  type: number,
  playerName: string,
  title: string,
  detail: string
) {
  switch (type) {
    case 0:
      return `${playerName} landed a new achievement milestone on the RS3 board.`;
    case 1:
      return detail
        ? `${playerName} pushed ${detail.replace(/\.$/, "")} and RunePixels logged the fresh update.`
        : `${playerName} posted a fresh skill progress update on RunePixels.`;
    case 2:
      return detail
        ? `${playerName} unlocked a pet: ${detail.replace(/^I found\s*/i, "").replace(/,$/, "").trim()}.`
        : `${playerName} unlocked a new pet on RS3.`;
    case 3:
      return detail
        ? `${playerName} picked up ${title} at ${detail.replace(/\.$/, "")}.`
        : `${playerName} landed a fresh RS3 rare drop.`;
    case 4:
      return `${playerName} logged fresh boss kills on RS3.`;
    case 5:
      return `${playerName} completed ${title} and added a new quest clear to the feed.`;
    case 6:
      return `${playerName} posted a fresh clue update on the RS3 board.`;
    case 7:
      return `${playerName} registered fresh clan or citadel activity on RunePixels.`;
    default:
      return `${playerName} added a new RunePixels activity entry.`;
  }
}

function getRunepixelsFeatureWeight(entry: RunepixelsActivityEntry) {
  if (entry.type === 3) {
    return 100;
  }

  if (entry.type === 2) {
    return 90;
  }

  if (entry.type === 5) {
    return 80;
  }

  if (entry.type === 0) {
    return 75;
  }

  if (entry.type === 1) {
    const value = Number(normalizeText(entry.text));

    if (Number.isFinite(value) && value >= 13034431) {
      return 70;
    }

    return 55;
  }

  if (entry.type === 4) {
    return 65;
  }

  if (entry.type === 6) {
    return 40;
  }

  if (entry.type === 7) {
    return 35;
  }

  return 20;
}

function parseBossLabel(value: string) {
  const cleaned = normalizeText(value)
    .replace(/^\d+\s+/u, "")
    .replace(/\.$/, "");

  if (/amascut/i.test(cleaned)) {
    return "Tombs of Amascut";
  }

  if (/vindicta/i.test(cleaned)) {
    return "Gorvek and Vindicta";
  }

  return cleaned.replace(/s$/u, "");
}

function extractString(
  entry: Record<string, unknown>,
  keys: string[]
): string | null {
  for (const key of keys) {
    const value = entry[key];

    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return null;
}

function extractNumber(
  entry: Record<string, unknown>,
  keys: string[]
): number | null {
  for (const key of keys) {
    const value = entry[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim().length > 0) {
      const parsed = Number(value);

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return null;
}
