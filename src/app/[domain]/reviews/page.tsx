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

  const title = `Customer Reviews | HVAC Repair Network | ${microsite.city}, ${microsite.state}`;
  const description = `Read reviews from satisfied customers in ${microsite.city}, ${microsite.state}. See why HVAC Repair Network is the trusted choice for heating and cooling service.`;

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

// Placeholder reviews
const placeholderReviews = [
  {
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.",
    attribution: "John Smith",
    role: "Homeowner",
    rating: 5,
  },
  {
    quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.",
    attribution: "Sarah Johnson",
    role: "Property Manager",
    rating: 5,
  },
  {
    quote: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis.",
    attribution: "Michael Brown",
    role: "Business Owner",
    rating: 5,
  },
  {
    quote: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    attribution: "Emily Davis",
    role: "Homeowner",
    rating: 5,
  },
  {
    quote: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam.",
    attribution: "Robert Wilson",
    role: "Facility Manager",
    rating: 5,
  },
  {
    quote: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.",
    attribution: "Jennifer Martinez",
    role: "Homeowner",
    rating: 5,
  },
  {
    quote: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum.",
    attribution: "David Anderson",
    role: "Restaurant Owner",
    rating: 5,
  },
  {
    quote: "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est.",
    attribution: "Lisa Thompson",
    role: "Homeowner",
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
            Customer Reviews
          </h1>
          <p className="text-xl text-slate-600">
            See What Our Customers in {microsite.city} Are Saying
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
              Rated 5.0 Stars by Our Customers
            </p>
            <p className="text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {placeholderReviews.map((review, index) => (
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
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: hexToRgba(accent, 0.1) }}>
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

          {/* Stats Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Why Choose Us
            </h2>
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: accent }}>
                  100%
                </div>
                <p className="text-slate-700 font-medium">Customer Satisfaction</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: accent }}>
                  24/7
                </div>
                <p className="text-slate-700 font-medium">Emergency Service</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: accent }}>
                  5★
                </div>
                <p className="text-slate-700 font-medium">Average Rating</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Ready to Experience 5-Star Service?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Join our satisfied customers in {microsite.city}
            </p>
            {phoneNumber && (
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: accent }}
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
