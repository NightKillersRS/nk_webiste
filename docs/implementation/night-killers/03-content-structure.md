# Content Structure

## Source Files

- `src/content/site.ts`
  Shared site configuration, nav, footer, copy blocks, and external links
- `src/content/members.ts`
  Leadership and roster data
- `src/content/highlights.ts`
  Stats, feature cards, apply requirements, and apply flow cards

## Shared Types

```ts
type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

type SiteConfig = {
  clanName: string;
  tagline: string;
  description: string;
  storyLead: string;
  introParagraphs: string[];
  contactText: string;
  discordUrl: string;
  applyUrl: string;
  contactEmail: string;
  navLinks: NavLink[];
  footerLinks: NavLink[];
  socialLinks: NavLink[];
  heroHighlights: string[];
};

type ClanStat = {
  label: string;
  value: string;
  note?: string;
};

type FeatureCard = {
  title: string;
  description: string;
  icon: FeatureIcon;
  accent?: AccentTone;
};

type MemberProfile = {
  username: string;
  role: string;
  avatar?: string | null;
  order: number;
  shortBio?: string;
  specialties?: string[];
  isLeadership?: boolean;
};

type ApplyRequirement = {
  title: string;
  description: string;
};
```

## V1 Content Rules

- Keep all content static and code-managed
- Use clean placeholder data where real clan details are not available
- Treat `src/content/site.ts` as the first replacement point for real URLs and email
- Keep bios and descriptions short so cards stay balanced on mobile

## Future-safe Direction

- The content folder should be easy to grow into events, history, and achievements later
- New routes should be able to import new content modules without changing existing shared components

