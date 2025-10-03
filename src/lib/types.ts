export interface ServiceFeature {
  title: string;
  description: string;
  icon: string;
}

export interface CTABlock {
  label: string;
  url: string;
  style: "primary" | "secondary" | "outline";
}

export interface FAQEntry {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  attribution: string;
  role: string;
}

export interface AnalyticsConfig {
  enabled: boolean;
  provider: "plausible" | "ga4" | "none";
  script_url?: string;
}

export type BuildStatus = "pending" | "building" | "deployed" | "error";

export interface Microsite {
  id: number;
  domain: string;
  vertical: string;
  service_description: string;
  city: string;
  state: string;
  hero_headline: string;
  hero_subheadline?: string;
  service_features: ServiceFeature[];
  primary_phone?: string;
  call_tracking_number?: string;
  form_recipient_email: string;
  form_recipient_name?: string;
  cta_blocks: CTABlock[];
  faq: FAQEntry[];
  testimonials: Testimonial[];
  seo_title?: string;
  seo_description?: string;
  analytics?: AnalyticsConfig;
  build_status: BuildStatus;
}








