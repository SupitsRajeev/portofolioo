"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredCaseStudies, type CaseStudy } from "@/content/portfolio";
import { projectToCaseStudy, type CMSProject } from "@/lib/cms";
import Image from "next/image";
import Link from "next/link";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function useFeaturedCaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>(featuredCaseStudies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/projects/featured`,
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch featured CMS projects: ${response.statusText}`);
        }

        const data = (await response.json()) as CMSProject[];
        if (!mounted) {
          return;
        }

        if (Array.isArray(data) && data.length > 0) {
          setStudies(data.map(projectToCaseStudy));
        } else {
          setStudies(featuredCaseStudies);
        }
      } catch {
        if (mounted) {
          setStudies(featuredCaseStudies);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return { studies, loading };
}

export function PortfolioGallery() {
  const { studies, loading } = useFeaturedCaseStudies();

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="container relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-mono text-primary mb-2">FEATURED WORK</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Recent <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Projects from the CMS when available, with your curated case studies as fallback.
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 mb-16"
          >
            {studies.map((study) => (
              <motion.div key={study.id} variants={item}>
                <div className="group relative overflow-hidden rounded-2xl border border-border hover:border-primary/50 transition-all duration-300">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />

                  <div className="bg-background/95 backdrop-blur">
                    <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                      <div className="flex flex-col justify-center">
                        <div className="mb-4 inline-flex items-center gap-2 w-fit">
                          <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {study.service}
                          </span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {study.title}
                        </h3>

                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                          {study.excerpt}
                        </p>

                        <div className="mb-6">
                          <p className="text-sm font-semibold text-primary/70 mb-2">CLIENT</p>
                          <p className="text-lg font-semibold">{study.client}</p>
                        </div>

                        <div className="mb-8 grid grid-cols-2 gap-4">
                          {study.results.slice(0, 4).map((result, i) => (
                            <div key={i} className="bg-primary/5 rounded-lg p-4">
                              <p className="text-xs text-muted-foreground mb-1">{result.metric}</p>
                              <p className="text-2xl font-bold text-primary">{result.value}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          <Link href={`/portfolio/${study.slug}`}>
                            <Button variant="default" className="gap-2">
                              View Case Study
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="relative h-96 md:h-auto min-h-96 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 z-10" />
                        <Image
                          src={study.images[0]}
                          alt={study.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {study.testimonial && (
                      <div className="border-t border-border bg-primary/5 px-8 md:px-12 py-8">
                        <div className="flex gap-4 items-start">
                          <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-foreground italic mb-3 leading-relaxed">
                              "{study.testimonial.quote}"
                            </p>
                            <div>
                              <p className="font-semibold">{study.testimonial.author}</p>
                              <p className="text-sm text-muted-foreground">
                                {study.testimonial.title} at {study.testimonial.company}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/portfolio">
            <Button size="lg" variant="outline" className="gap-2">
              View All Projects
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
