import type { SiteConfig } from "@/types/content";

export const siteConfig: SiteConfig = {
  clanName: "Night Killers",
  tagline: "Dominate the night. Rule the wild.",
  description:
    "Night Killers is a RuneScape clan built around active Discord comms, regular PvP and PvM nights, and a roster that actually plays together.",
  discordUrl: "https://discord.gg/tqn25jCe",
  runePixelsUrl: "https://runepixels.com/clans/night-killers/about",
  runepixelsClanSlug: "night-killers",
  womGroupId: 12549,
  womGroupUrl: "https://wiseoldman.net/groups/12549",
  discordWidgetUrl:
    "https://discord.com/widget?id=408917964709167105&theme=dark",
  contactEmail: "recruitment@nightkillers.gg",
  footerTagline: "PvP, PvM, Discord, RunePixels.",
  footerNote: "Recruitment is open through Discord. No application wall.",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Achievements", href: "/achievements" },
    { label: "Members", href: "/members" },
    { label: "Contact", href: "/contact" }
  ],
  footerLinks: [
    { label: "Home", href: "/" },
    { label: "Achievements", href: "/achievements" },
    { label: "RS3 Boards", href: "/achievements/rs3" },
    { label: "Members", href: "/members" },
    { label: "Contact", href: "/contact" },
    {
      label: "RunePixels",
      href: "https://runepixels.com/clans/night-killers/about",
      external: true
    },
    { label: "Discord", href: "https://discord.gg/tqn25jCe", external: true }
  ],
  socialLinks: [
    {
      label: "RunePixels",
      href: "https://runepixels.com/clans/night-killers/about",
      external: true,
      iconSrc: "/assets/social/runepixels-mark.svg"
    },
    {
      label: "Discord",
      href: "https://discord.gg/tqn25jCe",
      external: true,
      iconSrc: "/assets/social/discord-mask.svg"
    }
  ]
};
