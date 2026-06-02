"use client";

import { motion, Variants } from "framer-motion";
import { services as defaultServices } from "@/content/services";
import { useServices } from "@/hooks/useCMS";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as Icons from "lucide-react";

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

export function Services() {
  const { services: cmsServices, loading, error } = useServices();
  const [displayServices, setDisplayServices] = useState(defaultServices);

  useEffect(() => {
    console.log("[Services] CMS Services:", cmsServices);
    console.log("[Services] Loading:", loading);
    console.log("[Services] Error:", error);
    
    if (!loading && cmsServices && cmsServices.length > 0) {
      console.log("[Services] Using CMS services");
      setDisplayServices(cmsServices as any);
    } else if (!loading && error) {
      console.warn("[Services] Error loading from CMS, using defaults:", error);
      setDisplayServices(defaultServices);
    }
  }, [cmsServices, loading, error]);


  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-mono text-primary mb-2">PROFESSIONAL SERVICES</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              What I <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Offer</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized 3D design and animation services tailored to bring your vision to life
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayServices.map((service: any) => {
            const IconName = service.icon || "Zap";
            const IconComponent = (Icons as any)[IconName] || Icons.Zap;
            const colorScheme = service.colorScheme || { from: "from-violet-500", to: "to-purple-500" };
            
            return (
              <motion.div
                key={service.id}
                variants={item}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div className={`relative bg-background/95 backdrop-blur border border-border rounded-2xl p-8 h-full transition-all duration-300 hover:border-primary/50`}>
                  {/* Featured Image */}
                  {service.image && (
                    <div className="mb-6 -mx-8 -mt-8 h-48 rounded-t-2xl overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${colorScheme.from} ${colorScheme.to} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Timeline */}
                  <div className="flex items-center gap-2 text-xs text-primary/70 mb-6">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    <span>Timeline: {service.timeline || "2-4 weeks"}</span>
                  </div>

                  {/* CTA */}
                  <Link href={`/services/${service.id}`}>
                    <Button variant="ghost" className="p-0 h-auto gap-2 text-primary hover:text-primary hover:bg-transparent group/btn">
                      Learn More
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Let's discuss your unique project needs.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2">
              Get Custom Quote
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
