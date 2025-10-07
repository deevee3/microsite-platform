import { BadgeCheck, DollarSign, Truck, Wallet, Clock, ClipboardCheck, Receipt, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Microsite } from "@/lib/types";
import { hexToRgba } from "@/lib/color";

const iconMap: Partial<Record<string, LucideIcon>> = {
  truck: Truck,
  badge: BadgeCheck,
  "badge-check": BadgeCheck,
  "dollar-sign": DollarSign,
  wallet: Wallet,
  clock: Clock,
  "clipboard-check": ClipboardCheck,
  receipt: Receipt,
};

interface ServiceHighlightsProps {
  microsite: Microsite;
}

export function ServiceHighlights({ microsite }: ServiceHighlightsProps) {
  const accent = microsite.accent_color ?? "#0ea5e9";
  
  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50 to-white py-20">
      {/* Decorative elements */}
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-blue-50/40 blur-3xl" />
      <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-purple-50/30 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-5 py-2">
            <Sparkles className="h-4 w-4" style={{ color: accent }} />
            <span className="text-sm font-semibold tracking-wide" style={{ color: accent }}>
              Our Services
            </span>
          </div>
          
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Comprehensive HVAC Repair
          </h2>
          <h3 className="mt-2 text-2xl font-semibold text-slate-700 sm:text-3xl">
            Serving {microsite.city}, {microsite.state}
          </h3>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {microsite.service_description}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {microsite.service_features.map((feature, index) => {
            const Icon = iconMap[feature.icon] ?? BadgeCheck;
            
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{ 
                  borderColor: hexToRgba(accent, 0.2),
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${hexToRgba(accent, 0.05)} 0%, transparent 100%)`
                  }}
                />
                
                {/* Icon Container */}
                <div className="relative">
                  <div
                    className="inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                    style={{ 
                      backgroundColor: hexToRgba(accent, 0.1),
                      boxShadow: `0 8px 20px ${hexToRgba(accent, 0.15)}`
                    }}
                  >
                    <Icon 
                      className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" 
                      style={{ color: accent }}
                      aria-hidden 
                    />
                  </div>
                  
                  {/* Decorative corner dot */}
                  <div 
                    className="absolute -right-1 -top-1 h-3 w-3 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                </div>

                {/* Content */}
                <h3 className="relative mt-6 text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="relative mt-4 leading-relaxed text-slate-600">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div 
                  className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: accent }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
