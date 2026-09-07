import Link from "next/link";
import { Nav } from "@/components/Nav";
import { concepts } from "@/lib/concepts";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="container">
        <section className="hero">
          <div>
            <div className="eyebrow">Complex terms → simple mental models</div>
            <h1>Stop memorizing.<br/><span className="gradient">Start understanding AI.</span></h1>
            <p className="lead">Explore MCP, RAG, agents, LangGraph and the rest of the AI stack through plain language, analogies, architecture examples, and connected learning paths.</p>
            <div className="ctaRow">
              <Link className="btn primary" href="/learn/mcp">Start with MCP →</Link>
              <a className="btn secondary" href="#map">Explore concept map</a>
            </div>
          </div>
          <div className="heroCard">
            <h3>Today&apos;s mental model</h3>
            <div className="term">MCP</div>
            <div className="analogy"><strong>USB-C for AI.</strong><br/>One common way for AI applications to connect to tools and data instead of inventing a new integration for everything.</div>
            <div className="flow">
              <div className="flowItem">1. Model needs outside context</div>
              <div className="flowItem">2. MCP exposes tools + resources</div>
              <div className="flowItem">3. AI can discover and use them</div>
            </div>
          </div>
        </section>

        <section className="section" id="map">
          <div className="sectionHeader"><div><div className="eyebrow">Learning path</div><h2>See how the ideas connect</h2></div><p>Build the mental model in the right order.</p></div>
          <div className="map">
            <div className="mapRow">
              <div className="node">LLM</div><div className="connector">→</div>
              <div className="node">Tool Calling</div><div className="connector">→</div>
              <div className="node active">MCP</div><div className="connector">→</div>
              <div className="node">Agents</div><div className="connector">→</div>
              <div className="node">Multi-Agent</div><div className="connector">→</div>
              <div className="node">LangGraph</div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="sectionHeader"><div><div className="eyebrow">Explore</div><h2>Core concepts</h2></div><p>Six lessons are wired into this first MVP.</p></div>
          <div className="grid">
            {concepts.map((concept) => (
              <Link className="card" href={`/learn/${concept.slug}`} key={concept.slug}>
                <div className="kicker">{concept.category}</div>
                <h3>{concept.name}</h3>
                <p>{concept.simple}</p>
                <span className="tag">Learn →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer><div className="container">AI Atlas MVP · Learn by explaining, comparing, and connecting.</div></footer>
    </>
  );
}
