import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, MessageSquare, LayoutDashboard, Shuffle, FileText, Search, Layers } from "lucide-react";
import {
  T,
  mono,
  cormorant,
  SectionHeader,
  Reveal,
  IconBox,
  Divider,
  BracketFrame,
} from "../components/design";
import {
  getServices,
  getIndustries,
  getFAQ,
  type Service,
  type Industry,
  type FAQItem,
} from "../lib/sanity";

const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare,
  LayoutDashboard,
  Shuffle,
  FileText,
  Search,
  Layers,
};

const FALLBACK_SERVICES: Service[] = [
  { _id: "f1", num: "01", title: "Conversational AI Systems", iconName: "MessageSquare", description: "Custom chatbots trained on your business data with RAG architecture. 24/7 customer support, lead qualification, and CRM integration.", slug: { current: "conversational-ai" }, order: 1 },
  { _id: "f2", num: "02", title: "Analytics & Dashboards", iconName: "LayoutDashboard", description: "Real-time data visualization with AI-powered predictive analytics. Custom React dashboards with live API integration and alerting.", slug: { current: "analytics" }, order: 2 },
  { _id: "f3", num: "03", title: "Intelligent Automation", iconName: "Shuffle", description: "Document processing, data extraction, and workflow automation using function-calling and LLM orchestration. Eliminate manual data entry.", slug: { current: "automation" }, order: 3 },
  { _id: "f4", num: "04", title: "Content Generation Pipelines", iconName: "FileText", description: "Scalable content systems for product descriptions, marketing copy, social media, and email campaigns using fine-tuned prompts.", slug: { current: "content" }, order: 4 },
  { _id: "f5", num: "05", title: "Knowledge Base Systems", iconName: "Search", description: "Vector-based semantic search across your documents. Employee training, policy Q&A, customer self-service portals with embeddings.", slug: { current: "knowledge" }, order: 5 },
  { _id: "f6", num: "06", title: "AI Strategy & Architecture", iconName: "Layers", description: "Technical feasibility assessment, ROI analysis, system architecture design, and implementation roadmap for AI transformation.", slug: { current: "strategy" }, order: 6 },
];

const FALLBACK_INDUSTRIES: Industry[] = [
  { _id: "i1", icon: "⚖", title: "Professional Services", description: "Law firms, consulting, and accounting. Automate document review, client intake, and research workflows.", order: 1 },
  { _id: "i2", icon: "🏥", title: "Healthcare", description: "Dental, medical, and therapy practices. Streamline patient communication, scheduling, and records.", order: 2 },
  { _id: "i3", icon: "🏢", title: "Real Estate", description: "Brokerages and property management. Lead qualification, listing automation, and market analytics.", order: 3 },
  { _id: "i4", icon: "🏭", title: "Manufacturing", description: "Factories and distributors. Predictive maintenance, quality control, and supply chain optimization.", order: 4 },
  { _id: "i5", icon: "🍽", title: "Hospitality", description: "Restaurants, catering, and events. Customer service automation, inventory, and review analysis.", order: 5 },
  { _id: "i6", icon: "🛒", title: "E-commerce", description: "Online retailers and DTC brands. Product descriptions, customer support, and recommendation engines.", order: 6 },
];

const FALLBACK_FAQ: FAQItem[] = [
  { _id: "q1", question: "How long does a typical project take?", answer: "Most implementations take 4–8 weeks from discovery to deployment. Strategy assessments are completed in 1 week with detailed timelines before any work begins.", order: 1 },
  { _id: "q2", question: "What kind of ROI can I expect?", answer: "We target measurable ROI within 90 days. Typical results include significant time savings per week, reduced operational costs, and measurable revenue lift from automation.", order: 2 },
  { _id: "q3", question: "Do you work outside Michigan?", answer: "Yes. We're based in Lansing and love local businesses, but serve clients nationwide. Remote collaboration works well for most AI implementation projects.", order: 3 },
  { _id: "q4", question: "What if AI technology changes?", answer: "We build abstraction layers that allow easy model swapping. When better models launch, we upgrade your system without rebuilding from scratch.", order: 4 },
  { _id: "q5", question: "Can I start small?", answer: "Absolutely. Our strategy assessment is a low-risk entry point. We identify the highest-impact AI opportunities and give you a clear roadmap.", order: 5 },
  { _id: "q6", question: "What's in post-launch support?", answer: "30 days of bug fixes, performance monitoring, and adjustments included. After that, retainer plans provide ongoing optimization and new features.", order: 6 },
];

const TECH = [
  { title: "Frontend & Backend", tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python", "Express", "GraphQL"] },
  { title: "AI & Machine Learning", tags: ["GPT-4", "Claude", "Gemini", "LangChain", "RAG", "Embeddings", "Function Calling", "Fine-tuning"] },
  { title: "Data & Storage", tags: ["Pinecone", "Weaviate", "Supabase", "PostgreSQL", "Redis", "Vector DBs"] },
  { title: "Infrastructure & DevOps", tags: ["Vercel", "AWS", "Google Cloud", "Docker", "GitHub Actions", "Sentry", "Mixpanel"] },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [faq, setFaq] = useState<FAQItem[]>([]);

  useEffect(() => {
    getServices().then((d) => { if (d?.length) setServices(d); });
    getIndustries().then((d) => { if (d?.length) setIndustries(d); });
    getFAQ().then((d) => { if (d?.length) setFaq(d); });
  }, []);

  const displayServices = services.length ? services : FALLBACK_SERVICES;
  const displayIndustries = industries.length ? industries : FALLBACK_INDUSTRIES;
  const displayFaq = faq.length ? faq : FALLBACK_FAQ;

  return (
    <div>
      {/* ══════ PAGE HERO ══════ */}
      <div className="container mx-auto mt-2 py-20">
        <SectionHeader
          center
          tag="Core Capabilities"
          title="What We Build"
          desc="Production-ready AI systems, automation, and knowledge infrastructure that replace months of manual operations."
        />
      </div>

      {/* ══════ SERVICES GRID ══════ */}
      <div className="container mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {displayServices.map((s, i) => {
            const Icon = ICON_MAP[s.iconName] ?? Layers;
            return (
              <Reveal key={s._id} delay={i * 70}>
                <div
                  className="h-full p-8 md:p-10 transition-colors duration-300 hover-card bracket-corners"
                  style={{ border: `1px solid ${T.border}`, marginRight: -1, marginBottom: -1, background: T.bgCard }}
                >
                  <IconBox><Icon size={22} stroke={T.gold} strokeWidth={1.5} /></IconBox>
                  <p className="mb-4" style={{ ...mono, fontSize: "0.65rem", color: T.gold, letterSpacing: "0.2em" }}>[{s.num}]</p>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: T.text }}>{s.title}</h3>
                  <p className="mb-5" style={{ ...mono, fontSize: "0.78rem", lineHeight: 1.7, color: T.textDim }}>{s.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Divider />

      {/* ══════ INDUSTRIES ══════ */}
      <div className="container mx-auto py-20">
        <SectionHeader center tag="Industries We Serve" title="AI Solutions for Your Sector" desc="We work with businesses of 10–250 employees, solving real operational challenges with practical AI implementations." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {displayIndustries.map((ind, i) => (
            <Reveal key={ind._id} delay={i * 70}>
              <div className="h-full transition-colors duration-300 hover-card bracket-corners" style={{ padding: "2rem 1.75rem", border: `1px solid ${T.border}`, marginRight: -1, marginBottom: -1, background: T.bgCard }}>
                <div className="text-xl mb-3">{ind.icon}</div>
                <h3 className="text-base font-semibold mb-2" style={{ color: T.text }}>{ind.title}</h3>
                <p style={{ ...mono, fontSize: "0.72rem", color: T.textDim, lineHeight: 1.7 }}>{ind.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══════ TECH STACK ══════ */}
      <div className="container mx-auto py-20">
        <SectionHeader center tag="Technology Stack" title="Production-Grade Infrastructure" desc="The same tools and frameworks that power the world's most advanced AI applications—scaled to fit your business." />
        <div className="grid grid-cols-1 md:grid-cols-2">
          {TECH.map((cat, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="h-full bracket-corners" style={{ padding: "2rem", border: `1px solid ${T.border}`, marginRight: -1, marginBottom: -1, background: T.bgCard }}>
                <p className="mb-4 pb-3" style={{ ...mono, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", color: T.gold, borderBottom: `1px solid ${T.border}` }}>{cat.title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.tags.map((tag) => (
                    <span key={tag} style={{ ...mono, fontSize: "0.65rem", padding: "0.35rem 0.7rem", border: `1px solid ${T.border}`, color: T.textDim, letterSpacing: "0.03em" }}>{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══════ FAQ ══════ */}
      <div className="container mx-auto py-20">
        <SectionHeader center tag="Common Questions" title="Everything You Need to Know" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          {displayFaq.map((f, i) => (
            <Reveal key={f._id} delay={i * 70}>
              <div className="h-full transition-colors duration-300 hover-card bracket-corners" style={{ padding: "2rem", border: `1px solid ${T.border}`, marginRight: -1, marginBottom: -1, background: T.bgCard }}>
                <h3 className="text-base font-semibold mb-2" style={{ color: T.text }}>{f.question}</h3>
                <p style={{ ...mono, fontSize: "0.72rem", lineHeight: 1.7, color: T.textDim }}>{f.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ══════ CTA ══════ */}
      <div className="container mx-auto pb-20">
        <BracketFrame
          className="text-center relative overflow-hidden"
          style={{ border: `1px solid ${T.border}`, background: T.bgCard, padding: "4rem 2rem" }}
        >
          <h2 className="relative z-10 mb-5" style={{ ...cormorant, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.15, color: T.text }}>
            Ready to get started?
          </h2>
          <p className="relative z-10 max-w-[480px] mx-auto mb-8" style={{ ...mono, fontSize: "0.8rem", color: T.textMuted, lineHeight: 1.7 }}>
            Schedule a free 30-minute assessment and get a clear AI implementation roadmap.
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
