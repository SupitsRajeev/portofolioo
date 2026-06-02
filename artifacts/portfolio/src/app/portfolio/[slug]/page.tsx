import { Metadata } from "next";
import Script from "next/script";
import { caseStudies } from "@/content/portfolio";
import {
  fetchCMSProjects,
  projectToCaseStudy,
} from "@/lib/cms";
import {
  generateMetadata as generateSeoMetadata,
  siteConfig,
} from "@/lib/seo";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ClientWrapper } from "@/components/ClientWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Users } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

async function getCaseStudies() {
  try {
    const cmsProjects = await fetchCMSProjects();
    if (cmsProjects.length > 0) {
      return cmsProjects.map(projectToCaseStudy);
    }
  } catch {
    // Fall back to local case studies below.
  }

  return caseStudies;
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const studies = await getCaseStudies();
  const study = studies.find((item) => item.slug === slug);

  if (!study) {
    return {};
  }

  return generateSeoMetadata({
    title: `${study.title} | Case Study`,
    description: study.excerpt,
    image: study.images[0],
    url: `${siteConfig.siteUrl}/portfolio/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const studies = await getCaseStudies();
  const study = studies.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  const relatedStudies = studies
    .filter((item) => item.id !== study.id && item.service === study.service)
    .slice(0, 2);

  return (
    <>
      <Script
        id="case-study-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: study.title,
            description: study.excerpt,
            image: study.images,
            author: {
              "@type": "Person",
              name: siteConfig.author,
            },
          }),
        }}
      />

      <ClientWrapper>
        <Navigation />
        <article className="min-h-screen">
          <div className="container px-6 md:px-12 pt-32 pb-12">
            <Link
              href="/portfolio"
              className="flex items-center gap-2 text-primary hover:gap-3 transition-all mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                {study.service}
              </span>
            </div>
            <h1 className="text-6xl font-bold mb-4">{study.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{study.excerpt}</p>
            <div className="flex flex-wrap items-center gap-6 mb-12">
              <div>
                <p className="text-sm text-muted-foreground mb-1">CLIENT</p>
                <p className="text-lg font-semibold">{study.client}</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-border" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">PROJECT DURATION</p>
                <p className="text-lg font-semibold">{study.timeline}</p>
              </div>
            </div>
          </div>

          {study.images[0] && (
            <div className="container px-6 md:px-12 mb-16">
              <div className="relative w-full h-96 md:h-96 rounded-2xl overflow-hidden">
                <Image
                  src={study.images[0]}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="container px-6 md:px-12 py-16">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Challenge</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {study.challenge}
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Solution</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {study.solution}
                </p>
              </div>
            </div>
          </div>

          <div className="container px-6 md:px-12 py-16 border-t border-border">
            <h2 className="text-3xl font-bold mb-12">Results & Impact</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {study.results.map((result, i) => (
                <div
                  key={i}
                  className="bg-primary/5 rounded-lg p-6 border border-primary/20"
                >
                  <p className="text-sm text-muted-foreground mb-2">
                    {result.metric}
                  </p>
                  <p className="text-4xl font-bold text-primary">{result.value}</p>
                </div>
              ))}
            </div>
          </div>

          {study.testimonial && (
            <div className="container px-6 md:px-12 py-16 border-t border-border">
              <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/20 rounded-2xl p-12">
                <div className="flex gap-4 items-start mb-6">
                  <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                </div>
                <p className="text-2xl font-semibold mb-6 leading-relaxed">
                  "{study.testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-lg">{study.testimonial.author}</p>
                  <p className="text-muted-foreground">
                    {study.testimonial.title} at {study.testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="container px-6 md:px-12 py-16 border-t border-border">
            <h2 className="text-3xl font-bold mb-8">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {study.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {relatedStudies.length > 0 && (
            <div className="container px-6 md:px-12 py-16 border-t border-border">
              <h2 className="text-3xl font-bold mb-12">Related Projects</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedStudies.map((related) => (
                  <Link key={related.id} href={`/portfolio/${related.slug}`}>
                    <div className="group relative overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all duration-300">
                      {related.images[0] && (
                        <div className="relative w-full h-48 overflow-hidden">
                          <Image
                            src={related.images[0]}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6 bg-background/95 backdrop-blur">
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {related.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                          View Project <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="container px-6 md:px-12 py-20 border-t border-border">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                Ready to create something amazing?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's bring your vision to life with professional 3D design
              </p>
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Start Your Project <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </article>
        <Footer />
      </ClientWrapper>
    </>
  );
}
