import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { NovaMascot } from "@/components/NovaMascot";
import { LearningPathsClient } from "@/components/LearningPathsClient";

export const metadata: Metadata = {
  title: "Learning Paths — AI Atlas",
  description: "Choose a guided route through AI Atlas and track the concepts you can explain from memory.",
};

export default function LearningPathsPage() {
  return (
    <>
      <Nav />
      <main className="pathsPage" id="main-content">
        <div className="container pathsHero">
          <div className="pathsHeroCopy">
            <span>Guided learning</span>
            <h1>Don’t learn AI as a bag of buzzwords.</h1>
            <p>Pick the system you want to build. AI Atlas orders the concepts so each new mental model has enough context to make sense.</p>
            <div className="pathsHeroActions">
              <Link href="/learn/mcp">Start Agent Engineer →</Link>
              <Link href="/#concepts">Browse all concepts</Link>
            </div>
          </div>
          <div className="pathsHeroNova">
            <NovaMascot pose="guide" title="Nova guiding the learning paths" />
            <div><strong>Nova’s rule</strong><span>Learn dependencies when they help understanding. Never lock the learner behind them.</span></div>
          </div>
        </div>

        <section className="container pathsContent">
          <div className="pathsIntro">
            <span>Choose your route</span>
            <h2>Same atlas. Different destination.</h2>
            <p>Progress lives only in this browser for now. No account, no streak pressure, no fake gamification.</p>
          </div>
          <LearningPathsClient />
        </section>
      </main>
    </>
  );
}
