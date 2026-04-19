import type { Metadata } from "next";

import { CountUpValue } from "@/components/achievements/count-up-value";
import { WomBoardController } from "@/components/achievements/wom-board-controller";
import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/ui/section-divider";
import { SectionHeading } from "@/components/ui/section-heading";
import { achievementsPageCopy } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { buildWomMetricOptions } from "@/lib/achievement-media";
import { formatDateLabel } from "@/lib/format";
import { getWomBoardApiResponse } from "@/lib/wom-board";
import {
  buildGroupSnapshot,
  getGroupDetails,
  getGroupStatistics
} from "@/lib/wom";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Track Night Killers OSRS achievements, gains, records, and top players from Wise Old Man."
};

type AchievementsPageProps = {
  searchParams?: Promise<{
    metric?: string | string[];
    period?: string | string[];
    board?: string | string[];
  }>;
};

export default async function AchievementsPage({
  searchParams
}: AchievementsPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const metric = getSingleValue(resolvedSearchParams.metric);
  const period = getSingleValue(resolvedSearchParams.period);
  const board = getSingleValue(resolvedSearchParams.board);

  const [detailsResult, statisticsResult, initialBoardResponse] =
    await Promise.allSettled([
      getGroupDetails(siteConfig.womGroupId),
      getGroupStatistics(siteConfig.womGroupId),
      getWomBoardApiResponse(siteConfig.womGroupId, {
        metric,
        period,
        board
      })
    ]);

  const details =
    detailsResult.status === "fulfilled" ? detailsResult.value : null;
  const statistics =
    statisticsResult.status === "fulfilled" ? statisticsResult.value : null;
  const boardResponse =
    initialBoardResponse.status === "fulfilled" ? initialBoardResponse.value : null;

  const snapshot =
    details && statistics ? buildGroupSnapshot(details, statistics) : null;

  const snapshotCards = snapshot
    ? [
        {
          label: achievementsPageCopy.snapshot.labels.members,
          value: snapshot.memberCount,
          format: "integer" as const
        },
        {
          label: achievementsPageCopy.snapshot.labels.totalXp,
          value: snapshot.totalXp,
          format: "compact" as const
        },
        {
          label: achievementsPageCopy.snapshot.labels.totalEhp,
          value: snapshot.totalEhp,
          format: "decimal" as const
        },
        {
          label: achievementsPageCopy.snapshot.labels.totalEhb,
          value: snapshot.totalEhb,
          format: "decimal" as const
        },
        {
          label: achievementsPageCopy.snapshot.labels.averageLevel,
          value: snapshot.averageTotalLevel,
          format: "integer" as const
        },
        {
          label: achievementsPageCopy.snapshot.labels.maxedCombat,
          value: snapshot.maxedCombatCount,
          format: "integer" as const
        }
      ]
    : [];

  return (
    <>
      <PageHero
        actions={
          <>
            <ButtonLink external href={siteConfig.womGroupUrl}>
              {achievementsPageCopy.hero.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink href="/achievements/rs3" variant="secondary">
              {achievementsPageCopy.hero.secondaryCtaLabel}
            </ButtonLink>
          </>
        }
        description={achievementsPageCopy.hero.description}
        eyebrow={achievementsPageCopy.hero.eyebrow}
        title={achievementsPageCopy.hero.title}
      />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Reveal className="panel panel-strong p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              description={achievementsPageCopy.snapshot.description}
              eyebrow={achievementsPageCopy.snapshot.eyebrow}
              title={achievementsPageCopy.snapshot.title}
            />
            <ButtonLink external href={siteConfig.womGroupUrl} variant="secondary">
              {achievementsPageCopy.snapshot.ctaLabel}
            </ButtonLink>
          </div>

          {snapshot ? (
            <>
              <p className="read-copy mt-6 max-w-4xl text-sm leading-7 text-slate-300">
                {snapshot.description || achievementsPageCopy.snapshot.statusNote}
              </p>
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
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <MetaCard
                  label={achievementsPageCopy.snapshot.labels.verified}
                  value={snapshot.verified ? "Yes" : "No"}
                />
                <MetaCard
                  label={achievementsPageCopy.snapshot.labels.homeworld}
                  value={snapshot.homeworld ? `World ${snapshot.homeworld}` : "Not set"}
                />
                <MetaCard
                  label={achievementsPageCopy.snapshot.labels.updated}
                  value={formatDateLabel(snapshot.updatedAt)}
                />
              </div>
            </>
          ) : (
            <div className="mt-8 rounded-[24px] border border-white/10 bg-slate-950/35 px-6 py-6">
              <h3 className="ui-copy text-lg font-semibold tracking-[0.05em] text-white">
                {achievementsPageCopy.tabs.fallbackTitle}
              </h3>
              <p className="read-copy mt-4 max-w-3xl text-base leading-8 text-slate-300">
                {achievementsPageCopy.tabs.fallbackDescription}
              </p>
            </div>
          )}
        </Reveal>
      </section>

      <SectionDivider />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <SectionHeading
          description={achievementsPageCopy.tabs.description}
          eyebrow={achievementsPageCopy.tabs.eyebrow}
          title={achievementsPageCopy.tabs.title}
        />

        <div className="mt-8">
          <WomBoardController
            groupUrl={siteConfig.womGroupUrl}
            initialResponse={
              boardResponse ?? {
                selection: {
                  metric: "overall",
                  period: "week",
                  board: "achievements"
                },
                metricOptions: buildWomMetricOptions([]),
                items: null
              }
            }
            labels={{
              filters: achievementsPageCopy.tabs.filters,
              fallbackTitle: achievementsPageCopy.tabs.fallbackTitle,
              fallbackDescription: achievementsPageCopy.tabs.fallbackDescription,
              emptyTitle: achievementsPageCopy.tabs.emptyTitle,
              emptyDescription: achievementsPageCopy.tabs.emptyDescription
            }}
          />
        </div>
      </section>
    </>
  );
}

function MetaCard({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/35 px-5 py-5">
      <div className="ui-copy text-sm uppercase tracking-[0.2em] text-sky-200/75">
        {label}
      </div>
      <div className="ui-copy mt-4 text-xl font-semibold tracking-[0.06em] text-white sm:text-2xl">
        {value}
      </div>
    </div>
  );
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
