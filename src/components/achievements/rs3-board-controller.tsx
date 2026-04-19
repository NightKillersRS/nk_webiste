"use client";

import { LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { SearchableSelect } from "@/components/achievements/searchable-select";
import { RunepixelsFeedGrid } from "@/components/achievements/runepixels-feed-grid";
import {
  runepixelsFeedOptions,
  runepixelsRangeOptions
} from "@/lib/achievement-media";
import type { Rs3BoardApiResponse, RunePixelsFeedKind } from "@/types/runepixels";

type Rs3BoardControllerProps = {
  initialResponse: Rs3BoardApiResponse;
  clanUrl: string;
  labels: {
    filters: {
      feedLabel: string;
      rangeLabel: string;
      subjectLabel: string;
    };
    fallbackTitle: string;
    fallbackDescription: string;
    emptyTitle: string;
    emptyDescription: string;
  };
};

export function Rs3BoardController({
  initialResponse,
  clanUrl,
  labels
}: Rs3BoardControllerProps) {
  const [response, setResponse] = useState(initialResponse);
  const [selection, setSelection] = useState(initialResponse.selection);
  const [contentKey, setContentKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const responseCacheRef = useRef(new Map<string, Rs3BoardApiResponse>());
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    responseCacheRef.current.set(
      serializeRs3Selection(initialResponse.selection),
      initialResponse
    );
    setResponse(initialResponse);
    setSelection(initialResponse.selection);
  }, [initialResponse]);

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
  }, [contentKey, response.selection.feed, response.selection.subject]);

  function handleFeedChange(feed: string) {
    const nextSelection = {
      ...selection,
      feed: feed as RunePixelsFeedKind,
      subject: null
    };

    applySelection(nextSelection);
  }

  function handleRangeChange(range: string) {
    const nextSelection = {
      ...selection,
      range: range as "latest"
    };

    applySelection(nextSelection);
  }

  function handleSubjectChange(subject: string) {
    const nextSelection = {
      ...selection,
      subject: subject === "all" ? null : subject
    };

    applySelection(nextSelection);
  }

  function applySelection(nextSelection: typeof selection) {
    if (
      nextSelection.feed === selection.feed &&
      nextSelection.range === selection.range &&
      nextSelection.subject === selection.subject
    ) {
      return;
    }

    setSelection(nextSelection);
    replaceRs3Url(nextSelection);

    const cacheKey = serializeRs3Selection(nextSelection);
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
    cacheKey = serializeRs3Selection(nextSelection)
  ) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setIsLoading(true);

    void (async () => {
      try {
        const query = new URLSearchParams({
          feed: nextSelection.feed,
          range: nextSelection.range
        });

        if (nextSelection.subject) {
          query.set("subject", nextSelection.subject);
        }

        const apiResponse = await fetch(`/api/boards/rs3?${query.toString()}`, {
          signal: controller.signal
        });

        if (!apiResponse.ok) {
          throw new Error(`RS3 board request failed: ${apiResponse.status}`);
        }

        const data = (await apiResponse.json()) as Rs3BoardApiResponse;

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
      <div
        className={`grid gap-6 ${response.subjectOptions.length > 0 ? "xl:grid-cols-[1fr_0.8fr_1.05fr]" : "xl:grid-cols-[1.2fr_0.8fr]"}`}
      >
        <SearchableSelect
          label={labels.filters.feedLabel}
          onChange={handleFeedChange}
          options={runepixelsFeedOptions.map((option) => ({
            value: option.key,
            label: option.label
          }))}
          value={selection.feed}
        />
        <SearchableSelect
          label={labels.filters.rangeLabel}
          onChange={handleRangeChange}
          options={runepixelsRangeOptions.map((option) => ({
            value: option.key,
            label: option.label
          }))}
          value={selection.range}
        />
        {response.subjectOptions.length > 0 ? (
          <SearchableSelect
            label={labels.filters.subjectLabel}
            onChange={handleSubjectChange}
            options={response.subjectOptions.map((option) => ({
              value: option.value,
              label: option.label,
              media: option.media
            }))}
            value={selection.subject ?? "all"}
          />
        ) : null}
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
            key={`${response.selection.feed}-${response.selection.range}-${response.selection.subject ?? "all"}-${contentKey}`}
            ref={contentRef}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <RunepixelsFeedGrid
              clanUrl={clanUrl}
              emptyDescription={labels.emptyDescription}
              emptyTitle={labels.emptyTitle}
              fallbackDescription={labels.fallbackDescription}
              fallbackTitle={labels.fallbackTitle}
              items={response.items}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function replaceRs3Url(selection: {
  feed: RunePixelsFeedKind;
  range: "latest";
  subject: string | null;
}) {
  const params = new URLSearchParams({
    feed: selection.feed,
    range: selection.range
  });

  if (selection.subject) {
    params.set("subject", selection.subject);
  }

  window.history.replaceState(
    null,
    "",
    `/achievements/rs3?${params.toString()}`
  );
}

function serializeRs3Selection(selection: {
  feed: RunePixelsFeedKind;
  range: "latest";
  subject: string | null;
}) {
  return `${selection.feed}::${selection.range}::${selection.subject ?? "all"}`;
}
