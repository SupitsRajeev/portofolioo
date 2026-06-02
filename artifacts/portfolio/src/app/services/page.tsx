import { Metadata } from "next";
import Script from "next/script";
import { Services } from "@/components/Services";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ClientWrapper } from "@/components/ClientWrapper";
import { generateMetadata, generateStructuredData, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "3D Design Services | Character Design, Animation & More",
  description:
    "Professional 3D design services including character design, motion graphics, interactive visualizations, brand animation, and product animation. Transparent pricing, expert execution.",
  url: `${siteConfig.siteUrl}/services`,
});

export default function ServicesPage() {
  const servicesSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${siteConfig.siteUrl}/services`,
        },
      ],
    },
  ];

  return (
    <>
      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesSchemas[0]),
        }}
      />

      <ClientWrapper>
        <Navigation />
        <main className="flex-grow">
          <Services />
          <FAQ />
          <Testimonials />
        </main>
        <Footer />
      </ClientWrapper>
    </>
  );
}
