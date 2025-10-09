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
  // Only return navigation for multi-page enabled sites
  if (!hasMultipage) {
    return [];
  }

  // Common services navigation (same for all domains)
  const servicesNav = {
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
  };

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
      servicesNav,
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

  // Dayton HVAC navigation structure
  if (domain === "hvacrepair-dayton-oh.com") {
    return [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "About",
        href: "/about",
      },
      servicesNav,
      {
        label: "Service Area",
        href: "/service-area",
        children: [
          {
            label: "Kettering",
            href: "/locations/kettering",
          },
          {
            label: "Beavercreek",
            href: "/locations/beavercreek",
          },
          {
            label: "Centerville",
            href: "/locations/centerville",
          },
          {
            label: "Huber Heights",
            href: "/locations/huber-heights",
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

  // Blue Ash HVAC navigation structure
  if (domain === "hvacrepair-blue-ash-oh.com") {
    return [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "About",
        href: "/about",
      },
      servicesNav,
      {
        label: "Service Area",
        href: "/service-area",
        children: [
          {
            label: "Sharonville",
            href: "/locations/sharonville",
          },
          {
            label: "Montgomery",
            href: "/locations/montgomery",
          },
          {
            label: "Kenwood",
            href: "/locations/kenwood",
          },
          {
            label: "Sycamore Township",
            href: "/locations/sycamore-township",
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

  // Newport KY HVAC navigation structure
  if (domain === "hvacrepair-newport-ky.com") {
    return [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "About",
        href: "/about",
      },
      servicesNav,
      {
        label: "Service Area",
        href: "/service-area",
        children: [
          {
            label: "Covington",
            href: "/locations/covington",
          },
          {
            label: "Bellevue",
            href: "/locations/bellevue",
          },
          {
            label: "Fort Thomas",
            href: "/locations/fort-thomas",
          },
          {
            label: "Highland Heights",
            href: "/locations/highland-heights",
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

  // Common footer structure for all multi-page sites
  const commonFooter = {
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

  // Return common footer for all multi-page enabled domains
  if (
    domain === "hvacrepair-cincinnati-oh.com" ||
    domain === "hvacrepair-dayton-oh.com" ||
    domain === "hvacrepair-blue-ash-oh.com" ||
    domain === "hvacrepair-newport-ky.com"
  ) {
    return commonFooter;
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
