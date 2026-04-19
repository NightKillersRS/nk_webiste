"use client";

import { Award, BarChart3, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { formatCompact, formatDateLabel, formatInteger } from "@/lib/format";
import type {
  WomAchievement,
  WomGainedEntry,
  WomHiscoresEntry
} from "@/types/wom";

type AchievementsTabsProps = {
  achievements: WomAchievement[] | null;
  gainers: WomGainedEntry[] | null;
  topPlayers: WomHiscoresEntry[] | null;
  groupUrl: string;
  labels: {
    achievements: string;
    weeklyGains: string;
    topPlayers: string;
    fallbackTitle: string;
    fallbackDescription: string;
    emptyTitle: string;
    emptyDescription: string;
  };
};

type TabKey = "achievements" | "gainers" | "players";

const tabConfig: Record<
  TabKey,
  {
    icon: typeof Award;
  }
> = {
  achievements: {
    icon: Award
  },
  gainers: {
    icon: TrendingUp
  },
  players: {
    icon: BarChart3
  }
};

export function AchievementsTabs({
  achievements,
  gainers,
  topPlayers,
  groupUrl,
  labels
}: AchievementsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("achievements");

  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: "achievements", label: labels.achievements },
    { key: "gainers", label: labels.weeklyGains },
    { key: "players", label: labels.topPlayers }
  ];

  const activeContent = getActiveContent(activeTab, achievements, gainers, topPlayers);

  return (
    <div className="space-y-6">
      <div className="inline-flex w-full flex-wrap gap-2 rounded-full border border-white/10 bg-slate-950/45 p-2 sm:w-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              className="relative inline-flex min-w-[10rem] items-center justify-center rounded-full px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:text-white"
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              {isActive ? (
                <motion.span
                  className="absolute inset-0 rounded-full border border-sky-300/25 bg-[linear-gradient(135deg,rgba(48,145,255,0.3),rgba(109,194,255,0.12))]"
                  layoutId="achievements-tab-pill"
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
              <span className="relative z-10 ui-copy">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          exit={{ opacity: 0, y: 10 }}
          initial={{ opacity: 0, y: 10 }}
          key={activeTab}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          {activeContent === null ? (
            <FallbackCard
              description={labels.fallbackDescription}
              groupUrl={groupUrl}
              title={labels.fallbackTitle}
            />
          ) : activeContent.length === 0 ? (
            <EmptyCard
              description={labels.emptyDescription}
              title={labels.emptyTitle}
            />
          ) : (
            activeContent.map((entry, index) => {
              const Icon = tabConfig[activeTab].icon;

              if (activeTab === "achievements") {
                const achievement = entry as WomAchievement;

                return (
                  <article className="panel h-full p-5 sm:p-6" key={`${achievement.playerId}-${achievement.name}-${achievement.createdAt}`}>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-300/18 bg-sky-400/[0.12] text-sky-100">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="ui-copy mt-5 text-lg font-semibold tracking-[0.05em] text-white">
                      {achievement.name}
                    </h3>
                    <p className="read-copy mt-3 text-sm leading-7 text-slate-300">
                      {achievement.player.displayName} reached this milestone on {formatDateLabel(achievement.createdAt)}.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="ui-copy rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200">
                        {achievement.measure}
                      </span>
                      <span className="ui-copy rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200">
                        {formatInteger(achievement.threshold)}
                      </span>
                    </div>
                  </article>
                );
              }

              if (activeTab === "gainers") {
                const gainedEntry = entry as WomGainedEntry;

                return (
                  <article className="panel h-full p-5 sm:p-6" key={`${gainedEntry.player.id}-${gainedEntry.endDate}-${index}`}>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-300/18 bg-orange-400/[0.12] text-orange-100">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="ui-copy mt-5 text-lg font-semibold tracking-[0.05em] text-white">
                      {gainedEntry.player.displayName}
                    </h3>
                    <p className="ui-copy mt-3 text-3xl font-semibold tracking-[0.06em] text-white">
                      +{formatCompact(gainedEntry.data.gained)}
                    </p>
                    <p className="read-copy mt-3 text-sm leading-7 text-slate-300">
                      Overall experience gained between {formatDateLabel(gainedEntry.startDate)} and {formatDateLabel(gainedEntry.endDate)}.
                    </p>
                  </article>
                );
              }

              const hiscoreEntry = entry as WomHiscoresEntry;

              return (
                <article className="panel h-full p-5 sm:p-6" key={`${hiscoreEntry.player.id}-${hiscoreEntry.data.rank}`}>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/18 bg-cyan-300/[0.12] text-cyan-100">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="ui-copy mt-5 text-lg font-semibold tracking-[0.05em] text-white">
                    {hiscoreEntry.player.displayName}
                  </h3>
                  <p className="ui-copy mt-3 text-sm uppercase tracking-[0.18em] text-sky-200/75">
                    Rank {formatInteger(hiscoreEntry.data.rank)}
                  </p>
                  <p className="read-copy mt-3 text-sm leading-7 text-slate-300">
                    Total level {formatInteger(hiscoreEntry.data.level ?? 0)} with {formatCompact(hiscoreEntry.data.experience ?? 0)} experience tracked.
                  </p>
                </article>
              );
            })
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function getActiveContent(
  activeTab: TabKey,
  achievements: WomAchievement[] | null,
  gainers: WomGainedEntry[] | null,
  topPlayers: WomHiscoresEntry[] | null
) {
  if (activeTab === "achievements") {
    return achievements;
  }

  if (activeTab === "gainers") {
    return gainers;
  }

  return topPlayers;
}

function FallbackCard({
  title,
  description,
  groupUrl
}: {
  title: string;
  description: string;
  groupUrl: string;
}) {
  return (
    <article className="panel md:col-span-2 xl:col-span-3 p-6 sm:p-8">
      <h3 className="ui-copy text-xl font-semibold tracking-[0.05em] text-white">
        {title}
      </h3>
      <p className="read-copy mt-4 max-w-3xl text-base leading-8 text-slate-300">
        {description}
      </p>
      <a
        className="mt-6 inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
        href={groupUrl}
        rel="noreferrer"
        target="_blank"
      >
        Open Wise Old Man
      </a>
    </article>
  );
}

function EmptyCard({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="panel md:col-span-2 xl:col-span-3 p-6 sm:p-8">
      <h3 className="ui-copy text-xl font-semibold tracking-[0.05em] text-white">
        {title}
      </h3>
      <p className="read-copy mt-4 max-w-3xl text-base leading-8 text-slate-300">
        {description}
      </p>
    </article>
  );
}
