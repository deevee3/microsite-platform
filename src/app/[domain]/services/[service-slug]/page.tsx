import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getMicrositeByDomain, getAllMicrositeDomains } from "@/lib/data-client";
import { getServiceBySlug, getRelatedServices, getAllServiceSlugs } from "@/lib/page-helpers";
import { Phone, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";

interface ServicePageProps {
  params: Promise<{ domain: string; "service-slug": string }>;
}

export async function generateStaticParams() {
  const domains = await getAllMicrositeDomains();
  const params: { domain: string; "service-slug": string }[] = [];
  for (const domain of domains) {
    const serviceSlugs = getAllServiceSlugs(domain);
    for (const slug of serviceSlugs) {
      params.push({ domain, "service-slug": slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { domain, "service-slug": serviceSlug } = await params;
  const microsite = await getMicrositeByDomain(domain);
  const service = getServiceBySlug(domain, serviceSlug);

  if (!microsite || !service || !microsite.has_multipage) {
    return { title: "Page Not Found" };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `https://${microsite.domain}/services/${service.slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://${microsite.domain}/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { domain, "service-slug": serviceSlug } = await params;
  const microsite = await getMicrositeByDomain(domain);
  const service = getServiceBySlug(domain, serviceSlug);

  if (!microsite || !service || !microsite.has_multipage) {
    notFound();
  }

  const relatedServices = getRelatedServices(domain, service.slug, service.relatedServices);
  const phoneNumber = microsite.call_tracking_number ?? microsite.primary_phone;
  const accentColor = microsite.accent_color ?? "#0ea5e9";

  // Organization + Service schema (referral network)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `https://${microsite.domain}#org`,
        "name": "HVAC Emergency Referral Network",
        "url": `https://${microsite.domain}/services/${service.slug}`,
        "description": "A 24/7 referral service that matches users with independent, state-licensed HVAC professionals. We are not a contractor.",
        "areaServed": {
          "@type": "City",
          "name": microsite.city,
          "addressRegion": microsite.state
        },
        "telephone": phoneNumber
      },
      {
        "@type": "Service",
        "name": service.title,
        "serviceType": "HVAC referral and matching",
        "description": service.metaDescription,
        "provider": { "@id": `https://${microsite.domain}#org` },
        "areaServed": {
          "@type": "City",
          "name": microsite.city,
          "addressRegion": microsite.state
        }
      }
    ]
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
        />

        {/* Page Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {service.h1}
            </h1>
            <p className="text-xl text-slate-600">
              Get matched with a nearby, state-licensed HVAC professional for {service.title.toLowerCase()} in {microsite.city}, {microsite.state}. We are not a contractor.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content Column */}
              <div className="lg:col-span-2">
                {/* Service Description */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                  <div className="prose prose-slate max-w-none">
                    {service.content.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-lg text-slate-700 mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 mt-4">
                    Work is performed by independent contractors. Availability and arrival times vary by demand, traffic, and weather. Contractors provide estimates and warranties directly.
                  </p>
                </div>

                {/* CTA Section */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8 text-center">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    {service.ctaText}
                  </h2>
                  <p className="text-slate-700 mb-6">
                    Get matched now with a licensed HVAC professional for {service.title.toLowerCase()}.
                  </p>
                  {phoneNumber && (
                    <a
                      href={`tel:${phoneNumber}`}
                      className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all hover:scale-105 hover:shadow-lg"
                      style={{ backgroundColor: accentColor }}
                      aria-label={`Call us now at ${phoneNumber}`}
                    >
                      <Phone className="h-5 w-5" />
                      {phoneNumber}
                    </a>
                  )}
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                      Related Services
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {relatedServices.map((relatedService) => (
                        <Link
                          key={relatedService.slug}
                          href={`/${microsite.domain}/services/${relatedService.slug}`}
                          className="group flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <span className="font-semibold text-slate-900 group-hover:underline">
                            {relatedService.title}
                          </span>
                          <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Column */}
              <div className="lg:col-span-1">
                {/* Contact Form */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Request Service
                  </h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Fill out the form and we'll route your request to an independent, state-licensed HVAC professional.
                  </p>
                  <LeadForm microsite={microsite} />
                  <p className="text-xs text-slate-500 mt-3">
                    By submitting, you agree we may share your information with one or more independent contractors to facilitate service, and that we and/or matched contractors may contact you by phone, SMS, or email. Message and data rates may apply.
                  </p>
                </div>

                {/* Quick Info */}
                <div className="bg-slate-100 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Why Use Our Network?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-sm text-slate-700">24/7 emergency matching</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-sm text-slate-700">State-licensed, insured HVAC pros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-sm text-slate-700">Estimates and options provided by the contractor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-sm text-slate-700">Residential and light-commercial support</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-3">
                    We are a referral service and do not perform repairs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </>
  );
}
