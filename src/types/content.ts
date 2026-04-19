export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  iconSrc?: string;
};

export type AccentTone = "blue" | "ice" | "ember";

export type FeatureIcon =
  | "sword"
  | "shield"
  | "crown"
  | "target"
  | "users"
  | "scroll"
  | "message"
  | "mail"
  | "calendar"
  | "zap"
  | "trophy";

export type SiteConfig = {
  clanName: string;
  tagline: string;
  description: string;
  discordUrl: string;
  runePixelsUrl: string;
  runepixelsClanSlug: string;
  womGroupId: number;
  womGroupUrl: string;
  discordWidgetUrl: string;
  contactEmail: string;
  footerTagline: string;
  footerNote: string;
  navLinks: NavLink[];
  footerLinks: NavLink[];
  socialLinks: NavLink[];
};

export type PageSectionCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

export type PageHeroCopy = PageSectionCopy & {
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
};

export type HomePageCopy = {
  hero: {
    eyebrow: string;
    description: string;
    socialHint: string;
    highlights: string[];
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    logoAlt: string;
  };
  intro: PageSectionCopy & {
    paragraphs: string[];
  };
  stats: PageSectionCopy;
  features: PageSectionCopy;
  discord: PageSectionCopy & {
    bullets: string[];
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  leadership: PageSectionCopy & {
    ctaLabel: string;
  };
  finalCta: PageSectionCopy & {
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
};

export type HomeAchievementsPreviewCopy = PageSectionCopy & {
  ctaLabel: string;
  fallbackTitle: string;
  fallbackDescription: string;
  emptyTitle: string;
  emptyDescription: string;
};

export type MembersPageCopy = {
  hero: PageHeroCopy;
  leadership: PageSectionCopy;
  roster: PageSectionCopy;
};

export type ContactCardCopy = {
  title: string;
  description: string;
  actionLabel: string;
};

export type ContactPageCopy = {
  hero: PageHeroCopy;
  channels: PageSectionCopy & {
    cards: {
      discord: ContactCardCopy;
      email: ContactCardCopy;
      links: ContactCardCopy;
    };
  };
  quickLinks: PageSectionCopy;
};

export type AchievementsPageCopy = {
  hero: PageHeroCopy;
  snapshot: PageSectionCopy & {
    ctaLabel: string;
    statusNote: string;
    labels: {
      members: string;
      totalXp: string;
      totalEhp: string;
      totalEhb: string;
      averageLevel: string;
      maxedCombat: string;
      verified: string;
      homeworld: string;
      updated: string;
    };
  };
  tabs: PageSectionCopy & {
    filters: {
      metricLabel: string;
      periodLabel: string;
      boardLabel: string;
    };
    fallbackTitle: string;
    fallbackDescription: string;
    emptyTitle: string;
    emptyDescription: string;
  };
};

export type Rs3AchievementsPageCopy = {
  hero: PageHeroCopy & {
    sourceNote: string;
  };
  snapshot: PageSectionCopy & {
    ctaLabel: string;
    labels: {
      members: string;
      totalXp: string;
      averageLevel: string;
      killDeathRatio: string;
      citadelLevel: string;
      lastTracked: string;
    };
  };
  honors: PageSectionCopy;
  tabs: PageSectionCopy & {
    featuredTitle: string;
    featuredDescription: string;
    filters: {
      feedLabel: string;
      rangeLabel: string;
      subjectLabel: string;
    };
    fallbackTitle: string;
    fallbackDescription: string;
    emptyTitle: string;
    emptyDescription: string;
  };
};

export type ClanStat = {
  label: string;
  value: string;
  note?: string;
};

export type FeatureCard = {
  title: string;
  description: string;
  icon: FeatureIcon;
  accent?: AccentTone;
};

export type MemberProfile = {
  username: string;
  role: string;
  avatar?: string | null;
  order: number;
  shortBio?: string;
  specialties?: string[];
  isLeadership?: boolean;
};
