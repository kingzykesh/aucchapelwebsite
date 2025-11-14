"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const images = [
    "/chapel/1.jpg",
    "/chapel/1.jpg",
    "/chapel/1.jpg",
    "/chapel/1.jpg",
    "/chapel/1.jpg",
  ];

  return (
    <section className="w-full pt-32 pb-20 bg-white text-center">

   
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold text-[#0A1A2F]"
      >
        Welcome to AUL Chapel
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg"
      >
        Join our community to connect with fellow believers, explore events,
        and deepen your faith journey.
      </motion.p>

     
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex items-center justify-center gap-6"
      >
        <Link
          href="/live"
          className="
            relative px-8 py-3 bg-blue-600 text-white font-semibold rounded-full 
            transition-all duration-300 hover:bg-blue-700
          "
        >
         
          <span className="
            absolute inset-0 rounded-full bg-blue-500 opacity-40 blur-xl 
            -z-10 animate-pulse
          "></span>

          Watch Live
        </Link>

        <Link
          href="/about"
          className="text-gray-700 text-lg hover:text-blue-600 transition flex items-center gap-2"
        >
          Learn more →
        </Link>
      </motion.div>

    
      <div className="mt-16 flex justify-center gap-4 md:gap-6 px-4 flex-wrap md:flex-nowrap">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            className="
              relative w-[150px] h-[110px] 
              sm:w-[200px] sm:h-[150px]
              md:w-[230px] md:h-[170px]
              rounded-2xl overflow-hidden
              shadow-xl
              bg-white/60 backdrop-blur-sm
            "
          >
            <Image
              src={img}
              alt="Chapel image"
              fill
              className="object-cover opacity-90"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
