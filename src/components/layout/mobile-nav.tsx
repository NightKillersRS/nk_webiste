"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { SocialIconLink } from "@/components/ui/social-icon-link";
import type { NavLink } from "@/types/content";

type MobileNavProps = {
  links: NavLink[];
  discordUrl: string;
  socialLinks: NavLink[];
};

export function MobileNav({
  links,
  discordUrl,
  socialLinks
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition hover:border-sky-300/35 hover:bg-sky-400/[0.08] md:hidden"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 md:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <button
              aria-label="Close menu overlay"
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              type="button"
            />
            <motion.div
              animate={{ x: 0 }}
              className="absolute right-0 top-0 flex h-full w-[min(88vw,360px)] flex-col border-l border-white/10 bg-[linear-gradient(180deg,rgba(8,15,28,0.98),rgba(3,7,14,0.98))] p-6 shadow-[0_24px_70px_rgba(1,4,10,0.65)]"
              exit={{ x: "100%" }}
              id="mobile-menu"
              initial={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="ui-copy text-sm uppercase tracking-[0.28em] text-sky-200/70">
                  Navigation
                </span>
                <button
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:border-sky-300/35 hover:bg-sky-400/[0.08]"
                    href={link.href}
                    key={link.href}
                    onClick={() => setOpen(false)}
                  >
                    <span className="ui-copy">{link.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <div className="flex gap-3">
                  {socialLinks.map((link) =>
                    link.iconSrc ? (
                      <SocialIconLink
                        className="h-11 w-11"
                        href={link.href}
                        iconSrc={link.iconSrc}
                        key={link.label}
                        label={link.label}
                      />
                    ) : null
                  )}
                </div>
                <ButtonLink external href={discordUrl}>
                  Join Discord
                </ButtonLink>
                <ButtonLink href="/members" variant="secondary">
                  View Members
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
