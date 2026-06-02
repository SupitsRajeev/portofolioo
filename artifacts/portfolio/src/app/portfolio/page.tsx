import { Metadata } from "next";
import Script from "next/script";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { Testimonials } from "@/components/Testimonials";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ClientWrapper } from "@/components/ClientWrapper";
import { generateMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Portfolio & Case Studies | 3D Design Projects",
  description:
    "Explore award-winning 3D design projects. Case studies featuring character design, motion graphics, interactive visualizations, and brand animation work.",
  url: `${siteConfig.siteUrl}/portfolio`,
});

export default function PortfolioPage() {
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "3D Design Portfolio",
    description:
      "Award-winning 3D design and animation projects featuring character design, motion graphics, and interactive experiences",
    url: `${siteConfig.siteUrl}/portfolio`,
    creator: {
      "@type": "Person",
      name: siteConfig.author,
    },
  };

  return (
    <>
      {/* Portfolio Schema */}
      <Script
        id="portfolio-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
      />

      <ClientWrapper>
        <Navigation />
        <main className="flex-grow">
          <div className="container px-6 md:px-12 py-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Featured <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Dive into detailed case studies showcasing design process, challenges solved, and measurable results for each project.
            </p>
          </div>
          <PortfolioGallery />
          <Testimonials />
        </main>
        <Footer />
      </ClientWrapper>
    </>
  );
}
