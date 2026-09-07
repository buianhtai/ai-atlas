import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ConceptWorld } from "@/components/ConceptWorld";
import { AtlasBadge, AtlasEyebrow } from "@/components/AtlasUI";
import { concepts } from "@/lib/concepts";

const categoryOrder = ["Foundations", "Knowledge", "Connections", "Agents", "Agent Systems", "Engineering"];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <section className="atlasHero container">
          <div className="atlasHeroCopy">
            <AtlasBadge>Interactive AI learning atlas</AtlasBadge>
            <AtlasEyebrow>See the system before memorizing the term</AtlasEyebrow>
            <h1>Understand modern AI through <span>visual missions.</span></h1>
            <p>AI Atlas turns abstract concepts into explorable scenes, guided interactions, and architecture reveals—so you understand why a technology exists before learning its vocabulary.</p>
            <div className="atlasHeroActions">
              <Link className="atlasButton" href="/learn/mcp">Start with MCP</Link>
              <a className="atlasButton atlasButton--secondary" href="#concepts">Explore the atlas</a>
            </div>
            <div className="atlasProofRow">
              <div><strong>01</strong><span>See the problem</span></div>
              <div><strong>02</strong><span>Interact with it</span></div>
              <div><strong>03</strong><span>Reveal the architecture</span></div>
            </div>
          </div>
          <div className="atlasHeroWorld">
            <ConceptWorld />
          </div>
        </section>

        <section className="atlasBand">
          <div className="container">
            <div className="atlasBandLabel">Learning worlds</div>
            <div className="atlasCategoryRail">
              {categoryOrder.map((category, index) => (
                <div className="atlasCategory" key={category}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{category}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container atlasConceptSection" id="concepts">
          <div className="atlasSectionHead">
            <div>
              <AtlasEyebrow>Explore concepts</AtlasEyebrow>
              <h2>Build the mental model one system at a time.</h2>
            </div>
            <p>Each lesson starts with a visual metaphor, moves through an interactive mission, and ends with the real engineering model.</p>
          </div>
          <div className="atlasConceptGrid">
            {concepts.map((concept, index) => (
              <Link href={`/learn/${concept.slug}`} className="atlasConceptCard" key={concept.slug}>
                <div className="atlasConceptIndex">{String(index + 1).padStart(2, "0")}</div>
                <div className="atlasConceptMeta">{concept.category}</div>
                <h3>{concept.name}</h3>
                <p>{concept.simple}</p>
                <span className="atlasConceptAction">Open lesson <b>↗</b></span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="atlasFooter"><div className="container">AI Atlas · Learn complex AI systems by seeing how they work.</div></footer>
    </>
  );
}
