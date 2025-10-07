import { Phone, Star, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hexToRgba } from "@/lib/color";
import type { Microsite } from "@/lib/types";

interface HeroProps {
  microsite: Microsite;
}

export function Hero({ microsite }: HeroProps) {
  const phoneNumber = microsite.call_tracking_number ?? microsite.primary_phone;
  const formattedDial = phoneNumber?.replace(/[^0-9+]/g, "");
  const secondaryCta = microsite.cta_blocks.find((cta) => cta.style !== "primary");
  const accent = microsite.accent_color ?? "#0ea5e9";
  const gradient = `linear-gradient(135deg, ${hexToRgba(accent, 0.95)} 0%, ${hexToRgba(accent, 0.45)} 40%, #061126 100%)`;

  return (
    <section className="relative overflow-hidden text-white" style={{ background: gradient }}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-4 top-0 h-72 w-72 animate-pulse rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -right-4 bottom-0 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl delay-700" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 py-24 md:flex-row md:items-center md:py-32">
        {/* Left Column - Main Content */}
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 backdrop-blur-sm">
            <Clock className="h-4 w-4 text-blue-100" />
            <span className="text-sm font-semibold tracking-wide text-blue-50">
              Available 24/7 in {microsite.city}
            </span>
          </div>
          
          <h1 className="text-5xl font-extrabold leading-[1.1] text-white drop-shadow-2xl md:text-7xl">
            {microsite.hero_headline}
          </h1>
          
          {microsite.hero_subheadline && (
            <p className="text-xl leading-relaxed text-blue-50/95 md:text-2xl">
              {microsite.hero_subheadline}
            </p>
          )}

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-blue-100">Rated 4.9/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-200" />
              <span className="text-sm font-medium text-blue-100">Licensed & Insured</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            {phoneNumber && formattedDial && (
              <Button
                asChild
                size="lg"
                className="group text-lg font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:brightness-110"
                style={{ backgroundColor: accent }}
              >
                <a href={`tel:${formattedDial}`} className="flex items-center gap-2">
                  <Phone className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  {phoneNumber}
                </a>
              </Button>
            )}
            {secondaryCta && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 bg-white/15 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/25"
                style={{ borderColor: hexToRgba(accent, 0.6) }}
              >
                <a href="#contact-form">{secondaryCta.label}</a>
              </Button>
            )}
          </div>
        </div>

        {/* Right Column - Info Card */}
        <div className="flex-1">
          <div
            className="group relative overflow-hidden rounded-3xl border bg-gradient-to-br from-white/15 to-white/5 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-[0_40px_100px_rgba(0,0,0,0.3)]"
            style={{ borderColor: hexToRgba(accent, 0.4) }}
          >
            {/* Decorative corner accent */}
            <div 
              className="absolute right-0 top-0 h-32 w-32 rounded-bl-full opacity-30"
              style={{ background: `radial-gradient(circle at top right, ${accent}, transparent)` }}
            />
            
            <h2 className="relative text-2xl font-bold text-white drop-shadow-lg">
              Why {microsite.city} Trusts Us
            </h2>
            <p className="relative mt-5 text-lg leading-relaxed text-blue-50/95">
              {microsite.service_description}
            </p>

            {/* Decorative bottom accent */}
            <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-white/5 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
