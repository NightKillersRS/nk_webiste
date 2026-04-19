import type { AchievementMediaConfig } from "@/types/achievement-media";
import type { AchievementCardAccent } from "@/types/achievement-media";

export type WomPlayer = {
  id: number;
  username: string;
  displayName: string;
  type: string;
  build: string;
  status: string;
  country: string | null;
  patron: boolean;
  exp: number;
  ehp: number;
  ehb: number;
  ttm: number;
  tt200m: number;
  registeredAt: string;
  updatedAt: string | null;
  lastChangedAt: string | null;
  lastImportedAt: string | null;
};

export type WomGroupMembership = {
  playerId: number;
  groupId: number;
  role: string;
  createdAt: string;
  updatedAt: string;
  player: WomPlayer;
};

export type WomGroupDetails = {
  id: number;
  name: string;
  clanChat: string | null;
  description: string | null;
  homeworld: number | null;
  verified: boolean;
  patron: boolean;
  visible: boolean;
  profileImage: string | null;
  bannerImage: string | null;
  score: number;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
  memberships: WomGroupMembership[];
};

export type WomOverallSkillAverage = {
  metric: "overall";
  experience: number;
  rank: number;
  level: number;
  ehp: number;
};

export type WomGroupStatistics = {
  maxedCombatCount: number;
  maxedTotalCount: number;
  maxed200msCount: number;
  averageStats: {
    data: {
      skills: {
        overall: WomOverallSkillAverage;
      };
    };
  };
};

export type WomAchievement = {
  playerId: number;
  name: string;
  metric: string;
  threshold: number;
  accuracy: number;
  createdAt: string;
  measure: "experience" | "kills" | "score" | string;
  legacy: boolean;
  player: WomPlayer;
};

export type WomGainedEntry = {
  player: WomPlayer;
  startDate: string;
  endDate: string;
  data: {
    gained: number;
    start: number;
    end: number;
  };
};

export type WomHiscoresEntry = {
  player: WomPlayer;
  data: {
    type: string;
    rank: number;
    level?: number;
    experience?: number;
    kills?: number;
    score?: number;
  };
};

export type WomRecordEntry = {
  playerId: number;
  period: string;
  metric: string;
  value: number;
  updatedAt: string;
  player: WomPlayer;
};

export type WomBoardKey = "achievements" | "gains" | "hiscores" | "records";

export type WomPeriodKey = "week" | "month" | "year";

export type WomMetricPreset = {
  key: string;
  label: string;
  shortLabel: string;
  media: AchievementMediaConfig;
  accent: AchievementCardAccent;
  category: "combat" | "skilling" | "pvm";
  supports: WomBoardKey[];
};

export type WomMetricOption = {
  value: string;
  label: string;
  shortLabel: string;
  source: "core" | "live";
  category: "combat" | "skilling" | "pvm";
  media: AchievementMediaConfig;
};

export type WomBoardApiResponse = {
  selection: {
    metric: string;
    period: WomPeriodKey;
    board: WomBoardKey;
  };
  metricOptions: WomMetricOption[];
  items:
    | WomAchievement[]
    | WomGainedEntry[]
    | WomHiscoresEntry[]
    | WomRecordEntry[]
    | null;
};

export type WomGroupSnapshot = {
  name: string;
  description: string | null;
  verified: boolean;
  homeworld: number | null;
  memberCount: number;
  totalXp: number;
  totalEhp: number;
  totalEhb: number;
  averageTotalLevel: number;
  maxedCombatCount: number;
  updatedAt: string;
};
