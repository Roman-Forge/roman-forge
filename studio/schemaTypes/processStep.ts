import { Rule } from "sanity";

export default {
  name: "processStep",
  title: "Process Step",
  type: "document",
  fields: [
    {
      name: "num",
      title: "Number",
      type: "string",
      description: 'Display number, e.g. "01"',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "timeline",
      title: "Timeline",
      type: "string",
      description: 'e.g. "Week 1" or "Weeks 3–6"',
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
