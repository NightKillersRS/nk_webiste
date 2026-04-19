import type {
  AchievementsPageCopy,
  ContactPageCopy,
  HomeAchievementsPreviewCopy,
  HomePageCopy,
  MembersPageCopy,
  Rs3AchievementsPageCopy
} from "@/types/content";

export const homePageCopy: HomePageCopy = {
  hero: {
    eyebrow: "RuneScape clan",
    description:
      "Night Killers is built for players who want active Discord comms, regular trips, and a clan that actually moves together.",
    socialHint: "Discord and RunePixels",
    highlights: ["18+ years", "OSRS & RS", "PvM + Discord"],
    primaryCtaLabel: "Join Discord",
    secondaryCtaLabel: "View Members",
    logoAlt: "Night Killers crest"
  },
  intro: {
    eyebrow: "Clan intro",
    title: "Built for players who actually want to show up.",
    description:
      "Night Killers is at its best when the calls are clean, the server is active, and the roster moves with purpose.",
    paragraphs: [
      "Night Killers is for players who want a clan with presence behind it. The focus stays on PvP pressure, consistent activity, and a community that knows how to organize.",
      "The site keeps that message simple. Show the crest, show the roster, and make it obvious where to join the conversation."
    ]
  },
  stats: {
    eyebrow: "At a glance",
    title: "A clan built for activity, not empty numbers.",
    description: "A quick read on the clan before you step into Discord."
  },
  features: {
    eyebrow: "What matters",
    title: "The parts of the clan that matter most.",
    description: "Four reasons the clan stays active in game and outside it."
  },
  discord: {
    eyebrow: "Discord",
    title: "See the server before you join it.",
    description:
      "Discord is where recruitment, event planning, and day-to-day clan activity actually happen.",
    bullets: [
      "Recruitment starts in Discord, not through a site form.",
      "RunePixels gives the clan a public profile outside the server."
    ],
    primaryCtaLabel: "Join Discord",
    secondaryCtaLabel: "Open RunePixels"
  },
  leadership: {
    eyebrow: "Leadership",
    title: "Meet the players holding the clan together.",
    description: "Leadership stays visible. You can see who sets the pace.",
    ctaLabel: "Full Roster"
  },
  finalCta: {
    eyebrow: "Ready to run with us?",
    title: "Join the Discord, meet the roster, and see if the clan fits.",
    description:
      "There is no application wall. Step into Discord, say hello, and get involved.",
    primaryCtaLabel: "Join Discord",
    secondaryCtaLabel: "RunePixels"
  }
};

export const homeAchievementsPreviewCopy: HomeAchievementsPreviewCopy = {
  eyebrow: "Wise Old Man",
  title: "Latest clan achievements",
  description:
    "Recent milestones from the live Night Killers Wise Old Man group.",
  ctaLabel: "Open Achievements",
  fallbackTitle: "Wise Old Man data is temporarily unavailable.",
  fallbackDescription:
    "The live feed could not be loaded right now. You can still open the full Wise Old Man group page directly.",
  emptyTitle: "No recent achievements yet.",
  emptyDescription:
    "Once new milestones land in Wise Old Man, they will appear here automatically."
};

export const membersPageCopy: MembersPageCopy = {
  hero: {
    eyebrow: "Members",
    title: "The roster behind the crest.",
    description:
      "A clear roster with visible leadership, active members, and roles that actually mean something.",
    primaryCtaLabel: "Join Discord",
    secondaryCtaLabel: "RunePixels"
  },
  leadership: {
    eyebrow: "Leadership",
    title: "The group setting the pace.",
    description: "The players setting standards, calls, and direction."
  },
  roster: {
    eyebrow: "Core roster",
    title: "Reliable players. Consistent presence.",
    description: "The wider roster keeping trips filled, PvM moving, and the clan active."
  }
};

export const contactPageCopy: ContactPageCopy = {
  hero: {
    eyebrow: "Contact",
    title: "Reach the clan without the clutter.",
    description:
      "Discord is the fastest way in. Email is there for admin or partnership contact.",
    primaryCtaLabel: "Join Discord",
    secondaryCtaLabel: "Email"
  },
  channels: {
    eyebrow: "Channels",
    title: "The fastest ways to get in touch.",
    description:
      "Use Discord for clan talk, email for formal contact, and site links if you just need context first.",
    cards: {
      discord: {
        title: "Discord recruitment",
        description:
          "Best route for joining, asking questions, or lining up with the next event night.",
        actionLabel: "Join the server"
      },
      email: {
        title: "Email contact",
        description:
          "Use email for partnership, admin, or out-of-game contact that should not sit in Discord.",
        actionLabel: "Email recruitment"
      },
      links: {
        title: "Site routes",
        description:
          "Jump back to the roster or the homepage if you want a quick read before joining.",
        actionLabel: "View members"
      }
    }
  },
  quickLinks: {
    eyebrow: "Quick links",
    title: "Move back into the site.",
    description:
      "These links mirror the main navigation so the contact page never becomes a dead end."
  }
};

export const achievementsPageCopy: AchievementsPageCopy = {
  hero: {
    eyebrow: "Achievements",
    title: "Live OSRS command board from Wise Old Man.",
    description:
      "Track the OSRS side of Night Killers with live Wise Old Man boards for milestones, gains, hiscores, and records.",
    primaryCtaLabel: "Wise Old Man",
    secondaryCtaLabel: "RS3 Boards"
  },
  snapshot: {
    eyebrow: "Group snapshot",
    title: "Current clan totals",
    description:
      "A server-rendered summary pulled directly from the Night Killers Wise Old Man group, including live status and update details.",
    ctaLabel: "Open Wise Old Man",
    statusNote: "Powered by the verified Night Killers group on Wise Old Man.",
    labels: {
      members: "Members",
      totalXp: "Total XP",
      totalEhp: "Total EHP",
      totalEhb: "Total EHB",
      averageLevel: "Average total level",
      maxedCombat: "Maxed combat",
      verified: "Verified group",
      homeworld: "Home world",
      updated: "Last sync"
    }
  },
  tabs: {
    eyebrow: "Live boards",
    title: "Swap metrics, periods, and board type",
    description:
      "Use the query-driven controls to move between achievement milestones, gainers, hiscores, and record holders without losing a shareable URL.",
    filters: {
      metricLabel: "Metric",
      periodLabel: "Period",
      boardLabel: "Board"
    },
    fallbackTitle: "Wise Old Man data is unavailable right now.",
    fallbackDescription:
      "The site could not load this section. Open the full group page on Wise Old Man for the latest data.",
    emptyTitle: "Nothing to show yet.",
    emptyDescription:
      "This panel is ready, but Wise Old Man does not have any matching entries right now."
  }
};

export const rs3AchievementsPageCopy: Rs3AchievementsPageCopy = {
  hero: {
    eyebrow: "RunePixels RS3",
    title: "RS3 clan progress, featured drops, and live activity.",
    description:
      "A read-only RS3 command board for Night Killers powered by the RunePixels clan snapshot and the live activity feeds that keep moving all week.",
    primaryCtaLabel: "Open RunePixels",
    secondaryCtaLabel: "OSRS Boards",
    sourceNote:
      "RunePixels exposes the clan snapshot and live activity feeds reliably. This RS3 page stays anchored to those stable endpoints and turns them into richer clan boards."
  },
  snapshot: {
    eyebrow: "Clan snapshot",
    title: "Current RS3 clan state",
    description:
      "A quick read on Night Killers in RunePixels: clan size, total XP, average level, citadel progress, and recent tracking state.",
    ctaLabel: "View RunePixels clan",
    labels: {
      members: "Members",
      totalXp: "Total XP",
      averageLevel: "Average total level",
      killDeathRatio: "Kill / death ratio",
      citadelLevel: "Citadel level",
      lastTracked: "Last tracked"
    }
  },
  honors: {
    eyebrow: "Clan honors",
    title: "Highest clan ranks in Night Killers",
    description:
      "A prestige strip built from RunePixels clan ranks so the leadership core stays visible on the RS3 page."
  },
  tabs: {
    eyebrow: "Live boards",
    title: "Feed-driven RS3 activity boards",
    description:
      "Use the live feed filters to move between all activity, milestones, skill updates, PvM highlights, and clan-side RunePixels activity.",
    featuredTitle: "Featured highlights",
    featuredDescription:
      "A weighted strip that surfaces drops, pets, quests, and milestone-worthy updates from the latest RS3 feed.",
    filters: {
      feedLabel: "Feed",
      rangeLabel: "Range",
      subjectLabel: "Category"
    },
    fallbackTitle: "RunePixels board data is unavailable right now.",
    fallbackDescription:
      "The clan page still loads, but this live board could not be read from RunePixels right now. Open the full RunePixels clan page for the latest state.",
    emptyTitle: "Nothing to show yet.",
    emptyDescription:
      "This board is live, but RunePixels does not have matching entries right now."
  }
};
