import type { AchievementMediaConfig } from "@/types/achievement-media";

export type RunepixelsNameStyle = Record<string, unknown>;

export type RunepixelsHighestRank = {
  playerID: number;
  name: string;
  type: number;
  nameStyle: RunepixelsNameStyle;
  rank: number;
  xp: number;
  kills: number;
  joinDate: string;
};

export type RunepixelsClanSummaryActivity = {
  playerName: string;
  playerType: number;
  nameStyle: RunepixelsNameStyle;
  type: number;
  data: string;
  createdAt: string;
};

export type RunepixelsActivityEntry = {
  playerName: string;
  playerType: number;
  nameStyle: RunepixelsNameStyle;
  type: number;
  text: string;
  date: string;
  data: string;
};

export type RunepixelsClan = {
  id: number;
  name: string;
  totalMembers: number;
  totalLevelAverage: number;
  killDeathRatio: number;
  totalXP: number;
  citadelLevel: number;
  highestRanks: RunepixelsHighestRank[];
  lastTrack: string;
  activity: RunepixelsClanSummaryActivity[];
  hasPin: boolean;
};

export type RunepixelsRankingRequest = {
  timeperiod: number;
  playertype: number;
  skills: string[];
  skill: string;
  limit?: number;
};

export type RunepixelsHiscoreRequest = {
  playertype: number;
  skills: string[];
  skill: string;
  limit?: number;
};

export type RunepixelsClanRankingEntry = Record<string, unknown>;

export type RunepixelsClanHiscoreEntry = Record<string, unknown>;

export type RunepixelsRs3Snapshot = {
  clanId: number;
  name: string;
  memberCount: number;
  totalXp: number;
  averageTotalLevel: number;
  killDeathRatio: number;
  citadelLevel: number;
  lastTrackedAt: string;
};

export type RunepixelsHonorCard = {
  id: string;
  name: string;
  rank: number;
  rankLabel: string;
  note: string;
};

export type RunePixelsFeedKind =
  | "all"
  | "milestones"
  | "skills"
  | "pvm"
  | "clan";

export type RunePixelsRangeKey = "latest";

export type Rs3SubjectOption = {
  value: string;
  label: string;
  source: "derived" | "fixed";
  media?: AchievementMediaConfig;
};

export type RunepixelsBoardItem = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: "sky" | "amber" | "emerald";
  chips: string[];
  date: string;
  media: AchievementMediaConfig;
  subjectKey?: string;
  subjectLabel?: string;
  subtype?: string;
};

export type RunePixelsFeaturedEntry = RunepixelsBoardItem & {
  weight: number;
};

export type Rs3BoardApiResponse = {
  selection: {
    feed: RunePixelsFeedKind;
    range: RunePixelsRangeKey;
    subject: string | null;
  };
  subjectOptions: Rs3SubjectOption[];
  items: RunepixelsBoardItem[] | null;
};
