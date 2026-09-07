"use client";

import Link from "next/link";
import { concepts } from "@/lib/concepts";
import { learningPaths } from "@/lib/learningPaths";
import { useLearningProgress } from "@/components/useLearningProgress";

export function LearningPathsClient() {
  const { completed, completedSet, ready, reset } = useLearningProgress();

  return (
    <div className="pathExperience">
      <div className="pathSummary" aria-live="polite">
        <div>
          <span>Your atlas progress</span>
          <strong>{ready ? `${completed.length} / ${concepts.length} concepts understood` : "Loading progress…"}</strong>
        </div>
        {completed.length > 0 && <button type="button" onClick={reset}>Reset progress</button>}
      </div>

      <div className="pathList">
        {learningPaths.map((path, pathIndex) => {
          const done = path.conceptSlugs.filter((slug) => completedSet.has(slug)).length;
          const percent = Math.round((done / path.conceptSlugs.length) * 100);
          const nextSlug = path.conceptSlugs.find((slug) => !completedSet.has(slug));

          return (
            <section className="pathCard" key={path.slug}>
              <header className="pathCardHead">
                <div>
                  <span>Path {String(pathIndex + 1).padStart(2, "0")}</span>
                  <h2>{path.name}</h2>
                  <strong>{path.audience}</strong>
                  <p>{path.description}</p>
                </div>
                <div className="pathPercent" aria-label={`${percent}% complete`}>
                  <b>{percent}%</b>
                  <span>{done}/{path.conceptSlugs.length}</span>
                </div>
              </header>

              <div className="pathRail">
                {path.conceptSlugs.map((slug, index) => {
                  const concept = concepts.find((item) => item.slug === slug)!;
                  const isDone = completedSet.has(slug);
                  return (
                    <Link className={`pathStep ${isDone ? "done" : ""}`} href={`/learn/${slug}`} key={slug}>
                      <span className="pathStepIndex">{isDone ? "✓" : String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <small>{concept.category}</small>
                        <strong>{concept.name}</strong>
                        <p>{concept.simple}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <footer className="pathCardFooter">
                {nextSlug ? (
                  <Link href={`/learn/${nextSlug}`} className="pathContinue">Continue with {concepts.find((item) => item.slug === nextSlug)?.name} →</Link>
                ) : (
                  <span className="pathComplete">Path complete · Nova approves ✓</span>
                )}
              </footer>
            </section>
          );
        })}
      </div>
    </div>
  );
}
