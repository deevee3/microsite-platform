import type { NavigationItem } from "./types";

/**
 * Get navigation items for a specific domain
 * Only returns navigation for domains with has_multipage enabled
 * 
 * @param domain - The domain to get navigation for
 * @param hasMultipage - Whether this microsite has multi-page architecture enabled
 * @returns Array of navigation items or empty array
 */
export function getNavigationItems(domain: string, hasMultipage: boolean = false): NavigationItem[] {
  // Only return navigation for Cincinnati (or other multi-page enabled sites)
  if (!hasMultipage) {
    return [];
  }

  // Cincinnati HVAC navigation structure
  if (domain === "hvacrepair-cincinnati-oh.com") {
    return [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Services",
        href: "/services",
        children: [
          {
            label: "Furnace Repair",
            href: "/services/furnace-repair",
          },
          {
            label: "AC Installation",
            href: "/services/ac-installation",
          },
          {
            label: "Duct Cleaning",
            href: "/services/duct-cleaning",
          },
          {
            label: "Thermostat Replacement",
            href: "/services/thermostat-replacement",
          },
          {
            label: "Emergency HVAC",
            href: "/services/emergency-hvac",
          },
        ],
      },
      {
        label: "Service Area",
        href: "/service-area",
        children: [
          {
            label: "Blue Ash",
            href: "/locations/blue-ash",
          },
          {
            label: "Mason",
            href: "/locations/mason",
          },
          {
            label: "West Chester",
            href: "/locations/west-chester",
          },
          {
            label: "Loveland",
            href: "/locations/loveland",
          },
          {
            label: "View All Locations",
            href: "/service-area",
          },
        ],
      },
      {
        label: "Contact",
        href: "/contact",
      },
      {
        label: "Reviews",
        href: "/reviews",
      },
      {
        label: "FAQ",
        href: "/faq-page",
      },
    ];
  }

  // Future: Add navigation for other multi-page enabled microsites
  // if (domain === "another-domain.com") { ... }

  return [];
}

/**
 * Get footer navigation items for a specific domain
 * 
 * @param domain - The domain to get footer navigation for
 * @param hasMultipage - Whether this microsite has multi-page architecture enabled
 * @returns Object with categorized footer navigation items
 */
export function getFooterNavigationItems(domain: string, hasMultipage: boolean = false) {
  if (!hasMultipage) {
    return null;
  }

  if (domain === "hvacrepair-cincinnati-oh.com") {
    return {
      quickLinks: [
        { label: "Services", href: "/services" },
        { label: "Service Area", href: "/service-area" },
        { label: "Reviews", href: "/reviews" },
        { label: "FAQ", href: "/faq-page" },
      ],
      services: [
        { label: "Furnace Repair", href: "/services/furnace-repair" },
        { label: "AC Installation", href: "/services/ac-installation" },
        { label: "Duct Cleaning", href: "/services/duct-cleaning" },
        { label: "Thermostat Replacement", href: "/services/thermostat-replacement" },
        { label: "Emergency HVAC", href: "/services/emergency-hvac" },
      ],
      legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    };
  }

  return null;
}

/**
 * Check if a path is currently active
 * 
 * @param currentPath - The current page path
 * @param itemPath - The navigation item path
 * @returns True if the item should be highlighted as active
 */
export function isActivePath(currentPath: string, itemPath: string): boolean {
  if (itemPath === "/") {
    return currentPath === "/";
  }
  return currentPath.startsWith(itemPath);
}
