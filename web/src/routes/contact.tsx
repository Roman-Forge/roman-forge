import { useEffect, useId, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  T,
  mono,
  cormorant,
  dm,
  BracketFrame,
  SectionHeader,
} from "../components/design";
import AssessmentCta from "../components/AssessmentCta";
import {
  CONTACT_EMAIL,
  CONTACT_LOCATION,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  REPLY_PROMISE,
  validateQuestion,
  type QuestionErrors,
  type QuestionField,
  type QuestionInput,
} from "../lib/siteContact";

const EMPTY: QuestionInput = { name: "", business: "", email: "", hope: "" };

const FIELDS: { name: QuestionField; label: string; autoComplete: string; multiline?: boolean }[] = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "business", label: "Business", autoComplete: "organization" },
  { name: "email", label: "Email", autoComplete: "email" },
  {
    name: "hope",
    label: "What do you hope AI can help with?",
    autoComplete: "off",
    multiline: true,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<QuestionInput>(EMPTY);
  const [errors, setErrors] = useState<QuestionErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const formId = useId();
  const hash = useRouterState({ select: (state) => state.location.hash });

  useEffect(() => {
    const normalized = hash.replace(/^#/, "");
    if (normalized !== "question") return;
    const el = document.getElementById("question");
    if (!el) return;
    el.scrollIntoView({ block: "start" });
    if (el instanceof HTMLElement) el.focus({ preventScroll: true });
  }, [hash]);

  useEffect(() => {
    if (status === "success") headingRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateQuestion(formData);
    setErrors(result.errors);
    if (!result.ok) {
      setStatus("idle");
      const first = FIELDS.find((field) => result.errors[field.name]);
      if (first) document.getElementById(`${formId}-${first.name}`)?.focus();
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.value),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        if (data.fields && typeof data.fields === "object") setErrors(data.fields);
        throw new Error("send failed");
      }
      setStatus("success");
      setFormData(EMPTY);
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name as QuestionField]) return prev;
      const next = { ...prev };
      delete next[name as QuestionField];
      return next;
    });
  };

  const inputStyle = (invalid: boolean): React.CSSProperties => ({
    ...mono,
    fontSize: "0.8rem",
    width: "100%",
    background: T.bg,
    border: `1px solid ${invalid ? "#e87070" : T.border}`,
    color: T.text,
    padding: "0.75rem 1rem",
    outline: "none",
    letterSpacing: "0.02em",
  });

  const labelStyle: React.CSSProperties = {
    ...mono,
    fontSize: "0.65rem",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: T.gold,
    display: "block",
    marginBottom: "0.5rem",
  };

  const hasFieldErrors = Object.keys(errors).length > 0;

  return (
    <div>
      <div className="container mx-auto mt-2 py-20">
        <SectionHeader
          as="h1"
          tag="Get In Touch"
          title="Let's forge your AI infrastructure"
          desc="Tell us where work piles up. The assessment is free and takes 30 minutes. If a call is too soon, send a question instead."
        />
        <AssessmentCta questionHref="#question" />
      </div>

      <div className="container mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div
            className="p-8 lg:p-10 bracket-corners"
            style={{
              border: `1px solid ${T.border}`,
              background: T.bgCard,
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
                  value: CONTACT_EMAIL,
                  href: `mailto:${CONTACT_EMAIL}`,
                },
                {
                  label: "Phone",
                  value: CONTACT_PHONE_DISPLAY,
                  href: CONTACT_PHONE_HREF,
                },
                {
                  label: "Location",
                  value: CONTACT_LOCATION,
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
                      className="no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ ...dm, fontSize: "0.85rem", color: T.text }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ ...dm, fontSize: "0.85rem", color: T.text }}>{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: "2rem" }}>
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
                { label: "LinkedIn", href: "https://linkedin.com/in/jacobroman" },
                { label: "Facebook", href: "https://facebook.com/profile.php?id=61575806189799" },
                { label: "X", href: "https://x.com/romanforge" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline mb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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

            <div className="mt-8 p-4" style={{ border: `1px solid ${T.border}`, background: T.bg }}>
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
              <p style={{ ...mono, fontSize: "0.72rem", color: T.textDim, lineHeight: 1.6 }}>
                {REPLY_PROMISE}
              </p>
            </div>
          </div>

          <div
            className="lg:col-span-2 bracket-corners"
            style={{ border: `1px solid ${T.border}`, background: T.bgCard }}
          >
            <BracketFrame>
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
                      aria-hidden="true"
                    >
                      ✓
                    </div>
                    <h2
                      ref={headingRef}
                      tabIndex={-1}
                      className="mb-3 focus:outline focus:outline-2 focus:outline-offset-4"
                      style={{
                        ...cormorant,
                        fontSize: "2rem",
                        fontWeight: 500,
                        color: T.text,
                      }}
                    >
                      Question sent
                    </h2>
                    <p
                      role="status"
                      style={{
                        ...mono,
                        fontSize: "0.8rem",
                        color: T.textDim,
                        lineHeight: 1.7,
                      }}
                    >
                      Thank you. {REPLY_PROMISE}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-8 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
                      Send another question
                    </button>
                  </div>
                ) : (
                  <form id="question-form" onSubmit={handleSubmit} noValidate>
                    <h2
                      id="question"
                      ref={headingRef}
                      tabIndex={-1}
                      className="mb-3 focus:outline focus:outline-2 focus:outline-offset-4"
                      style={{
                        ...cormorant,
                        fontSize: "2rem",
                        fontWeight: 500,
                        color: T.text,
                        scrollMarginTop: "2rem",
                      }}
                    >
                      Send a quick question
                    </h2>
                    <p
                      className="mb-8"
                      style={{ ...mono, fontSize: "0.75rem", color: T.textMuted, lineHeight: 1.7 }}
                    >
                      All four fields are required. {REPLY_PROMISE}
                    </p>

                    {hasFieldErrors && (
                      <p
                        role="alert"
                        className="mb-5"
                        style={{
                          ...mono,
                          fontSize: "0.72rem",
                          color: "#e87070",
                          border: "1px solid rgba(232,112,112,0.3)",
                          padding: "0.75rem 1rem",
                        }}
                      >
                        Please fix the fields below before sending.
                      </p>
                    )}

                    <div className="grid grid-cols-1 gap-5 mb-5">
                      {FIELDS.map((field) => {
                        const id = `${formId}-${field.name}`;
                        const errorId = `${id}-error`;
                        const invalid = Boolean(errors[field.name]);
                        const describedBy = invalid ? errorId : undefined;
                        return (
                          <div key={field.name}>
                            <label htmlFor={id} style={labelStyle}>
                              {field.label}{" "}
                              <span className="sr-only">(required)</span>
                              <span aria-hidden="true">*</span>
                            </label>
                            {field.multiline ? (
                              <textarea
                                id={id}
                                name={field.name}
                                required
                                aria-required="true"
                                aria-invalid={invalid}
                                aria-describedby={describedBy}
                                value={formData[field.name]}
                                onChange={handleChange}
                                rows={5}
                                maxLength={2000}
                                autoComplete={field.autoComplete}
                                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                style={{ ...inputStyle(invalid), resize: "vertical" }}
                              />
                            ) : (
                              <input
                                id={id}
                                name={field.name}
                                type={field.name === "email" ? "email" : "text"}
                                required
                                aria-required="true"
                                aria-invalid={invalid}
                                aria-describedby={describedBy}
                                value={formData[field.name]}
                                onChange={handleChange}
                                autoComplete={field.autoComplete}
                                maxLength={field.name === "name" ? 120 : field.name === "business" ? 160 : 254}
                                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                style={inputStyle(invalid)}
                              />
                            )}
                            {invalid && (
                              <p
                                id={errorId}
                                style={{
                                  ...mono,
                                  fontSize: "0.68rem",
                                  color: "#e87070",
                                  marginTop: "0.4rem",
                                }}
                              >
                                {errors[field.name]}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {status === "error" && (
                      <p
                        ref={errorRef}
                        tabIndex={-1}
                        role="alert"
                        className="mb-4 focus:outline focus:outline-2 focus:outline-offset-2"
                        style={{
                          ...mono,
                          fontSize: "0.72rem",
                          color: "#e87070",
                          border: "1px solid rgba(232,112,112,0.3)",
                          padding: "0.75rem 1rem",
                        }}
                      >
                        We couldn't send your question. Please try again, or email{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#e87070" }}>
                          {CONTACT_EMAIL}
                        </a>{" "}
                        or call{" "}
                        <a href={CONTACT_PHONE_HREF} style={{ color: "#e87070" }}>
                          {CONTACT_PHONE_DISPLAY}
                        </a>
                        .
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      aria-busy={status === "loading"}
                      className="w-full cursor-pointer transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        ...mono,
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        padding: "1rem 1.75rem",
                        background: status === "loading" ? T.bgElevated : T.gold,
                        color: status === "loading" ? T.textDim : T.bg,
                        border: `1px solid ${T.gold}`,
                        letterSpacing: "0.05em",
                        cursor: status === "loading" ? "not-allowed" : "pointer",
                      }}
                    >
                      {status === "loading" ? "Sending..." : "Send your question"}
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
