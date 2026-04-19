import type { Metadata } from "next";

import { CountUpValue } from "@/components/achievements/count-up-value";
import { Rs3BoardController } from "@/components/achievements/rs3-board-controller";
import {
  RunepixelsFeaturedGrid
} from "@/components/achievements/runepixels-feed-grid";
import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/ui/section-divider";
import { SectionHeading } from "@/components/ui/section-heading";
import { rs3AchievementsPageCopy } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { formatDateLabel } from "@/lib/format";
import {
  buildRs3BoardApiResponseFromDashboard,
  getRs3DashboardData
} from "@/lib/rs3-board";

export const metadata: Metadata = {
  title: "RS3 Boards",
  description:
    "Track Night Killers RS3 activity, featured drops, milestones, and clan honors from RunePixels."
};

type Rs3AchievementsPageProps = {
  searchParams?: Promise<{
    feed?: string | string[];
    range?: string | string[];
    subject?: string | string[];
  }>;
};

export default async function Rs3AchievementsPage({
  searchParams
}: Rs3AchievementsPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const feed = getSingleValue(resolvedSearchParams.feed);
  const range = getSingleValue(resolvedSearchParams.range);
  const subject = getSingleValue(resolvedSearchParams.subject);

  const dashboardResult = await Promise.allSettled([
    getRs3DashboardData(siteConfig.runepixelsClanSlug)
  ]);
  const dashboard =
    dashboardResult[0]?.status === "fulfilled" ? dashboardResult[0].value : null;
  const boardResponse = dashboard
    ? buildRs3BoardApiResponseFromDashboard(dashboard, {
        feed,
        range,
        subject
      })
    : null;
  const snapshot = dashboard?.snapshot ?? null;
  const honors = dashboard?.honors ?? [];
  const featuredEntries = dashboard?.featuredEntries ?? [];

  const snapshotCards = snapshot
    ? [
        {
          label: rs3AchievementsPageCopy.snapshot.labels.members,
          value: snapshot.memberCount,
          format: "integer" as const
        },
        {
          label: rs3AchievementsPageCopy.snapshot.labels.totalXp,
          value: snapshot.totalXp,
          format: "compact" as const
        },
        {
          label: rs3AchievementsPageCopy.snapshot.labels.averageLevel,
          value: snapshot.averageTotalLevel,
          format: "integer" as const
        },
        {
          label: rs3AchievementsPageCopy.snapshot.labels.killDeathRatio,
          value: snapshot.killDeathRatio,
          format: "decimal" as const
        },
        {
          label: rs3AchievementsPageCopy.snapshot.labels.citadelLevel,
          value: snapshot.citadelLevel,
          format: "integer" as const
        }
      ]
    : [];

  return (
    <>
      <PageHero
        actions={
          <>
            <ButtonLink external href={siteConfig.runePixelsUrl}>
              {rs3AchievementsPageCopy.hero.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink href="/achievements" variant="secondary">
              {rs3AchievementsPageCopy.hero.secondaryCtaLabel}
            </ButtonLink>
          </>
        }
        description={rs3AchievementsPageCopy.hero.description}
        eyebrow={rs3AchievementsPageCopy.hero.eyebrow}
        title={rs3AchievementsPageCopy.hero.title}
      />

      <section className="mx-auto max-w-7xl px-4 pb-2 sm:px-6 lg:px-8">
        <p className="read-copy panel px-5 py-4 text-sm leading-7 text-slate-300">
          {rs3AchievementsPageCopy.hero.sourceNote}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Reveal className="panel panel-strong p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              description={rs3AchievementsPageCopy.snapshot.description}
              eyebrow={rs3AchievementsPageCopy.snapshot.eyebrow}
              title={rs3AchievementsPageCopy.snapshot.title}
            />
            <ButtonLink external href={siteConfig.runePixelsUrl} variant="secondary">
              {rs3AchievementsPageCopy.snapshot.ctaLabel}
            </ButtonLink>
          </div>

          {snapshot ? (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {snapshotCards.map((card) => (
                  <div
                    className="rounded-[24px] border border-white/10 bg-slate-950/35 px-5 py-5"
                    key={card.label}
                  >
                    <div className="ui-copy text-sm uppercase tracking-[0.2em] text-sky-200/75">
                      {card.label}
                    </div>
                    <div className="ui-copy mt-4 text-3xl font-semibold tracking-[0.08em] text-white sm:text-4xl">
                      <CountUpValue format={card.format} value={card.value} />
                    </div>
                  </div>
                ))}
                <div className="rounded-[24px] border border-white/10 bg-slate-950/35 px-5 py-5">
                  <div className="ui-copy text-sm uppercase tracking-[0.2em] text-sky-200/75">
                    {rs3AchievementsPageCopy.snapshot.labels.lastTracked}
                  </div>
                  <div className="ui-copy mt-4 text-2xl font-semibold tracking-[0.06em] text-white sm:text-3xl">
                    {formatDateLabel(snapshot.lastTrackedAt)}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-8 rounded-[24px] border border-white/10 bg-slate-950/35 px-6 py-6">
              <h3 className="ui-copy text-lg font-semibold tracking-[0.05em] text-white">
                {rs3AchievementsPageCopy.tabs.fallbackTitle}
              </h3>
              <p className="read-copy mt-4 max-w-3xl text-base leading-8 text-slate-300">
                {rs3AchievementsPageCopy.tabs.fallbackDescription}
              </p>
            </div>
          )}
        </Reveal>
      </section>

      {honors.length > 0 ? (
        <>
          <SectionDivider />
          <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <SectionHeading
              description={rs3AchievementsPageCopy.honors.description}
              eyebrow={rs3AchievementsPageCopy.honors.eyebrow}
              title={rs3AchievementsPageCopy.honors.title}
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {honors.map((entry) => (
                <Reveal className="panel p-5 sm:p-6" key={entry.id}>
                  <p className="ui-copy text-xs uppercase tracking-[0.18em] text-sky-200/75">
                    {entry.note}
                  </p>
                  <h3 className="ui-copy mt-3 text-xl font-semibold tracking-[0.05em] text-white">
                    {entry.name}
                  </h3>
                  <p className="read-copy mt-3 text-sm leading-7 text-slate-300">
                    {entry.rankLabel} in the Night Killers RS3 clan ladder.
                  </p>
                </Reveal>
              ))}
            </div>
          </section>
        </>
      ) : null}

      <SectionDivider />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading
          description={rs3AchievementsPageCopy.tabs.featuredDescription}
          eyebrow={rs3AchievementsPageCopy.tabs.eyebrow}
          title={rs3AchievementsPageCopy.tabs.featuredTitle}
        />
        <div className="mt-8">
          <RunepixelsFeaturedGrid items={featuredEntries} />
        </div>
      </section>

      <SectionDivider />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <SectionHeading
          description={rs3AchievementsPageCopy.tabs.description}
          eyebrow={rs3AchievementsPageCopy.tabs.eyebrow}
          title={rs3AchievementsPageCopy.tabs.title}
        />

        <div className="mt-8">
          <Rs3BoardController
            clanUrl={siteConfig.runePixelsUrl}
            initialResponse={
              boardResponse ?? {
                selection: {
                  feed: "all",
                  range: "latest",
                  subject: null
                },
                subjectOptions: [],
                items: null
              }
            }
            labels={{
              filters: rs3AchievementsPageCopy.tabs.filters,
              fallbackTitle: rs3AchievementsPageCopy.tabs.fallbackTitle,
              fallbackDescription: rs3AchievementsPageCopy.tabs.fallbackDescription,
              emptyTitle: rs3AchievementsPageCopy.tabs.emptyTitle,
              emptyDescription: rs3AchievementsPageCopy.tabs.emptyDescription
            }}
          />
        </div>
      </section>
    </>
  );
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
