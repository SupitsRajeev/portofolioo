import { Metadata } from "next";
import Script from "next/script";
import { Navigation } from "@/components/Navigation";
import { StarField } from "@/components/StarField";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhereIWorked } from "@/components/WhereIWorked";
import { Services } from "@/components/Services";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { BlogShowcase } from "@/components/BlogShowcase";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ClientWrapper } from "@/components/ClientWrapper";
import { generateMetadata, generateStructuredData, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "3D Design & Animation Portfolio | Professional Services",
  description:
    "Award-winning 3D designer specializing in character design, motion graphics, interactive visualizations, and brand animation. 8+ years experience bringing ideas to life.",
  url: siteConfig.siteUrl,
});

export default function HomePage() {
  const organizationSchema = generateStructuredData("Organization", {});
  const personSchema = generateStructuredData("Person", {});

  return (
    <>
      {/* Organization & Person Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />

      <ClientWrapper>
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground">
          <StarField />
          <Navigation />

          <main className="flex-grow">
            <Hero />
            <About />
            <Services />
            <PortfolioGallery />
            <BlogShowcase />
            <Testimonials />
            <FAQ />
            <Contact />
          </main>

          <Footer />
        </div>
      </ClientWrapper>
    </>
  );
}
