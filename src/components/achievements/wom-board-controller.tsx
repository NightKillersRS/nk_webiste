"use client";

import { LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { SearchableSelect } from "@/components/achievements/searchable-select";
import { WomBoardGrid } from "@/components/achievements/wom-board-grid";
import {
  resolveAchievementMetricMedia,
  womBoardOptions,
  womPeriodOptions
} from "@/lib/achievement-media";
import type {
  WomAchievement,
  WomBoardApiResponse,
  WomBoardKey,
  WomGainedEntry,
  WomHiscoresEntry,
  WomPeriodKey,
  WomRecordEntry
} from "@/types/wom";

type WomBoardControllerProps = {
  initialResponse: WomBoardApiResponse;
  groupUrl: string;
  labels: {
    filters: {
      metricLabel: string;
      periodLabel: string;
      boardLabel: string;
    };
    fallbackTitle: string;
    fallbackDescription: string;
    emptyTitle: string;
    emptyDescription: string;
  };
};

export function WomBoardController({
  initialResponse,
  groupUrl,
  labels
}: WomBoardControllerProps) {
  const [response, setResponse] = useState(initialResponse);
  const [selection, setSelection] = useState(initialResponse.selection);
  const [contentKey, setContentKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const responseCacheRef = useRef(new Map<string, WomBoardApiResponse>());
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    responseCacheRef.current.set(
      serializeWomSelection(initialResponse.selection),
      initialResponse
    );
    setResponse(initialResponse);
    setSelection(initialResponse.selection);
  }, [initialResponse]);

  const preset = useMemo(() => {
    const option =
      response.metricOptions.find(
        (entry) => entry.value === response.selection.metric
      ) ?? response.metricOptions[0];

    return {
      key: option?.value ?? "overall",
      label: option?.label ?? "Overall",
      shortLabel: option?.shortLabel ?? "Overall",
      media: option?.media ?? resolveAchievementMetricMedia("overall"),
      accent: option?.media?.accent ?? "sky",
      category: option?.category ?? "combat",
      supports: ["achievements", "gains", "hiscores", "records"] as WomBoardKey[]
    };
  }, [response.metricOptions, response.selection.metric]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    if (!contentRef.current || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setContentHeight(Math.ceil(entry.contentRect.height));
    });

    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, [contentKey, response.selection.board]);

  function handleMetricChange(metric: string) {
    const nextSelection = {
      ...selection,
      metric
    };

    applySelection(nextSelection);
  }

  function handlePeriodChange(period: string) {
    const nextSelection = {
      ...selection,
      period: period as WomPeriodKey
    };

    applySelection(nextSelection);
  }

  function handleBoardChange(board: string) {
    const nextSelection = {
      ...selection,
      board: board as WomBoardKey
    };

    applySelection(nextSelection);
  }

  function applySelection(nextSelection: typeof selection) {
    if (
      nextSelection.metric === selection.metric &&
      nextSelection.period === selection.period &&
      nextSelection.board === selection.board
    ) {
      return;
    }

    setSelection(nextSelection);
    replaceWomUrl(nextSelection);

    const cacheKey = serializeWomSelection(nextSelection);
    const cachedResponse = responseCacheRef.current.get(cacheKey);

    if (cachedResponse) {
      abortRef.current?.abort();
      setIsLoading(false);
      setResponse(cachedResponse);
      setSelection(cachedResponse.selection);
      setContentKey((value) => value + 1);
      return;
    }

    loadResponse(nextSelection, true, cacheKey);
  }

  function loadResponse(
    nextSelection: typeof selection,
    optimistic: boolean,
    cacheKey = serializeWomSelection(nextSelection)
  ) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setIsLoading(true);

    void (async () => {
      try {
        const query = new URLSearchParams({
          metric: nextSelection.metric,
          period: nextSelection.period,
          board: nextSelection.board
        });

        const apiResponse = await fetch(`/api/boards/wom?${query.toString()}`, {
          signal: controller.signal
        });

        if (!apiResponse.ok) {
          throw new Error(`WOM board request failed: ${apiResponse.status}`);
        }

        const data = (await apiResponse.json()) as WomBoardApiResponse;

        if (!controller.signal.aborted) {
          responseCacheRef.current.set(cacheKey, data);
          setResponse(data);
          setSelection(data.selection);
          setContentKey((value) => value + 1);
        }
      } catch {
        if (!controller.signal.aborted && optimistic) {
          setResponse((current) => ({
            ...current,
            selection: nextSelection,
            items: null
          }));
          setContentKey((value) => value + 1);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    })();
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr_0.85fr]">
        <SearchableSelect
          label={labels.filters.metricLabel}
          onChange={handleMetricChange}
          options={response.metricOptions.map((option) => ({
            value: option.value,
            label: option.label,
            media: option.media
          }))}
          value={selection.metric}
        />
        <SearchableSelect
          label={labels.filters.boardLabel}
          onChange={handleBoardChange}
          options={womBoardOptions.map((option) => ({
            value: option.key,
            label: option.label
          }))}
          value={selection.board}
        />
        <SearchableSelect
          label={labels.filters.periodLabel}
          onChange={handlePeriodChange}
          options={womPeriodOptions.map((option) => ({
            value: option.key,
            label: option.label
          }))}
          value={selection.period}
        />
      </div>

      <div
        className="relative min-h-[26rem]"
        style={contentHeight ? { minHeight: `${contentHeight}px` } : undefined}
      >
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="pointer-events-none absolute right-0 top-0 z-10"
              exit={{ opacity: 0, y: -8 }}
              initial={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/88 px-4 py-2 text-xs uppercase tracking-[0.18em] text-sky-100 shadow-[0_16px_40px_rgba(3,7,18,0.35)]">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Updating board
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: isLoading ? 0.58 : 1, y: 0 }}
            className="transition-opacity duration-200"
            exit={{ opacity: 0, y: 10 }}
            initial={{ opacity: 0, y: 10 }}
            key={`${response.selection.metric}-${response.selection.period}-${response.selection.board}-${contentKey}`}
            ref={contentRef}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <WomBoardGrid
              achievements={
                response.selection.board === "achievements"
                  ? (response.items as WomAchievement[] | null)
                  : null
              }
              board={response.selection.board}
              emptyDescription={labels.emptyDescription}
              emptyTitle={labels.emptyTitle}
              fallbackDescription={labels.fallbackDescription}
              fallbackTitle={labels.fallbackTitle}
              gainers={
                response.selection.board === "gains"
                  ? (response.items as WomGainedEntry[] | null)
                  : null
              }
              groupUrl={groupUrl}
              hiscores={
                response.selection.board === "hiscores"
                  ? (response.items as WomHiscoresEntry[] | null)
                  : null
              }
              period={response.selection.period}
              preset={preset}
              records={
                response.selection.board === "records"
                  ? (response.items as WomRecordEntry[] | null)
                  : null
              }
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function replaceWomUrl(selection: {
  metric: string;
  period: WomPeriodKey;
  board: WomBoardKey;
}) {
  const params = new URLSearchParams({
    metric: selection.metric,
    period: selection.period,
    board: selection.board
  });

  window.history.replaceState(null, "", `/achievements?${params.toString()}`);
}

function serializeWomSelection(selection: {
  metric: string;
  period: WomPeriodKey;
  board: WomBoardKey;
}) {
  return `${selection.metric}::${selection.period}::${selection.board}`;
}
