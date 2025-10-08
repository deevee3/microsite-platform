import Link from "next/link";
import { Quote, Star, Users } from "lucide-react";
import type { Microsite } from "@/lib/types";
import { hexToRgba } from "@/lib/color";

interface TestimonialsProps {
  microsite: Microsite;
}

export function Testimonials({ microsite }: TestimonialsProps) {
  const accent = microsite.accent_color ?? "#0ea5e9";
  
  if (!microsite.testimonials.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-50/30 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-sm">
            <Users className="h-4 w-4" style={{ color: accent }} />
            <span className="text-sm font-semibold tracking-wide" style={{ color: accent }}>
              Testimonials
            </span>
          </div>
          
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Trusted Across {microsite.city}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Local property teams rely on our network technicians for rapid HVAC recovery
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {microsite.testimonials.map((testimonial, index) => (
            <blockquote
              key={testimonial.quote}
              className="group relative overflow-hidden rounded-3xl border bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ 
                borderColor: hexToRgba(accent, 0.15),
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Quote icon background */}
              <div 
                className="absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-5 transition-all duration-300 group-hover:scale-110 group-hover:opacity-10"
                style={{ backgroundColor: accent }}
              />
              
              {/* Quote Icon */}
              <div 
                className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-md"
                style={{ backgroundColor: hexToRgba(accent, 0.1) }}
              >
                <Quote className="h-6 w-6" style={{ color: accent }} />
              </div>

              {/* Star Rating */}
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                  />
                ))}
              </div>

              {/* Quote Text */}
              <p className="relative text-lg leading-relaxed text-slate-700">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Attribution */}
              <footer className="relative mt-6 flex items-center gap-4 border-t pt-4" style={{ borderColor: hexToRgba(accent, 0.1) }}>
                <div 
                  className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: accent }}
                >
                  {testimonial.attribution.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonial.attribution}
                  </div>
                  <div className="text-sm text-slate-500">
                    {testimonial.role}
                  </div>
                </div>
              </footer>

              {/* Decorative corner accent */}
              <div 
                className="absolute bottom-0 right-0 h-2 w-20 transition-all duration-300 group-hover:w-32"
                style={{ backgroundColor: accent }}
              />
            </blockquote>
          ))}
        </div>

        {/* Link to full reviews page for multi-page sites */}
        {microsite.has_multipage && (
          <div className="mt-12 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-lg font-semibold hover:underline"
              style={{ color: accent }}
            >
              Read More Reviews →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
