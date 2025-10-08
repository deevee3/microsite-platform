import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMicrositeByDomain, getAllMicrositeDomains } from "@/lib/data-client";
import { Star, Phone } from "lucide-react";
import { hexToRgba } from "@/lib/color";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface ReviewsPageProps {
  params: Promise<{ domain: string }>;
}

export async function generateStaticParams() {
  const domains = await getAllMicrositeDomains();
  return domains.map((domain) => ({ domain }));
}

export async function generateMetadata({ params }: ReviewsPageProps): Promise<Metadata> {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite || !microsite.has_multipage) {
    return {
      title: "Page Not Found",
    };
  }

  const title = `Reviews & Testimonials | ${microsite.city} HVAC Emergency Referral Network`;
  const phone = microsite.call_tracking_number ?? microsite.primary_phone;
  const description = `Read feedback from customers in ${microsite.city}, ${microsite.state} who used our referral service to get matched with state-licensed HVAC professionals. Call ${phone} for 24/7 matching. We are not a contractor.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${microsite.domain}/reviews`,
    },
    openGraph: {
      title,
      description,
      url: `https://${microsite.domain}/reviews`,
      type: "website",
    },
  };
}

// Fallback reviews if microsite has no testimonials
const placeholderReviews = [
  {
    quote:
      "Matched us with a tech quickly and the repair was completed the same day. Clear communication throughout.",
    attribution: "Homeowner",
    role: "Residential",
    rating: 5,
  },
  {
    quote:
      "Our office heat was restored before noon. The process was simple and fast.",
    attribution: "Facilities Manager",
    role: "Commercial",
    rating: 5,
  },
  {
    quote:
      "No-pressure estimate and transparent pricing from the contractor we were matched with.",
    attribution: "Property Manager",
    role: "Multifamily",
    rating: 5,
  },
  {
    quote:
      "Booked online at night and got a morning appointment. Smooth experience.",
    attribution: "Homeowner",
    role: "Residential",
    rating: 5,
  },
];

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite || !microsite.has_multipage) {
    notFound();
  }

  const phoneNumber = microsite.call_tracking_number ?? microsite.primary_phone;
  const accent = microsite.accent_color ?? "#0ea5e9";

  // Prefer real testimonials from the microsite JSON if available
  interface Testimonial {
    quote: string;
    attribution?: string;
    role?: string;
  }
  
  const reviews =
    (microsite.testimonials && microsite.testimonials.length > 0
      ? microsite.testimonials.map((t: Testimonial) => ({
          quote: t.quote,
          attribution: t.attribution || "Customer",
          role: t.role || microsite.city,
          rating: 5, // default display; adjust if you start storing rating
        }))
      : placeholderReviews) as Array<{
      quote: string;
      attribution: string;
      role: string;
      rating: number;
    }>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Reviews" },
        ]}
      />

      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Reviews & Testimonials
          </h1>
          <p className="text-xl text-slate-600">
            What customers in {microsite.city}, {microsite.state} say about our emergency referral service
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Introduction */}
          <div className="mb-12 text-center">
            <div className="flex justify-center items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-lg text-slate-700 mb-2">
              Recent feedback from customers matched through our network
            </p>
            <p className="text-slate-600">
              We connect you with independent, state-licensed HVAC professionals. Testimonials reflect individual experiences; availability, pricing, and outcomes vary by contractor.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 border border-slate-200"
              >
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-700 mb-4">
                  &ldquo;{review.quote}&rdquo;
                </p>

                {/* Attribution */}
                <div
                  className="flex items-center gap-3 pt-4 border-t"
                  style={{ borderColor: hexToRgba(accent, 0.1) }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: accent }}
                  >
                    {review.attribution.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{review.attribution}</p>
                    <p className="text-sm text-slate-600">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Highlights Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Why People Use Our Network
            </h2>
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: accent }}>
                  24/7
                </div>
                <p className="text-slate-700 font-medium">Emergency Intake & Matching</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: accent }}>
                  Licensed
                </div>
                <p className="text-slate-700 font-medium">State‑licensed, insured pros</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: accent }}>
                  Fast
                </div>
                <p className="text-slate-700 font-medium">Routed to nearby contractors</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center mt-4">
              We are a referral service and do not perform repairs. Contractors set pricing, schedules, and warranties.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Need emergency HVAC help?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Get matched with a nearby, state‑licensed HVAC professional in {microsite.city}.
            </p>
            {phoneNumber && (
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: accent }}
                aria-label={`Call now at ${phoneNumber}`}
              >
                <Phone className="h-5 w-5" />
                {phoneNumber}
              </a>
            )}
            <p className="text-xs text-slate-500 mt-4">
              Calls may be recorded for quality and routing. By contacting us, you agree we may share your information with one or more independent contractors to facilitate service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
