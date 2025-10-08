import type { Service, Location } from "./types";
import cincinnatiServicesData from "@/data/cincinnati-services.json";
import cincinnatiLocationsData from "@/data/cincinnati-locations.json";

/**
 * Get all services for a specific domain
 * @param domain - The microsite domain
 * @returns Array of services or empty array if domain not found
 */
export function getServicesForDomain(domain: string): Service[] {
  if (domain === "hvacrepair-cincinnati-oh.com") {
    return cincinnatiServicesData as Service[];
  }
  
  // Future: Add other domains here
  return [];
}

/**
 * Get a specific service by slug for a domain
 * @param domain - The microsite domain
 * @param slug - The service slug
 * @returns Service object or null if not found
 */
export function getServiceBySlug(domain: string, slug: string): Service | null {
  const services = getServicesForDomain(domain);
  return services.find(service => service.slug === slug) || null;
}

/**
 * Get all locations for a specific domain
 * @param domain - The microsite domain
 * @returns Array of locations or empty array if domain not found
 */
export function getLocationsForDomain(domain: string): Location[] {
  if (domain === "hvacrepair-cincinnati-oh.com") {
    return cincinnatiLocationsData as Location[];
  }
  
  // Future: Add other domains here
  return [];
}

/**
 * Get a specific location by slug for a domain
 * @param domain - The microsite domain
 * @param slug - The location slug
 * @returns Location object or null if not found
 */
export function getLocationBySlug(domain: string, slug: string): Location | null {
  const locations = getLocationsForDomain(domain);
  return locations.find(location => location.slug === slug) || null;
}

/**
 * Get all service slugs for static generation
 * @param domain - The microsite domain
 * @returns Array of service slugs
 */
export function getAllServiceSlugs(domain: string): string[] {
  const services = getServicesForDomain(domain);
  return services.map(service => service.slug);
}

/**
 * Get all location slugs for static generation
 * @param domain - The microsite domain
 * @returns Array of location slugs
 */
export function getAllLocationSlugs(domain: string): string[] {
  const locations = getLocationsForDomain(domain);
  return locations.map(location => location.slug);
}

/**
 * Get related services for a service
 * @param domain - The microsite domain
 * @param currentSlug - The current service slug
 * @param relatedSlugs - Array of related service slugs
 * @returns Array of related Service objects
 */
export function getRelatedServices(domain: string, currentSlug: string, relatedSlugs?: string[]): Service[] {
  if (!relatedSlugs || relatedSlugs.length === 0) {
    return [];
  }
  
  const services = getServicesForDomain(domain);
  return services.filter(service => 
    relatedSlugs.includes(service.slug) && service.slug !== currentSlug
  );
}

/**
 * Get nearby locations for a location
 * @param domain - The microsite domain
 * @param currentSlug - The current location slug
 * @param nearbyLocationSlugs - Array of nearby location slugs
 * @returns Array of nearby Location objects
 */
export function getNearbyLocations(domain: string, currentSlug: string, nearbyLocationSlugs?: string[]): Location[] {
  if (!nearbyLocationSlugs || nearbyLocationSlugs.length === 0) {
    return [];
  }
  
  const locations = getLocationsForDomain(domain);
  return locations.filter(location => 
    nearbyLocationSlugs.includes(location.slug) && location.slug !== currentSlug
  );
}
