"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden w-full py-28 px-6 md:px-20 bg-gradient-to-br from-blue-50 via-white to-blue-100/40">

  
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1.4 }}
        className="absolute bottom-10 left-10 w-52 h-52 bg-blue-300 rounded-full blur-[90px]"
      />

      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm"
        >
          About AUL Chapel
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3 }}
          className="text-gray-700 text-lg md:text-xl mt-6 leading-relaxed max-w-2xl mx-auto"
        >
          A vibrant faith community at Anchor University where spiritual growth,
          fellowship, and purpose-driven leadership thrive.
        </motion.p>

      
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 0.8, delay: 1 }}
          className="h-1 bg-blue-600 mx-auto mt-6 rounded-full"
        />
      </div>

    </section>
  );
}
