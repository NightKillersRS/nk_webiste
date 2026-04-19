export type AchievementCardAccent = "sky" | "amber" | "emerald";

export type AchievementMediaConfig = {
  label: string;
  remoteIconSrc?: string;
  fallbackIconSrc: string;
  accent: AchievementCardAccent;
  category: "skill" | "pvm" | "milestone" | "activity" | "clan";
};
