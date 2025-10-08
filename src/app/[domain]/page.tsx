import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { ServiceHighlights } from "@/components/ServiceHighlights";
import { LeadForm } from "@/components/LeadForm";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { getMicrositeByDomain, getAllMicrositeDomains } from "@/lib/data-client";

interface MicrositePageProps {
  params: Promise<{ domain: string }>;
}

export async function generateStaticParams() {
  const domains = await getAllMicrositeDomains();
  return domains.map((domain) => ({ domain }));
}

export async function generateMetadata({ params }: MicrositePageProps): Promise<Metadata> {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite) {
    return {
      title: "Microsite Not Found",
    };
  }

  const title = microsite.seo_title ?? `${microsite.city} HVAC Repair | Emergency Heating & Cooling`;
  const description =
    microsite.seo_description ??
    `Certified technicians providing rapid HVAC repair across ${microsite.city}, ${microsite.state}. Call for 24/7 emergency service.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${microsite.domain}`,
    },
    openGraph: {
      title,
      description,
      url: `https://${microsite.domain}`,
      type: "website",
    },
  };
}

export default async function MicrositePage({ params }: MicrositePageProps) {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite) {
    notFound();
  }

  const phoneNumber = microsite.call_tracking_number ?? microsite.primary_phone;

  // Organization schema for homepage
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "HVAC Repair Network",
    "description": microsite.service_description,
    "url": `https://${microsite.domain}`,
    "telephone": phoneNumber,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": microsite.city,
      "addressRegion": microsite.state,
    },
    "areaServed": {
      "@type": "City",
      "name": microsite.city,
      "addressRegion": microsite.state,
    },
    "openingHours": "Mo-Su 00:00-23:59",
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Hero microsite={microsite} />
      <ServiceHighlights microsite={microsite} />
      <Suspense fallback={<div className="py-16 text-center">Loading form…</div>}>
        <LeadForm microsite={microsite} />
      </Suspense>
      <Testimonials microsite={microsite} />
      <FAQ microsite={microsite} />
    </>
  );
}
