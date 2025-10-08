import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMicrositeByDomain, getAllMicrositeDomains } from "@/lib/data-client";
import { Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface FAQPageProps {
  params: Promise<{ domain: string }>;
}

export async function generateStaticParams() {
  const domains = await getAllMicrositeDomains();
  return domains.map((domain) => ({ domain }));
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite || !microsite.has_multipage) {
    return {
      title: "Page Not Found",
    };
  }

  const title = `Emergency HVAC FAQs | ${microsite.city}, ${microsite.state}`;
  const description =
    `Answers about our ${microsite.city} HVAC referral service—how matching works, arrival times, pricing, licensing, brands, and safety. ` +
    `We connect you 24/7 with independent, state-licensed HVAC professionals. We are not a contractor.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${microsite.domain}/faq-page`,
    },
    openGraph: {
      title,
      description,
      url: `https://${microsite.domain}/faq-page`,
      type: "website",
    },
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite || !microsite.has_multipage) {
    notFound();
  }

  const phoneNumber = microsite.call_tracking_number ?? microsite.primary_phone;
  const accentColor = microsite.accent_color ?? "#0ea5e9";

  const faqs = [
    {
      question: "Are you the HVAC contractor?",
      answer:
        "No. We operate a 24/7 referral service. We match your request with an independent, state-licensed HVAC professional from our network.",
    },
    {
      question: "How fast can someone arrive?",
      answer:
        "Arrival times depend on location, traffic, weather, and demand—especially during extreme temperatures. We prioritize true no-heat and no-cool emergencies and route the nearest available pro.",
    },
    {
      question: "Do you cover my neighborhood?",
      answer:
        `We serve ${microsite.city}, ${microsite.state} and surrounding areas. Coverage and availability vary by time of day and demand.`,
    },
    {
      question: "What systems and brands are supported?",
      answer:
        "Furnaces, central AC, heat pumps, mini-splits, thermostats, and light-commercial rooftop units (RTUs). Most major brands including Trane, Carrier, Lennox, Goodman, Rheem, and Daikin.",
    },
    {
      question: "Who sets pricing, scheduling, and warranties?",
      answer:
        "The independent contractor does. You'll receive diagnostic findings and options before work begins, and you approve any service directly with the contractor.",
    },
    {
      question: "Do you charge a fee for matching?",
      answer:
        "There's no fee to request a match. Contractors may charge a diagnostic fee and will provide estimates for recommended repairs.",
    },
    {
      question: "Are technicians licensed and insured?",
      answer:
        "We strive to connect you with OCILB-licensed contractors who maintain required liability insurance in Ohio.",
    },
    {
      question: "Do you handle commercial HVAC emergencies?",
      answer:
        "Many network pros service light-commercial equipment such as small office and retail RTUs. Availability depends on time, location, and demand.",
    },
    {
      question: "What if I smell gas or suspect carbon monoxide?",
      answer:
        "Evacuate immediately and call your utility or 911. Once the area is safe, request a match and a professional can inspect your system.",
    },
    {
      question: "Can I request a specific brand or part?",
      answer:
        "Yes. Mention any preferences during intake. The contractor will advise on compatibility, availability, and lead times.",
    },
    {
      question: "How do you use my information?",
      answer:
        "We share your details with one or more independent contractors solely to facilitate service, and we may contact you about your request. See our Privacy Policy for details.",
    },
    {
      question: "How do I opt out of calls or texts?",
      answer:
        "Reply STOP to texts or tell the caller you prefer email only. You can also contact us to update your communication preferences.",
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "FAQ" },
        ]}
      />

      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Emergency HVAC FAQs for {microsite.city}, {microsite.state}
          </h1>
          <p className="text-xl text-slate-600">
            How our 24/7 referral service works, what to expect, and safety guidance.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Intro */}
          <div className="mb-12">
            <p className="text-lg text-slate-700">
              We're a referral service—not a contractor. We match your request with an independent, state-licensed HVAC
              professional who provides diagnostics and repair options. Availability and arrival times vary.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-6 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 border border-slate-200"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  {faq.question}
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Our intake team is here to help and can match you with a nearby, state-licensed HVAC professional.
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
            <p className="text-xs text-slate-500 mt-4">
              Calls may be recorded for quality and routing. By contacting us, you agree that we may share your information with one or more independent contractors to facilitate service.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </div>
  );
}
