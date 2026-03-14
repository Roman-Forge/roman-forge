import { T, mono, cormorant, dm, BracketFrame, SectionHeader, Divider } from "../components/design";

const VALUES = [
  "Craftsmanship over speed",
  "Transparency over mystique",
  "Results over hype",
  "Partnership over transactions",
];

export default function AboutPage() {
  return (
    <div>
      {/* ══════ PAGE HERO ══════ */}
      <div className="container mx-auto mt-2 py-20">
        <SectionHeader
          tag="Who We Are"
          title="Classical craftsmanship meets cutting-edge AI"
          desc="Built on a belief that software infrastructure should stand the test of time — just as Roman engineering stood for millennia through precision and quality materials."
        />
      </div>

      {/* ══════ ABOUT CONTENT ══════ */}
      <div className="container mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* RF Monogram Panel */}
          <BracketFrame
            className="hidden lg:flex aspect-square flex-col justify-center items-center text-center relative overflow-hidden"
            style={{ border: `1px solid ${T.border}`, background: T.bgCard, padding: "3rem" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(45deg, transparent 48%, ${T.border} 48%, ${T.border} 52%, transparent 52%)`,
                backgroundSize: "20px 20px",
                opacity: 0.3,
              }}
            />
            {/* Founder portrait if available */}
            <img
              src="/roman-portrait.jpg"
              alt="Jacob Roman — Founder"
              className="relative z-10 w-48 h-48 object-cover rounded-full mb-6"
              style={{ border: `2px solid ${T.borderStrong}` }}
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const fallback = img.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            {/* Fallback monogram (hidden by default, shown if portrait fails) */}
            <div
              className="relative z-10 flex-col items-center justify-center"
              style={{ display: "none" }}
            >
              <div
                style={{
                  ...cormorant,
                  fontSize: "7rem",
                  fontWeight: 700,
                  color: T.gold,
                  opacity: 0.08,
                  lineHeight: 1,
                }}
              >
                RF
              </div>
            </div>
            <div
              className="relative z-10 mt-4"
              style={{
                ...mono,
                fontSize: "0.65rem",
                color: T.gold,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              Est. 2025 · Lansing, Michigan
            </div>
          </BracketFrame>

          {/* Narrative */}
          <div>
            <p
              className="mb-4"
              style={{ ...dm, fontSize: "0.95rem", lineHeight: 1.8, color: T.textMuted }}
            >
              Roman Forge was founded on a simple belief: AI infrastructure should be built to last.
              Just as Roman engineering stood for millennia through precision and quality materials,
              we build software systems with the same enduring principles.
            </p>
            <p
              className="mb-6"
              style={{ ...dm, fontSize: "0.95rem", lineHeight: 1.8, color: T.textMuted }}
            >
              We're engineers with 10+ years building production software for enterprise
              clients — now focused entirely on making AI accessible and profitable for small and
              medium businesses. Based in Lansing, Michigan, we serve clients nationwide.
            </p>
            <p
              className="mb-8"
              style={{ ...dm, fontSize: "0.95rem", lineHeight: 1.8, color: T.textMuted }}
            >
              Every project we take on is documented and delivered with 30 days of
              post-launch support included. No scope creep. No surprises.
            </p>

            {/* Values */}
            <div
              className="pt-6"
              style={{ borderTop: `1px solid ${T.border}` }}
            >
              <p
                className="mb-4"
                style={{ ...mono, fontSize: "0.65rem", color: T.gold, letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                Core Values
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VALUES.map((v) => (
                  <div
                    key={v}
                    className="flex items-center gap-2.5 py-2"
                    style={{ ...mono, fontSize: "0.72rem", color: T.textMuted }}
                  >
                    <div className="w-1.5 h-1.5 flex-shrink-0 rotate-45" style={{ background: T.gold }} />
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ══════ STATS ══════ */}
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { num: "10+", label: "Years Experience" },
            { num: "4–8", label: "Weeks to Deploy" },
            { num: "100%", label: "Client Satisfaction" },
            { num: "30", label: "Days Post-Launch Support" },
          ].map((stat, i) => (
            <div
              key={i}
              className="h-full p-8 text-center bracket-corners"
              style={{ border: `1px solid ${T.border}`, marginRight: -1, background: T.bgCard }}
            >
              <div
                style={{
                  ...cormorant,
                  fontSize: "3rem",
                  fontWeight: 600,
                  color: T.gold,
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {stat.num}
              </div>
              <p style={{ ...mono, fontSize: "0.65rem", color: T.textDim, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
