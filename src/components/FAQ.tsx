"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { Microsite } from "@/lib/types";
import { hexToRgba } from "@/lib/color";

interface FAQProps {
  microsite: Microsite;
}

export function FAQ({ microsite }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const accent = microsite.accent_color ?? "#0ea5e9";

  if (!microsite.faq.length) {
    return null;
  }

  return (
    <section className="relative bg-white py-20">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-slate-50 blur-3xl" />
      
      <div className="relative mx-auto max-w-4xl px-4">
        {/* Section Header */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-50 to-slate-100 px-5 py-2">
            <HelpCircle className="h-4 w-4" style={{ color: accent }} />
            <span className="text-sm font-semibold tracking-wide" style={{ color: accent }}>
              FAQ
            </span>
          </div>
          
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Answers to common questions {microsite.city} property teams ask our technicians
          </p>
        </div>

        {/* FAQ Accordion */}
        <dl className="mt-16 space-y-4">
          {microsite.faq.map((entry, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div
                key={entry.question}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                style={{ borderColor: hexToRgba(accent, isOpen ? 0.3 : 0.15) }}
              >
                <dt>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-slate-50"
                  >
                    <span className="text-lg font-semibold text-slate-900 sm:text-xl">
                      {entry.question}
                    </span>
                    <ChevronDown
                      className="h-6 w-6 flex-shrink-0 transition-transform duration-300"
                      style={{ 
                        color: accent,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                      }}
                    />
                  </button>
                </dt>
                <dd
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isOpen ? "500px" : "0",
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div
                    className="prose prose-slate max-w-none px-6 pb-6 text-slate-600"
                    dangerouslySetInnerHTML={{ __html: entry.answer }}
                  />
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
