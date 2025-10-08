import { notFound } from "next/navigation";
import { getMicrositeByDomain } from "@/lib/data-client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface DomainLayoutProps {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}

export default async function DomainLayout({ children, params }: DomainLayoutProps) {
  const { domain } = await params;
  const microsite = await getMicrositeByDomain(domain);

  if (!microsite) {
    notFound();
  }

  return (
    <>
      <Navigation microsite={microsite} />
      <main id="main-content">{children}</main>
      <Footer microsite={microsite} />
    </>
  );
}
