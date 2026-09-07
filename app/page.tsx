import Link from "next/link";
import { Nav } from "@/components/Nav";
import { AtlasOverviewIllustration } from "@/components/AtlasOverviewIllustration";
import { ConceptIllustration } from "@/components/ConceptIllustration";
import { concepts } from "@/lib/concepts";

const categoryOrder = [
  { name: "Foundations", note: "LLMs, tokens, context" },
  { name: "Knowledge", note: "RAG, embeddings, graphs" },
  { name: "Connections", note: "Tools, function calling, MCP" },
  { name: "Agents", note: "Planning, memory, action" },
  { name: "Agent Systems", note: "Multi-agent orchestration" },
  { name: "Engineering", note: "Evals, safety, observability" },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="atlasHome">
        <section className="editorialHero container">
          <div className="editorialHeroCopy">
            <div className="editorialKicker">AI concepts, explained visually</div>
            <h1>Understand the systems behind modern AI.</h1>
            <p>Learn the way an engineer teaches another engineer: start with the problem, draw the system, connect it to a memorable analogy, then inspect how it works in practice.</p>
            <div className="editorialActions">
              <Link className="editorialPrimary" href="/learn/mcp">Start with MCP</Link>
              <a className="editorialSecondary" href="#catalog">Browse the catalog</a>
            </div>
          </div>

          <figure className="editorialHeroIllustration">
            <div className="editorialIllustrationTitle">The AI systems workshop</div>
            <AtlasOverviewIllustration />
            <figcaption className="editorialIllustrationCaption">Models become useful systems when knowledge, tools, agents, and explicit workflows are connected around them.</figcaption>
          </figure>
        </section>

        <section className="editorialIntro container">
          <div className="editorialIntroCard">
            <span className="editorialNumber">01</span>
            <h2>See the problem first.</h2>
            <p>Start with the situation a technology was invented to solve—not its acronym.</p>
          </div>
          <div className="editorialIntroCard">
            <span className="editorialNumber">02</span>
            <h2>Build a mental picture.</h2>
            <p>Use a distinct illustration and analogy so the concept has somewhere to live in your memory.</p>
          </div>
          <div className="editorialIntroCard">
            <span className="editorialNumber">03</span>
            <h2>Reveal the engineering.</h2>
            <p>Map the picture directly to the real architecture, tradeoffs, and production concerns.</p>
          </div>
        </section>

        <section className="editorialCatalog container" id="catalog">
          <div className="editorialSectionTitle">
            <div>
              <span>Catalog</span>
              <h2>The modern AI systems catalog.</h2>
            </div>
            <p>Each concept gets its own visual language instead of sharing one generic “AI” diagram.</p>
          </div>

          <div className="editorialCategories">
            {categoryOrder.map((category, index) => (
              <div className="editorialCategory" key={category.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{category.name}</strong>
                <small>{category.note}</small>
              </div>
            ))}
          </div>

          <div className="editorialConceptGrid" id="concepts">
            {concepts.map((concept) => (
              <Link href={`/learn/${concept.slug}`} className="editorialConceptCard" key={concept.slug}>
                <div className="editorialConceptIllustration">
                  <ConceptIllustration slug={concept.slug} />
                </div>
                <div className="editorialConceptMeta">{concept.category}</div>
                <h3>{concept.name}</h3>
                <p>{concept.simple}</p>
                <span className="editorialConceptLink">Open illustrated guide →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="editorialFooter"><div className="container">AI Atlas · Illustrated engineering guides for modern AI systems.</div></footer>
    </>
  );
}
