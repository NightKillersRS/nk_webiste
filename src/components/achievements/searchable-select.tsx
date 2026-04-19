"use client";

import { Check, ChevronDown, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

import { AchievementMediaBadge } from "@/components/achievements/achievement-media-badge";
import type { AchievementMediaConfig } from "@/types/achievement-media";

type SearchableSelectOption = {
  value: string;
  label: string;
  media?: AchievementMediaConfig;
};

type SearchableSelectProps = {
  label: string;
  value: string;
  options: SearchableSelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function SearchableSelect({
  label,
  value,
  options,
  onChange,
  disabled = false
}: SearchableSelectProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0] ?? null;
  const isSearchable = options.length > 8;

  const filteredOptions = useMemo(() => {
    if (!deferredQuery.trim()) {
      return options;
    }

    const normalizedQuery = deferredQuery.toLowerCase();

    return options.filter((option) =>
      option.label.toLowerCase().includes(normalizedQuery)
    );
  }, [deferredQuery, options]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);

    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  return (
    <div className="space-y-3" ref={rootRef}>
      <p className="ui-copy text-xs uppercase tracking-[0.22em] text-sky-200/72">
        {label}
      </p>
      <div className="relative">
        <button
          className="flex min-h-14 w-full items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-slate-950/45 px-4 py-3 text-left text-sm text-slate-100 transition duration-300 hover:border-white/18 hover:bg-white/[0.05] disabled:cursor-default disabled:opacity-60"
          disabled={disabled}
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span className="flex min-w-0 items-center gap-3">
            {selectedOption?.media ? (
              <AchievementMediaBadge media={selectedOption.media} size="sm" />
            ) : null}
            <span className="ui-copy truncate text-sm font-semibold uppercase tracking-[0.14em] text-white">
              {selectedOption?.label ?? "Select"}
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 text-sky-100 transition duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {open ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 right-0 z-30 mt-3 overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,22,39,0.98),rgba(7,12,22,0.98))] shadow-[0_24px_60px_rgba(2,8,20,0.55)] backdrop-blur-xl"
              exit={{ opacity: 0, y: -8 }}
              initial={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {isSearchable ? (
                <div className="border-b border-white/8 px-4 py-3">
                  <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-slate-200">
                    <Search className="h-4 w-4 text-sky-100/80" />
                    <input
                      autoFocus
                      className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder={`Search ${label.toLowerCase()}`}
                      value={query}
                    />
                  </label>
                </div>
              ) : null}

              <div className="max-h-80 overflow-y-auto px-2 py-2">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
                    const isSelected = option.value === value;

                    return (
                      <button
                        className="flex w-full items-center justify-between gap-3 rounded-[18px] px-3 py-3 text-left transition duration-200 hover:bg-white/[0.06]"
                        key={option.value}
                        onClick={() => {
                          setOpen(false);
                          onChange(option.value);
                        }}
                        type="button"
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          {option.media ? (
                            <AchievementMediaBadge media={option.media} size="sm" />
                          ) : null}
                          <span className="ui-copy truncate text-sm font-semibold uppercase tracking-[0.14em] text-white">
                            {option.label}
                          </span>
                        </span>
                        {isSelected ? (
                          <Check className="h-4 w-4 shrink-0 text-sky-100" />
                        ) : null}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3 py-5 text-sm text-slate-400">
                    No matches found.
                  </div>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
