"use client";

import { motion } from "framer-motion";

export default function ChaplainMessage() {
  return (
    <section className="w-full py-20 px-4 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          max-w-5xl mx-auto 
          bg-blue-50 
          p-10 md:p-14 
          rounded-2xl 
          shadow-md
        "
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          A Word from the Chaplain
        </h2>

        <p className="text-gray-700 leading-8 text-[17px] md:text-[18px]">
          Welcome to the Anchor University Chapel — a home where students grow 
          in faith, character, and purpose. We believe that your time here is not 
          just about academics, but about discovering who you're meant to be. 
          Our chapel is a space where you can explore your faith, connect with 
          others who share your values, and experience the transforming power of 
          God's love. Whether you're just beginning your spiritual journey or 
          deepening your relationship with God, we invite you to be part of our 
          community. You belong here.
        </p>

        <p className="text-right text-gray-800 font-semibold mt-6">
          – Pastor Prof Ilori, Chaplain –
        </p>
      </motion.div>
    </section>
  );
}
