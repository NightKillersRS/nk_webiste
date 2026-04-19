import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions
}: PageHeroProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8 lg:pt-16">
      <Reveal className="panel panel-strong relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(54,143,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,100,46,0.08),transparent_22%)]" />
        <div className="relative z-10 max-w-3xl">
          <span className="eyebrow ui-copy">{eyebrow}</span>
          <h1 className="ui-copy mt-5 text-4xl font-semibold tracking-[0.08em] text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="read-copy mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            {description}
          </p>
          {actions ? (
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
