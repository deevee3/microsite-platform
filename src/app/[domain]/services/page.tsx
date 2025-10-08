import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getMicrositeByDomain, getAllMicrositeDomains } from "@/lib/data-client";
import { getServicesForDomain } from "@/lib/page-helpers";
import { ArrowRight, Phone } from "lucide-react";

interface ServicesPageProps {
  params: Promise<{ domain: string }>;
}

export async function generateStaticParams() {
  const domains = await getAllMicrositeDomains();
  return domains.map((domain) => ({ domain }));
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite || !microsite.has_multipage) {
    return {
      title: "Page Not Found",
    };
  }

  const title = `HVAC Services | HVAC Repair Network | ${microsite.city}, ${microsite.state}`;
  const description = `Comprehensive HVAC services in ${microsite.city}, ${microsite.state}. Furnace repair, AC installation, duct cleaning, and more. Call ${microsite.call_tracking_number ?? microsite.primary_phone} today.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${microsite.domain}/services`,
    },
    openGraph: {
      title,
      description,
      url: `https://${microsite.domain}/services`,
      type: "website",
    },
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite || !microsite.has_multipage) {
    notFound();
  }

  const services = getServicesForDomain(domain);
  const phoneNumber = microsite.call_tracking_number ?? microsite.primary_phone;
  const accentColor = microsite.accent_color ?? "#0ea5e9";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our HVAC Services
          </h1>
          <p className="text-xl text-slate-600">
            Professional Heating & Cooling Solutions in {microsite.city}, {microsite.state}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <p className="text-lg text-slate-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <p className="text-slate-600">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>

          {/* Services Grid */}
          {services.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6 border border-slate-200 hover:border-slate-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:underline">
                        {service.title}
                      </h2>
                      <p className="text-slate-700 mb-4 line-clamp-3">
                        {service.content.split('\n\n')[0]}
                      </p>
                      <div
                        className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all"
                        style={{ color: accentColor }}
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">No services available for this location.</p>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Need HVAC Service Today?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Our expert technicians are ready to help with all your heating and cooling needs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition-all"
              >
                Request Service Online
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Service Areas Link */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">
              Serving {microsite.city} and surrounding areas
            </p>
            <Link
              href="/service-area"
              className="text-lg font-semibold hover:underline"
              style={{ color: accentColor }}
            >
              View All Service Locations →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
