"use client";

import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";
import { useTestimonials } from "@/hooks/useCMS";
import { useState, useEffect } from "react";

interface Testimonial {
  id: string | number;
  content?: string;
  quote?: string;
  name?: string;
  author?: string;
  role?: string;
  title?: string;
  company?: string;
  rating: number;
  image?: string;
  featured?: boolean;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Working with this designer transformed our brand. The animated assets and visual identity are professional-grade, and the attention to detail is exceptional.",
    author: "Sarah Chen",
    title: "Creative Director",
    company: "TechStart Inc.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    quote:
      "The 3D visualization increased our conversion rate by 38%. Customers can now see our products in ways they never could before. Highly recommend!",
    author: "Michael Rodriguez",
    title: "VP of E-commerce",
    company: "Luxury Goods Co.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    quote:
      "The character animations brought our game to life. The studio was professional, communicative, and delivered exceptional quality work.",
    author: "Alex Chen",
    title: "Game Director",
    company: "Indie Game Studio",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: "4",
    quote:
      "Motion graphics quality is broadcast-level. Delivered on time, responsive to feedback, and the work exceeded our expectations. Will definitely hire again!",
    author: "Jessica Martinez",
    title: "Creative Lead",
    company: "Digital Agency",
    rating: 5,
    image: "https://images.unsplash.com/photo-1517070213202-1e1119d405fe?w=100&h=100&fit=crop",
  },
  {
    id: "5",
    quote:
      "Exceptional communication throughout the project. The deliverables were organized, well-documented, and ready for immediate implementation.",
    author: "David Thompson",
    title: "CTO",
    company: "Tech Startup",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    id: "6",
    quote:
      "Professional, creative, and detail-oriented. This designer understands both aesthetics and technical implementation. A true creative technologist.",
    author: "Emma Wilson",
    title: "Head of Design",
    company: "Design Agency",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507537299-0d3d71e9aaaa?w=100&h=100&fit=crop",
  },
];

export const testimonials = defaultTestimonials;

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

export function Testimonials() {
  const { testimonials: cmsTestimonials, loading, error } = useTestimonials();
  const [displayTestimonials, setDisplayTestimonials] = useState<Testimonial[]>(defaultTestimonials);

  useEffect(() => {
    if (!loading && cmsTestimonials.length > 0) {
      const mapped = cmsTestimonials.map((t) => ({
        id: t.id,
        quote: t.content || t.quote || "",
        author: t.name || t.author || "Anonymous",
        title: t.role || t.title || "",
        company: t.company || "",
        rating: t.rating || 5,
        image: t.image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      }));
      if (mapped.length > 0) {
        setDisplayTestimonials(mapped);
      }
    }
  }, [cmsTestimonials, loading]);

  if (error) {
    console.warn("[Testimonials] Error loading from CMS, using defaults:", error);
  }

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-primary/5 pointer-events-none" />

      <div className="container relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-mono text-primary mb-2">CLIENT FEEDBACK</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Loved by <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Clients</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take my word for it — see what clients have to say about working together
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayTestimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={item}>
              <div className="group relative h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative bg-background/95 backdrop-blur border border-border rounded-2xl p-6 h-full flex flex-col group-hover:border-primary/50 transition-all duration-300">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                  </div>

                  {/* Quote */}
                  <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.title} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "50+", label: "Projects Completed" },
            { value: "100%", label: "Client Satisfaction" },
            { value: "25+", label: "Happy Clients" },
            { value: "8+", label: "Years Experience" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
