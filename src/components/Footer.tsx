import { Phone, MapPin, Clock } from "lucide-react";
import type { Microsite } from "@/lib/types";
import { hexToRgba } from "@/lib/color";

interface FooterProps {
  microsite: Microsite;
}

export function Footer({ microsite }: FooterProps) {
  const year = new Date().getFullYear();
  const phoneNumber = microsite.call_tracking_number ?? microsite.primary_phone;
  const formattedDial = phoneNumber?.replace(/[^0-9+]/g, "");
  const accent = microsite.accent_color ?? "#0ea5e9";

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-100">
      {/* Background decoration */}
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-600/5 blur-3xl" />
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <p 
                  className="text-sm font-bold uppercase tracking-[0.25em]"
                  style={{ color: accent }}
                >
                  {microsite.city}, {microsite.state}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-white">
                  HVAC Repair Network
                </h3>
              </div>
              <p className="text-base leading-relaxed text-slate-300">
                {microsite.hero_subheadline || `Emergency HVAC repair services available 24/7 in ${microsite.city}, ${microsite.state}.`}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0" style={{ color: accent }} />
                  <div>
                    <p className="font-medium text-slate-200">Service Area</p>
                    <p className="text-sm text-slate-400">
                      {microsite.city}, {microsite.state} Metro Area
                    </p>
                  </div>
                </div>
                
                {phoneNumber && formattedDial && (
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 flex-shrink-0" style={{ color: accent }} />
                    <div>
                      <p className="font-medium text-slate-200">24/7 Emergency Line</p>
                      <a 
                        className="text-lg font-bold text-white transition-colors hover:brightness-110" 
                        style={{ color: accent }}
                        href={`tel:${formattedDial}`}
                      >
                        {phoneNumber}
                      </a>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 flex-shrink-0" style={{ color: accent }} />
                  <div>
                    <p className="font-medium text-slate-200">Availability</p>
                    <p className="text-sm text-slate-400">24 Hours, 7 Days a Week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <nav className="space-y-3">
                <a 
                  href="#contact-form" 
                  className="block text-slate-300 transition-colors hover:text-white"
                >
                  Request Service
                </a>
                <a 
                  href="#services" 
                  className="block text-slate-300 transition-colors hover:text-white"
                >
                  Our Services
                </a>
                <a 
                  href="#testimonials" 
                  className="block text-slate-300 transition-colors hover:text-white"
                >
                  Customer Reviews
                </a>
                <a 
                  href="#faq" 
                  className="block text-slate-300 transition-colors hover:text-white"
                >
                  FAQ
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="border-t"
          style={{ borderColor: hexToRgba(accent, 0.2) }}
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-400 md:flex-row">
            <p>© {year} HVAC Repair Network. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-slate-200">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-slate-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
