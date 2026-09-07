import Link from "next/link";

function NovaMark() {
  return (
    <svg viewBox="0 0 120 120" className="novaMark" aria-hidden="true">
      <path d="M25 70 15 96l28-8" fill="#f7d6d0" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <path d="M95 70l10 26-28-8" fill="#f7d6d0" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <rect x="24" y="28" width="72" height="62" rx="20" fill="#fff" stroke="currentColor" strokeWidth="5" />
      <path d="M60 28V15" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="10" r="6" fill="#ffd66b" stroke="currentColor" strokeWidth="4" />
      <circle cx="46" cy="56" r="5" fill="currentColor" />
      <circle cx="74" cy="56" r="5" fill="currentColor" />
      <path d="M44 72q16 12 32 0" fill="none" stroke="#df6558" strokeWidth="5" strokeLinecap="round" />
      <path d="M31 40q-9-9-17-2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M89 40q9-9 17-2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

const groups = [
  { label: "Start here", links: [{ href: "/", text: "AI Atlas" }, { href: "/#concepts", text: "Concept catalog" }] },
  { label: "Knowledge", links: [{ href: "/learn/rag", text: "RAG" }] },
  { label: "Connections", links: [{ href: "/learn/mcp", text: "MCP" }] },
  { label: "Agents", links: [{ href: "/learn/agents", text: "AI Agents" }, { href: "/learn/multi-agent", text: "Multi-Agent" }] },
  { label: "Frameworks", links: [{ href: "/learn/langchain", text: "LangChain" }, { href: "/learn/langgraph", text: "LangGraph" }] },
];

export function Nav() {
  return (
    <>
      <aside className="atlasSidebar">
        <Link href="/" className="sidebarBrand">
          <NovaMark />
          <div><strong>AI ATLAS</strong><span>Visual guide to modern AI</span></div>
        </Link>

        <div className="sidebarRule" />
        <div className="sidebarIntro">Learn the problem, see the metaphor, then map it to real architecture.</div>

        <nav className="sidebarNav" aria-label="AI Atlas chapters">
          {groups.map((group) => (
            <div className="sidebarGroup" key={group.label}>
              <span>{group.label}</span>
              {group.links.map((link) => <Link key={link.href} href={link.href}>{link.text}</Link>)}
            </div>
          ))}
        </nav>

        <div className="sidebarFooter">Feynman learning · visual first</div>
      </aside>

      <header className="atlasMobileNav">
        <Link href="/" className="mobileBrand"><span className="mobileBrandMark">A</span><strong>AI Atlas</strong></Link>
        <nav><Link href="/#concepts">Catalog</Link><Link href="/learn/mcp">MCP</Link></nav>
      </header>
    </>
  );
}
