"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Link as LinkIcon,
  X,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react";

const HERO_IMAGES = [
   "/images/image5.jpg",
  "/images/image4.jpg",
  "/images/image2.jpg",
  "/images/image7.jpg",
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showLinks, setShowLinks] = useState(false);

  // Rotate hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-slate-100 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center gap-12">
        {/* LEFT SIDE - TEXT */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/40 px-3 py-1 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] text-blue-200">
              Anchor University Chapel
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            A Place Where{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Faith
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-r from-blue-400 to-lime-300 bg-clip-text text-transparent">
              Purpose
            </span>{" "}
            Converge.
          </h1>

          <p className="text-slate-300 text-sm md:text-base max-w-xl mb-8">
            Welcome to the spiritual heartbeat of Anchor University, Lagos.
            Worship, word, prayer, and fellowship—all in one Christ–centered
            community on campus.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Watch Live */}
            <motion.a
              href="/sermon"
              whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(59,130,246,0.7)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-900 font-semibold shadow-lg"
            >
              <span className="p-1.5 rounded-full bg-slate-900/80">
                <Play className="w-4 h-4 text-cyan-300" />
              </span>
              Watch Live
            </motion.a>

            {/* Quick Links */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowLinks(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-slate-500/70 text-slate-100 bg-slate-900/40 backdrop-blur-md"
            >
              <LinkIcon className="w-4 h-4 text-blue-300" />
              Quick Links
            </motion.button>
          </div>

          {/* SERVICE INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs md:text-sm">
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
              <p className="text-slate-400 uppercase tracking-wide text-[11px] mb-1">
                Sunday Worship
              </p>
              <p className="font-semibold text-slate-50">7:45 AM</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
              <p className="text-slate-400 uppercase tracking-wide text-[11px] mb-1">
                Monday Bible Study
              </p>
              <p className="font-semibold text-slate-50">5:30 PM</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
              <p className="text-slate-400 uppercase tracking-wide text-[11px] mb-1">
                Thursday Revival Hour
              </p>
              <p className="font-semibold text-slate-50">5:30 PM</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGE / COLLAGE */}
        <div className="flex-1 w-full mt-6 md:mt-10">
          <div className="relative rounded-[32px] border border-slate-700/70 bg-gradient-to-br from-blue-900/60 via-slate-900 to-slate-950 shadow-2xl px-3 pt-8 pb-6 md:px-6 md:pt-10 md:pb-8">
            {/* Slightly push content down */}
            <div className="mt-4">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src={HERO_IMAGES[currentImage]}
                  alt="Chapel worship"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 right-6 bg-emerald-400 text-slate-900 px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
              Live on Campus
            </div>

            {/* Dots for images */}
            <div className="flex justify-center mt-4 gap-2">
              {HERO_IMAGES.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentImage
                      ? "bg-cyan-300"
                      : "bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QUICK LINKS MODAL */}
      <AnimatePresence>
        {showLinks && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLinks(false)}
          >
            <motion.div
              className="relative bg-white text-slate-900 rounded-3xl shadow-2xl max-w-md w-full p-7 md:p-8"
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                onClick={() => setShowLinks(false)}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-4 top-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </motion.button>

              <h2 className="text-xl md:text-2xl font-bold mb-2">
                Connect With Chapel Online
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Follow our social platforms to stay updated on services, events,
                livestreams, and campus discipleship content.
              </p>

              {/* ICON GRID */}
              <div className="grid grid-cols-2 gap-4">
                {/* Instagram */}
                <SocialIconCard
                  label="Instagram"
                  href="https://www.instagram.com/au_chapel/"
                  bg="bg-pink-100"
                  hoverBg="group-hover:bg-pink-200"
                >
                  <Instagram className="h-8 w-8 text-pink-600" />
                </SocialIconCard>

                {/* Facebook */}
                <SocialIconCard
                  label="Facebook"
                  href="https://web.facebook.com/anchoruniversitychapel"
                  bg="bg-blue-100"
                  hoverBg="group-hover:bg-blue-200"
                >
                  <Facebook className="h-8 w-8 text-blue-600" />
                </SocialIconCard>

                {/* YouTube */}
                <SocialIconCard
                  label="YouTube"
                  href="https://www.youtube.com/@aul_chapel"
                  bg="bg-red-100"
                  hoverBg="group-hover:bg-red-200"
                >
                  <Youtube className="h-8 w-8 text-red-600" />
                </SocialIconCard>

              </div>

              <p className="text-xs text-slate-500 mt-6">
                Tip: Be the First to know about special events by following us on all socials!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/**
 * Reusable social icon card with animation
 */
function SocialIconCard({ children, label, href, bg, hoverBg }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col items-center"
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`p-4 rounded-2xl ${bg} ${hoverBg} transition flex items-center justify-center shadow-sm`}
      >
        {children}
      </div>
      <p className="text-xs mt-2 font-medium text-slate-700">{label}</p>
    </motion.a>
  );
}
