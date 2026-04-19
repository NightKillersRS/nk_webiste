import { AchievementMediaBadge } from "@/components/achievements/achievement-media-badge";
import { BoardStateCard } from "@/components/achievements/board-state-card";
import type {
  RunePixelsFeaturedEntry,
  RunepixelsBoardItem
} from "@/types/runepixels";

type RunepixelsFeedGridProps = {
  items: RunepixelsBoardItem[] | null;
  clanUrl: string;
  fallbackTitle: string;
  fallbackDescription: string;
  emptyTitle: string;
  emptyDescription: string;
};

export function RunepixelsFeedGrid({
  items,
  clanUrl,
  fallbackTitle,
  fallbackDescription,
  emptyTitle,
  emptyDescription
}: RunepixelsFeedGridProps) {
  if (items === null) {
    return (
      <BoardStateCard
        ctaHref={clanUrl}
        ctaLabel="Open RunePixels"
        description={fallbackDescription}
        external
        title={fallbackTitle}
      />
    );
  }

  if (items.length === 0) {
    return <BoardStateCard description={emptyDescription} title={emptyTitle} />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article className="panel h-full p-5 sm:p-6" key={item.id}>
          <AchievementMediaBadge media={item.media} />
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
      ))}
    </div>
  );
}

export function RunepixelsFeaturedGrid({
  items
}: {
  items: RunePixelsFeaturedEntry[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item) => (
        <article
          className="panel panel-strong h-full overflow-hidden p-6 sm:p-7"
          key={item.id}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <AchievementMediaBadge media={item.media} size="md" />
            <div className="min-w-0 flex-1">
              <p className="ui-copy text-xs uppercase tracking-[0.18em] text-sky-200/75">
                Featured highlight • {item.eyebrow}
              </p>
              <h3 className="ui-copy mt-3 text-xl font-semibold tracking-[0.05em] text-white">
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
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
