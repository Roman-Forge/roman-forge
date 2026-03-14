import { useEffect, useState } from "react";
import { T, mono, cormorant, SectionHeader, Reveal, Divider, BracketFrame } from "../components/design";
import { getProcessSteps, type ProcessStep } from "../lib/sanity";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

const FALLBACK_STEPS: ProcessStep[] = [
  { _id: "s1", num: "01", title: "Discovery", description: "Requirements gathering, system architecture planning, and ROI analysis. We identify where AI creates the most value.", timeline: "Week 1", order: 1 },
  { _id: "s2", num: "02", title: "Architecture", description: "API design, data flow diagrams, infrastructure blueprints, and technology selection with stakeholder alignment.", timeline: "Week 2", order: 2 },
  { _id: "s3", num: "03", title: "Build & Iterate", description: "Development sprints with code reviews, testing suites, and continuous deployment. Weekly progress demos.", timeline: "Weeks 3–6", order: 3 },
  { _id: "s4", num: "04", title: "Deploy & Support", description: "Production launch with monitoring, team training, documentation, and 30 days of post-launch support included.", timeline: "Weeks 7–8", order: 4 },
];

export default function ProcessPage() {
  const [steps, setSteps] = useState<ProcessStep[]>([]);

  useEffect(() => {
    getProcessSteps().then((d) => { if (d?.length) setSteps(d); });
  }, []);

  const displaySteps = steps.length ? steps : FALLBACK_STEPS;

  return (
    <div>
      {/* ══════ PAGE HERO ══════ */}
      <div className="container mx-auto mt-2 py-20">
        <SectionHeader
          center
          tag="Deployment Pipeline"
          title="From Concept to Production"
          desc="Projects with no surprises. Agile development, comprehensive testing, and monitored deployment in 4–8 weeks."
        />
      </div>

      {/* ══════ PROCESS STEPS ══════ */}
      <div className="container mx-auto pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {displaySteps.map((p, i) => (
            <Reveal key={p._id} delay={i * 70}>
              <div
                className="h-full relative transition-colors duration-300 hover-card group bracket-corners"
                style={{ padding: "2.25rem 1.75rem", border: `1px solid ${T.border}`, marginRight: -1, background: T.bgCard }}
              >
                <div
                  className="absolute bottom-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${T.gold}, transparent)` }}
                />
                <div
                  style={{
                    ...mono,
                    fontSize: "3rem",
                    fontWeight: 700,
                    color: T.gold,
                    opacity: 0.12,
                    lineHeight: 1,
                    marginBottom: "1rem",
                  }}
                >
                  {p.num}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: T.text }}>{p.title}</h3>
                <p className="mb-4" style={{ ...mono, fontSize: "0.75rem", lineHeight: 1.7, color: T.textDim }}>{p.description}</p>
                <p style={{ ...mono, fontSize: "0.6rem", color: T.gold, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7 }}>{p.timeline}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══════ DETAIL / DEEP-DIVE SECTION ══════ */}
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeader tag="Our Commitment" title="No Surprises. Ever." />
            <p className="mb-4" style={{ ...mono, fontSize: "0.8rem", lineHeight: 1.8, color: T.textMuted }}>
              Every project begins with a detailed discovery session where we define requirements, milestones, and a clear scope. You'll always know what's being built, when it's due, and what to expect.
            </p>
            <p className="mb-6" style={{ ...mono, fontSize: "0.8rem", lineHeight: 1.8, color: T.textMuted }}>
              Weekly progress demos mean you're never waiting until the end to see your product. If something needs to change, we catch it early — before it becomes expensive.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {[
                "Scoped contracts",
                "Weekly progress demos",
                "30 days post-launch support",
                "Full source code ownership",
                "Complete documentation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 py-2" style={{ ...mono, fontSize: "0.72rem", color: T.textMuted }}>
                  <div className="w-1.5 h-1.5 flex-shrink-0 rotate-45" style={{ background: T.gold }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              { label: "Average Project Duration", value: "4–8 weeks" },
              { label: "Post-Launch Support", value: "30 days included" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-5 bracket-corners"
                style={{ border: `1px solid ${T.border}`, background: T.bgCard }}
              >
                <span style={{ ...mono, fontSize: "0.72rem", color: T.textDim }}>{item.label}</span>
                <span style={{ ...mono, fontSize: "0.8rem", fontWeight: 600, color: T.gold }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ CTA ══════ */}
      <div className="container mx-auto pb-20">
        <BracketFrame
          className="text-center relative overflow-hidden"
          style={{ border: `1px solid ${T.border}`, background: T.bgCard, padding: "4rem 2rem" }}
        >
          <h2 className="relative z-10 mb-5" style={{ ...cormorant, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.15, color: T.text }}>
            Start your project today
          </h2>
          <p className="relative z-10 max-w-[480px] mx-auto mb-8" style={{ ...mono, fontSize: "0.8rem", color: T.textMuted, lineHeight: 1.7 }}>
            Book a free strategy assessment and get a detailed implementation roadmap within one week.
          </p>
          <Link
            to="/contact"
            className="no-underline relative z-10 inline-flex items-center gap-2"
            style={{ ...mono, fontSize: "0.78rem", fontWeight: 500, padding: "0.85rem 1.75rem", background: T.gold, color: T.bg, border: `1px solid ${T.gold}`, letterSpacing: "0.03em" }}
          >
            Book a Consultation <ChevronRight size={14} />
          </Link>
        </BracketFrame>
      </div>
    </div>
  );
}
