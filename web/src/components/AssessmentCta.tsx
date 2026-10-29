import type { CSSProperties, MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { T, mono } from "./design";
import {
  CALENDLY_URL,
  PRIMARY_CTA_LABEL,
  SECONDARY_CTA_LABEL,
} from "../lib/siteContact";

type CalendlyWindow = Window & {
  Calendly?: {
    initPopupWidget: (options: { url: string }) => void;
  };
};

type Variant = "default" | "nav" | "menu";

function openCalendlyPopup(event: MouseEvent<HTMLAnchorElement>) {
  const widget = (window as CalendlyWindow).Calendly;
  if (!widget?.initPopupWidget) return;
  event.preventDefault();
  widget.initPopupWidget({ url: CALENDLY_URL });
}

function buttonStyle(variant: Variant): CSSProperties {
  const shared: CSSProperties = {
    ...mono,
    fontWeight: 600,
    color: T.bg,
    background: T.gold,
    border: `1px solid ${T.gold}`,
    letterSpacing: "0.03em",
    textAlign: "center",
    lineHeight: 1.35,
  };
  if (variant === "nav") {
    return {
      ...shared,
      fontSize: "0.68rem",
      padding: "0.55rem 0.85rem",
      maxWidth: "17rem",
    };
  }
  if (variant === "menu") {
    return {
      ...shared,
      fontSize: "0.72rem",
      padding: "0.75rem 0.9rem",
      width: "100%",
    };
  }
  return {
    ...shared,
    fontWeight: 500,
    fontSize: "0.78rem",
    padding: "0.85rem 1.4rem",
    maxWidth: "24rem",
  };
}

export default function AssessmentCta({
  align = "start",
  variant = "default",
  questionHref = "/contact#question",
  className = "",
  onBook,
  onQuestion,
}: {
  align?: "start" | "center";
  variant?: Variant;
  questionHref?: string;
  className?: string;
  onBook?: () => void;
  onQuestion?: () => void;
}) {
  const questionStyle: CSSProperties = {
    ...mono,
    fontSize: variant === "nav" ? "0.6rem" : "0.68rem",
    color: T.textMuted,
    lineHeight: 1.45,
    textDecoration: "underline",
    textUnderlineOffset: "0.22em",
    maxWidth: variant === "menu" ? "100%" : variant === "nav" ? "17rem" : "24rem",
    textAlign: align === "center" || variant === "menu" ? "center" : "left",
  };

  const hashIndex = questionHref.indexOf("#");
  const questionHash = hashIndex === -1 ? "question" : questionHref.slice(hashIndex + 1);
  const inPage = questionHref.startsWith("#");

  return (
    <div
      className={`${align === "center" ? "items-center" : "items-start"} flex flex-col ${className}`}
      style={{ gap: "0.5rem" }}
    >
      <a
        href={CALENDLY_URL}
        onClick={(event) => {
          onBook?.();
          openCalendlyPopup(event);
        }}
        className="no-underline inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={buttonStyle(variant)}
      >
        {PRIMARY_CTA_LABEL}
      </a>
      {inPage ? (
        <a
          href={questionHref}
          onClick={() => onQuestion?.()}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={questionStyle}
        >
          {SECONDARY_CTA_LABEL}
        </a>
      ) : (
        <Link
          to="/contact"
          hash={questionHash}
          onClick={() => onQuestion?.()}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={questionStyle}
        >
          {SECONDARY_CTA_LABEL}
        </Link>
      )}
    </div>
  );
}
