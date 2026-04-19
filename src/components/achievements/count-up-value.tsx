"use client";

import { useEffect, useState } from "react";

import { formatCompact, formatDecimal, formatInteger } from "@/lib/format";

type CountUpValueProps = {
  value: number;
  format?: "integer" | "compact" | "decimal";
  durationMs?: number;
};

function formatValue(value: number, format: NonNullable<CountUpValueProps["format"]>) {
  if (format === "compact") {
    return formatCompact(value);
  }

  if (format === "decimal") {
    return formatDecimal(value);
  }

  return formatInteger(value);
}

export function CountUpValue({
  value,
  format = "integer",
  durationMs = 900
}: CountUpValueProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    let frameId = 0;
    let startTime = 0;

    const tick = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [durationMs, value]);

  return <>{formatValue(displayValue, format)}</>;
}
