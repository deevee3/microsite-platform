import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMicrositeByDomain, getAllMicrositeDomains } from "@/lib/data-client";
import { LeadForm } from "@/components/LeadForm";
import { Phone, MapPin, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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

  const phone = microsite.call_tracking_number ?? microsite.primary_phone;
  const title = `Contact Our ${microsite.city} HVAC Emergency Referral Network`;
  const description = `Need emergency HVAC help in ${microsite.city}, ${microsite.state}? Call ${phone} or request a match online. We connect you 24/7 with nearby, state-licensed HVAC professionals. We are not a contractor.`;

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
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Contact Our {microsite.city} HVAC Emergency Referral Network
          </h1>
          <p className="text-xl text-slate-600">
            We match you with nearby, state-licensed HVAC professionals—24/7. We are not a contractor.
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
                Tell us what&apos;s wrong—no-heat, no-cool, strange noises, leaks, or alerts—and we&apos;ll route your request to the closest available pro in our network. Arrival times vary by demand, traffic, and weather.
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
                        Call 24/7 to Get Matched Now
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
                        Calls may be recorded for quality and routing.
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
                    </h3>
                    <p className="text-slate-700">
                      24/7 intake and emergency matching. Contractor availability and arrival times vary.
                    </p>
                    <p className="text-sm text-slate-600 mt-2">
                      If you suspect a gas leak or carbon monoxide, evacuate immediately and call your utility or 911.
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
                    <span>Rapid matching to a nearby, available pro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>✓</span>
                    <span>State-licensed, insured HVAC professionals in our network</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>✓</span>
                    <span>Estimates and options provided by the contractor before work begins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>✓</span>
                    <span>Support for residential systems and light-commercial RTUs</span>
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
                  Fill out the form and we&apos;ll route your request to an independent, state-licensed HVAC professional. Availability varies by time and location.
                </p>
                <LeadForm microsite={microsite} />
                <p className="text-xs text-slate-500 mt-4">
                  By submitting, you agree we may share your information with one or more independent contractors to facilitate service, and that we and/or matched contractors may contact you by phone, SMS, or email. Message and data rates may apply. Consent is not a condition of purchase. See our Privacy Policy for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
