"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeftCircle, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <Search size={80} className="text-blue-700 opacity-70" />
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-extrabold text-gray-900 mb-4">
          404
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you are looking for cannot be found.
          <br />
          It might have been moved or no longer exists.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition"
        >
          <ArrowLeftCircle size={20} />
          Go back home
        </Link>
      </motion.div>
    </div>
  );
}
