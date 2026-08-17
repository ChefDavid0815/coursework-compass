import { ArrowRight, CalendarClock, Route, Sparkles } from "lucide-react";
import { ContentSection, MotionReveal, PageContainer } from "@/components/foundation/primitives";
import { ProductPreview } from "@/components/product-preview";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink } from "@/components/ui/button";

const steps = [
  { number: "01", title: "Bring the brief", copy: "Choose the coursework type, set the deadline, and tell Compass how intensely you want to work.", icon: Sparkles },
  { number: "02", title: "See the whole path", copy: "A thoughtful sequence replaces one intimidating assignment with milestones that make sense.", icon: Route },
  { number: "03", title: "Do today’s work", copy: "Open the plan and find one realistic next task, sized for the time you actually have.", icon: CalendarClock },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <PageContainer>
            <MotionReveal className="hero__copy">
              <p className="eyebrow">A calmer way through coursework</p>
              <h1 id="hero-title">Your assignment is big.<br /><span>Your next step isn’t.</span></h1>
              <p className="hero__lede">Turn a distant deadline into a plan you can trust—and one clear thing to do today.</p>
              <ButtonLink href="#product" size="large">Make it manageable <ArrowRight aria-hidden="true" /></ButtonLink>
            </MotionReveal>
            <MotionReveal className="hero__preview" delay={100}><ProductPreview /></MotionReveal>
          </PageContainer>
        </section>

        <ContentSection className="relief-section" id="product">
          <PageContainer className="relief-grid">
            <div className="section-index" aria-hidden="true"><span>01</span><i /></div>
            <div className="relief-copy">
              <p className="eyebrow">From assignment to plan</p>
              <h2>Less to hold<br />in your head.</h2>
            </div>
            <div className="relief-detail">
              <p>Coursework feels heavy when every decision arrives at once. Compass separates the decisions from the doing.</p>
              <p>You see the route, the pace, and the task that matters now—without turning your education into another dashboard to manage.</p>
            </div>
          </PageContainer>
        </ContentSection>

        <ContentSection className="method-section" id="method">
          <PageContainer>
            <div className="method-heading">
              <div><p className="eyebrow">A thoughtful sequence</p><h2>Clarity, in three moves.</h2></div>
              <p>Enough structure to make progress.<br />Enough space to think.</p>
            </div>
            <ol className="step-list">
              {steps.map((step) => (
                <li key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <span className="step-icon"><step.icon aria-hidden="true" /></span>
                  <div><h3>{step.title}</h3><p>{step.copy}</p></div>
                </li>
              ))}
            </ol>
          </PageContainer>
        </ContentSection>

        <ContentSection className="promise-section">
          <PageContainer className="promise-grid">
            <div className="promise-quote"><span aria-hidden="true">“</span><blockquote>The plan should carry the complexity, so you don’t have to.</blockquote></div>
            <div className="promise-note"><p className="ui-eyebrow">DESIGN PRINCIPLE</p><p>Compass keeps the full assignment visible, but never asks you to face all of it at once.</p></div>
          </PageContainer>
        </ContentSection>

        <ContentSection className="closing-section" id="start">
          <PageContainer>
            <div className="closing-card">
              <p className="eyebrow">Start with what’s due</p>
              <h2>Make the work<br />feel possible.</h2>
              <p>Bring one assignment. Leave with a clear next step.</p>
              <ButtonLink href="mailto:hello@courseworkcompass.app?subject=Coursework%20Compass%20early%20access" size="large">Join early access <ArrowRight aria-hidden="true" /></ButtonLink>
            </div>
          </PageContainer>
        </ContentSection>
      </main>
      <footer className="site-footer">
        <PageContainer><a className="brand brand--footer" href="#top">Coursework Compass</a><p>Calm plans for meaningful work.</p><span>© {new Date().getFullYear()}</span></PageContainer>
      </footer>
    </>
  );
}
