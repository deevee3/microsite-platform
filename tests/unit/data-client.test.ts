import { describe, expect, it } from "vitest";
import { getMicrositeByDomain, getAllMicrositeDomains, getAllMicrosites } from "@/lib/data-client";

describe("data-client", () => {
  it("returns all microsites", async () => {
    const microsites = await getAllMicrosites();
    expect(microsites.length).toBeGreaterThan(0);
  });

  it("returns domain list", async () => {
    const domains = await getAllMicrositeDomains();
    expect(domains).toContain("hvacrepair-cincinnati-oh.com");
  });

  it("returns microsite by domain", async () => {
    const microsite = await getMicrositeByDomain("hvacrepair-cincinnati-oh.com");
    expect(microsite).not.toBeNull();
    expect(microsite?.city).toBe("Cincinnati");
  });
});
