import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string; // Optional - if not provided, it's the current page
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generate BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `${typeof window !== 'undefined' ? window.location.origin : ''}${item.href}` : undefined,
    })),
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4">
        <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-slate-900" : "text-slate-600"}>
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
    </>
  );
}
