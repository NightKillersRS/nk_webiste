import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { MemberCard } from "@/components/ui/member-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { SocialIconLink } from "@/components/ui/social-icon-link";
import { StatGrid } from "@/components/ui/stat-grid";
import { clanStats, featureCards } from "@/content/highlights";
import { members } from "@/content/members";
import {
  homeAchievementsPreviewCopy,
  homePageCopy
} from "@/content/pages";
import { siteConfig } from "@/content/site";
import { formatDateLabel } from "@/lib/format";
import { getGroupAchievements } from "@/lib/wom";

const leadership = members
  .filter((member) => member.isLeadership)
  .sort((left, right) => left.order - right.order)
  .slice(0, 4);

export default async function HomePage() {
  const recentAchievements = await getGroupAchievements(siteConfig.womGroupId, 3)
    .then((entries) => entries)
    .catch(() => null);

  return (
    <>
      <section className="relative isolate min-h-[820px] overflow-hidden md:min-h-[900px] lg:min-h-[1080px]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat [background-position:28%_center] md:[background-position:32%_center] lg:[background-position:36%_center]"
            style={{
              backgroundImage:
                "url('/assets/backgrounds/night-killers-hero-bg.png')"
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,7,14,0.94)_0%,rgba(4,7,14,0.76)_34%,rgba(4,7,14,0.42)_62%,rgba(4,7,14,0.58)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[320px] bg-[linear-gradient(180deg,rgba(4,7,14,0)_0%,rgba(6,11,24,0.32)_32%,rgba(9,18,40,0.74)_68%,rgba(2,5,11,1)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[820px] max-w-7xl items-center px-4 sm:px-6 md:min-h-[900px] lg:min-h-[1080px] lg:px-8">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <Reveal className="relative z-10 pt-24">
              <span className="eyebrow ui-copy">{homePageCopy.hero.eyebrow}</span>
              <h1 className="ui-copy mt-6 max-w-3xl text-5xl font-semibold tracking-[0.08em] text-white sm:text-6xl xl:text-7xl">
                {siteConfig.clanName}
              </h1>
              <p className="ui-copy mt-5 max-w-2xl text-xl leading-9 text-sky-50/92 sm:text-2xl">
                {siteConfig.tagline}
              </p>
              <p className="read-copy mt-6 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
                {homePageCopy.hero.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink external href={siteConfig.discordUrl}>
                  {homePageCopy.hero.primaryCtaLabel}
                </ButtonLink>
                <ButtonLink href="/members" variant="secondary">
                  {homePageCopy.hero.secondaryCtaLabel}
                </ButtonLink>
              </div>

              <div className="mt-6 flex items-center gap-3">
                {siteConfig.socialLinks.map((link) =>
                  link.iconSrc ? (
                    <SocialIconLink
                      className="h-12 w-12 bg-slate-950/45"
                      href={link.href}
                      iconSrc={link.iconSrc}
                      key={link.label}
                      label={link.label}
                    />
                  ) : null
                )}
                <span className="ui-copy text-xs uppercase tracking-[0.24em] text-sky-100/80">
                  {homePageCopy.hero.socialHint}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {homePageCopy.hero.highlights.map((highlight) => (
                  <span
                    className="ui-copy rounded-full border border-white/10 bg-slate-950/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-100 backdrop-blur-sm"
                    key={highlight}
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal
              className="relative flex items-center justify-center pt-20 lg:justify-end"
              delay={0.1}
            >
              <div className="absolute h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(43,122,255,0.34),rgba(43,122,255,0.06)_52%,transparent_72%)] blur-2xl" />
              <Image
                alt={homePageCopy.hero.logoAlt}
                className="relative h-auto w-full max-w-[520px] drop-shadow-[0_32px_90px_rgba(47,133,255,0.34)]"
                height={560}
                priority
                src="/assets/brand/night-killers-crest.png"
                width={560}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <Reveal className="panel p-6 sm:p-8">
              <SectionHeading
                description={homePageCopy.intro.description}
                eyebrow={homePageCopy.intro.eyebrow}
                title={homePageCopy.intro.title}
              />
            </Reveal>

            <div className="grid gap-4">
              {homePageCopy.intro.paragraphs.map((paragraph, index) => (
                <Reveal
                  className="panel p-6 sm:p-8"
                  delay={index * 0.07}
                  key={paragraph}
                >
                  <p className="read-copy text-base leading-8 text-slate-300">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description={homePageCopy.stats.description}
          eyebrow={homePageCopy.stats.eyebrow}
          title={homePageCopy.stats.title}
        />
        <div className="mt-10">
          <StatGrid stats={clanStats} />
        </div>
      </section>

      <SectionDivider />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description={homePageCopy.features.description}
          eyebrow={homePageCopy.features.eyebrow}
          title={homePageCopy.features.title}
        />
        <div className="mt-10">
          <FeatureGrid features={featureCards} />
        </div>
      </section>

      <SectionDivider />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <Reveal className="panel panel-strong flex h-full min-h-[520px] flex-col p-6 sm:p-8">
            <SectionHeading
              description={homePageCopy.discord.description}
              eyebrow={homePageCopy.discord.eyebrow}
              title={homePageCopy.discord.title}
            />

            <div className="mt-8 grid gap-3">
              {homePageCopy.discord.bullets.map((bullet) => (
                <div
                  className="ui-copy rounded-3xl border border-white/10 bg-slate-950/35 px-5 py-4 text-sm leading-7 text-slate-200"
                  key={bullet}
                >
                  {bullet}
                </div>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <ButtonLink external href={siteConfig.discordUrl}>
                {homePageCopy.discord.primaryCtaLabel}
              </ButtonLink>
              <ButtonLink
                external
                href={siteConfig.runePixelsUrl}
                variant="secondary"
              >
                {homePageCopy.discord.secondaryCtaLabel}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal
            className="panel flex h-full min-h-[520px] overflow-hidden p-3 sm:p-4"
            delay={0.08}
          >
            <div className="flex-1 overflow-hidden rounded-[24px] border border-white/8 bg-slate-950/90">
              <iframe
                className="h-full min-h-[520px] w-full"
                frameBorder={0}
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                src={siteConfig.discordWidgetUrl}
                title="Night Killers Discord widget"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            description={homePageCopy.leadership.description}
            eyebrow={homePageCopy.leadership.eyebrow}
            title={homePageCopy.leadership.title}
          />
          <ButtonLink href="/members" variant="secondary">
            {homePageCopy.leadership.ctaLabel}
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {leadership.map((member, index) => (
            <MemberCard index={index} key={member.username} member={member} />
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            description={homeAchievementsPreviewCopy.description}
            eyebrow={homeAchievementsPreviewCopy.eyebrow}
            title={homeAchievementsPreviewCopy.title}
          />
          <ButtonLink href="/achievements" variant="secondary">
            {homeAchievementsPreviewCopy.ctaLabel}
          </ButtonLink>
        </div>

        {recentAchievements === null ? (
          <Reveal className="panel panel-strong mt-10 p-6 sm:p-8">
            <h3 className="ui-copy text-xl font-semibold tracking-[0.05em] text-white">
              {homeAchievementsPreviewCopy.fallbackTitle}
            </h3>
            <p className="read-copy mt-4 max-w-3xl text-base leading-8 text-slate-300">
              {homeAchievementsPreviewCopy.fallbackDescription}
            </p>
            <div className="mt-6">
              <ButtonLink external href={siteConfig.womGroupUrl} variant="secondary">
                Open Wise Old Man
              </ButtonLink>
            </div>
          </Reveal>
        ) : recentAchievements.length === 0 ? (
          <Reveal className="panel mt-10 p-6 sm:p-8">
            <h3 className="ui-copy text-xl font-semibold tracking-[0.05em] text-white">
              {homeAchievementsPreviewCopy.emptyTitle}
            </h3>
            <p className="read-copy mt-4 max-w-3xl text-base leading-8 text-slate-300">
              {homeAchievementsPreviewCopy.emptyDescription}
            </p>
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-5 xl:grid-cols-3">
            {recentAchievements.map((achievement, index) => (
              <Reveal
                className="panel h-full p-6"
                delay={index * 0.06}
                key={`${achievement.playerId}-${achievement.name}-${achievement.createdAt}`}
              >
                <p className="ui-copy text-sm uppercase tracking-[0.18em] text-sky-200/75">
                  {formatDateLabel(achievement.createdAt)}
                </p>
                <h3 className="ui-copy mt-4 text-xl font-semibold tracking-[0.05em] text-white">
                  {achievement.name}
                </h3>
                <p className="read-copy mt-4 text-sm leading-7 text-slate-300">
                  {achievement.player.displayName} added this milestone to the clan record.
                </p>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <SectionDivider />

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-2 sm:px-6 lg:px-8">
        <Reveal className="panel panel-strong relative overflow-hidden px-6 py-8 sm:px-8">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(47,133,255,0.18),transparent_60%)] lg:block" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="eyebrow ui-copy">{homePageCopy.finalCta.eyebrow}</span>
              <h2 className="ui-copy mt-5 text-3xl font-semibold tracking-[0.08em] text-white sm:text-4xl">
                {homePageCopy.finalCta.title}
              </h2>
              <p className="read-copy mt-5 max-w-2xl text-base leading-8 text-slate-300">
                {homePageCopy.finalCta.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink external href={siteConfig.discordUrl}>
                {homePageCopy.finalCta.primaryCtaLabel}
              </ButtonLink>
              <ButtonLink
                external
                href={siteConfig.runePixelsUrl}
                variant="ghost"
              >
                {homePageCopy.finalCta.secondaryCtaLabel}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
