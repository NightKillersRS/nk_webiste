"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { AchievementMediaConfig } from "@/types/achievement-media";

type AchievementMediaBadgeProps = {
  media: AchievementMediaConfig;
  size?: "sm" | "md";
};

const accentClasses: Record<AchievementMediaConfig["accent"], string> = {
  sky: "border-sky-300/20 bg-sky-400/[0.12]",
  amber: "border-orange-300/20 bg-orange-400/[0.12]",
  emerald: "border-emerald-300/20 bg-emerald-400/[0.12]"
};

const sizeClasses = {
  sm: "h-12 w-12 rounded-2xl",
  md: "h-14 w-14 rounded-[20px]"
};

export function AchievementMediaBadge({
  media,
  size = "md"
}: AchievementMediaBadgeProps) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [media.remoteIconSrc, media.fallbackIconSrc]);

  const src =
    !imageFailed && media.remoteIconSrc ? media.remoteIconSrc : media.fallbackIconSrc;

  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden border ${accentClasses[media.accent]} ${sizeClasses[size]}`}
      title={media.label}
    >
      <Image
        alt={media.label}
        className="h-full w-full object-cover"
        height={56}
        onError={() => setImageFailed(true)}
        src={src}
        width={56}
      />
    </div>
  );
}
