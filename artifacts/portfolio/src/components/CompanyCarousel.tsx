"use client";

import { motion } from "framer-motion";
import { companies } from "@/content/experience";
import Image from "next/image";

export function CompanyCarousel() {
  return (
    <div className="w-full mt-8">
      <p className="text-sm mb-4 text-muted-foreground">
        Partnering with teams at:
      </p>

      {/* Scrolling Carousel */}
      <div className="relative overflow-hidden">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Carousel container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-16 py-3"
            animate={{ x: [0, -1200] }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {/* Triple set for smooth looping */}
            {[1, 2, 3].map((set) =>
              companies.map((company) => (
                <motion.div
                  key={`${company.id}-${set}`}
                  className="flex-shrink-0 h-12 flex items-center justify-center"
                >
                  <div className="flex items-center justify-center px-6 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={100}
                      height={40}
                      className="object-contain h-8 w-auto"
                    />
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
