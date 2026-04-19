import type { ClanStat, FeatureCard } from "@/types/content";

export const clanStats: ClanStat[] = [
  {
    label: "Active members",
    value: "42",
    note: "A compact roster built for active nights instead of empty headcount."
  },
  {
    label: "Trips per month",
    value: "8+",
    note: "Regular PvP pushes, raid nights, and clan check-ins across the month."
  },
  {
    label: "Years fighting",
    value: "18+",
    note: "Enough time to build habits, standards, and a recognizable clan identity."
  }
];

export const featureCards: FeatureCard[] = [
  {
    title: "18+ Years",
    description:
      "Veteran experience, long-term clan identity, and enough history to know what actually lasts.",
    icon: "trophy",
    accent: "blue"
  },
  {
    title: "OSRS & RS",
    description:
      "The clan stays active across Old School RuneScape and classic RuneScape.",
    icon: "scroll",
    accent: "ice"
  },
  {
    title: "Clan Discord",
    description:
      "Custom roles, bots, commands, and tools keep the server useful instead of noisy.",
    icon: "message",
    accent: "ember"
  },
  {
    title: "PvM Active",
    description:
      "The community stays active and is always looking for PvM and skilling challenges.",
    icon: "target",
    accent: "blue"
  }
];
