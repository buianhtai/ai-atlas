import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { NovaMascot } from "@/components/NovaMascot";
import { ConceptIllustration } from "@/components/ConceptIllustration";
import { MCPNovaMission } from "@/components/MCPNovaMission";
import { concepts, getConcept } from "@/lib/concepts";
import { lessonDetails } from "@/lib/lessonDetails";

export function generateStaticParams() {
  return concepts.map((concept) => ({ slug: concept.slug }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = getConcept(slug);
  const detail = lessonDetails[slug];
  if (!concept || !detail) notFound();

  const index = concepts.findIndex((item) => item.slug === slug);
  const previous = index > 0 ? concepts[index - 1] : null;
  const next = index < concepts.length - 1 ? concepts[index + 1] : null;
  const related = concepts.filter((item) => concept.related.some((name) => name.toLowerCase().includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(name.toLowerCase()))).slice(0, 3);

  return (
    <>
      <Nav />
      <main className="lessonEditorial">
        <div className="container lessonEditorialLayout">
          <aside className="lessonCatalog" aria-label="AI concept catalog">
            <div className="lessonCatalogTitle">AI concepts</div>
            {concepts.map((item, itemIndex) => (
              <Link key={item.slug} href={`/learn/${item.slug}`} className={item.slug === slug ? "active" : ""} aria-current={item.slug === slug ? "page" : undefined}>
                <span>{String(itemIndex + 1).padStart(2, "0")}</span>
                <strong>{item.name}</strong>
              </Link>
            ))}
          </aside>

          <article className="lessonArticle">
            <header className="lessonEditorialHero">
              <div className="lessonHeroCopy">
                <div className="lessonBreadcrumb"><Link href="/">AI Atlas</Link><span>/</span>{concept.category}</div>
                <div className="lessonKicker">Concept {String(index + 1).padStart(2, "0")}</div>
                <h1>{concept.name}</h1>
                <p className="lessonDeck">{concept.simple}</p>
                <div className="lessonHeroMeta">
                  <span>Start with the problem</span>
                  <span>Then reveal the system</span>
                </div>
              </div>
              <figure className="lessonHeroFigure">
                <div className="lessonFigureLabel">Visual mental model</div>
                <ConceptIllustration slug={slug} />
                <figcaption>{concept.analogy}</figcaption>
              </figure>
            </header>

            {slug === "mcp" && (
              <section className="lessonMissionSection">
                <div className="lessonSectionIntro compact">
                  <span>Interactive mission</span>
                  <h2>Connect Nova to the outside world.</h2>
                  <p>Experience the integration problem before reading the protocol vocabulary.</p>
                </div>
                <MCPNovaMission />
              </section>
            )}

            <section className="lessonSection lessonProblemSection">
              <div className="lessonSectionIntro">
                <span>01 · Why it exists</span>
                <h2>Start with the problem, not the acronym.</h2>
              </div>
              <div className="lessonProblemGrid">
                <div className="lessonTextPanel">
                  <small>The problem</small>
                  <p>{detail.why}</p>
                </div>
                <div className="lessonTextPanel accent">
                  <small>The design idea</small>
                  <p>{detail.principle}</p>
                </div>
              </div>
            </section>

            <section className="lessonSection">
              <div className="lessonSectionIntro split">
                <div>
                  <span>02 · How it works</span>
                  <h2>Follow the flow.</h2>
                </div>
                <p>Read these steps left-to-right on desktop or top-to-bottom on mobile. The labels are deliberately concrete so you can reconstruct the system from memory.</p>
              </div>
              <div className="lessonSteps">
                {detail.steps.map((step, stepIndex) => (
                  <div className="lessonStep" key={step.title}>
                    <div className="lessonStepNumber">{String(stepIndex + 1).padStart(2, "0")}</div>
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="lessonSection lessonAnalogySection">
              <div className="lessonSectionIntro">
                <span>03 · Feynman view</span>
                <h2>Explain it without jargon.</h2>
              </div>
              <blockquote>{concept.analogy}</blockquote>
              <p className="lessonAnalogyNote">If the analogy helps you predict what the system does—and where it stops being accurate—you understand more than the definition alone.</p>
            </section>

            <section className="lessonSection">
              <div className="lessonSectionIntro split">
                <div>
                  <span>04 · Engineering view</span>
                  <h2>Map the idea to production.</h2>
                </div>
                <p>{concept.realExample}</p>
              </div>
              <div className="engineeringGrid">
                {detail.engineering.map((item) => (
                  <div className="engineeringItem" key={item.label}>
                    <small>{item.label}</small>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="lessonSection">
              <div className="lessonSectionIntro">
                <span>05 · Boundaries</span>
                <h2>Know what the concept is not.</h2>
              </div>
              <div className="lessonBoundaryGrid">
                <div className="lessonBoundary yes">
                  <small>Keep this mental model</small>
                  <strong>{concept.simple}</strong>
                </div>
                <div className="lessonBoundary no">
                  <small>Avoid this confusion</small>
                  <strong>{concept.notThis}</strong>
                </div>
              </div>
            </section>

            <section className="lessonSection lessonChallenge">
              <div className="lessonChallengeGuide">
                <NovaMascot className="challengeNova" pose="think" title="Nova thinking about the Feynman challenge" />
                <div>
                  <span>06 · Feynman challenge</span>
                  <h2>Can you teach it back?</h2>
                  <p>{detail.challenge}</p>
                </div>
              </div>
              <div className="challengeChecklist">
                <span>I can explain the problem it solves.</span>
                <span>I can draw the core flow from memory.</span>
                <span>I can name one important limitation.</span>
              </div>
            </section>

            <section className="lessonSection lessonConnections">
              <div className="lessonSectionIntro">
                <span>Connect the dots</span>
                <h2>What should you learn next?</h2>
              </div>
              <div className="relatedConcepts">
                {(related.length ? related : concepts.filter((item) => item.slug !== slug).slice(0, 3)).map((item) => (
                  <Link href={`/learn/${item.slug}`} key={item.slug}>
                    <small>{item.category}</small>
                    <strong>{item.name}</strong>
                    <span>{item.simple}</span>
                  </Link>
                ))}
              </div>
            </section>

            <nav className="lessonPager" aria-label="Lesson navigation">
              {previous ? <Link href={`/learn/${previous.slug}`}><small>Previous</small><strong>← {previous.name}</strong></Link> : <span />}
              {next ? <Link href={`/learn/${next.slug}`} className="next"><small>Next</small><strong>{next.name} →</strong></Link> : <Link href="/" className="next"><small>Finished</small><strong>Back to catalog →</strong></Link>}
            </nav>
          </article>
        </div>
      </main>
    </>
  );
}
