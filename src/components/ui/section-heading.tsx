type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = ""
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow ? <span className="eyebrow ui-copy">{eyebrow}</span> : null}
      <h2 className="ui-copy mt-4 text-3xl font-semibold tracking-[0.08em] text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="read-copy mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
