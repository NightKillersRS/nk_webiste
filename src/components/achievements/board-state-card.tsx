type BoardStateCardProps = {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
  external?: boolean;
};

export function BoardStateCard({
  title,
  description,
  ctaHref,
  ctaLabel,
  external
}: BoardStateCardProps) {
  return (
    <article className="panel p-6 sm:p-8">
      <h3 className="ui-copy text-xl font-semibold tracking-[0.05em] text-white">
        {title}
      </h3>
      <p className="read-copy mt-4 max-w-3xl text-base leading-8 text-slate-300">
        {description}
      </p>
      {ctaHref && ctaLabel ? (
        <a
          className="mt-6 inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
          href={ctaHref}
          rel={external ? "noreferrer" : undefined}
          target={external ? "_blank" : undefined}
        >
          {ctaLabel}
        </a>
      ) : null}
    </article>
  );
}
