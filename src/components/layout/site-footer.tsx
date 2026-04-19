import Link from "next/link";

import { LogoMark } from "@/components/ui/logo-mark";
import { SocialIconLink } from "@/components/ui/social-icon-link";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="pb-8 pt-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="panel px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <LogoMark compact />
              <div>
                <div className="ui-copy text-sm font-semibold uppercase tracking-[0.18em] text-white">
                  {siteConfig.clanName}
                </div>
                <p className="ui-copy mt-1 text-xs leading-6 text-slate-300">
                  {siteConfig.footerTagline}
                </p>
              </div>
            </div>

            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-200">
              {siteConfig.footerLinks.map((link) =>
                link.external ? (
                  <a
                    className="transition hover:text-sky-200"
                    href={link.href}
                    key={link.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="ui-copy">{link.label}</span>
                  </a>
                ) : (
                  <Link
                    className="transition hover:text-sky-200"
                    href={link.href}
                    key={link.label}
                  >
                    <span className="ui-copy">{link.label}</span>
                  </Link>
                )
              )}
            </nav>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <a
                className="text-sm text-slate-200 transition hover:text-sky-200"
                href={`mailto:${siteConfig.contactEmail}`}
              >
                {siteConfig.contactEmail}
              </a>
              {siteConfig.socialLinks.map((link) =>
                link.iconSrc ? (
                  <SocialIconLink
                    className="h-10 w-10"
                    href={link.href}
                    iconSrc={link.iconSrc}
                    key={link.label}
                    label={link.label}
                  />
                ) : null
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-white/6 pt-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span className="ui-copy">Copyright {new Date().getFullYear()} Night Killers.</span>
            <span className="ui-copy">{siteConfig.footerNote}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
