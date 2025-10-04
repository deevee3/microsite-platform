import { BadgeCheck, DollarSign, Truck, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Microsite } from "@/lib/types";
import { hexToRgba } from "@/lib/color";

const iconMap: Partial<Record<string, LucideIcon>> = {
  truck: Truck,
  badge: BadgeCheck,
  "badge-check": BadgeCheck,
  "dollar-sign": DollarSign,
  wallet: Wallet,
};

interface ServiceHighlightsProps {
  microsite: Microsite;
}

export function ServiceHighlights({ microsite }: ServiceHighlightsProps) {
  const accent = microsite.accent_color ?? "#0ea5e9";
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Comprehensive HVAC repair services in {microsite.city}
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          {microsite.service_description}
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {microsite.service_features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              style={{ borderColor: hexToRgba(accent, 0.25) }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: hexToRgba(accent, 0.12), color: accent }}
              >
                {(() => {
                  const Icon = iconMap[feature.icon] ?? BadgeCheck;
                  return <Icon className="h-6 w-6" aria-hidden />;
                })()}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-base text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
