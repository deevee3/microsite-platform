import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMicrositeByDomain, getAllMicrositeDomains } from "@/lib/data-client";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface PrivacyPageProps {
  params: Promise<{ domain: string }>;
}

export async function generateStaticParams() {
  const domains = await getAllMicrositeDomains();
  return domains.map((domain) => ({ domain }));
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite || !microsite.has_multipage) {
    return {
      title: "Page Not Found",
    };
  }

  const title = `Privacy Policy | ${microsite.city} HVAC Emergency Referral Network`;
  const description = `Learn how we collect, use, and share information to match you with independent, state-licensed HVAC contractors in ${microsite.city}, ${microsite.state}. We are not a contractor.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${microsite.domain}/privacy`,
    },
    openGraph: {
      title,
      description,
      url: `https://${microsite.domain}/privacy`,
      type: "website",
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite || !microsite.has_multipage) {
    notFound();
  }

  const policyEmail = `privacy@${microsite.domain}`;
  const lastUpdated = "January 1, 2025";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-600">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
              <p className="text-slate-700 mb-4">
                We operate an HVAC emergency referral service for {microsite.city}, {microsite.state}. We are not a contractor. Our role is to collect your request and match you with one or more independent, state-licensed HVAC professionals who can provide service. This Privacy Policy explains how we collect, use, share, and protect information when you visit our website, call our number, or submit a service request.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
              <p className="text-slate-700 mb-4">
                We collect information to facilitate your service request and operate our referral platform:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Contact details: name, phone number, email address, service address.</li>
                <li>Service details: issue description (e.g., no-heat/no-cool), system type, preferred timing, photos you choose to upload.</li>
                <li>Communications: call recordings and voicemails, SMS/MMS content, and email correspondence for quality, routing, and compliance.</li>
                <li>Technical data: IP address, device/browser info, pages viewed, referring URLs, and interactions (e.g., call clicks, form submissions).</li>
                <li>Cookies and similar technologies: used for basic site functionality, analytics, and attribution.</li>
              </ul>
              <p className="text-slate-700">
                If you contact us on behalf of a business, we may also collect your role/title and business contact details.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>To match your request with one or more independent HVAC contractors and facilitate introductions.</li>
                <li>To communicate with you about your request via phone, SMS, or email (including reminders and updates).</li>
                <li>To operate, maintain, and improve the website and referral platform, including analytics and performance monitoring.</li>
                <li>To prevent fraud, enforce policies, and comply with legal obligations.</li>
              </ul>
              <p className="text-slate-700">
                We may aggregate or de-identify information for reporting and service improvement; aggregated data is not used to identify you personally.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Share Information</h2>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>
                  With independent contractors: We share your request details with one or more HVAC contractors solely to facilitate service. Contractors are independent and set their own pricing, schedules, and warranties.
                </li>
                <li>
                  With service providers: Hosting, analytics, call/SMS routing and recording, email delivery, form processing, and security vendors who process data on our behalf.
                </li>
                <li>
                  Legal and safety: To comply with law, respond to lawful requests, or protect rights, property, or safety.
                </li>
                <li>
                  Business transfers: In connection with a merger, acquisition, or asset sale, subject to continued protection of your information.
                </li>
              </ul>
              <p className="text-slate-700">
                We do not sell your personal information in the traditional sense. We share information to provide the referral service and for measurement/attribution. Depending on your jurisdiction, you may have the right to opt out of certain sharing—see &quot;Your Choices & Rights.&quot;
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies & Analytics</h2>
              <p className="text-slate-700 mb-4">
                We use privacy-focused analytics to understand site performance and improve the user experience. We also use call tracking and event tracking (e.g., call-clicks, form submissions) to attribute and route leads. You can control cookies via your browser settings; disabling cookies may affect site functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Communications & Consent</h2>
              <p className="text-slate-700 mb-4">
                By calling our number or submitting a form, you agree that we and/or matched contractors may contact you by phone, SMS/MMS, or email about your request. Calls may be recorded for quality and routing. Message and data rates may apply. Consent is not a condition of purchase. You can opt out of SMS at any time by replying STOP, or request communication by email only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Retention</h2>
              <p className="text-slate-700 mb-4">
                We retain personal information for as long as reasonably necessary to operate the referral service, comply with legal obligations, resolve disputes, and enforce agreements. Call recordings and routing logs may be kept for a limited period for quality and compliance before deletion or anonymization.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Security</h2>
              <p className="text-slate-700 mb-4">
                We use reasonable administrative, technical, and physical safeguards to protect information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Choices & Rights</h2>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Access/Update: You can request access to or correction of your information.</li>
                <li>Deletion: You can request deletion of your information, subject to certain exceptions.</li>
                <li>Opt-Out: You can opt out of marketing communications and certain data sharing where applicable by law.</li>
                <li>Do Not Track: We currently do not respond to browser "Do Not Track" signals.</li>
              </ul>
              <p className="text-slate-700">
                To make a request, contact us at {policyEmail}. We may need to verify your identity before fulfilling requests.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Children's Privacy</h2>
              <p className="text-slate-700 mb-4">
                Our service is intended for adults and is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child provided personal information, contact us and we will delete it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-Party Links</h2>
              <p className="text-slate-700 mb-4">
                Our website may link to third-party websites or services we do not control. This Policy does not apply to those third parties, and we are not responsible for their content or privacy practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to This Policy</h2>
              <p className="text-slate-700 mb-4">
                We may update this Privacy Policy from time to time. The &quot;Last Updated&quot; date above reflects the most recent changes. Your continued use of the website after changes indicates acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
              <p className="text-slate-700">
                Questions or privacy requests? Email us at <a className="underline" href={`mailto:${policyEmail}`}>{policyEmail}</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
