import { CONTACT_EMAIL, CONTACT_PHONE_E164 } from "./siteContact";

/**
 * Schema.org graph for Roman Forge.
 * Phone, email, and locality come from siteContact.ts — the same values the
 * footer and /contact publish. No street address is published, so none is
 * included.
 *
 * ProfessionalService is a LocalBusiness, which is an Organization, so those
 * three types share one entity instead of three copies of the same business.
 */
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "LocalBusiness", "Organization"],
      "@id": "https://romanforge.dev/#organization",
      name: "Roman Forge",
      url: "https://romanforge.dev/",
      description:
        "AI integration architecture for modern business. Production-grade AI systems, intelligent automation, and knowledge infrastructure for companies of 10–250 people.",
      image: "https://romanforge.dev/roman-forge-social.png",
      logo: "https://romanforge.dev/new-logo.png",
      telephone: CONTACT_PHONE_E164,
      email: CONTACT_EMAIL,
      foundingDate: "2025",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lansing",
        addressRegion: "MI",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      founder: { "@id": "https://romanforge.dev/#jacob-roman" },
      sameAs: [
        "https://linkedin.com/in/jacobroman",
        "https://facebook.com/profile.php?id=61575806189799",
        "https://x.com/romanforge",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://romanforge.dev/#jacob-roman",
      name: "Jacob Roman",
      jobTitle: "Founder",
      url: "https://romanforge.dev/about",
      image: "https://romanforge.dev/roman-portrait.jpg",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_E164,
      worksFor: { "@id": "https://romanforge.dev/#organization" },
      sameAs: ["https://linkedin.com/in/jacobroman"],
    },
  ],
};
