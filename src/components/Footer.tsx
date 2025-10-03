import type { Microsite } from "@/lib/types";

interface FooterProps {
  microsite: Microsite;
}

export function Footer({ microsite }: FooterProps) {
  const year = new Date().getFullYear();
  const phoneNumber = microsite.call_tracking_number ?? microsite.primary_phone;
  const formattedDial = phoneNumber?.replace(/[^0-9+]/g, "");

  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-blue-300">
            {microsite.city}, {microsite.state} HVAC Network
          </p>
          <p className="mt-3 text-lg font-semibold">
            {microsite.hero_headline}
          </p>
        </div>
        <div className="space-y-1 text-sm text-slate-300">
          <p>Rapid response technicians standing by 24/7.</p>
          {phoneNumber && formattedDial && (
            <a className="font-semibold text-white underline-offset-4 hover:underline" href={`tel:${formattedDial}`}>
              {phoneNumber}
            </a>
          )}
          <p>Emails routed to {microsite.form_recipient_email}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs text-slate-500">
          <p>© {year} HVAC Repair Network. All rights reserved.</p>
          <p>Built for rapid microsite deployment.</p>
        </div>
      </div>
    </footer>
  );
}
