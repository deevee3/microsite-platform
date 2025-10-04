import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Microsite } from "@/lib/types";

interface HeroProps {
  microsite: Microsite;
}

export function Hero({ microsite }: HeroProps) {
  const phoneNumber = microsite.call_tracking_number ?? microsite.primary_phone;
  const formattedDial = phoneNumber?.replace(/[^0-9+]/g, "");
  const secondaryCta = microsite.cta_blocks.find((cta) => cta.style !== "primary");

  return (
    <section className="bg-gradient-to-br from-[#00153a] via-[#021f57] to-[#061126] text-white">
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
              <Button asChild size="lg" className="bg-sky-500 text-white shadow-lg hover:bg-sky-400">
                <a href={`tel:${formattedDial}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {phoneNumber}
                </a>
              </Button>
            )}
            {secondaryCta && (
              <Button asChild size="lg" variant="outline" className="border-white/80 text-white hover:bg-white/15">
                <a href="#contact-form">{secondaryCta.label}</a>
              </Button>
            )}
          </div>
        </div>
        <div className="flex-1 rounded-3xl border border-white/15 bg-white/10 p-8 shadow-[0_30px_80px_rgba(6,17,38,0.45)] backdrop-blur">
          <h2 className="text-xl font-semibold text-white drop-shadow">Why {microsite.city} chooses us</h2>
          <p className="mt-4 text-blue-50/95">{microsite.service_description}</p>
        </div>
      </div>
    </section>
  );
}
