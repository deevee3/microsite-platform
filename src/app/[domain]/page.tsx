import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { ServiceHighlights } from "@/components/ServiceHighlights";
import { LeadForm } from "@/components/LeadForm";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
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

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <Hero microsite={microsite} />
      <ServiceHighlights microsite={microsite} />
      <Suspense fallback={<div className="py-16 text-center">Loading form…</div>}>
        <LeadForm microsite={microsite} />
      </Suspense>
      <Testimonials microsite={microsite} />
      <FAQ microsite={microsite} />
      <Footer microsite={microsite} />
    </main>
  );
}
