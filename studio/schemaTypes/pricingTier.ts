import { Rule } from "sanity";

export default {
  name: "pricingTier",
  title: "Pricing Tier",
  type: "document",
  fields: [
    {
      name: "tier",
      title: "Tier Label",
      type: "string",
      description: 'Short label, e.g. "Assess", "Build", "Retain"',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "name",
      title: "Plan Name",
      type: "string",
      description: 'e.g. "Strategy Assessment"',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "amount",
      title: "Price Amount",
      type: "string",
      description: 'e.g. "$2,000" or "$6K–$18K"',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "period",
      title: "Price Period",
      type: "string",
      description: 'e.g. "One-time · 1 week delivery"',
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      description: "List of included features",
    },
    {
      name: "featured",
      title: "Featured (Most Popular)",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      description: 'e.g. "Get Started", "Schedule Call"',
    },
    {
      name: "order",
      title: "Sort Order",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};
