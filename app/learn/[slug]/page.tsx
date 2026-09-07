import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { concepts, getConcept } from "@/lib/concepts";

export function generateStaticParams() {
  return concepts.map((concept) => ({ slug: concept.slug }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();

  return (
    <>
      <Nav />
      <main className="container lessonWrap">
        <aside className="sidebar">
          <div className="eyebrow" style={{padding:"8px 12px"}}>Concepts</div>
          {concepts.map((item) => <Link key={item.slug} href={`/learn/${item.slug}`}>{item.name}</Link>)}
        </aside>
        <article className="lesson">
          <section className="lessonHeader">
            <div className="eyebrow">{concept.category}</div>
            <h1>{concept.name}</h1>
            <p className="bigIdea">{concept.simple}</p>
          </section>

          <section className="lessonBlock">
            <div className="eyebrow">Feynman step 1</div>
            <h2>Explain it like I&apos;m 10</h2>
            <p className="bigIdea">{concept.analogy}</p>
          </section>

          <section className="lessonBlock">
            <div className="eyebrow">Feynman step 2</div>
            <h2>What problem are we actually solving?</h2>
            <p>{concept.problem}</p>
          </section>

          <section className="lessonBlock">
            <div className="eyebrow">Mental boundaries</div>
            <h2>What it is — and what it is not</h2>
            <div className="compare">
              <div className="good"><strong>✓ Think this</strong><p>{concept.simple}</p></div>
              <div className="bad"><strong>× Avoid this confusion</strong><p>{concept.notThis}</p></div>
            </div>
          </section>

          <section className="lessonBlock">
            <div className="eyebrow">Engineering reality</div>
            <h2>Real-world example</h2>
            <p>{concept.realExample}</p>
          </section>

          <section className="lessonBlock">
            <div className="eyebrow">Feynman challenge</div>
            <h2>Can you explain it back?</h2>
            <p>Before moving on, explain <strong>{concept.name}</strong> in one or two sentences without using its formal definition.</p>
            <button className="quizOption">I can explain the problem it solves.</button>
            <button className="quizOption">I can give a simple analogy.</button>
            <button className="quizOption">I can distinguish it from a related concept.</button>
          </section>

          <section className="lessonBlock">
            <div className="eyebrow">Connect the dots</div>
            <h2>Related concepts</h2>
            <p>{concept.related.join(" · ")}</p>
            <div className="ctaRow"><Link className="btn primary" href="/">Back to the map →</Link></div>
          </section>
        </article>
      </main>
    </>
  );
}
