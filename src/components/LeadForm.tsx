"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Microsite } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  service_need: z.string().min(1, "Please select a service"),
  notes: z.string().optional(),
  honeypot: z.string().max(0),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  microsite: Microsite;
}

export function LeadForm({ microsite }: LeadFormProps) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          domain: microsite.domain,
          city: microsite.city,
          state: microsite.state,
          recipient_email: microsite.form_recipient_email,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Lead submission error", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur">
          <h2 className="text-3xl font-semibold text-white">Request Emergency Service</h2>
          <p className="mt-3 text-slate-200">
            Submit the form and the {microsite.city} dispatch team will call within 15 minutes.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label className="text-slate-200" htmlFor="name">
                Full Name *
              </Label>
              <Input id="name" placeholder="Jane Smith" {...register("name")} />
              {errors.name && <p className="text-sm text-red-300">{errors.name.message}</p>}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-slate-200" htmlFor="email">
                  Email *
                </Label>
                <Input id="email" type="email" placeholder="jane@example.com" {...register("email")} />
                {errors.email && <p className="text-sm text-red-300">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-slate-200" htmlFor="phone">
                  Phone *
                </Label>
                <Input id="phone" type="tel" placeholder="(513) 555-0101" {...register("phone")} />
                {errors.phone && <p className="text-sm text-red-300">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200" htmlFor="service_need">
                Service Needed *
              </Label>
              <select
                id="service_need"
                className="h-11 w-full rounded-md border border-white/25 bg-slate-800/80 px-3 text-base text-white shadow-inner transition focus:outline-none focus:ring-2 focus:ring-sky-400"
                defaultValue=""
                {...register("service_need")}
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="emergency">Emergency Repair</option>
                <option value="maintenance">Maintenance</option>
                <option value="installation">New Installation</option>
                <option value="inspection">Inspection</option>
              </select>
              {errors.service_need && <p className="text-sm text-red-300">{errors.service_need.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200" htmlFor="notes">
                Additional Details
              </Label>
              <Textarea
                id="notes"
                className="bg-slate-800/80 text-white placeholder:text-slate-400"
                placeholder="Describe the HVAC issue…"
                rows={4}
                {...register("notes")}
              />
            </div>

            <input type="text" aria-hidden tabIndex={-1} className="hidden" {...register("honeypot")} />

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-blue-500 text-white hover:bg-blue-400">
              {isSubmitting ? "Submitting…" : "Submit Request"}
            </Button>

            {submitStatus === "success" && (
              <p className="text-sm font-medium text-green-300">
                Thank you! A technician will be in touch shortly.
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-sm font-medium text-red-300">
                There was an issue sending your request. Please call us directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
