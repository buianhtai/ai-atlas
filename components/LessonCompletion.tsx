"use client";

import Link from "next/link";
import { concepts } from "@/lib/concepts";
import { getRecommendedNext, recommendedBefore } from "@/lib/learningPaths";
import { useLearningProgress } from "@/components/useLearningProgress";

export function LessonCompletion({ slug }: { slug: string }) {
  const { completed, completedSet, ready, complete, uncomplete } = useLearningProgress();
  const isDone = completedSet.has(slug);
  const prerequisites = recommendedBefore[slug] ?? [];
  const missing = prerequisites.filter((item) => !completedSet.has(item));
  const nextSlug = getRecommendedNext(isDone ? completed : [...completed, slug]);
  const next = concepts.find((item) => item.slug === nextSlug);

  if (!ready) return <div className="lessonCompletionSkeleton" aria-hidden="true" />;

  return (
    <section className={`lessonCompletion ${isDone ? "isDone" : ""}`} aria-label="Lesson progress">
      <div className="lessonCompletionCopy">
        <span>{isDone ? "Concept understood" : "Finish this concept"}</span>
        <h2>{isDone ? "Nice. Put it on your mental map." : "Can you explain it without looking back?"}</h2>
        <p>
          {missing.length > 0
            ? `Recommended context before this lesson: ${missing.map((item) => concepts.find((concept) => concept.slug === item)?.name ?? item).join(", ")}. You can still continue.`
            : isDone
              ? "Your progress is stored locally on this device. Continue when the mental model feels stable, not just familiar."
              : "Mark it understood only when you can explain the problem, draw the flow, and name one limitation in your own words."}
        </p>
      </div>
      <div className="lessonCompletionActions">
        <button type="button" className="lessonCompleteButton" onClick={() => isDone ? uncomplete(slug) : complete(slug)}>
          {isDone ? "Mark for review" : "Mark as understood ✓"}
        </button>
        {isDone && next && <Link className="lessonNextRecommendation" href={`/learn/${next.slug}`}>Recommended next: {next.name} →</Link>}
        <Link className="lessonPathsLink" href="/paths">View learning paths</Link>
      </div>
    </section>
  );
}
