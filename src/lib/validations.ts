import { z } from "zod";

export const serviceFeatureSchema = z.object({
  title: z.string().min(1, "Service feature title is required"),
  description: z.string().min(1, "Service feature description is required"),
  icon: z.string().min(1, "Service feature icon is required"),
});

const CTA_PROTOCOLS = new Set(["http:", "https:", "tel:", "mailto:"]);

const ctaUrlSchema = z
  .string()
  .min(1, "CTA URL is required")
  .refine((value) => {
    if (value.startsWith("#") || value.startsWith("/")) {
      return true;
    }

    if (value.startsWith("tel:") || value.startsWith("mailto:")) {
      return true;
    }

    try {
      const parsed = new URL(value);
      return CTA_PROTOCOLS.has(parsed.protocol);
    } catch (error) {
      return false;
    }
  }, "CTA URL must be http(s), tel:, mailto:, anchor, or relative link");

export const ctaBlockSchema = z.object({
  label: z.string().min(1, "CTA label is required"),
  url: ctaUrlSchema,
  style: z.enum(["primary", "secondary", "outline"]),
});

export const faqEntrySchema = z.object({
  question: z.string().min(1, "FAQ question is required"),
  answer: z.string().min(1, "FAQ answer is required"),
});

export const testimonialSchema = z.object({
  quote: z.string().min(1, "Testimonial quote is required"),
  attribution: z.string().min(1, "Testimonial attribution is required"),
  role: z.string().min(1, "Testimonial role is required"),
});

export const analyticsConfigSchema = z.object({
  enabled: z.boolean(),
  provider: z.enum(["plausible", "ga4", "none"]),
  script_url: z.string().url().optional(),
});

export const micrositeSchema = z.object({
  id: z.number().int().positive(),
  domain: z.string().min(1),
  vertical: z.string().min(1),
  service_description: z.string().min(1),
  city: z.string().min(1),
  state: z.string().length(2),
  hero_headline: z.string().min(1),
  hero_subheadline: z.string().optional(),
  service_features: z.array(serviceFeatureSchema).min(1),
  primary_phone: z.string().optional(),
  call_tracking_number: z.string().optional(),
  form_recipient_email: z.string().email(),
  form_recipient_name: z.string().optional(),
  cta_blocks: z.array(ctaBlockSchema).min(1),
  faq: z.array(faqEntrySchema).min(1),
  testimonials: z.array(testimonialSchema).min(1),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  analytics: analyticsConfigSchema.optional(),
  build_status: z.enum(["pending", "building", "deployed", "error"]),
});

export const micrositeCollectionSchema = z.array(micrositeSchema).min(1);
