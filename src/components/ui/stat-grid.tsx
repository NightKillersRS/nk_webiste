import type { ClanStat } from "@/types/content";

import { Reveal } from "@/components/ui/reveal";

type StatGridProps = {
  stats: ClanStat[];
};

export function StatGrid({ stats }: StatGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat, index) => (
        <Reveal className="panel p-6 sm:p-7" delay={index * 0.06} key={stat.label}>
          <div className="ui-copy text-3xl font-semibold tracking-[0.08em] text-white sm:text-4xl">
            {stat.value}
          </div>
          <div className="ui-copy mt-3 text-sm uppercase tracking-[0.22em] text-sky-200/75">
            {stat.label}
          </div>
          {stat.note ? (
            <p className="ui-copy mt-4 text-sm leading-7 text-slate-300">{stat.note}</p>
          ) : null}
        </Reveal>
      ))}
    </div>
  );
}
