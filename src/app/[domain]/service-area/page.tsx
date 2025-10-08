import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getMicrositeByDomain, getAllMicrositeDomains } from "@/lib/data-client";
import { getLocationsForDomain } from "@/lib/page-helpers";
import { MapPin, Phone } from "lucide-react";

interface ServiceAreaPageProps {
  params: Promise<{ domain: string }>;
}

export async function generateStaticParams() {
  const domains = await getAllMicrositeDomains();
  return domains.map((domain) => ({ domain }));
}

export async function generateMetadata({ params }: ServiceAreaPageProps): Promise<Metadata> {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite || !microsite.has_multipage) {
    return {
      title: "Page Not Found",
    };
  }

  const title = `Service Area | HVAC Repair Network | ${microsite.city}, ${microsite.state}`;
  const description = `HVAC Repair Network serves ${microsite.city} and 25+ surrounding communities. Find your local area for expert heating and cooling service. Call ${microsite.call_tracking_number ?? microsite.primary_phone}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${microsite.domain}/service-area`,
    },
    openGraph: {
      title,
      description,
      url: `https://${microsite.domain}/service-area`,
      type: "website",
    },
  };
}

export default async function ServiceAreaPage({ params }: ServiceAreaPageProps) {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite || !microsite.has_multipage) {
    notFound();
  }

  const locations = getLocationsForDomain(domain);
  const phoneNumber = microsite.call_tracking_number ?? microsite.primary_phone;
  const accentColor = microsite.accent_color ?? "#0ea5e9";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Service Area
          </h1>
          <p className="text-xl text-slate-600">
            Serving {microsite.city}, {microsite.state} and Surrounding Communities
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <p className="text-lg text-slate-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-slate-600">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>

          {/* Locations Grid */}
          {locations.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Cities We Serve
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {locations.map((location) => (
                  <Link
                    key={location.slug}
                    href={`/locations/${location.slug}`}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 border border-slate-200 hover:border-slate-300"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0"
                        style={{ backgroundColor: `${accentColor}15` }}
                      >
                        <MapPin className="h-5 w-5" style={{ color: accentColor }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 group-hover:underline">
                          {location.cityName}
                        </h3>
                        <p className="text-sm text-slate-600">{location.state}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">No service locations available.</p>
            </div>
          )}

          {/* Service Info Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-4"
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  <span className="text-2xl font-bold" style={{ color: accentColor }}>24/7</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Emergency Service</h3>
                <p className="text-sm text-slate-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div className="text-center">
                <div
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-4"
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  <span className="text-2xl font-bold" style={{ color: accentColor }}>✓</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Licensed & Insured</h3>
                <p className="text-sm text-slate-600">
                  Sed do eiusmod tempor incididunt ut labore et dolore.
                </p>
              </div>
              <div className="text-center">
                <div
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-4"
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  <span className="text-2xl font-bold" style={{ color: accentColor }}>★</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">5-Star Service</h3>
                <p className="text-sm text-slate-600">
                  Magna aliqua ut enim ad minim veniam quis nostrud.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Don&apos;t See Your City?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              We may still serve your area. Give us a call to find out!
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
        </div>
      </div>
    </div>
  );
}
