import "./globals.css";
import "./responsive.css";
import "./editorial.css";
import "./home-v2.css";
import "./lesson.css";
import "./shell.css";
import "./catalog-v3.css";
import "./polish-v4.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Atlas — Understand AI, visually",
  description: "Learn AI concepts with Feynman explanations, analogies, comparisons, and interactive learning paths."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
