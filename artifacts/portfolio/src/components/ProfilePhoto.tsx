"use client";

import { motion } from "framer-motion";

interface ProfilePhotoProps {
  src?: string;
  alt?: string;
  size?: number;
}

export function ProfilePhoto({
  src = "/profile.jpg",
  alt = "Rajeev Neupane",
  size = 340,
}: ProfilePhotoProps) {
  return (
    <motion.div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
    >
      {/* Simple clean photo with subtle shadow */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ width: "100%", height: "100%" }}
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

