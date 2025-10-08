"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import type { Microsite } from "@/lib/types";
import { getNavigationItems } from "@/lib/navigation-data";

interface NavigationProps {
  microsite: Microsite;
}

export function Navigation({ microsite }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const accentColor = microsite.accent_color ?? "#0ea5e9";
  const phoneNumber = microsite.call_tracking_number ?? microsite.primary_phone;
  
  const navItems = getNavigationItems(microsite.domain, microsite.has_multipage);

  // Only show navigation for multi-page sites
  if (!microsite.has_multipage || navItems.length === 0) {
    return null;
  }

  // Helper to build domain-aware paths
  const buildPath = (href: string) => {
    if (href === "/") {
      return `/${microsite.domain}`;
    }
    return `/${microsite.domain}${href}`;
  };

  const isActivePath = (href: string) => {
    const fullPath = buildPath(href);
    if (href === "/") {
      return pathname === `/${microsite.domain}` || pathname === `/${microsite.domain}/`;
    }
    return pathname.startsWith(fullPath);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href={buildPath("/")} className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-900">
              HVAC Repair Network
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                {item.children && item.children.length > 0 ? (
                  // Dropdown menu
                  <>
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActivePath(item.href)
                          ? "text-slate-900 bg-slate-100"
                          : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {/* Dropdown content */}
                    <div className="absolute left-0 mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={buildPath(child.href)}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActivePath(child.href)
                              ? "text-slate-900 bg-slate-50 font-medium"
                              : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  // Regular link
                  <Link
                    href={buildPath(item.href)}
                    className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActivePath(item.href)
                        ? "text-slate-900 bg-slate-100"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Phone CTA - Desktop */}
          {phoneNumber && (
            <a
              href={`tel:${phoneNumber}`}
              className="hidden lg:flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-lg transition-all hover:scale-105 hover:shadow-md"
              style={{ backgroundColor: accentColor }}
              aria-label={`Call us at ${phoneNumber}`}
            >
              <Phone className="h-4 w-4" />
              {phoneNumber}
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.children && item.children.length > 0 ? (
                  // Parent with children
                  <div className="space-y-1">
                    <Link
                      href={buildPath(item.href)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-2 text-base font-medium rounded-md transition-colors ${
                        isActivePath(item.href)
                          ? "text-slate-900 bg-slate-100"
                          : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={buildPath(child.href)}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                            isActivePath(child.href)
                              ? "text-slate-900 bg-slate-50 font-medium"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Regular link
                  <Link
                    href={buildPath(item.href)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 text-base font-medium rounded-md transition-colors ${
                      isActivePath(item.href)
                        ? "text-slate-900 bg-slate-100"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Phone CTA - Mobile */}
            {phoneNumber && (
              <a
                href={`tel:${phoneNumber}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 text-base font-semibold text-white rounded-lg transition-all mt-4"
                style={{ backgroundColor: accentColor }}
                aria-label={`Call us at ${phoneNumber}`}
              >
                <Phone className="h-5 w-5" />
                {phoneNumber}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
