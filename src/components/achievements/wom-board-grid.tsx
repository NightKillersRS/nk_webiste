import { AchievementMediaBadge } from "@/components/achievements/achievement-media-badge";
import { BoardStateCard } from "@/components/achievements/board-state-card";
import { formatCompact, formatDateLabel, formatInteger } from "@/lib/format";
import { resolveAchievementMetricMedia } from "@/lib/achievement-media";
import type {
  WomAchievement,
  WomBoardKey,
  WomGainedEntry,
  WomHiscoresEntry,
  WomMetricPreset,
  WomPeriodKey,
  WomRecordEntry
} from "@/types/wom";

type WomBoardGridProps = {
  board: WomBoardKey;
  preset: WomMetricPreset;
  period: WomPeriodKey;
  achievements: WomAchievement[] | null;
  gainers: WomGainedEntry[] | null;
  hiscores: WomHiscoresEntry[] | null;
  records: WomRecordEntry[] | null;
  fallbackTitle: string;
  fallbackDescription: string;
  emptyTitle: string;
  emptyDescription: string;
  groupUrl: string;
};

export function WomBoardGrid({
  board,
  preset,
  period,
  achievements,
  gainers,
  hiscores,
  records,
  fallbackTitle,
  fallbackDescription,
  emptyTitle,
  emptyDescription,
  groupUrl
}: WomBoardGridProps) {
  const activeItems = getActiveItems(
    board,
    preset.key,
    achievements,
    gainers,
    hiscores,
    records
  );

  if (activeItems === null) {
    return (
      <BoardStateCard
        ctaHref={groupUrl}
        ctaLabel="Open Wise Old Man"
        description={fallbackDescription}
        external
        title={fallbackTitle}
      />
    );
  }

  if (activeItems.length === 0) {
    return <BoardStateCard description={emptyDescription} title={emptyTitle} />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {board === "achievements"
        ? activeItems.map((entry) => {
            const achievement = entry as WomAchievement;
            const media = resolveAchievementMetricMedia(achievement.metric);

            return (
              <article
                className="panel h-full p-5 sm:p-6"
                key={`${achievement.playerId}-${achievement.name}-${achievement.createdAt}`}
              >
                <AchievementMediaBadge media={media} />
                <p className="ui-copy mt-5 text-xs uppercase tracking-[0.18em] text-sky-200/75">
                  {achievement.player.displayName} • {media.label}
                </p>
                <h3 className="ui-copy mt-3 text-lg font-semibold tracking-[0.05em] text-white">
                  {achievement.name}
                </h3>
                <p className="read-copy mt-3 text-sm leading-7 text-slate-300">
                  Logged on {formatDateLabel(achievement.createdAt)} as a fresh Wise
                  Old Man milestone.
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
          })
        : null}

      {board === "gains"
        ? activeItems.map((entry, index) => {
            const gained = entry as WomGainedEntry;
            const media = resolveAchievementMetricMedia(preset.key);

            return (
              <article
                className="panel h-full p-5 sm:p-6"
                key={`${gained.player.id}-${gained.endDate}-${index}`}
              >
                <AchievementMediaBadge media={media} />
                <p className="ui-copy mt-5 text-xs uppercase tracking-[0.18em] text-sky-200/75">
                  {gained.player.displayName} • {preset.label}
                </p>
                <h3 className="ui-copy mt-3 text-lg font-semibold tracking-[0.05em] text-white">
                  +{formatCompact(gained.data.gained)}
                </h3>
                <p className="read-copy mt-3 text-sm leading-7 text-slate-300">
                  {preset.label} progress logged between {formatDateLabel(gained.startDate)} and{" "}
                  {formatDateLabel(gained.endDate)}.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="ui-copy rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200">
                    {period}
                  </span>
                  <span className="ui-copy rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200">
                    Start {formatCompact(gained.data.start)}
                  </span>
                </div>
              </article>
            );
          })
        : null}

      {board === "hiscores"
        ? activeItems.map((entry) => {
            const hiscore = entry as WomHiscoresEntry;
            const media = resolveAchievementMetricMedia(preset.key);
            const secondaryValue =
              hiscore.data.experience ??
              hiscore.data.kills ??
              hiscore.data.score ??
              0;

            return (
              <article
                className="panel h-full p-5 sm:p-6"
                key={`${hiscore.player.id}-${hiscore.data.rank}`}
              >
                <AchievementMediaBadge media={media} />
                <p className="ui-copy mt-5 text-xs uppercase tracking-[0.18em] text-sky-200/75">
                  Rank {formatInteger(hiscore.data.rank)} • {preset.label}
                </p>
                <h3 className="ui-copy mt-3 text-lg font-semibold tracking-[0.05em] text-white">
                  {hiscore.player.displayName}
                </h3>
                <p className="read-copy mt-3 text-sm leading-7 text-slate-300">
                  {hiscore.data.level
                    ? `${preset.label} level ${formatInteger(hiscore.data.level)} with ${formatCompact(secondaryValue)} tracked.`
                    : `${formatCompact(secondaryValue)} ${preset.category === "pvm" ? "tracked kills" : "tracked value"} on the live hiscores board.`}
                </p>
              </article>
            );
          })
        : null}

      {board === "records"
        ? activeItems.map((entry) => {
            const record = entry as WomRecordEntry;
            const media = resolveAchievementMetricMedia(record.metric);

            return (
              <article
                className="panel h-full p-5 sm:p-6"
                key={`${record.playerId}-${record.metric}-${record.updatedAt}`}
              >
                <AchievementMediaBadge media={media} />
                <p className="ui-copy mt-5 text-xs uppercase tracking-[0.18em] text-sky-200/75">
                  {record.player.displayName} • {record.period}
                </p>
                <h3 className="ui-copy mt-3 text-lg font-semibold tracking-[0.05em] text-white">
                  {formatCompact(record.value)}
                </h3>
                <p className="read-copy mt-3 text-sm leading-7 text-slate-300">
                  Best {preset.label.toLowerCase()} record logged for the selected {period} window on{" "}
                  {formatDateLabel(record.updatedAt)}.
                </p>
              </article>
            );
          })
        : null}
    </div>
  );
}

function getActiveItems(
  board: WomBoardKey,
  metricKey: string,
  achievements: WomAchievement[] | null,
  gainers: WomGainedEntry[] | null,
  hiscores: WomHiscoresEntry[] | null,
  records: WomRecordEntry[] | null
) {
  if (board === "achievements") {
    if (achievements === null) {
      return null;
    }

    return metricKey === "overall"
      ? achievements
      : achievements.filter((entry) => entry.metric === metricKey);
  }

  if (board === "gains") {
    return gainers;
  }

  if (board === "hiscores") {
    return hiscores;
  }

  return records;
}
