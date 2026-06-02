"use client";

import { motion, Variants } from "framer-motion";
import { useBlogPosts } from "@/hooks/useCMS";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, Clock, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

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

export function BlogShowcase() {
  const { posts, loading, error } = useBlogPosts();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(posts.map(p => p.category));
    return Array.from(cats);
  }, [posts]);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  if (error) {
    console.error("[BlogShowcase] Error fetching posts:", error);
    return (
      <section id="blog" className="py-20 relative overflow-hidden">
        <div className="container relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-400">Error loading blog posts: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section id="blog" className="py-20 relative overflow-hidden">
        <div className="container relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    console.warn("[BlogShowcase] No blog posts returned from API");
    return (
      <section id="blog" className="py-20 relative overflow-hidden">
        <div className="container relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-muted-foreground">No blog posts available yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="container relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-mono text-primary mb-2">INSIGHTS & ARTICLES</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Latest from the <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Blog</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Design tips, industry insights, and creative process breakdowns
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredPosts.map((post) => (
            <motion.div key={post.id} variants={item}>
              <Link href={`/blog/${post.slug}`}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />

                  <div className="relative bg-background/95 backdrop-blur h-full flex flex-col">
                    {/* Cover Image */}
                    <div className="relative w-full h-48 overflow-hidden bg-primary/10">
                      <Image
                        src={post.coverImage || "https://images.unsplash.com/photo-1516321318423-f06140cf6e98?w=500&h=300&fit=crop"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                      {/* Category Tag */}
                      <div className="inline-flex items-center gap-2 w-fit mb-3">
                        <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.publishedAt 
                            ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readingTime || 5} min read
                        </div>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="text-xs text-muted-foreground px-2 py-1">
                              +{post.tags.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Blog CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/blog">
            <Button size="lg" className="gap-2">
              Read All Articles
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
