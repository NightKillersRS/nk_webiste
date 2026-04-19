import Link from "next/link";

type BoardFilterGroupProps = {
  label: string;
  options: Array<{
    href: string;
    label: string;
    active: boolean;
  }>;
};

export function BoardFilterGroup({
  label,
  options
}: BoardFilterGroupProps) {
  return (
    <div className="space-y-3">
      <p className="ui-copy text-xs uppercase tracking-[0.22em] text-sky-200/72">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Link
            className={
              "inline-flex min-h-11 items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition duration-300 " +
              (option.active
                ? "border-sky-300/24 bg-[linear-gradient(135deg,rgba(48,145,255,0.28),rgba(109,194,255,0.12))] text-white shadow-[0_10px_24px_rgba(47,133,255,0.18)]"
                : "border-white/10 bg-white/[0.03] text-slate-200 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.06] hover:text-white")
            }
            href={option.href}
            key={option.href}
          >
            <span className="ui-copy">{option.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
