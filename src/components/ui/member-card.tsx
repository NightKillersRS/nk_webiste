import type { MemberProfile } from "@/types/content";

import { Reveal } from "@/components/ui/reveal";

type MemberCardProps = {
  member: MemberProfile;
  index?: number;
};

function getInitials(name: string) {
  return name
    .split(/[\s_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function MemberCard({ member, index = 0 }: MemberCardProps) {
  return (
    <Reveal delay={index * 0.05}>
      <article className="panel group h-full p-6">
        <div className="flex items-start gap-4">
          <div className="ui-copy flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-300/20 bg-[linear-gradient(135deg,rgba(59,143,255,0.25),rgba(9,18,34,0.92))] text-sm font-semibold uppercase tracking-[0.2em] text-sky-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            {getInitials(member.username)}
          </div>
          <div className="min-w-0">
            <h3 className="ui-copy text-xl font-semibold tracking-[0.05em] text-white">
              {member.username}
            </h3>
            <p className="ui-copy mt-1 text-sm uppercase tracking-[0.18em] text-sky-200/70">
              {member.role}
            </p>
          </div>
        </div>
        {member.shortBio ? (
          <p className="read-copy mt-5 text-sm leading-7 text-slate-300">{member.shortBio}</p>
        ) : null}
        {member.specialties?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {member.specialties.map((specialty) => (
              <span
                className="ui-copy rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200"
                key={specialty}
              >
                {specialty}
              </span>
            ))}
          </div>
        ) : null}
      </article>
    </Reveal>
  );
}
