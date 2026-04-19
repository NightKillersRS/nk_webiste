import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button-link";
import { MemberCard } from "@/components/ui/member-card";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { members } from "@/content/members";
import { membersPageCopy } from "@/content/pages";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Members",
  description: "Meet the Night Killers leadership and core roster."
};

const leadership = members
  .filter((member) => member.isLeadership)
  .sort((left, right) => left.order - right.order);

const roster = members
  .filter((member) => !member.isLeadership)
  .sort((left, right) => left.order - right.order);

export default function MembersPage() {
  return (
    <>
      <PageHero
        actions={
          <>
            <ButtonLink external href={siteConfig.discordUrl}>
              {membersPageCopy.hero.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink external href={siteConfig.runePixelsUrl} variant="secondary">
              {membersPageCopy.hero.secondaryCtaLabel}
            </ButtonLink>
          </>
        }
        description={membersPageCopy.hero.description}
        eyebrow={membersPageCopy.hero.eyebrow}
        title={membersPageCopy.hero.title}
      />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading
          description={membersPageCopy.leadership.description}
          eyebrow={membersPageCopy.leadership.eyebrow}
          title={membersPageCopy.leadership.title}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {leadership.map((member, index) => (
            <MemberCard index={index} key={member.username} member={member} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          description={membersPageCopy.roster.description}
          eyebrow={membersPageCopy.roster.eyebrow}
          title={membersPageCopy.roster.title}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {roster.map((member, index) => (
            <MemberCard index={index} key={member.username} member={member} />
          ))}
        </div>
      </section>
    </>
  );
}
