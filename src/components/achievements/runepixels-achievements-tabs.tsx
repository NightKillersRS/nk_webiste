"use client";

import { Activity, Sparkles, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { RunepixelsBoardItem } from "@/types/runepixels";

type RunepixelsAchievementsTabsProps = {
  activityItems: RunepixelsBoardItem[] | null;
  progressItems: RunepixelsBoardItem[] | null;
  milestoneItems: RunepixelsBoardItem[] | null;
  clanUrl: string;
  labels: {
    activity: string;
    progress: string;
    milestones: string;
    fallbackTitle: string;
    fallbackDescription: string;
    emptyTitle: string;
    emptyDescription: string;
  };
};

type TabKey = "activity" | "progress" | "milestones";

const tabConfig: Record<
  TabKey,
  {
    icon: typeof Activity;
  }
> = {
  activity: {
    icon: Activity
  },
  progress: {
    icon: TrendingUp
  },
  milestones: {
    icon: Sparkles
  }
};

const accentClasses: Record<RunepixelsBoardItem["accent"], string> = {
  sky: "border-sky-300/18 bg-sky-400/[0.12] text-sky-100",
  amber: "border-orange-300/18 bg-orange-400/[0.12] text-orange-100",
  emerald: "border-emerald-300/18 bg-emerald-400/[0.12] text-emerald-100"
};

export function RunepixelsAchievementsTabs({
  activityItems,
  progressItems,
  milestoneItems,
  clanUrl,
  labels
}: RunepixelsAchievementsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("activity");

  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: "activity", label: labels.activity },
    { key: "progress", label: labels.progress },
    { key: "milestones", label: labels.milestones }
  ];

  const activeItems = getActiveItems(
    activeTab,
    activityItems,
    progressItems,
    milestoneItems
  );

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
                  layoutId="runepixels-tab-pill"
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
          {activeItems === null ? (
            <FallbackCard
              clanUrl={clanUrl}
              description={labels.fallbackDescription}
              title={labels.fallbackTitle}
            />
          ) : activeItems.length === 0 ? (
            <EmptyCard
              description={labels.emptyDescription}
              title={labels.emptyTitle}
            />
          ) : (
            activeItems.map((item) => {
              const Icon = tabConfig[activeTab].icon;

              return (
                <article className="panel h-full p-5 sm:p-6" key={item.id}>
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border ${accentClasses[item.accent]}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="ui-copy mt-5 text-xs uppercase tracking-[0.18em] text-sky-200/75">
                    {item.eyebrow}
                  </p>
                  <h3 className="ui-copy mt-3 text-lg font-semibold tracking-[0.05em] text-white">
                    {item.title}
                  </h3>
                  <p className="read-copy mt-3 text-sm leading-7 text-slate-300">
                    {item.description}
                  </p>
                  {item.chips.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.chips.map((chip) => (
                        <span
                          className="ui-copy rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200"
                          key={`${item.id}-${chip}`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              );
            })
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function getActiveItems(
  activeTab: TabKey,
  activityItems: RunepixelsBoardItem[] | null,
  progressItems: RunepixelsBoardItem[] | null,
  milestoneItems: RunepixelsBoardItem[] | null
) {
  if (activeTab === "activity") {
    return activityItems;
  }

  if (activeTab === "progress") {
    return progressItems;
  }

  return milestoneItems;
}

function FallbackCard({
  title,
  description,
  clanUrl
}: {
  title: string;
  description: string;
  clanUrl: string;
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
        href={clanUrl}
        rel="noreferrer"
        target="_blank"
      >
        Open RunePixels
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
