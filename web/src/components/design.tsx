import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════
   BRAND TOKENS (CSS custom-property backed)
═══════════════════════════════════════════ */

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export const T = {
  gold: "var(--gold)",
  goldDim: "var(--gold-dim)",
  teal: "var(--teal)",
  bg: "var(--bg)",
  bgCard: "var(--bg-card)",
  bgElevated: "var(--bg-elevated)",
  border: "var(--border)",
  borderStrong: "var(--border-strong)",
  text: "var(--text)",
  textMuted: "var(--text-muted)",
  textDim: "var(--text-dim)",
  accent: "var(--accent)",
};

/* ═══════════════════════════════════════════
   FONT HELPERS
═══════════════════════════════════════════ */
export const cormorant: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif" };
export const mono: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
export const dm: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif" };

/* ═══════════════════════════════════════════
   BRACKET FRAME COMPONENT
═══════════════════════════════════════════ */
export function BracketFrame({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const c = T.goldDim;
  const shared = "absolute w-4 h-4 pointer-events-none";
  return (
    <div className={`relative ${className}`} style={style}>
      <span
        className={`${shared} top-[-1px] left-[-1px]`}
        style={{ borderTop: `1px solid ${c}`, borderLeft: `1px solid ${c}` }}
      />
      <span
        className={`${shared} top-[-1px] right-[-1px]`}
        style={{ borderTop: `1px solid ${c}`, borderRight: `1px solid ${c}` }}
      />
      <span
        className={`${shared} bottom-[-1px] left-[-1px]`}
        style={{ borderBottom: `1px solid ${c}`, borderLeft: `1px solid ${c}` }}
      />
      <span
        className={`${shared} bottom-[-1px] right-[-1px]`}
        style={{ borderBottom: `1px solid ${c}`, borderRight: `1px solid ${c}` }}
      />
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCROLL REVEAL HOOK
═══════════════════════════════════════════ */
export function useReveal(): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`h-full ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION HEADER COMPONENT
═══════════════════════════════════════════ */
export function SectionHeader({
  tag,
  title,
  desc,
  center = false,
}: {
  tag: string;
  title: string;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center mb-14" : "mb-10"}>
      <div
        className={`flex items-center gap-2 mb-4 text-[0.65rem] uppercase tracking-[0.25em] ${center ? "justify-center" : ""}`}
        style={{ ...mono, color: T.gold }}
      >
        <span className="w-6 h-px" style={{ background: T.gold }} />
        {tag}
      </div>
      <h2
        className={`text-5xl font-medium leading-tight mb-4 tracking-tight ${center ? "max-w-[650px] mx-auto" : ""}`}
        style={{ ...cormorant, color: T.text }}
      >
        {title}
      </h2>
      {desc && (
        <p
          className={`text-[0.8rem] leading-relaxed max-w-[700px] ${center ? "mx-auto" : ""}`}
          style={{ ...mono, color: T.textMuted, lineHeight: 1.7 }}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   DIVIDER COMPONENT
═══════════════════════════════════════════ */
export function Divider() {
  return (
    <div className="container mx-auto">
      <hr style={{ border: "none", borderTop: `1px solid ${T.border}` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   DOT CANVAS (Hero particles)
═══════════════════════════════════════════ */

function getGoldRgb(): [number, number, number] {
  const hex = getComputedStyle(document.documentElement).getPropertyValue("--gold").trim();
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

export function DotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<
    Array<{
      x: number;
      y: number;
      baseAlpha: number;
      size: number;
      phase: number;
      speed: number;
    }>
  >([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | null>(null);
  const goldRef = useRef<[number, number, number]>(getGoldRgb());

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    goldRef.current = getGoldRgb();
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const w = canvas.width;
    const h = canvas.height;
    const spacing = 14;
    const dots: typeof dotsRef.current = [];
    const cols = Math.ceil(w / spacing);
    const rows = Math.ceil(h / spacing);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * spacing + spacing / 2;
        const y = r * spacing + spacing / 2;
        const dist = Math.sqrt((x - w) ** 2 + y ** 2) / Math.sqrt(w * w + h * h);
        const prob = Math.max(0, 1 - dist * 1.6);
        if (Math.random() < prob) {
          dots.push({
            x,
            y,
            baseAlpha: Math.max(0.05, prob * 0.7 * (0.5 + Math.random() * 0.5)),
            size: 1.2 + Math.random() * 0.8,
            phase: Math.random() * Math.PI * 2,
            speed: 0.003 + Math.random() * 0.006,
          });
        }
      }
    }
    dotsRef.current = dots;
  }, []);

  useEffect(() => {
    init();
    window.addEventListener("resize", init);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    const draw = (time: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const mouse = mouseRef.current;
      const [R, G, B] = goldRef.current;
      for (const dot of dotsRef.current) {
        const flicker = 0.7 + 0.3 * Math.sin(time * dot.speed + dot.phase);
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const glow = d < 120 ? (1 - d / 120) * 0.5 : 0;
        const alpha = Math.min(1, dot.baseAlpha * flicker + glow);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size + glow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${R},${G},${B},${alpha})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    // Re-read gold color when theme changes
    const obs = new MutationObserver(() => {
      goldRef.current = getGoldRgb();
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      window.removeEventListener("resize", init);
      obs.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [init]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }}
      onMouseLeave={() => {
        mouseRef.current = { x: -1000, y: -1000 };
      }}
      style={{ pointerEvents: "auto" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

/* ═══════════════════════════════════════════
   ICON BOX
═══════════════════════════════════════════ */
export function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-[52px] h-[52px] flex items-center justify-center mb-6 relative"
      style={{ border: `1px solid ${T.borderStrong}`, background: T.bg }}
    >
      <div
        className="absolute inset-1"
        style={{
          backgroundImage: `linear-gradient(${T.border} 1px, transparent 1px), linear-gradient(90deg, ${T.border} 1px, transparent 1px)`,
          backgroundSize: "6px 6px",
          opacity: 0.5,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
