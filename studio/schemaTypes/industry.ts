import { Rule } from "sanity";

export default {
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    {
      name: "icon",
      title: "Icon (emoji)",
      type: "string",
      description: "Emoji icon, e.g. ⚖ or 🏥",
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
