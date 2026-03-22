import { useState } from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { Menu, X, Sun, Moon } from "lucide-react";
import { T, mono, dm, BracketFrame } from "./design";
import { useThemeToggle } from "../lib/theme";

const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
] as const;

const FOOTER_SERVICES = [
  "Conversational AI",
  "Analytics",
  "Automation",
  "Content AI",
  "Knowledge Systems",
  "Strategy",
];

const FOOTER_COMPANY = [
  { to: "/about", label: "About" },
  { to: "/process", label: "Process" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

const FOOTER_CONNECT = [
  { href: "mailto:jacob@romanforge.dev", label: "contact@romanforge.dev" },
  { href: "https://linkedin.com/in/jacobroman", label: "LinkedIn" },
  { href: "https://facebook.com/profile.php?id=61575806189799", label: "Facebook" },
  { href: "https://x.com/romanforge", label: "X" },
  { href: "tel:810-692-0143", label: "(810) 692-0143" },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useThemeToggle();

  return (
    <div style={{ background: T.bg, color: T.text, ...dm, minHeight: "100vh" }}>
      {/* ── Background Grid ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      {/* ── Content ── */}
      <div className="relative z-10">
        {/* ══════ NAVBAR ══════ */}
        <div className="container mx-auto pt-4">
          <BracketFrame>
            <div
              className="flex justify-between items-center px-5 py-3.5"
              style={{ border: `1px solid ${T.border}`, background: T.bgCard }}
            >
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2.5 no-underline"
                onClick={() => setMenuOpen(false)}
              >
                <img
                  src={theme === "dark" ? "/new-logo.png" : "/roman-forge-green.svg"}
                  alt="Roman Forge"
                  width={126}
                />
              </Link>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center">
                {NAV_LINKS.map(({ to, label }, i) => (
                  <span key={to} className="flex items-center">
                    {i > 0 && (
                      <span
                        className="mx-4 select-none"
                        style={{
                          ...mono,
                          fontSize: "0.75rem",
                          color: T.textDim,
                          opacity: 0.5,
                        }}
                      >
                        /
                      </span>
                    )}
                    <Link
                      to={to}
                      className="py-1 transition-colors duration-200 no-underline"
                      style={{
                        ...mono,
                        fontSize: "0.75rem",
                        color: T.textMuted,
                        letterSpacing: "0.03em",
                      }}
                      activeProps={{
                        style: {
                          ...mono,
                          fontSize: "0.75rem",
                          color: T.gold,
                          letterSpacing: "0.03em",
                        },
                      }}
                    >
                      {label}
                    </Link>
                  </span>
                ))}
                <button
                  onClick={() =>
                    (window as any).Calendly?.initPopupWidget({
                      url: "https://calendly.com/jacobroman1115/30min",
                    })
                  }
                  className="ml-6 cursor-pointer transition-all duration-200 inline-block"
                  style={{
                    ...mono,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: T.bg,
                    background: T.gold,
                    border: `1px solid ${T.gold}`,
                    padding: "0.6rem 1.4rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Book a Call
                </button>
                <Link
                  to="/contact"
                  className="ml-3 no-underline transition-all duration-200 inline-block"
                  style={{
                    ...mono,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: T.gold,
                    background: "transparent",
                    border: `1px solid ${T.gold}`,
                    padding: "0.6rem 1.4rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Contact Us
                </Link>
                <button
                  onClick={toggle}
                  className="ml-3 bg-transparent cursor-pointer p-2 transition-colors duration-200"
                  style={{ border: `1px solid ${T.border}`, color: T.gold }}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>

              {/* Mobile toggle */}
              <div className="md:hidden flex items-center gap-2">
                <button
                  onClick={toggle}
                  className="bg-transparent cursor-pointer p-1.5"
                  style={{ border: `1px solid ${T.border}`, color: T.gold }}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button
                  className="bg-transparent cursor-pointer p-1.5"
                  style={{ border: `1px solid ${T.border}`, color: T.gold }}
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
              <div
                className="md:hidden flex flex-col gap-1 p-4"
                style={{
                  background: T.bgCard,
                  borderTop: `1px solid ${T.border}`,
                }}
              >
                {[
                  ...NAV_LINKS,
                  { to: "/contact" as const, label: "Contact" },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className="no-underline py-2 text-left"
                    style={{ ...mono, fontSize: "0.8rem", color: T.textMuted }}
                  >
                    {label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    (window as any).Calendly?.initPopupWidget({
                      url: "https://calendly.com/jacobroman1115/30min",
                    });
                  }}
                  className="cursor-pointer text-left py-2 bg-transparent"
                  style={{ ...mono, fontSize: "0.8rem", color: T.gold, border: "none", padding: "0.5rem 0" }}
                >
                  Book a Call
                </button>
              </div>
            )}
          </BracketFrame>
        </div>

        {/* ══════ PAGE CONTENT ══════ */}
        <Outlet />

        {/* ══════ FOOTER ══════ */}
        <div className="container mx-auto pb-8">
          <div
            className="p-8 md:p-12 bracket-corners"
            style={{ border: `1px solid ${T.border}`, background: T.bgCard }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              <div>
                <h4
                  className="mb-4"
                  style={{
                    ...mono,
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    color: T.gold,
                  }}
                >
                  Roman Forge
                </h4>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: T.textDim,
                    lineHeight: 1.9,
                  }}
                >
                  AI integration architecture for modern business.
                  Production-grade implementations with 10+ years of engineering
                  expertise.
                </p>
                <p
                  className="mt-1"
                  style={{ fontSize: "0.8rem", color: T.textDim }}
                >
                  Based in Lansing, Michigan.
                </p>
              </div>
              <div>
                <h4
                  className="mb-4"
                  style={{
                    ...mono,
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    color: T.gold,
                  }}
                >
                  Services
                </h4>
                {FOOTER_SERVICES.map((s) => (
                  <Link
                    key={s}
                    to="/services"
                    className="block no-underline transition-colors duration-200"
                    style={{
                      fontSize: "0.8rem",
                      color: T.textDim,
                      lineHeight: 1.9,
                    }}
                  >
                    {s}
                  </Link>
                ))}
              </div>
              <div>
                <h4
                  className="mb-4"
                  style={{
                    ...mono,
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    color: T.gold,
                  }}
                >
                  Company
                </h4>
                {FOOTER_COMPANY.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="block no-underline transition-colors duration-200"
                    style={{
                      fontSize: "0.8rem",
                      color: T.textDim,
                      lineHeight: 1.9,
                    }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div>
                <h4
                  className="mb-4"
                  style={{
                    ...mono,
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    color: T.gold,
                  }}
                >
                  Connect
                </h4>
                {FOOTER_CONNECT.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block no-underline transition-colors duration-200"
                    style={{
                      fontSize: "0.8rem",
                      color: T.textDim,
                      lineHeight: 1.9,
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div
              className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-5"
              style={{ borderTop: `1px solid ${T.border}` }}
            >
              <span
                style={{
                  ...mono,
                  fontSize: "0.6rem",
                  color: T.textDim,
                  letterSpacing: "0.05em",
                }}
              >
                © 2025 ROMAN FORGE · ALL RIGHTS RESERVED
              </span>
              <div className="flex gap-6">
                {[
                  ["https://linkedin.com/in/jacobroman", "LINKEDIN"],
                  ["https://facebook.com/profile.php?id=61575806189799", "FACEBOOK"],
                  ["https://x.com/romanforge", "X"],
                ].map(([href, label]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline transition-colors duration-200"
                    style={{
                      ...mono,
                      fontSize: "0.6rem",
                      color: T.textDim,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
