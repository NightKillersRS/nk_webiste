import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

const variantClasses: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary:
    "bg-[linear-gradient(135deg,#3091ff,#6dc2ff)] text-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_12px_34px_rgba(47,133,255,0.32)] hover:-translate-y-0.5 hover:brightness-110",
  secondary:
    "border border-white/12 bg-white/[0.04] text-white hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]",
  ghost:
    "border border-white/10 bg-transparent text-slate-200 hover:-translate-y-0.5 hover:border-sky-300/40 hover:bg-sky-400/[0.08]"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  external
}: ButtonLinkProps) {
  const classes =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition duration-300 " +
    variantClasses[variant] +
    (className ? ` ${className}` : "");

  const shouldOpenExternally =
    external ?? (href.startsWith("http") || href.startsWith("mailto:"));

  if (shouldOpenExternally) {
    return (
      <a
        className={classes}
        href={href}
        rel="noreferrer"
        target={href.startsWith("mailto:") ? undefined : "_blank"}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
