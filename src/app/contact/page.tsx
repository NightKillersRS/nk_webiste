import type { Metadata } from "next";

import { Mail, Map, MessageSquare } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactPageCopy } from "@/content/pages";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Night Killers through Discord, email, or quick site links."
};

const contactCards = [
  {
    title: contactPageCopy.channels.cards.discord.title,
    description: contactPageCopy.channels.cards.discord.description,
    href: siteConfig.discordUrl,
    action: contactPageCopy.channels.cards.discord.actionLabel,
    icon: MessageSquare
  },
  {
    title: contactPageCopy.channels.cards.email.title,
    description: contactPageCopy.channels.cards.email.description,
    href: `mailto:${siteConfig.contactEmail}`,
    action: contactPageCopy.channels.cards.email.actionLabel,
    icon: Mail
  },
  {
    title: contactPageCopy.channels.cards.links.title,
    description: contactPageCopy.channels.cards.links.description,
    href: "/members",
    action: contactPageCopy.channels.cards.links.actionLabel,
    icon: Map
  }
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        actions={
          <>
            <ButtonLink external href={siteConfig.discordUrl}>
              {contactPageCopy.hero.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink external href={`mailto:${siteConfig.contactEmail}`} variant="secondary">
              {contactPageCopy.hero.secondaryCtaLabel}
            </ButtonLink>
          </>
        }
        description={contactPageCopy.hero.description}
        eyebrow={contactPageCopy.hero.eyebrow}
        title={contactPageCopy.hero.title}
      />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading
          description={contactPageCopy.channels.description}
          eyebrow={contactPageCopy.channels.eyebrow}
          title={contactPageCopy.channels.title}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {contactCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Reveal className="panel h-full p-6" delay={index * 0.06} key={card.title}>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-400/[0.12] text-sky-100">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="ui-copy mt-6 text-xl font-semibold tracking-[0.05em] text-white">
                  {card.title}
                </h3>
                <p className="read-copy mt-3 text-sm leading-7 text-slate-300">
                  {card.description}
                </p>
                <div className="mt-6">
                  <ButtonLink
                    external={card.href.startsWith("http") || card.href.startsWith("mailto:")}
                    href={card.href}
                    variant="secondary"
                  >
                    {card.action}
                  </ButtonLink>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <Reveal className="panel px-6 py-8 sm:px-10 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <SectionHeading
              description={contactPageCopy.quickLinks.description}
              eyebrow={contactPageCopy.quickLinks.eyebrow}
              title={contactPageCopy.quickLinks.title}
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {siteConfig.navLinks.map((link) => (
                <ButtonLink className="w-full" href={link.href} key={link.href} variant="ghost">
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
