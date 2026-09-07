import type { ReactNode } from "react";

export function AtlasEyebrow({ children }: { children: ReactNode }) {
  return <div className="atlasEyebrow">{children}</div>;
}

export function AtlasSurface({
  children,
  className = "",
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "elevated" | "soft";
}) {
  return <section className={`atlasSurface atlasSurface--${tone} ${className}`.trim()}>{children}</section>;
}

export function AtlasBadge({ children }: { children: ReactNode }) {
  return <span className="atlasBadge">{children}</span>;
}

export function AtlasButton({
  children,
  href,
  secondary = false,
}: {
  children: ReactNode;
  href: string;
  secondary?: boolean;
}) {
  return <a className={`atlasButton ${secondary ? "atlasButton--secondary" : ""}`} href={href}>{children}</a>;
}
