import Link from "next/link";
import { Nav } from "@/components/Nav";
import { AtlasOverviewIllustration } from "@/components/AtlasOverviewIllustration";
import { ConceptIllustration } from "@/components/ConceptIllustration";
import { concepts } from "@/lib/concepts";

const tracks = [
  {
    name: "Knowledge & Context",
    description: "How an AI system finds, carries, and uses information that is not stored in the model itself.",
    slugs: ["rag", "mcp"],
  },
  {
    name: "Agents & Teams",
    description: "How models move from producing answers to choosing actions, using tools, and coordinating work.",
    slugs: ["agents", "multi-agent"],
  },
  {
    name: "Frameworks & Control",
    description: "How engineers assemble AI applications and make loops, branches, state, and orchestration explicit.",
    slugs: ["langchain", "langgraph"],
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="atlasHome" id="main-content">
        <section className="editorialHero container">
          <div className="editorialHeroCopy">
            <div className="editorialKicker">AI concepts, explained visually</div>
            <h1>Understand the systems behind modern AI.</h1>
            <p>Start with the problem. See a memorable picture. Then map that picture to the architecture an engineer actually builds.</p>
            <div className="editorialActions">
              <Link className="editorialPrimary" href="/learn/mcp">Start with MCP</Link>
              <a className="editorialSecondary" href="#catalog">Browse the catalog</a>
            </div>
          </div>

          <figure className="editorialHeroIllustration">
            <AtlasOverviewIllustration />
            <figcaption className="editorialIllustrationCaption">The AI systems workshop: knowledge supplies context, models reason, tools act, and workflows coordinate.</figcaption>
          </figure>
        </section>

        <section className="editorialIntro container">
          <div className="editorialIntroCard">
            <span className="editorialNumber">01</span>
            <h2>Meet the problem.</h2>
            <p>Understand why the concept had to exist before memorizing its definition.</p>
          </div>
          <div className="editorialIntroCard">
            <span className="editorialNumber">02</span>
            <h2>See the metaphor.</h2>
            <p>Give the idea a distinct scene, character, and visual story you can recall later.</p>
          </div>
          <div className="editorialIntroCard">
            <span className="editorialNumber">03</span>
            <h2>Inspect the system.</h2>
            <p>Translate the illustration into real components, data flow, tradeoffs, and implementation concerns.</p>
          </div>
        </section>

        <section className="editorialCatalog container" id="catalog">
          <div className="editorialSectionTitle catalogTitle">
            <div>
              <span>Catalog</span>
              <h2>The catalog of modern AI systems.</h2>
            </div>
            <p>Six concepts to start. Each guide uses a different visual metaphor instead of recycling the same boxes and arrows.</p>
          </div>

          <div className="catalogTracks" id="concepts">
            {tracks.map((track) => (
              <section className="catalogTrack" key={track.name}>
                <header className="catalogTrackHead">
                  <h3>{track.name}</h3>
                  <p>{track.description}</p>
                </header>
                <div className="catalogTrackGrid">
                  {track.slugs.map((slug) => {
                    const concept = concepts.find((item) => item.slug === slug)!;
                    return (
                      <Link href={`/learn/${concept.slug}`} className="catalogPattern" key={concept.slug}>
                        <div className="catalogPatternArt"><ConceptIllustration slug={concept.slug} /></div>
                        <div className="catalogPatternCopy">
                          <span>{concept.category}</span>
                          <h4>{concept.name}</h4>
                          <p>{concept.simple}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
      <footer className="editorialFooter"><div className="container">AI Atlas · Illustrated engineering guides for modern AI systems.</div></footer>
    </>
  );
}
