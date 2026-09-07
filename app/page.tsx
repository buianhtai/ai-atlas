import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ConceptWorld } from "@/components/ConceptWorld";
import { concepts } from "@/lib/concepts";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="container">
        <section className="hero hero3d">
          <div>
            <div className="eyebrow">Learn AI like a game</div>
            <h1>Walk through an <span className="gradient">AI world.</span></h1>
            <p className="lead">Instead of reading definitions, explore cartoon 3D scenes that turn MCP, RAG, agents and frameworks into simple visual stories.</p>
            <div className="ctaRow">
              <Link className="btn primary" href="/learn/mcp">Enter MCP world →</Link>
              <a className="btn secondary" href="#concepts">Browse concepts</a>
            </div>
          </div>
          <ConceptWorld />
        </section>

        <section className="section" id="concepts">
          <div className="sectionHeader">
            <div><div className="eyebrow">Choose a world</div><h2>Every concept becomes a visual story</h2></div>
            <p>Start simple, then connect the ideas.</p>
          </div>
          <div className="grid">
            {concepts.map((concept, index) => (
              <Link className="card cartoonCard" href={`/learn/${concept.slug}`} key={concept.slug}>
                <div className="cartoonOrb">{["🔌","📚","🤖","👥","🧱","🕸️"][index] ?? "✨"}</div>
                <div className="kicker">{concept.category}</div>
                <h3>{concept.name}</h3>
                <p>{concept.simple}</p>
                <span className="tag">Explore world →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer><div className="container">AI Atlas · Feynman learning in a playful 3D world.</div></footer>
    </>
  );
}
