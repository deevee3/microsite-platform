import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMicrositeByDomain, getAllMicrositeDomains } from "@/lib/data-client";
import { LeadForm } from "@/components/LeadForm";
import { Phone, MapPin, Clock } from "lucide-react";

interface ContactPageProps {
  params: Promise<{ domain: string }>;
}

export async function generateStaticParams() {
  const domains = await getAllMicrositeDomains();
  return domains.map((domain) => ({ domain }));
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite || !microsite.has_multipage) {
    return {
      title: "Page Not Found",
    };
  }

  const title = `Contact Us | HVAC Repair Network | ${microsite.city}, ${microsite.state}`;
  const description = `Get in touch with HVAC Repair Network in ${microsite.city}. Call ${microsite.call_tracking_number ?? microsite.primary_phone} for 24/7 emergency HVAC service.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${microsite.domain}/contact`,
    },
    openGraph: {
      title,
      description,
      url: `https://${microsite.domain}/contact`,
      type: "website",
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite || !microsite.has_multipage) {
    notFound();
  }

  const phoneNumber = microsite.call_tracking_number ?? microsite.primary_phone;
  const accentColor = microsite.accent_color ?? "#0ea5e9";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-slate-600">
            Get in Touch for Expert HVAC Service in {microsite.city}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Get In Touch
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              {/* Phone Number - Prominent */}
              {phoneNumber && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        Call Us Now
                      </h3>
                      <a
                        href={`tel:${phoneNumber}`}
                        className="text-2xl md:text-3xl font-bold hover:underline"
                        style={{ color: accentColor }}
                        aria-label={`Call us at ${phoneNumber}`}
                      >
                        {phoneNumber}
                      </a>
                      <p className="text-sm text-slate-600 mt-2">
                        Available 24/7 for Emergency Service
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Service Area */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
                    style={{ backgroundColor: accentColor }}
                  >
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Service Area
                    </h3>
                    <p className="text-slate-700">
                      {microsite.city}, {microsite.state} and surrounding areas
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Hours of Operation
                    </h3>
                    <p className="text-slate-700">
                      24/7 Emergency Service Available
                    </p>
                    <p className="text-sm text-slate-600 mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-slate-100 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Why Contact Us?
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>✓</span>
                    <span>Fast response times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>✓</span>
                    <span>Licensed and insured technicians</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>✓</span>
                    <span>Upfront pricing, no hidden fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>✓</span>
                    <span>100% satisfaction guarantee</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Request Service
                </h2>
                <p className="text-slate-700 mb-6">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
                <LeadForm microsite={microsite} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
