import { Phone } from "lucide-react";
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
    <section className="text-white" style={{ background: gradient }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 md:flex-row md:items-center">
        <div className="flex-1 space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100/90">
            {microsite.city} HVAC Specialists
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white drop-shadow-lg md:text-6xl">
            {microsite.hero_headline}
          </h1>
          {microsite.hero_subheadline && (
            <p className="text-lg text-blue-100 md:text-xl">
              {microsite.hero_subheadline}
            </p>
          )}
          <div className="flex flex-col gap-4 sm:flex-row">
            {phoneNumber && formattedDial && (
              <Button
                asChild
                size="lg"
                className="text-white shadow-lg transition hover:brightness-110"
                style={{ backgroundColor: accent }}
              >
                <a href={`tel:${formattedDial}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {phoneNumber}
                </a>
              </Button>
            )}
            {secondaryCta && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 text-white transition hover:bg-white/20"
                style={{ borderColor: hexToRgba(accent, 0.6) }}
              >
                <a href="#contact-form">{secondaryCta.label}</a>
              </Button>
            )}
          </div>
        </div>
        <div
          className="flex-1 rounded-3xl border bg-white/10 p-8 shadow-[0_30px_80px_rgba(6,17,38,0.45)] backdrop-blur"
          style={{ borderColor: hexToRgba(accent, 0.35) }}
        >
          <h2 className="text-xl font-semibold text-white drop-shadow">Why {microsite.city} chooses us</h2>
          <p className="mt-4 text-blue-50/95">{microsite.service_description}</p>
        </div>
      </div>
    </section>
  );
}
