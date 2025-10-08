import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getMicrositeByDomain, getAllMicrositeDomains } from "@/lib/data-client";
import { getLocationBySlug, getNearbyLocations, getAllLocationSlugs } from "@/lib/page-helpers";
import { Phone, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";

interface LocationPageProps {
  params: Promise<{ domain: string; "location-slug": string }>;
}

export async function generateStaticParams() {
  const domains = await getAllMicrositeDomains();
  const params: { domain: string; "location-slug": string }[] = [];
  for (const domain of domains) {
    const locationSlugs = getAllLocationSlugs(domain);
    for (const slug of locationSlugs) {
      params.push({ domain, "location-slug": slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { domain, "location-slug": locationSlug } = await params;
  const microsite = await getMicrositeByDomain(domain);
  const location = getLocationBySlug(domain, locationSlug);

  if (!microsite || !location || !microsite.has_multipage) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: {
      canonical: `https://${microsite.domain}/locations/${location.slug}`,
    },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: `https://${microsite.domain}/locations/${location.slug}`,
      type: "website",
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { domain, "location-slug": locationSlug } = await params;
  const microsite = await getMicrositeByDomain(domain);
  const location = getLocationBySlug(domain, locationSlug);

  if (!microsite || !location || !microsite.has_multipage) {
    notFound();
  }

  const nearbyLocations = getNearbyLocations(domain, location.slug, location.nearbyLocations);
  const phoneNumber = microsite.call_tracking_number ?? microsite.primary_phone;
  const accentColor = microsite.accent_color ?? "#0ea5e9";

  // Organization + Service schema (referral service)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `https://${microsite.domain}#org`,
        "name": `HVAC Emergency Referral Network - ${location.cityName}`,
        "url": `https://${microsite.domain}/locations/${location.slug}`,
        "description": "A 24/7 referral service that connects users with independent, state-licensed HVAC professionals. We are not a contractor.",
        "telephone": phoneNumber,
        "areaServed": {
          "@type": "City",
          "name": location.cityName,
          "addressRegion": location.state
        }
      },
      {
        "@type": "Service",
        "name": "Emergency HVAC Referral & Matching",
        "serviceType": "HVAC emergency referral service",
        "provider": { "@id": `https://${microsite.domain}#org` },
        "areaServed": {
          "@type": "City",
          "name": location.cityName,
          "addressRegion": location.state
        },
        "description": location.metaDescription
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
            { label: "Service Area", href: "/service-area" },
            { label: location.cityName },
          ]}
        />

        {/* Page Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-8 w-8" style={{ color: accentColor }} />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                {location.h1}
              </h1>
            </div>
            <p className="text-xl text-slate-600">
              Emergency HVAC referral service in {location.cityName}, {location.state}. We match you with nearby, state-licensed professionals—24/7. We are not a contractor.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content Column */}
              <div className="lg:col-span-2">
                {/* Location Description */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                  <div className="prose prose-slate max-w-none">
                    {location.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-lg text-slate-700 mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Services Matched Here */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Emergency HVAC Services We Match in {location.cityName}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-slate-700">Furnace Repair & Diagnostics</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-slate-700">AC Repair & Diagnostics</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-slate-700">Heat Pump & Mini-Split Repair</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-slate-700">Thermostats & Controls</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-slate-700">Emergency HVAC Matching (24/7)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-slate-700">Light-Commercial RTU Repairs</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-4">
                    Work is performed by independent, state-licensed HVAC contractors. Availability and arrival times vary by demand, traffic, and weather.
                  </p>
                </div>

                {/* CTA Section */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8 text-center">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    {location.ctaText}
                  </h2>
                  <p className="text-slate-700 mb-6">
                    24/7 emergency matching in {location.cityName}. We route your request to the closest available pro.
                  </p>
                  {phoneNumber && (
                    <a
                      href={`tel:${phoneNumber}`}
                      className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all hover:scale-105 hover:shadow-lg"
                      style={{ backgroundColor: accentColor }}
                      aria-label={`Call now at ${phoneNumber}`}
                    >
                      <Phone className="h-5 w-5" />
                      {phoneNumber}
                    </a>
                  )}
                </div>

                {/* Nearby Service Areas */}
                {nearbyLocations.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                      Nearby Service Areas
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {nearbyLocations.map((nearbyLocation) => (
                        <Link
                          key={nearbyLocation.slug}
                          href={`/locations/${nearbyLocation.slug}`}
                          className="group flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <MapPin className="h-5 w-5 flex-shrink-0" style={{ color: accentColor }} />
                          <div>
                            <p className="font-semibold text-slate-900 group-hover:underline">
                              {nearbyLocation.cityName}
                            </p>
                            <p className="text-sm text-slate-600">{nearbyLocation.state}</p>
                          </div>
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
                    Request Service in {location.cityName}
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
                    Service Highlights
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-sm text-slate-700">Rapid matching to nearby pros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: accentColor }}>✓</span>
                      <span className="text-sm text-slate-700">State-licensed, insured contractors</span>
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
