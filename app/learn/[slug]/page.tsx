import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { LessonWorld } from "@/components/LessonWorld";
import { MCPNovaMission } from "@/components/MCPNovaMission";
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
          <section className="lessonHeader lessonHero">
            <div>
              <div className="eyebrow">{concept.category}</div>
              <h1>{concept.name}</h1>
              <p className="bigIdea">{concept.simple}</p>
            </div>
            {slug === "mcp" ? null : <LessonWorld slug={slug} />}
          </section>

          {slug === "mcp" && <MCPNovaMission />}

          <section className="lessonBlock storyBlock">
            <div className="eyebrow">Visual story</div>
            <h2>Watch the idea before reading the definition</h2>
            <p>{concept.analogy}</p>
            <div className="storySteps">
              {slug === "mcp" ? (
                <>
                  <div><span>1</span><strong>AI needs something</strong><small>Code, documents, messages, or data.</small></div>
                  <div><span>2</span><strong>MCP is the common plug</strong><small>The AI app sees tools through one protocol.</small></div>
                  <div><span>3</span><strong>The right tool responds</strong><small>GitHub, Drive, Slack, database, and more.</small></div>
                </>
              ) : slug === "rag" ? (
                <>
                  <div><span>1</span><strong>Ask a question</strong><small>The model does not guess from memory alone.</small></div>
                  <div><span>2</span><strong>Search the library</strong><small>Retrieve the pages most relevant to the question.</small></div>
                  <div><span>3</span><strong>Answer with context</strong><small>The retrieved knowledge goes into the model's context.</small></div>
                </>
              ) : (
                <>
                  <div><span>1</span><strong>Start with a goal</strong><small>Give the system something concrete to accomplish.</small></div>
                  <div><span>2</span><strong>Move through the workflow</strong><small>Tools, state, or specialized roles do the work.</small></div>
                  <div><span>3</span><strong>Observe the result</strong><small>Use feedback to decide what happens next.</small></div>
                </>
              )}
            </div>
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
            <div className="ctaRow"><Link className="btn primary" href="/">Back to the world →</Link></div>
          </section>
        </article>
      </main>
    </>
  );
}
