"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfilePhoto } from "./ProfilePhoto";
import { CompanyCarousel } from "./CompanyCarousel";
import { GsapWordReveal } from "@/components/GsapReveal";
import { defaultContent } from "@/content";

// Maps every supported social platform to a Lucide icon.
// Twitter icon was removed from lucide-react v0.460+; we fall back to a text label.
const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub:   Github,
  LinkedIn: Linkedin,
  Email:    Mail,
};

export function Hero() {
  const { identity, socials } = defaultContent;
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Background nebula blobs — stay behind everything */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[55%] h-[55%] rounded-full bg-primary/20 dark:bg-primary/15 blur-[140px] animate-nebula-1" />
        <div className="absolute top-[60%] -right-[10%] w-[45%] h-[45%] rounded-full bg-accent/15 dark:bg-cyan-500/10 blur-[120px] animate-nebula-2" />
      </div>

      {/* Two-column layout */}
      <div className="container relative z-10 px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-32 lg:py-0 min-h-[100dvh]">

          {/* ── Left: text content ── */}
          <div className="w-full lg:w-5/12 flex flex-col items-center text-center flex-shrink-0">

            {/* Headline — GSAP word-by-word reveal */}
            <h1 className="text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]">
              <GsapWordReveal
                text={`I'm ${identity.name}`}
                as="span"
                delay={0.15}
                stagger={0.07}
                immediate
                className="inline"
              />
              <span className="text-primary dark:drop-shadow-[0_0_18px_hsl(var(--primary)/0.55)]">.</span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground font-light mb-10 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {identity.title} building things for the web that are{" "}
              <span className="text-foreground font-medium">fast, beautiful,</span> and intentional.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="h-12 px-8 text-base shadow-lg shadow-primary/20 dark:shadow-primary/35 hover:shadow-primary/40 dark:hover:shadow-[0_0_28px_hsl(var(--primary)/0.5)] hover:-translate-y-0.5 transition-all duration-300"
                asChild
              >
                <a href="#projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base border-border/60 bg-background/40 backdrop-blur-sm hover:border-primary/50 dark:hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-300"
                asChild
              >
                <a href="#contact">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Me
                </a>
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center justify-center gap-3 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {socials.map(({ href, platform }) => {
                const Icon = SOCIAL_ICONS[platform];
                if (!Icon) {
                  // Text fallback for platforms without a registered icon (e.g. Twitter/X)
                  return (
                    <a
                      key={platform}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={platform}
                      className="p-2 rounded-lg text-xs font-mono hover:text-primary hover:-translate-y-0.5 transition-all duration-200"
                    >
                      {platform}
                    </a>
                  );
                }
                return (
                  <motion.a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={platform}
                    className="relative flex items-center justify-center w-10 h-10 rounded-full border border-border/60 bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/8 transition-colors duration-200 group overflow-hidden"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <span className="absolute inset-0 rounded-full group-hover:shadow-[0_0_16px_4px_hsl(var(--primary)/0.2)] transition-all duration-300" />
                    <Icon className="h-4 w-4 relative z-10 group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.8)] transition-all duration-200" />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Company Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <CompanyCarousel />
            </motion.div>
          </div>

          {/* ── Right: animated profile photo + Lottie accent ── */}
          <motion.div
            className="w-full lg:w-5/12 flex items-center justify-center relative h-[380px] md:h-[460px] lg:h-[580px] flex-shrink-0"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          >
            {/* Soft behind-glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/20 dark:bg-primary/25 blur-[80px]" />
            </div>
            <ProfilePhoto size={320} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - REMOVED */}

    </section>
  );
}
