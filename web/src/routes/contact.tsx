import { useState } from "react";
import {
  T,
  mono,
  cormorant,
  dm,
  BracketFrame,
  SectionHeader,
} from "../components/design";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.details || data.error || "Failed to send message");
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputStyle: React.CSSProperties = {
    ...mono,
    fontSize: "0.8rem",
    width: "100%",
    background: T.bg,
    border: `1px solid ${T.border}`,
    color: T.text,
    padding: "0.75rem 1rem",
    outline: "none",
    letterSpacing: "0.02em",
  };

  const labelStyle: React.CSSProperties = {
    ...mono,
    fontSize: "0.65rem",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: T.gold,
    display: "block",
    marginBottom: "0.5rem",
  };

  return (
    <div>
      {/* ══════ PAGE HERO ══════ */}
      <div className="container mx-auto mt-2 py-20">
        <SectionHeader
          tag="Get In Touch"
          title="Let's forge your AI infrastructure"
          desc="Schedule a free 30-minute assessment. We'll identify 3–5 AI opportunities in your business, provide estimates, and give you a clear path forward."
        />
      </div>

      {/* ══════ FORM + INFO ══════ */}
      <div className="container mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Contact Info Panel */}
          <div
            className="p-8 lg:p-10 bracket-corners"
            style={{
              border: `1px solid ${T.border}`,
              background: T.bgCard,
              borderRight: "none",
            }}
          >
            <div className="mb-8">
              <p
                style={{
                  ...mono,
                  fontSize: "0.65rem",
                  color: T.gold,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Direct Contact
              </p>
              {[
                {
                  label: "Email",
                  value: "jacob@romanforge.dev",
                  href: "mailto:jacob@romanforge.dev",
                },
                {
                  label: "Phone",
                  value: "(810) 692-0143",
                  href: "tel:810-692-0143",
                },
                {
                  label: "Location",
                  value: "Lansing, Michigan",
                  href: undefined,
                },
              ].map((item) => (
                <div key={item.label} className="mb-5">
                  <p
                    style={{
                      ...mono,
                      fontSize: "0.6rem",
                      color: T.textDim,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="no-underline"
                      style={{ ...dm, fontSize: "0.85rem", color: T.text }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ ...dm, fontSize: "0.85rem", color: T.text }}>
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{ borderTop: `1px solid ${T.border}`, paddingTop: "2rem" }}
            >
              <p
                style={{
                  ...mono,
                  fontSize: "0.65rem",
                  color: T.gold,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Connect
              </p>
              {[
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/jacobroman",
                },
                { label: "Facebook", href: "https://facebook.com/profile.php?id=61575806189799" },
                { label: "X", href: "https://x.com/romanforge" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline mb-2"
                  style={{
                    ...mono,
                    fontSize: "0.75rem",
                    color: T.textMuted,
                    letterSpacing: "0.05em",
                  }}
                >
                  {link.label} →
                </a>
              ))}
            </div>

            {/* Response time note */}
            <div
              className="mt-8 p-4"
              style={{ border: `1px solid ${T.border}`, background: T.bg }}
            >
              <p
                style={{
                  ...mono,
                  fontSize: "0.65rem",
                  color: T.gold,
                  letterSpacing: "0.1em",
                  marginBottom: "0.5rem",
                }}
              >
                RESPONSE TIME
              </p>
              <p
                style={{
                  ...mono,
                  fontSize: "0.72rem",
                  color: T.textDim,
                  lineHeight: 1.6,
                }}
              >
                We respond to all inquiries within 24 hours on business days.
              </p>
            </div>
          </div>

          {/* Form Panel */}
          <div
            className="lg:col-span-2 bracket-corners"
            style={{ border: `1px solid ${T.border}`, background: T.bgCard }}
          >
            <BracketFrame style={{ padding: "2.5rem md:3rem" }}>
              <div className="p-8 md:p-10">
                {status === "success" ? (
                  <div className="text-center py-16">
                    <div
                      style={{
                        ...cormorant,
                        fontSize: "3rem",
                        color: T.gold,
                        marginBottom: "1rem",
                      }}
                    >
                      ✓
                    </div>
                    <h3
                      className="mb-3"
                      style={{
                        ...cormorant,
                        fontSize: "2rem",
                        fontWeight: 500,
                        color: T.text,
                      }}
                    >
                      Message Sent
                    </h3>
                    <p
                      style={{
                        ...mono,
                        fontSize: "0.8rem",
                        color: T.textDim,
                        lineHeight: 1.7,
                      }}
                    >
                      Thank you for reaching out. We'll be in touch within 24
                      hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-8 cursor-pointer"
                      style={{
                        ...mono,
                        fontSize: "0.72rem",
                        color: T.gold,
                        background: "transparent",
                        border: `1px solid ${T.border}`,
                        padding: "0.6rem 1.4rem",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="firstName" style={labelStyle}>
                          First Name *
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          autoComplete="given-name"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" style={labelStyle}>
                          Last Name *
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          autoComplete="family-name"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="email" style={labelStyle}>
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        style={inputStyle}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="company" style={labelStyle}>
                          Company *
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          autoComplete="organization"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" style={labelStyle}>
                          Phone{" "}
                          <span
                            style={{
                              color: T.textDim,
                              textTransform: "none",
                              fontSize: "0.6rem",
                            }}
                          >
                            (optional)
                          </span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          autoComplete="tel"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="message" style={labelStyle}>
                        How Can We Help? *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        maxLength={1000}
                        style={{ ...inputStyle, resize: "vertical" }}
                      />
                    </div>

                    {status === "error" && (
                      <p
                        className="mb-4"
                        style={{
                          ...mono,
                          fontSize: "0.72rem",
                          color: "#e87070",
                          border: `1px solid rgba(232,112,112,0.3)`,
                          padding: "0.75rem 1rem",
                        }}
                      >
                        Something went wrong. Please try again or email us
                        directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full cursor-pointer transition-all duration-200"
                      style={{
                        ...mono,
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        padding: "1rem 1.75rem",
                        background:
                          status === "loading" ? T.bgElevated : T.gold,
                        color: status === "loading" ? T.textDim : T.bg,
                        border: `1px solid ${T.gold}`,
                        letterSpacing: "0.05em",
                        cursor:
                          status === "loading" ? "not-allowed" : "pointer",
                      }}
                    >
                      {status === "loading" ? "Sending..." : "Send Message →"}
                    </button>
                  </form>
                )}
              </div>
            </BracketFrame>
          </div>
        </div>
      </div>
    </div>
  );
}
