import { Metadata } from "next";
import Script from "next/script";
import { BlogShowcase } from "@/components/BlogShowcase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ClientWrapper } from "@/components/ClientWrapper";
import { generateMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Design Blog | Tips, Tutorials & Industry Insights",
  description:
    "Expert articles on 3D design, motion graphics, animation, web development, and creative process. Learn from industry insights and technical tutorials.",
  url: `${siteConfig.siteUrl}/blog`,
});

export default function BlogPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Design & Animation Blog",
    description:
      "Expert articles on 3D design, animation, motion graphics, and web development",
    url: `${siteConfig.siteUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: `${siteConfig.siteUrl}/logo.png`,
    },
  };

  return (
    <>
      {/* Blog Schema */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />

      <ClientWrapper>
        <Navigation />
        <main className="flex-grow">
          <div className="container px-6 md:px-12 py-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Design & Animation <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Insights, tutorials, and industry perspectives on 3D design, animation, and creative technology.
            </p>
          </div>
          <BlogShowcase />
        </main>
        <Footer />
      </ClientWrapper>
    </>
  );
}
