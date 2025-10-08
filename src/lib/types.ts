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
  accent_color?: string;
  cta_blocks: CTABlock[];
  faq: FAQEntry[];
  testimonials: Testimonial[];
  seo_title?: string;
  seo_description?: string;
  analytics?: AnalyticsConfig;
  build_status: BuildStatus;
  has_multipage?: boolean; // Enable multi-page architecture for this microsite
}

// Multi-page Architecture Types

export interface Service {
  slug: string; // URL-friendly identifier (e.g., "furnace-repair")
  title: string; // Display title (e.g., "Furnace Repair")
  h1: string; // Page H1 tag (e.g., "Expert Furnace Repair in Cincinnati")
  metaTitle: string; // SEO meta title
  metaDescription: string; // SEO meta description
  content: string; // Main page content (Lorem ipsum)
  ctaText: string; // Call-to-action button text
  relatedServices?: string[]; // Array of related service slugs
}

export interface Location {
  slug: string; // URL-friendly identifier (e.g., "blue-ash")
  cityName: string; // Display city name (e.g., "Blue Ash")
  state: string; // State abbreviation (e.g., "OH")
  h1: string; // Page H1 tag (e.g., "HVAC Repair in Blue Ash")
  metaTitle: string; // SEO meta title
  metaDescription: string; // SEO meta description
  content: string; // Main page content (Lorem ipsum)
  ctaText: string; // Call-to-action button text
  nearbyLocations?: string[]; // Array of nearby location slugs
  zipCodes?: string[]; // Optional zip codes served
}

export interface NavigationItem {
  label: string; // Display text
  href: string; // Link path
  children?: NavigationItem[]; // Optional dropdown items
  icon?: string; // Optional icon name (Lucide)
  external?: boolean; // Is external link
}

export interface PageMetadata {
  title: string; // Page title
  description: string; // Meta description
  canonical?: string; // Canonical URL
  ogTitle?: string; // Open Graph title (defaults to title)
  ogDescription?: string; // Open Graph description (defaults to description)
  ogImage?: string; // Open Graph image URL
  noindex?: boolean; // Prevent indexing
}








