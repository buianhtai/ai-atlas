"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NovaMascot } from "@/components/NovaMascot";

const groups = [
  { label: "Start here", links: [{ href: "/", text: "AI Atlas" }, { href: "/paths", text: "Learning paths" }, { href: "/#concepts", text: "Concept catalog" }] },
  { label: "Knowledge", links: [{ href: "/learn/rag", text: "RAG" }] },
  { label: "Connections", links: [{ href: "/learn/mcp", text: "MCP" }] },
  { label: "Agents", links: [{ href: "/learn/agents", text: "AI Agents" }, { href: "/learn/multi-agent", text: "Multi-Agent" }] },
  { label: "Frameworks", links: [{ href: "/learn/langchain", text: "LangChain" }, { href: "/learn/langgraph", text: "LangGraph" }] },
];

export function Nav() {
  const pathname = usePathname();
  const isCurrent = (href: string) => href.startsWith("/#") ? false : pathname === href;

  return (
    <>
      <a className="skipLink" href="#main-content">Skip to content</a>

      <aside className="atlasSidebar">
        <Link href="/" className="sidebarBrand" aria-label="AI Atlas home">
          <NovaMascot className="novaMark" pose="guide" />
          <div><strong>AI ATLAS</strong><span>Visual guide to modern AI</span></div>
        </Link>

        <div className="sidebarSpeech">“Start with the problem. The jargon can wait.”</div>
        <div className="sidebarRule" />
        <div className="sidebarIntro">Learn the problem, see the metaphor, then map it to real architecture.</div>

        <nav className="sidebarNav" aria-label="AI Atlas chapters">
          {groups.map((group) => (
            <div className="sidebarGroup" key={group.label}>
              <span>{group.label}</span>
              {group.links.map((link) => {
                const current = isCurrent(link.href);
                return (
                  <Link key={link.href} href={link.href} className={current ? "active" : undefined} aria-current={current ? "page" : undefined}>
                    {link.text}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebarFooter">Feynman learning · visual first</div>
      </aside>

      <header className="atlasMobileNav">
        <Link href="/" className="mobileBrand" aria-label="AI Atlas home"><span className="mobileBrandMark">N</span><strong>AI Atlas</strong></Link>
        <nav aria-label="Mobile navigation">
          <Link href="/paths" className={pathname === "/paths" ? "active" : undefined} aria-current={pathname === "/paths" ? "page" : undefined}>Paths</Link>
          <Link href="/#concepts">Catalog</Link>
          <Link href="/learn/mcp" className={pathname === "/learn/mcp" ? "active" : undefined} aria-current={pathname === "/learn/mcp" ? "page" : undefined}>MCP</Link>
        </nav>
      </header>
    </>
  );
}
