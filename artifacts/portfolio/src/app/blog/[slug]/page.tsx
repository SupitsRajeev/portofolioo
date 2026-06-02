import { Metadata } from "next";
import Script from "next/script";
import { blogPosts } from "@/content/blog";
import { generateMetadata as generateSeoMetadata, generateStructuredData, siteConfig } from "@/lib/seo";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ClientWrapper } from "@/components/ClientWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return {};
  }

  return generateSeoMetadata({
    title: `${post.title} | Design Blog`,
    description: post.excerpt,
    image: post.coverImage,
    url: `${siteConfig.siteUrl}/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const schema = generateStructuredData("BlogPosting", post);

  return (
    <>
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <ClientWrapper>
        <Navigation />
        <article className="min-h-screen">
          {/* Hero */}
          <div className="relative pt-32 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
            <div className="container relative z-10 px-6 md:px-12">
              <div className="mb-6 inline-flex items-center gap-2">
                <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min read
                </div>
                <div className="flex items-center gap-2">
                  By <span className="text-foreground font-semibold">{post.author}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="container px-6 md:px-12 py-16">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-invert max-w-none text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="container px-6 md:px-12 py-20 border-t border-border">
              <h2 className="text-3xl font-bold mb-12">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <div className="group relative overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all duration-300">
                      <div className="p-6 bg-background/95 backdrop-blur h-full flex flex-col hover:bg-primary/5">
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                          Read More <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="container px-6 md:px-12 py-20 border-t border-border">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to start a project?</h2>
              <p className="text-muted-foreground mb-6">
                Let's bring your 3D design vision to life
              </p>
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Get in Touch <ChevronRight className="w-4 h-4" />
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
