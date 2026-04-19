"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderNavLinkProps = {
  href: string;
  label: string;
};

export function HeaderNavLink({
  href,
  label
}: HeaderNavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-3 py-2"
      href={href}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full transition duration-300 ${isActive ? "scale-100 bg-sky-400/[0.12] shadow-[inset_0_0_0_1px_rgba(125,211,252,0.14),0_0_22px_rgba(56,189,248,0.16)]" : "scale-95 bg-sky-400/[0.08] opacity-0 group-hover:scale-100 group-hover:opacity-100"}`}
      />
      <span
        aria-hidden="true"
        className={`absolute bottom-1.5 left-1/2 h-px -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,rgba(125,211,252,0),rgba(125,211,252,0.95),rgba(125,211,252,0))] transition-all duration-300 ${isActive ? "w-[calc(100%-1.25rem)] opacity-100" : "w-0 opacity-0 group-hover:w-[calc(100%-1.25rem)] group-hover:opacity-100"}`}
      />
      <span
        className={`ui-copy relative z-10 text-sm font-medium uppercase tracking-[0.18em] transition duration-300 ${isActive ? "text-sky-100" : "text-slate-200 group-hover:text-sky-100"}`}
      >
        {label}
      </span>
    </Link>
  );
}
