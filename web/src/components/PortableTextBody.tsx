import type { CSSProperties } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { T, cormorant, dm } from "./design";
import { SITE_ORIGIN } from "../lib/seo";

const paragraph: CSSProperties = {
  ...dm,
  fontSize: "1.05rem",
  lineHeight: 1.75,
  color: T.text,
  margin: "0 0 1rem",
};

function heading(size: string): CSSProperties {
  return {
    ...cormorant,
    fontSize: size,
    lineHeight: 1.15,
    fontWeight: 500,
    color: T.text,
    margin: "2.1rem 0 0.75rem",
  };
}

function listStyle(type: "disc" | "decimal"): CSSProperties {
  return {
    ...dm,
    listStyle: type,
    paddingLeft: "1.35rem",
    margin: "0.25rem 0 1.25rem",
    color: T.text,
  };
}

function linkRel(href: string): { target?: string; rel?: string } {
  if (
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith(SITE_ORIGIN)
  )
    return {};
  if (/^https?:\/\//i.test(href))
    return { target: "_blank", rel: "noopener noreferrer" };
  return {};
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p style={paragraph}>{children}</p>,
    // The page title is the only h1. A body "H1" style stays a heading, one level down.
    h1: ({ children }) => <h2 style={heading("2.5rem")}>{children}</h2>,
    h2: ({ children }) => <h2 style={heading("2.05rem")}>{children}</h2>,
    h3: ({ children }) => <h3 style={heading("1.55rem")}>{children}</h3>,
    h4: ({ children }) => <h4 style={heading("1.25rem")}>{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote
        style={{
          ...paragraph,
          margin: "1.25rem 0",
          paddingLeft: "1rem",
          borderLeft: `2px solid ${T.gold}`,
          color: T.textMuted,
        }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul style={listStyle("disc")}>{children}</ul>,
    number: ({ children }) => <ol style={listStyle("decimal")}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ margin: "0.35rem 0" }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ margin: "0.35rem 0" }}>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong style={{ fontWeight: 650 }}>{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href.trim() : "";
      if (!href || /^\s*javascript:/i.test(href)) return <>{children}</>;
      return (
        <a href={href} {...linkRel(href)} style={{ color: T.gold }}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const asset = value?.asset as { url?: string } | undefined;
      const url = typeof asset?.url === "string" ? asset.url : "";
      if (!url) return null;
      const alt = typeof value?.alt === "string" ? value.alt : "";
      return (
        <img
          src={url}
          alt={alt}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            margin: "1.5rem 0",
          }}
        />
      );
    },
  },
  unknownType: () => null,
};

export function PortableTextBody({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
