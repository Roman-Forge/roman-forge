import { useEffect, useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Menu, X, Sun, Moon } from "lucide-react";
import { T, mono, dm, BracketFrame } from "./design";
import { useThemeToggle } from "../lib/theme";
import { useSanity } from "./SanityProvider";
import { applySeo } from "../lib/seo";
import AssessmentCta from "./AssessmentCta";
import {
  CONTACT_EMAIL,
  CONTACT_LOCATION,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "../lib/siteContact";

type NavPath = "/about" | "/services" | "/process" | "/blog" | "/contact";

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

const FOOTER_SOCIAL = [
  { href: "https://linkedin.com/in/jacobroman", label: "LinkedIn" },
  { href: "https://facebook.com/profile.php?id=61575806189799", label: "Facebook" },
  { href: "https://x.com/romanforge", label: "X" },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useThemeToggle();
  const { posts } = useSanity();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    applySeo(pathname);
  }, [pathname]);

  const navLinks: { to: NavPath; label: string }[] = [
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/process", label: "Process" },
  ];
  if (posts.length > 0) navLinks.push({ to: "/blog", label: "Blog" });

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
              <div className="hidden md:flex items-center flex-wrap justify-end gap-y-2">
                {navLinks.map(({ to, label }, i) => (
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
                <AssessmentCta variant="nav" className="ml-6" />
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
                {[...navLinks, { to: "/contact" as const, label: "Contact" }].map(({ to, label }) => (
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
                <AssessmentCta
                  variant="menu"
                  align="start"
                  className="mt-2"
                  onBook={() => setMenuOpen(false)}
                  onQuestion={() => setMenuOpen(false)}
                />
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
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="block no-underline transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ fontSize: "0.8rem", color: T.textDim, lineHeight: 1.9 }}
                >
                  {CONTACT_EMAIL}
                </a>
                <a
                  href={CONTACT_PHONE_HREF}
                  className="block no-underline transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ fontSize: "0.8rem", color: T.textDim, lineHeight: 1.9 }}
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
                <p style={{ fontSize: "0.8rem", color: T.textDim, lineHeight: 1.9 }}>
                  {CONTACT_LOCATION}
                </p>
                {FOOTER_SOCIAL.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block no-underline transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
                suppressHydrationWarning
                style={{
                  ...mono,
                  fontSize: "0.6rem",
                  color: T.textDim,
                  letterSpacing: "0.05em",
                }}
              >
                © {new Date().getFullYear()} ROMAN FORGE · ALL RIGHTS RESERVED
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
