import Link from "next/link";

export function Nav() {
  return (
    <div className="container nav">
      <Link href="/" className="brand">AI <span>Atlas</span></Link>
      <div className="pill">Feynman learning for AI</div>
    </div>
  );
}
