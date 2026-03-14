import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Layers,
  Circle,
  Link2,
  Sun,
  Zap,
  MessageSquare,
  LayoutDashboard,
  Shuffle,
} from "lucide-react";
import {
  T,
  cormorant,
  mono,
  BracketFrame,
  DotCanvas,
  SectionHeader,
  Reveal,
  IconBox,
  Divider,
} from "../components/design";
import { getServices, type Service } from "../lib/sanity";

/* ── Fallback services (shown while Sanity loads or if empty) ── */
const FALLBACK_SERVICES = [
  {
    _id: "f1",
    num: "01",
    title: "Conversational AI Systems",
    iconName: "MessageSquare",
    description:
      "Custom chatbots trained on your business data with RAG architecture. 24/7 customer support, lead qualification, and CRM integration.",
    slug: { current: "conversational-ai" },
    order: 1,
  },
  {
    _id: "f2",
    num: "02",
    title: "Analytics & Dashboards",
    iconName: "LayoutDashboard",
    description:
      "Real-time data visualization with AI-powered predictive analytics. Custom React dashboards with live API integration and alerting.",
    slug: { current: "analytics" },
    order: 2,
  },
  {
    _id: "f3",
    num: "03",
    title: "Intelligent Automation",
    iconName: "Shuffle",
    description:
      "Document processing, data extraction, and workflow automation using function-calling and LLM orchestration. Eliminate manual data entry.",
    slug: { current: "automation" },
    order: 3,
  },
];

const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare,
  LayoutDashboard,
  Shuffle,
  Layers,
};

const TRUST = [
  { icon: Layers, name: "OpenAI" },
  { icon: Circle, name: "Anthropic" },
  { icon: Link2, name: "LangChain" },
  { icon: Sun, name: "React" },
  { icon: Layers, name: "Pinecone" },
  { icon: Zap, name: "Vercel" },
];

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getServices().then((data) => {
      if (data && data.length > 0) setServices(data.slice(0, 3));
    });
  }, []);

  const preview = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <div>
      {/* ══════ HERO ══════ */}
      <div className="container mx-auto mt-2">
        <div
          className="relative overflow-hidden flex items-center bracket-corners"
          style={{
            border: `1px solid ${T.border}`,
            background: T.bgCard,
            padding: "6rem 2.5rem 5rem",
            minHeight: 520,
          }}
        >
          <DotCanvas />
          <div className="relative z-10 max-w-[620px]">
            <h1
              className="mb-7 tracking-tight"
              style={{
                ...cormorant,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 500,
                lineHeight: 1.05,
                color: T.text,
              }}
            >
              AI Architecture<br />Built to Last
            </h1>
            <p
              className="mb-10 max-w-[480px]"
              style={{ ...mono, fontSize: "0.85rem", lineHeight: 1.8, color: T.textMuted }}
            >
              We build{" "}
              <strong className="font-semibold" style={{ color: T.text }}>production-ready AI systems</strong>,
              intelligent automation, and custom{" "}
              <strong className="font-semibold" style={{ color: T.text }}>knowledge infrastructure</strong> that
              replace months of manual operations and engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="no-underline inline-flex items-center gap-2 transition-all duration-200"
                style={{
                  ...mono,
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  padding: "0.85rem 1.75rem",
                  background: T.gold,
                  color: T.bg,
                  border: `1px solid ${T.gold}`,
                  letterSpacing: "0.03em",
                }}
              >
                Book a Consultation <ChevronRight size={14} />
              </Link>
              <Link
                to="/services"
                className="no-underline inline-flex items-center gap-2 transition-all duration-200"
                style={{
                  ...mono,
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  padding: "0.85rem 1.75rem",
                  background: "transparent",
                  color: T.textMuted,
                  border: `1px solid ${T.borderStrong}`,
                  letterSpacing: "0.03em",
                }}
              >
                See Capabilities
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══════ TRUST BAR ══════ */}
      <div className="container mx-auto">
        <div
          className="text-center bracket-corners"
          style={{
            border: `1px solid ${T.border}`,
            borderTop: "none",
            background: T.bgCard,
            padding: "1.75rem 2rem 0.5rem",
          }}
        >
          <p className="mb-5" style={{ ...mono, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.25em" }}>
            <strong style={{ color: T.text }}>POWERED BY</strong>{" "}
            <span style={{ color: T.gold }}>INDUSTRY-LEADING AI PLATFORMS</span>
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6" style={{ borderTop: `1px solid ${T.border}` }}>
            {TRUST.map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-2 py-4 px-3"
                style={{
                  borderRight: i < TRUST.length - 1 ? `1px solid ${T.border}` : "none",
                  ...mono,
                  fontSize: "0.8rem",
                  color: T.textDim,
                  letterSpacing: "0.02em",
                }}
              >
                <t.icon size={16} strokeWidth={1.5} style={{ opacity: 0.6 }} />
                {t.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ SERVICES PREVIEW ══════ */}
      <div className="container mx-auto py-20">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            tag="Core Capabilities"
            title="What We Build"
            desc="A sample of our most impactful service offerings."
          />
          <Link
            to="/services"
            className="hidden md:inline-flex no-underline items-center gap-1 shrink-0 mb-10"
            style={{ ...mono, fontSize: "0.72rem", color: T.gold, letterSpacing: "0.05em" }}
          >
            View All Services <ChevronRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {preview.map((s, i) => {
            const Icon = ICON_MAP[s.iconName] ?? Layers;
            return (
              <Reveal key={s._id} delay={i * 70}>
                <div
                  className="h-full p-8 md:p-10 transition-colors duration-300 hover-card bracket-corners"
                  style={{
                    border: `1px solid ${T.border}`,
                    marginRight: -1,
                    marginBottom: -1,
                    background: T.bgCard,
                  }}
                >
                  <IconBox>
                    <Icon size={22} stroke={T.gold} strokeWidth={1.5} />
                  </IconBox>
                  <p
                    className="mb-4"
                    style={{ ...mono, fontSize: "0.65rem", color: T.gold, letterSpacing: "0.2em" }}
                  >
                    [{s.num}]
                  </p>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: T.text }}>{s.title}</h3>
                  <p
                    className="mb-5"
                    style={{ ...mono, fontSize: "0.78rem", lineHeight: 1.7, color: T.textDim }}
                  >
                    {s.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-6 md:hidden">
          <Link
            to="/services"
            className="no-underline inline-flex items-center gap-1"
            style={{ ...mono, fontSize: "0.72rem", color: T.gold, letterSpacing: "0.05em" }}
          >
            View All Services <ChevronRight size={12} />
          </Link>
        </div>
      </div>

      <Divider />

      {/* ══════ PROCESS TEASER ══════ */}
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              tag="Deployment Pipeline"
              title="From Concept to Production"
              desc="Projects with no surprises. Agile development, comprehensive testing, and monitored deployment in 4–8 weeks."
            />
            <Link
              to="/process"
              className="no-underline inline-flex items-center gap-1 mt-4"
              style={{ ...mono, fontSize: "0.72rem", color: T.gold, letterSpacing: "0.05em" }}
            >
              See How We Work <ChevronRight size={12} />
            </Link>
          </div>
          <div
            className="p-8 bracket-corners"
            style={{ border: `1px solid ${T.border}`, background: T.bgCard }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "01", label: "Discovery" },
                { num: "02", label: "Architecture" },
                { num: "03", label: "Build & Iterate" },
                { num: "04", label: "Deploy & Support" },
              ].map((step) => (
                <div
                  key={step.num}
                  className="p-4"
                  style={{ border: `1px solid ${T.border}` }}
                >
                  <div
                    style={{
                      ...mono,
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: T.gold,
                      opacity: 0.15,
                      lineHeight: 1,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {step.num}
                  </div>
                  <p className="font-semibold text-sm" style={{ color: T.text }}>{step.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ══════ CTA ══════ */}
      <div className="container mx-auto py-20">
        <BracketFrame
          className="text-center relative overflow-hidden"
          style={{ border: `1px solid ${T.border}`, background: T.bgCard, padding: "5rem 2rem" }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ border: `1px solid ${T.border}` }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ border: `1px solid ${T.border}` }}
          />
          <h2
            className="relative z-10 mb-5"
            style={{
              ...cormorant,
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 500,
              lineHeight: 1.15,
              color: T.text,
            }}
          >
            Ready to forge your<br />AI infrastructure?
          </h2>
          <p
            className="relative z-10 max-w-[520px] mx-auto mb-10"
            style={{ ...mono, fontSize: "0.8rem", color: T.textMuted, lineHeight: 1.7 }}
          >
            Schedule a free 30-minute assessment. We'll identify 3–5 AI opportunities in your
            business, provide estimates, and give you a clear path forward.
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="no-underline inline-flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                ...mono,
                fontSize: "0.78rem",
                fontWeight: 500,
                padding: "0.85rem 1.75rem",
                background: T.gold,
                color: T.bg,
                border: `1px solid ${T.gold}`,
                letterSpacing: "0.03em",
              }}
            >
              Schedule Consultation <ChevronRight size={14} />
            </Link>
            <a
              href="https://linkedin.com/in/jacobroman"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline inline-flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                ...mono,
                fontSize: "0.78rem",
                fontWeight: 500,
                padding: "0.85rem 1.75rem",
                background: "transparent",
                color: T.textMuted,
                border: `1px solid ${T.borderStrong}`,
                letterSpacing: "0.03em",
              }}
            >
              Connect on LinkedIn
            </a>
          </div>
        </BracketFrame>
      </div>
    </div>
  );
}
