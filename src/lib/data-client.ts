import micrositesRaw from "@/data/microsites.json";
import { micrositeCollectionSchema } from "@/lib/validations";
import type { Microsite } from "@/lib/types";

const microsites: Microsite[] = micrositeCollectionSchema.parse(micrositesRaw);

export async function getMicrositeByDomain(domain: string): Promise<Microsite | null> {
  return microsites.find((microsite) => microsite.domain === domain) ?? null;
}

export async function getAllMicrositeDomains(): Promise<string[]> {
  return microsites.map((microsite) => microsite.domain);
}

export async function getAllMicrosites(): Promise<Microsite[]> {
  return microsites;
}
