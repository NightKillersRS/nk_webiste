import {
  CalendarRange,
  Crown,
  Mail,
  MessageSquare,
  ScrollText,
  Shield,
  Sword,
  Target,
  Trophy,
  Users,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import type { AccentTone, FeatureCard, FeatureIcon } from "@/types/content";

const iconMap: Record<FeatureIcon, LucideIcon> = {
  sword: Sword,
  shield: Shield,
  crown: Crown,
  target: Target,
  users: Users,
  scroll: ScrollText,
  message: MessageSquare,
  mail: Mail,
  calendar: CalendarRange,
  zap: Zap,
  trophy: Trophy
};

const accentMap: Record<AccentTone, string> = {
  blue: "border-sky-400/25 bg-sky-400/12 text-sky-100",
  ice: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
  ember: "border-orange-300/20 bg-orange-400/10 text-orange-100"
};

type FeatureGridProps = {
  features: FeatureCard[];
  columns?: "three" | "four";
};

export function FeatureGrid({
  features,
  columns = "four"
}: FeatureGridProps) {
  const gridClass =
    columns === "three"
      ? "md:grid-cols-2 xl:grid-cols-3"
      : "md:grid-cols-2 xl:grid-cols-4";

  return (
    <div className={`grid gap-5 ${gridClass}`}>
      {features.map((feature, index) => {
        const Icon = iconMap[feature.icon];
        const accent = accentMap[feature.accent ?? "blue"];

        return (
          <Reveal delay={index * 0.06} key={feature.title}>
            <article className="panel group h-full p-6">
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${accent}`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="ui-copy mt-6 text-xl font-semibold tracking-[0.05em] text-white">
                {feature.title}
              </h3>
              <p className="ui-copy mt-3 text-sm leading-7 text-slate-300">
                {feature.description}
              </p>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
