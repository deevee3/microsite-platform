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
    return {
      title: "Page Not Found",
    };
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

  // Generate Service schema.org markup
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.metaDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "HVAC Repair Network",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": microsite.city,
        "addressRegion": microsite.state,
      },
      "telephone": phoneNumber,
    },
    "areaServed": {
      "@type": "City",
      "name": microsite.city,
    },
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
              Professional {service.title} in {microsite.city}, {microsite.state}
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
                    {service.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-lg text-slate-700 mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8 text-center">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    {service.ctaText}
                  </h2>
                  <p className="text-slate-700 mb-6">
                    Contact us today for expert {service.title.toLowerCase()} service
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
                    Fill out the form and we&apos;ll get back to you promptly
                  </p>
                  <LeadForm microsite={microsite} />
                </div>

                {/* Quick Info */}
                <div className="bg-slate-100 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Why Choose Us?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-sm text-slate-700">24/7 Emergency Service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-sm text-slate-700">Licensed & Insured</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-sm text-slate-700">Upfront Pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-sm text-slate-700">Satisfaction Guaranteed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
