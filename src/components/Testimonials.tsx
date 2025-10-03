import type { Microsite } from "@/lib/types";

interface TestimonialsProps {
  microsite: Microsite;
}

export function Testimonials({ microsite }: TestimonialsProps) {
  if (!microsite.testimonials.length) {
    return null;
  }

  return (
    <section className="bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-slate-900">
            Trusted across {microsite.city}
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Local property teams rely on our technicians for rapid HVAC recovery.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {microsite.testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.quote}
              className="relative rounded-3xl bg-white p-8 shadow-md"
            >
              <p className="text-lg text-slate-700">“{testimonial.quote}”</p>
              <footer className="mt-6 text-sm uppercase tracking-wide text-slate-500">
                {testimonial.attribution} · {testimonial.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
