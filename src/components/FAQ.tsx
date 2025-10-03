import type { Microsite } from "@/lib/types";

interface FAQProps {
  microsite: Microsite;
}

export function FAQ({ microsite }: FAQProps) {
  if (!microsite.faq.length) {
    return null;
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-slate-900">Frequently asked questions</h2>
          <p className="mt-3 text-lg text-slate-600">
            Answers to top questions Cincinnati property teams ask our technicians.
          </p>
        </div>
        <dl className="mt-10 space-y-6">
          {microsite.faq.map((entry) => (
            <div key={entry.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <dt className="text-lg font-semibold text-slate-900">{entry.question}</dt>
              <dd
                className="prose prose-slate mt-3 text-slate-600"
                dangerouslySetInnerHTML={{ __html: entry.answer }}
              />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
