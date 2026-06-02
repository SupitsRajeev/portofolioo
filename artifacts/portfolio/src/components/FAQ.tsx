"use client";

import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useFAQs } from "@/hooks/useCMS";

interface FAQItem {
  id?: number | string;
  question: string;
  answer: string;
  category?: string;
}

export const serviceFAQs: FAQItem[] = [
  {
    question: "What is your typical turnaround time?",
    answer:
      "Most projects take 2-4 weeks depending on complexity and scope. Simple projects like logo animations can be completed in 1 week, while complex character designs or interactive experiences may take 4-8 weeks. I'll provide a detailed timeline during the consultation phase.",
  },
  {
    question: "Do you offer revisions?",
    answer:
      "Yes! All service packages include revision rounds. Basic packages include 2-3 revisions, Standard includes 4-5, and Premium packages include unlimited revisions. This ensures you're completely satisfied with the final deliverables.",
  },
  {
    question: "What file formats do you deliver?",
    answer:
      "I deliver in multiple formats depending on your needs: 3D models (FBX, OBJ, BLEND, GLTF), animations (MP4, WebM, GIF, MOV), source files (After Effects, Cinema 4D, Blender), and web-ready assets (optimized for React, Lottie, etc.).",
  },
  {
    question: "Can you integrate with my existing tech stack?",
    answer:
      "Absolutely! I specialize in integration with modern web stacks (React, Next.js, Three.js, etc.). I provide well-documented code and source files, and can assist with implementation or provide guidance to your development team.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes, for projects over $5,000 I typically offer a payment plan: 50% upfront, 25% at midpoint, and 25% on delivery. Custom arrangements can be made for longer projects.",
  },
  {
    question: "What if I'm not satisfied with the work?",
    answer:
      "Your satisfaction is my priority. I include revision rounds in all packages to ensure the work meets your expectations. If we can't reach agreement, I'll refund 50% of the payment (excluding completed work).",
  },
  {
    question: "Can you work with a tight budget?",
    answer:
      "I offer flexible pricing and can work within various budgets. The 'Starter' tiers in each service are designed to be accessible, and I can create custom quotes for specific needs. Let's discuss your budget during the consultation.",
  },
  {
    question: "Do you provide support after delivery?",
    answer:
      "Yes! Standard and Premium packages include 30 days of support for questions and minor adjustments. Extended support packages are available for ongoing needs like performance optimization or feature additions.",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function FAQ() {
  const { faqs: cmsFaqs, loading, error } = useFAQs();
  const [displayFaqs, setDisplayFaqs] = useState<FAQItem[]>(serviceFAQs);
  const [openItems, setOpenItems] = useState<(number | string)[]>([0]);

  useEffect(() => {
    if (!loading && cmsFaqs.length > 0) {
      const mapped = cmsFaqs.map((faq: any) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
      }));
      if (mapped.length > 0) {
        setDisplayFaqs(mapped);
      }
    }
  }, [cmsFaqs, loading]);

  if (error) {
    console.warn("[FAQ] Error loading from CMS, using defaults:", error);
  }

  const toggleItem = (index: number | string) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
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
            <p className="text-sm font-mono text-primary mb-2">COMMON QUESTIONS</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about my services and working process
            </p>
          </motion.div>
        </div>

        {/* FAQ Items */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {displayFaqs.map((faq, index) => (
            <motion.div key={faq.id || index} variants={item} className="mb-4">
              <button
                onClick={() => toggleItem(faq.id || index)}
                className="w-full group"
              >
                <div className="relative overflow-hidden rounded-xl border border-border hover:border-primary/50 transition-all duration-300">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />

                  <div className="relative bg-background/95 backdrop-blur p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-left text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                          openItems.includes(faq.id || index) ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Answer */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: openItems.includes(faq.id || index) ? "auto" : 0,
                        opacity: openItems.includes(faq.id || index) ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted-foreground mt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Didn't find the answer you're looking for?
          </p>
          <a
            href="#contact"
            className="inline-block text-primary font-semibold hover:gap-2 transition-all duration-300 group"
          >
            Get in touch →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
