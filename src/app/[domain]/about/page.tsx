import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMicrositeByDomain, getAllMicrositeDomains } from "@/lib/data-client";
import { Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface AboutPageProps {
  params: Promise<{ domain: string }>;
}

export async function generateStaticParams() {
  const domains = await getAllMicrositeDomains();
  return domains.map((domain) => ({ domain }));
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite || !microsite.has_multipage) {
    return {
      title: "Page Not Found",
    };
  }

  const title = `About Our ${microsite.city} HVAC Emergency Referral Network`;
  const description = `We connect ${microsite.city}, ${microsite.state} homeowners and property managers with nearby, state-licensed and insured HVAC professionals for urgent heating and cooling issues—24/7. We are not a contractor.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${microsite.domain}/about`,
    },
    openGraph: {
      title,
      description,
      url: `https://${microsite.domain}/about`,
      type: "website",
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
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
          { label: "About Us" },
        ]}
      />

      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            About Our {microsite.city} HVAC Emergency Referral Network
          </h1>
          <p className="text-xl text-slate-600">
            A network of state-licensed, insured HVAC professionals on call 24/7 in {microsite.city}, {microsite.state}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Our Story */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 mb-4">
                When your heat fails on a freezing night or your AC quits during a heatwave, every minute matters. We built this
                24/7 referral service to connect {microsite.city} residents and property managers with nearby, state-licensed and
                insured HVAC professionals—fast. We are not a contractor. Instead, we match your request to an available pro who
                can diagnose the issue and provide clear options.
              </p>
              <p className="text-lg text-slate-700 mb-4">
                Our network includes technicians experienced with furnaces, central air, heat pumps, and mini‑splits. Whether
                you're in a single-family home, condo, multi‑unit building, or a small office, our goal is the same: quick matching,
                transparent communication, and reliable service from vetted professionals.
              </p>
              <p className="text-lg text-slate-700">
                Availability and arrival times vary by location, traffic, weather, and demand—especially during extreme
                temperatures. We prioritize true no‑heat and no‑cool emergencies and route your request to the closest available pro.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-700 mb-4">
              Make emergency HVAC help simpler and faster by matching people in {microsite.city}, {microsite.state} with qualified
              professionals who can get comfort restored—day or night.
            </p>
            <p className="text-lg text-slate-700">
              We focus on responsiveness, clarity, and trust. You describe the issue, we route the request, and an independent
              contractor provides diagnostics, options, and pricing before work begins.
            </p>
          </section>

          {/* How It Works */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How It Works</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">1) Tell Us What's Wrong</h3>
                <p className="text-slate-700">
                  No‑heat, no‑cool, strange noises, leaks, or alerts—share symptoms and your location.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">2) Fast Matching</h3>
                <p className="text-slate-700">
                  We route your request to the nearest available pro in our network for the quickest possible response.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">3) Confirm & Schedule</h3>
                <p className="text-slate-700">
                  You'll get a call or text to confirm timing. Availability varies by demand, traffic, and weather.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">4) Service & Options</h3>
                <p className="text-slate-700">
                  The independent contractor inspects the system and provides clear diagnostic findings and repair options.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Why Choose Our Network</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Vetted, Licensed Pros</h3>
                <p className="text-slate-700">
                  We strive to connect you with state‑licensed, insured HVAC contractors experienced in residential and light‑commercial systems.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">24/7 Matching</h3>
                <p className="text-slate-700">
                  Requests are prioritized for no‑heat and no‑cool emergencies in {microsite.city} and surrounding areas.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Transparent Options</h3>
                <p className="text-slate-700">
                  Contractors provide estimates before work begins so you can approve with confidence.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Residential & Light‑Commercial</h3>
                <p className="text-slate-700">
                  Furnaces, central AC, heat pumps, mini‑splits, thermostats, and small rooftop units (RTUs).
                </p>
              </div>
            </div>
          </section>

          {/* Coverage Note */}
          <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Where We Route Requests</h2>
            <p className="text-lg text-slate-700">
              We serve {microsite.city}, {microsite.state} and nearby neighborhoods, routing your request to the closest available pro.
              Arrival times depend on distance, traffic, weather, and overall demand—especially during extreme temperatures.
            </p>
          </section>

          {/* Safety & Disclaimer */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Important Notes</h2>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>
                  We are a referral service and do not perform repairs or installations. Services are provided by independent contractors.
                </li>
                <li>
                  Pricing, scheduling, warranties, and guarantees are set by the contractor. Review and approve estimates before work begins.
                </li>
                <li>
                  Suspect a gas leak or carbon monoxide? Evacuate immediately and call your utility or 911. Once safe, request a match.
                </li>
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Need Help Now?</h2>
            <p className="text-lg text-slate-700 mb-6">
              Get matched with a nearby, state‑licensed HVAC professional in {microsite.city}. We're available 24/7.
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
          </section>
        </div>
      </div>
    </div>
  );
}
