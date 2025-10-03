interface Env {
  RESEND_API_KEY: string;
}

interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  service_need: string;
  notes?: string;
  domain: string;
  city: string;
  state: string;
  recipient_email: string;
  honeypot?: string;
}

type PagesContext = {
  request: Request;
  env: Env;
  waitUntil(promise: Promise<unknown>): void;
  next(): Promise<Response>;
  data: Record<string, unknown>;
};

function isValidPayload(payload: LeadPayload): payload is LeadPayload {
  if (payload.honeypot) {
    return false;
  }

  const requiredFields: (keyof LeadPayload)[] = [
    "name",
    "email",
    "phone",
    "service_need",
    "domain",
    "city",
    "state",
    "recipient_email",
  ];

  return requiredFields.every((field) => typeof payload[field] === "string" && payload[field]);
}

export const onRequestPost = async ({ request, env }: PagesContext): Promise<Response> => {

  try {
    const payload = (await request.json()) as LeadPayload;

    if (!isValidPayload(payload)) {
      return new Response(JSON.stringify({ error: "Invalid submission" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "leads@hvacpartners.com",
        to: payload.recipient_email,
        subject: `New HVAC Lead: ${payload.city}, ${payload.state}`,
        html: `
          <h2>New HVAC Lead Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Source</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${payload.domain}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${payload.name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${payload.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${payload.phone}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Service Needed</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${payload.service_need}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Notes</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${payload.notes ?? "N/A"}</td></tr>
          </table>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const message = await emailResponse.text();
      console.error("Resend API error", message);
      return new Response(JSON.stringify({ error: "Email delivery failed" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Lead submission handler error", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
