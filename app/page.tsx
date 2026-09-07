import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ConceptWorld } from "@/components/ConceptWorld";
import { concepts } from "@/lib/concepts";

const categoryOrder = [
  { name: "Foundations", note: "LLMs, tokens, context" },
  { name: "Knowledge", note: "RAG, embeddings, graphs" },
  { name: "Connections", note: "Tools, function calling, MCP" },
  { name: "Agents", note: "Planning, memory, action" },
  { name: "Agent Systems", note: "Multi-agent orchestration" },
  { name: "Engineering", note: "Evals, safety, observability" },
];

function ConceptSketch({ index }: { index: number }) {
  const variant = index % 3;
  return (
    <div className={`conceptSketch conceptSketch--${variant}`} aria-hidden="true">
      <div className="sketchNode sketchNode--a" />
      <div className="sketchNode sketchNode--b" />
      <div className="sketchNode sketchNode--c" />
      <div className="sketchLine sketchLine--a" />
      <div className="sketchLine sketchLine--b" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main className="atlasHome">
        <section className="editorialHero container">
          <div className="editorialHeroCopy">
            <div className="editorialKicker">AI concepts, explained visually</div>
            <h1>Understand the systems behind modern AI.</h1>
            <p>Explore visual stories, interactive missions, and real architecture diagrams that make complex AI concepts easier to remember and apply.</p>
            <div className="editorialActions">
              <Link className="editorialPrimary" href="/learn/mcp">Start with MCP</Link>
              <a className="editorialSecondary" href="#catalog">Browse the catalog</a>
            </div>
          </div>

          <div className="editorialHeroIllustration">
            <div className="editorialIllustrationTitle">The AI systems map</div>
            <ConceptWorld />
            <div className="editorialIllustrationCaption">A visual atlas of how models, knowledge, tools, and agents connect.</div>
          </div>
        </section>

        <section className="editorialIntro container">
          <div className="editorialIntroCard">
            <span className="editorialNumber">01</span>
            <h2>See the problem first.</h2>
            <p>Start with the situation a technology was invented to solve.</p>
          </div>
          <div className="editorialIntroCard">
            <span className="editorialNumber">02</span>
            <h2>Interact with the idea.</h2>
            <p>Use a visual mission to build the mental model yourself.</p>
          </div>
          <div className="editorialIntroCard">
            <span className="editorialNumber">03</span>
            <h2>Reveal the architecture.</h2>
            <p>Map the metaphor directly to the real engineering system.</p>
          </div>
        </section>

        <section className="editorialCatalog container" id="catalog">
          <div className="editorialSectionTitle">
            <div>
              <span>Catalog</span>
              <h2>Choose a learning world.</h2>
            </div>
            <p>Concepts are grouped by the role they play in an AI system, not by buzzword popularity.</p>
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
            {concepts.map((concept, index) => (
              <Link href={`/learn/${concept.slug}`} className="editorialConceptCard" key={concept.slug}>
                <ConceptSketch index={index} />
                <div className="editorialConceptMeta">{concept.category}</div>
                <h3>{concept.name}</h3>
                <p>{concept.simple}</p>
                <span className="editorialConceptLink">Explore concept →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="editorialFooter"><div className="container">AI Atlas · Visual learning for modern AI systems.</div></footer>
    </>
  );
}
