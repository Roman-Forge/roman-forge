/**
 * Public contact details for Roman Forge.
 * Jacob's latest decision: jacob@romanforge.dev is the canonical inbox.
 * Mailto links, the address shown on /contact and in the footer, JSON-LD,
 * and the form handler's Resend to/from all read CONTACT_EMAIL.
 */
export const CONTACT_EMAIL = "jacob@romanforge.dev";

export const CONTACT_PHONE_DISPLAY = "(810) 692-0143";
export const CONTACT_PHONE_HREF = "tel:810-692-0143";
export const CONTACT_PHONE_E164 = "+1-810-692-0143";
export const CONTACT_LOCATION = "Based in Lansing, MI";

export const CALENDLY_URL = "https://calendly.com/jacobroman1115/30min";
export const PRIMARY_CTA_LABEL = "Book your free 30-minute AI assessment";
export const SECONDARY_CTA_LABEL = "Not ready for a call? Send us a quick question";
export const REPLY_PROMISE = "We'll reply within one business day.";

export type QuestionField = "name" | "business" | "email" | "hope";
export type QuestionInput = Record<QuestionField, string>;
export type QuestionErrors = Partial<Record<QuestionField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateQuestion(input: unknown): {
  ok: boolean;
  errors: QuestionErrors;
  value: QuestionInput;
} {
  const source =
    input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const name = String(source.name ?? "").trim();
  const business = String(source.business ?? "").trim();
  const email = String(source.email ?? "").trim();
  const hope = String(source.hope ?? "").trim();
  const errors: QuestionErrors = {};

  if (!name) errors.name = "Enter your name.";
  else if (name.length > 120) errors.name = "Name must be 120 characters or fewer.";

  if (!business) errors.business = "Enter your business name.";
  else if (business.length > 160) {
    errors.business = "Business name must be 160 characters or fewer.";
  }

  if (!email) errors.email = "Enter your email address.";
  else if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!hope) errors.hope = "Tell us what you hope AI can help with.";
  else if (hope.length > 2000) errors.hope = "Keep this to 2000 characters or fewer.";

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    value: { name, business, email, hope },
  };
}
