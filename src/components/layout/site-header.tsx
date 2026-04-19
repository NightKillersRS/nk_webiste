import { HeaderNavLink } from "@/components/layout/header-nav-link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ButtonLink } from "@/components/ui/button-link";
import { LogoMark } from "@/components/ui/logo-mark";
import { SocialIconLink } from "@/components/ui/social-icon-link";
import { siteConfig } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-slate-950/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <LogoMark compact />

        <nav className="hidden items-center gap-2 md:flex">
          {siteConfig.navLinks.map((link) => (
            <HeaderNavLink href={link.href} key={link.href} label={link.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {siteConfig.socialLinks.map((link) =>
            link.iconSrc ? (
              <SocialIconLink
                href={link.href}
                iconSrc={link.iconSrc}
                key={link.label}
                label={link.label}
              />
            ) : null
          )}
          <ButtonLink external href={siteConfig.discordUrl}>
            Join Discord
          </ButtonLink>
        </div>

        <MobileNav
          discordUrl={siteConfig.discordUrl}
          links={siteConfig.navLinks}
          socialLinks={siteConfig.socialLinks}
        />
      </div>
    </header>
  );
}
