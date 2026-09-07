import Link from "next/link";

export function Nav() {
  return (
    <header className="atlasNavWrap">
      <div className="container atlasNav">
        <Link href="/" className="atlasBrand">
          <span className="atlasBrandMark">A</span>
          <span className="atlasBrandText">AI Atlas</span>
        </Link>
        <nav className="atlasNavLinks">
          <Link href="/#concepts">Explore</Link>
          <Link href="/learn/mcp">Lessons</Link>
          <span className="atlasNavPill">Learn by seeing</span>
        </nav>
      </div>
    </header>
  );
}
