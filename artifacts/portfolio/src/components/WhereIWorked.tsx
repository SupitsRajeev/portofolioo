"use client";

import { motion } from "framer-motion";
import { companies } from "@/content/experience";
import Image from "next/image";

export function WhereIWorked() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-primary/5 pointer-events-none" />

      <div className="container relative z-10 px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Where I've <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Worked</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Collaborating with talented teams and studios to create exceptional 3D experiences
          </motion.p>
        </div>

        {/* Scrolling Logo Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Gradient overlays for seamless loop */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Container with overflow hidden */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8 md:gap-12 py-8"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Original set */}
              {companies.map((company) => (
                <motion.div
                  key={`${company.id}-1`}
                  className="flex-shrink-0 w-40 h-24 md:w-48 md:h-28 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="group relative w-full h-full flex items-center justify-center rounded-xl border border-border/50 bg-card/40 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 p-6">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={120}
                      height={60}
                      className="object-contain max-w-full h-auto relative z-10"
                    />
                  </div>
                </motion.div>
              ))}

              {/* Duplicate set for seamless loop */}
              {companies.map((company) => (
                <motion.div
                  key={`${company.id}-2`}
                  className="flex-shrink-0 w-40 h-24 md:w-48 md:h-28 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="group relative w-full h-full flex items-center justify-center rounded-xl border border-border/50 bg-card/40 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 p-6">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={120}
                      height={60}
                      className="object-contain max-w-full h-auto relative z-10"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Experience Timeline (Optional) */}
        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold mb-12 text-center"
          >
            Experience Timeline
          </motion.h3>

          <div className="max-w-2xl mx-auto space-y-6">
            {companies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6 pb-6 border-b border-border/50 last:border-b-0"
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background mt-2" />
                  {index !== companies.length - 1 && (
                    <div className="w-0.5 h-16 bg-border/50 mt-4" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-4 flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h4 className="text-lg font-semibold text-foreground">{company.position}</h4>
                    <span className="text-sm text-muted-foreground font-mono">
                      {company.startDate} - {company.endDate}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{company.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
