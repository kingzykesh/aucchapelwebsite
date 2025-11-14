"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, GraduationCap, HandHeart } from "lucide-react";

export default function GiveHero() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-16">
      
      <h1 className="text-4xl md:text-5xl font-bold text-center text-[#1b2b48]">
        Support Our Chapel
      </h1>

      <p className="max-w-3xl mx-auto text-center text-gray-600 mt-4 text-lg">
        Your generosity helps us continue our mission of spiritual development
        and community service. Every contribution, no matter the size,
        makes a difference in students' lives.
      </p>

   
      <h2 className="text-3xl font-semibold text-center mt-20 text-[#1b2b48]">
        Your Impact
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mt-12">

        <ImpactCard
          color="blue"
          icon={<Heart size={24} className="text-blue-500" />}
          title="Spiritual Care"
          desc="Support pastoral counseling and student mentorship programs"
          bg="blue-50"
        />

        <ImpactCard
          color="green"
          icon={<Sparkles size={24} className="text-green-500" />}
          title="Events & Programs"
          desc="Fund worship services, fellowships, and outreach activities"
          bg="green-50"
        />

        <ImpactCard
          color="purple"
          icon={<GraduationCap size={24} className="text-purple-500" />}
          title="Scholarships"
          desc="Help deserving students access chaplaincy programs"
          bg="purple-50"
        />

        <ImpactCard
          color="orange"
          icon={<HandHeart size={24} className="text-orange-500" />}
          title="Community Outreach"
          desc="Support our outreach initiatives beyond campus"
          bg="orange-50"
        />

      </div>
    </section>
  );
}

function ImpactCard({ title, desc, icon, bg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl p-8 shadow-sm border border-gray-100 bg-${bg}`}
      style={{ backgroundColor: `var(--tw-${bg})` }}
    >
      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
