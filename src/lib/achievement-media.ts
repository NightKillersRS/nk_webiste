import type { AchievementMediaConfig } from "@/types/achievement-media";
import type {
  Rs3SubjectOption,
  RunePixelsFeedKind,
  RunePixelsRangeKey,
  RunepixelsActivityEntry
} from "@/types/runepixels";
import type {
  WomBoardKey,
  WomMetricOption,
  WomMetricPreset,
  WomPeriodKey
} from "@/types/wom";

const RUNEPIXELS_ASSET_BASE = "https://runepixels.com/assets/images_temp";

const genericActivity: AchievementMediaConfig = {
  label: "Live activity",
  fallbackIconSrc: "/assets/game/categories/activity.svg",
  accent: "sky",
  category: "activity"
};

const genericSkill: AchievementMediaConfig = {
  label: "Skill progress",
  fallbackIconSrc: "/assets/game/categories/skill.svg",
  accent: "sky",
  category: "skill"
};

const genericPvm: AchievementMediaConfig = {
  label: "PvM update",
  fallbackIconSrc: "/assets/game/categories/pvm.svg",
  accent: "amber",
  category: "pvm"
};

const genericMilestone: AchievementMediaConfig = {
  label: "Milestone",
  fallbackIconSrc: "/assets/game/categories/trophy.svg",
  accent: "emerald",
  category: "milestone"
};

const womCoreMetricCatalog: Array<{
  key: string;
  label: string;
  shortLabel: string;
  category: "combat" | "skilling" | "pvm";
  media: AchievementMediaConfig;
}> = [
  { key: "overall", label: "Overall", shortLabel: "Overall", category: "combat", media: buildWomSkillMedia("overall", "Overall", "sky") },
  { key: "attack", label: "Attack", shortLabel: "Attack", category: "combat", media: buildWomSkillMedia("attack", "Attack", "amber") },
  { key: "defence", label: "Defence", shortLabel: "Defence", category: "combat", media: buildWomSkillMedia("defence", "Defence", "sky") },
  { key: "strength", label: "Strength", shortLabel: "STR", category: "combat", media: buildWomSkillMedia("strength", "Strength", "amber") },
  { key: "hitpoints", label: "Hitpoints", shortLabel: "HP", category: "combat", media: buildWomSkillMedia("hitpoints", "Hitpoints", "sky") },
  { key: "ranged", label: "Ranged", shortLabel: "Ranged", category: "combat", media: buildWomSkillMedia("ranged", "Ranged", "emerald") },
  { key: "prayer", label: "Prayer", shortLabel: "Prayer", category: "combat", media: buildWomSkillMedia("prayer", "Prayer", "sky") },
  { key: "magic", label: "Magic", shortLabel: "Magic", category: "combat", media: buildWomSkillMedia("magic", "Magic", "sky") },
  { key: "cooking", label: "Cooking", shortLabel: "Cooking", category: "skilling", media: buildWomSkillMedia("cooking", "Cooking", "emerald") },
  { key: "woodcutting", label: "Woodcutting", shortLabel: "WC", category: "skilling", media: buildWomSkillMedia("woodcutting", "Woodcutting", "emerald") },
  { key: "fletching", label: "Fletching", shortLabel: "Fletch", category: "skilling", media: buildWomSkillMedia("fletching", "Fletching", "emerald") },
  { key: "fishing", label: "Fishing", shortLabel: "Fishing", category: "skilling", media: buildWomSkillMedia("fishing", "Fishing", "emerald") },
  { key: "firemaking", label: "Firemaking", shortLabel: "FM", category: "skilling", media: buildWomSkillMedia("firemaking", "Firemaking", "amber") },
  { key: "crafting", label: "Crafting", shortLabel: "Craft", category: "skilling", media: buildWomSkillMedia("crafting", "Crafting", "emerald") },
  { key: "smithing", label: "Smithing", shortLabel: "Smith", category: "skilling", media: buildWomSkillMedia("smithing", "Smithing", "amber") },
  { key: "mining", label: "Mining", shortLabel: "Mining", category: "skilling", media: buildWomSkillMedia("mining", "Mining", "amber") },
  { key: "herblore", label: "Herblore", shortLabel: "Herb", category: "skilling", media: buildWomSkillMedia("herblore", "Herblore", "emerald") },
  { key: "agility", label: "Agility", shortLabel: "Agility", category: "skilling", media: buildWomSkillMedia("agility", "Agility", "sky") },
  { key: "thieving", label: "Thieving", shortLabel: "Thieve", category: "skilling", media: buildWomSkillMedia("thieving", "Thieving", "emerald") },
  { key: "slayer", label: "Slayer", shortLabel: "Slayer", category: "combat", media: buildWomSkillMedia("slayer", "Slayer", "amber") },
  { key: "farming", label: "Farming", shortLabel: "Farm", category: "skilling", media: buildWomSkillMedia("farming", "Farming", "emerald") },
  { key: "runecraft", label: "Runecraft", shortLabel: "RC", category: "skilling", media: buildWomSkillMedia("runecraft", "Runecraft", "sky") },
  { key: "hunter", label: "Hunter", shortLabel: "Hunter", category: "skilling", media: buildWomSkillMedia("hunter", "Hunter", "emerald") },
  { key: "construction", label: "Construction", shortLabel: "Constr", category: "skilling", media: buildWomSkillMedia("construction", "Construction", "amber") },
  { key: "zulrah", label: "Zulrah", shortLabel: "Zulrah", category: "pvm", media: buildLocalPvmMedia("zulrah", "Zulrah", "/assets/game/pvm/zulrah.svg", "emerald") },
  { key: "vorkath", label: "Vorkath", shortLabel: "Vorkath", category: "pvm", media: buildLocalPvmMedia("vorkath", "Vorkath", "/assets/game/pvm/vorkath.svg", "amber") },
  { key: "chambers_of_xeric", label: "Chambers of Xeric", shortLabel: "CoX", category: "pvm", media: buildLocalPvmMedia("chambers_of_xeric", "Chambers of Xeric", "/assets/game/pvm/chambers-of-xeric.svg", "sky") },
  { key: "tombs_of_amascut", label: "Tombs of Amascut", shortLabel: "ToA", category: "pvm", media: buildLocalPvmMedia("tombs_of_amascut", "Tombs of Amascut", "/assets/game/pvm/tombs-of-amascut.svg", "amber") },
  { key: "king_black_dragon", label: "King Black Dragon", shortLabel: "KBD", category: "pvm", media: buildGenericPvmMetricMedia("King Black Dragon") },
  { key: "thermonuclear_smoke_devil", label: "Thermonuclear Smoke Devil", shortLabel: "Thermy", category: "pvm", media: buildGenericPvmMetricMedia("Thermonuclear Smoke Devil") },
  { key: "the_corrupted_gauntlet", label: "The Corrupted Gauntlet", shortLabel: "CG", category: "pvm", media: buildGenericPvmMetricMedia("The Corrupted Gauntlet") },
  { key: "kraken", label: "Kraken", shortLabel: "Kraken", category: "pvm", media: buildGenericPvmMetricMedia("Kraken") },
  { key: "lunar_chests", label: "Lunar Chests", shortLabel: "Lunar", category: "pvm", media: buildGenericPvmMetricMedia("Lunar Chests") }
];

export const womBoardOptions: Array<{
  key: WomBoardKey;
  label: string;
}> = [
  { key: "achievements", label: "Achievements" },
  { key: "gains", label: "Gains" },
  { key: "hiscores", label: "Hiscores" },
  { key: "records", label: "Records" }
];

export const womPeriodOptions: Array<{
  key: WomPeriodKey;
  label: string;
}> = [
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" }
];

export const runepixelsFeedOptions: Array<{
  key: RunePixelsFeedKind;
  label: string;
}> = [
  { key: "all", label: "All activity" },
  { key: "milestones", label: "Milestones" },
  { key: "skills", label: "Skills" },
  { key: "pvm", label: "PvM" },
  { key: "clan", label: "Clan" }
];

export const runepixelsRangeOptions: Array<{
  key: RunePixelsRangeKey;
  label: string;
}> = [{ key: "latest", label: "Latest" }];

export function getWomMetricPreset(metric: string | undefined | null): WomMetricPreset {
  const option = buildWomMetricOptions([]).find((entry) => entry.value === metric);
  const fallback =
    option ??
    (metric
      ? {
          value: normalizeMetricKey(metric),
          label: humanizeMetric(metric),
          shortLabel: humanizeMetric(metric),
          source: "live" as const,
          category: inferMetricCategory(normalizeMetricKey(metric)),
          media: resolveAchievementMetricMedia(normalizeMetricKey(metric))
        }
      : buildWomMetricOptions([])[0]);

  return {
    key: fallback.value,
    label: fallback.label,
    shortLabel: fallback.shortLabel,
    media: fallback.media,
    accent: fallback.media.accent,
    category: fallback.category,
    supports: ["achievements", "gains", "hiscores", "records"]
  };
}

export function getWomBoardKey(board: string | undefined | null): WomBoardKey {
  if (board === "gains" || board === "hiscores" || board === "records") {
    return board;
  }

  return "achievements";
}

export function getWomPeriodKey(period: string | undefined | null): WomPeriodKey {
  if (period === "month" || period === "year") {
    return period;
  }

  return "week";
}

export function getRunePixelsFeedKind(
  feed: string | undefined | null
): RunePixelsFeedKind {
  if (
    feed === "milestones" ||
    feed === "skills" ||
    feed === "pvm" ||
    feed === "clan"
  ) {
    return feed;
  }

  return "all";
}

export function getRunePixelsRange(
  range: string | undefined | null
): RunePixelsRangeKey {
  return range === "latest" ? "latest" : "latest";
}

export function buildWomMetricOptions(liveMetrics: string[]): WomMetricOption[] {
  const coreOptions = womCoreMetricCatalog.map((entry) => ({
    value: entry.key,
    label: entry.label,
    shortLabel: entry.shortLabel,
    source: "core" as const,
    category: entry.category,
    media: entry.media
  }));

  const known = new Set(coreOptions.map((entry) => entry.value));
  const liveOptions = [...new Set(liveMetrics)]
    .filter(Boolean)
    .filter((metric) => !known.has(metric))
    .sort((left, right) => humanizeMetric(left).localeCompare(humanizeMetric(right)))
    .map((metric) => ({
      value: metric,
      label: humanizeMetric(metric),
      shortLabel: humanizeMetric(metric),
      source: "live" as const,
      category: inferMetricCategory(metric),
      media: resolveAchievementMetricMedia(metric)
    }));

  return [...coreOptions, ...liveOptions];
}

export function resolveAchievementMetricMedia(metric: string): AchievementMediaConfig {
  const coreOption = womCoreMetricCatalog.find((entry) => entry.key === metric);

  if (coreOption) {
    return coreOption.media;
  }

  if (looksLikeSkillMetric(metric)) {
    return buildWomSkillMedia(metric, humanizeMetric(metric), "sky");
  }

  return buildGenericPvmMetricMedia(humanizeMetric(metric));
}

export function resolveRunepixelsActivityMedia(
  entry: Pick<RunepixelsActivityEntry, "type" | "text" | "data">
): AchievementMediaConfig {
  if (entry.type === 1) {
    const skillLabel = normalizeText(entry.data).replace(/\.$/, "") || "Skill progress";

    return {
      label: skillLabel,
      remoteIconSrc: buildRunePixelsSkillIconUrl(skillLabel),
      fallbackIconSrc: "/assets/game/categories/skill.svg",
      accent: "sky",
      category: "skill"
    };
  }

  if (entry.type === 2) {
    return {
      label: "Pet unlock",
      fallbackIconSrc: "/assets/game/categories/pet.svg",
      accent: "emerald",
      category: "milestone"
    };
  }

  if (entry.type === 3) {
    return {
      label: "Rare drop",
      remoteIconSrc: buildRunePixelsDropIconUrl(entry.text),
      fallbackIconSrc: "/assets/game/categories/drop.svg",
      accent: "amber",
      category: "pvm"
    };
  }

  if (entry.type === 4) {
    return {
      label: "Boss kills",
      remoteIconSrc: `${RUNEPIXELS_ASSET_BASE}/activity/kill.png`,
      fallbackIconSrc: "/assets/game/categories/pvm.svg",
      accent: "amber",
      category: "pvm"
    };
  }

  if (entry.type === 5) {
    return {
      label: "Quest completion",
      fallbackIconSrc: "/assets/game/categories/quest.svg",
      accent: "emerald",
      category: "milestone"
    };
  }

  if (entry.type === 6) {
    return {
      label: "Clue progress",
      fallbackIconSrc: "/assets/game/categories/clue.svg",
      accent: "sky",
      category: "milestone"
    };
  }

  if (entry.type === 7) {
    return {
      label: "Clan activity",
      fallbackIconSrc: "/assets/game/categories/clan.svg",
      accent: "sky",
      category: "clan"
    };
  }

  return {
    label: "Achievement milestone",
    remoteIconSrc: `${RUNEPIXELS_ASSET_BASE}/activity/achievement.png`,
    fallbackIconSrc: "/assets/game/categories/trophy.svg",
    accent: "emerald",
    category: "milestone"
  };
}

export function buildRs3MilestoneSubjectOptions(): Rs3SubjectOption[] {
  return [
    { value: "all", label: "All milestones", source: "fixed" },
    { value: "achievement", label: "Achievements", source: "fixed", media: genericMilestone },
    { value: "pet", label: "Pets", source: "fixed", media: { label: "Pets", fallbackIconSrc: "/assets/game/categories/pet.svg", accent: "emerald", category: "milestone" } },
    { value: "quest", label: "Quests", source: "fixed", media: { label: "Quests", fallbackIconSrc: "/assets/game/categories/quest.svg", accent: "emerald", category: "milestone" } },
    { value: "clue", label: "Clues", source: "fixed", media: { label: "Clues", fallbackIconSrc: "/assets/game/categories/clue.svg", accent: "sky", category: "milestone" } }
  ];
}

export function buildRs3SubjectOption(
  value: string,
  label: string,
  media?: AchievementMediaConfig
): Rs3SubjectOption {
  return {
    value,
    label,
    source: "derived",
    media
  };
}

export function humanizeMetric(metric: string) {
  return normalizeMetricKey(metric)
    .split("_")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function normalizeMetricKey(value: string) {
  return (value ?? "")
    .toLowerCase()
    .replace(/[.'’]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function normalizeDisplayKey(value: string) {
  return normalizeMetricKey(value).replace(/_/g, "-");
}

export function normalizeText(value: string | null | undefined) {
  return (value ?? "")
    .replace(/\s+/g, " ")
    .replace(/\.$/, "")
    .trim();
}

function buildWomSkillMedia(
  metric: string,
  label: string,
  accent: AchievementMediaConfig["accent"]
): AchievementMediaConfig {
  const normalized = normalizeMetricKey(metric);

  return {
    label,
    remoteIconSrc: buildRunePixelsSkillIconUrl(normalized),
    fallbackIconSrc: getLocalSkillFallbackIcon(normalized),
    accent,
    category: "skill"
  };
}

function buildLocalPvmMedia(
  key: string,
  label: string,
  fallbackIconSrc: string,
  accent: AchievementMediaConfig["accent"]
): AchievementMediaConfig {
  return {
    label,
    fallbackIconSrc,
    accent,
    category: "pvm"
  };
}

function buildGenericPvmMetricMedia(label: string): AchievementMediaConfig {
  return {
    label,
    fallbackIconSrc: "/assets/game/categories/pvm.svg",
    accent: "amber",
    category: "pvm"
  };
}

function buildRunePixelsSkillIconUrl(skill: string) {
  const normalized = normalizeMetricKey(skill);

  return `${RUNEPIXELS_ASSET_BASE}/skills/${normalized}.png`;
}

function buildRunePixelsDropIconUrl(itemName: string) {
  const normalized = normalizeMetricKey(itemName).replace(/_/g, "");

  return `${RUNEPIXELS_ASSET_BASE}/drops/${normalized}.png`;
}

function getLocalSkillFallbackIcon(metric: string) {
  const supportedLocalSkills = new Set([
    "overall",
    "strength",
    "ranged",
    "magic",
    "slayer",
    "fishing"
  ]);

  if (supportedLocalSkills.has(metric)) {
    return `/assets/game/skills/${metric}.svg`;
  }

  return "/assets/game/categories/skill.svg";
}

function inferMetricCategory(metric: string): WomMetricOption["category"] {
  const coreOption = womCoreMetricCatalog.find((entry) => entry.key === metric);

  if (coreOption) {
    return coreOption.category;
  }

  return looksLikeSkillMetric(metric) ? "skilling" : "pvm";
}

function looksLikeSkillMetric(metric: string) {
  const skillKeys = new Set(
    womCoreMetricCatalog
      .filter((entry) => entry.category !== "pvm")
      .map((entry) => entry.key)
  );

  return skillKeys.has(metric);
}
