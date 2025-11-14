"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, GraduationCap, Archive, BookMarked } from "lucide-react";

export default function LibraryComingSoon() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f6faff] via-[#eef3ff] to-[#e8edff] overflow-hidden">
      
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 opacity-20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-300 opacity-20 blur-3xl rounded-full animate-pulse"></div>
      </div>

      <div className="relative px-6 md:px-20 py-24">
        
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-900"
        >
          AUL Chapel Digital Library
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mt-4"
        >
          A centralized academic + spiritual resource hub for every student of Anchor University.
        </motion.p>

        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="backdrop-blur-xl bg-white/50 shadow-2xl border border-white/40 max-w-3xl mx-auto mt-16 rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We are building a digital library to serve your academic & spiritual growth.
          </p>

          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-blue-600 font-semibold text-lg"
          >
            Preparing something amazing for you...
          </motion.div>
        </motion.div>

        
        <div className="max-w-5xl mx-auto mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          
          <CategoryCard
            title="Course Notes"
            icon={<FileText size={28} className="text-blue-600" />}
            desc="Well-structured lecture notes across departments & levels."
          />

          <CategoryCard
            title="Past Questions"
            icon={<GraduationCap size={28} className="text-purple-600" />}
            desc="Exam preparation made easier with downloadable PQs."
          />

          <CategoryCard
            title="Research Materials"
            icon={<Archive size={28} className="text-indigo-600" />}
            desc="Final-year projects, references & academic PDFs."
          />

          <CategoryCard
            title="E-Textbooks"
            icon={<BookOpen size={28} className="text-blue-700" />}
            desc="Digital textbooks for course support & deeper study."
          />

          <CategoryCard
            title="Spiritual Books"
            icon={<BookMarked size={28} className="text-emerald-700" />}
            desc="Life-changing Christian literature for spiritual growth."
          />

          <CategoryCard
            title="More Resources"
            icon={<Archive size={28} className="text-orange-600" />}
            desc="Extra academic and spiritual aids curated by the Chapel."
          />

        </div>
      </div>
    </div>
  );
}

function CategoryCard({ title, desc, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-2xl p-6 text-center"
    >
      <div className="mx-auto mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-900 text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </motion.div>
  );
}
