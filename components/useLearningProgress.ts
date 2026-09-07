"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ai-atlas.progress.v1";

function readProgress() {
  if (typeof window === "undefined") return [] as string[];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function useLearningProgress() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCompleted(readProgress());
    setReady(true);
  }, []);

  const persist = useCallback((next: string[]) => {
    const unique = Array.from(new Set(next));
    setCompleted(unique);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
  }, []);

  const complete = useCallback((slug: string) => {
    persist([...readProgress(), slug]);
  }, [persist]);

  const uncomplete = useCallback((slug: string) => {
    persist(readProgress().filter((item) => item !== slug));
  }, [persist]);

  const reset = useCallback(() => persist([]), [persist]);
  const completedSet = useMemo(() => new Set(completed), [completed]);

  return { completed, completedSet, ready, complete, uncomplete, reset };
}
