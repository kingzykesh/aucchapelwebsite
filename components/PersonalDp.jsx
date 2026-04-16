'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';

const socialLinks = [
  {
    name: 'WhatsApp',
    icon: <MessageCircle />,
    href: `https://wa.me/?text=${encodeURIComponent(
      "You’re invited! Join us at THE GREAT REDEMPTION POWER — Anchor University, Ayobo, Lagos State https://auchapel.com/mydp"
    )}`,
    color: 'green-500',
  },
  {
    name: 'Facebook',
    icon: <Facebook />,
    href: 'https://facebook.com/sharer/sharer.php?u=https://auchapel.com/mydp/',
    color: 'blue-500',
  },
  {
    name: 'Twitter',
    icon: <Twitter />,
    href: 'https://twitter.com/intent/tweet?text=Hi%20Beloved%2C%20I%20would%20love%20you%20to%20attend%20this%20December%20Retreat%20at%20Anchor%20University.%20Use%20this%20link%20to%20generate%20yours%20https%3A%2F%2Fauchapel.com/mydp/%2F',
    color: 'black',
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin />,
    href: 'https://www.linkedin.com/sharing/share-offsite/?url=https://auchapel.com/mydp/',
    color: 'blue-600',
  },
  {
    name: 'Instagram',
    icon: <Instagram />,
    href: 'https://instagram.com/',
    color: 'red-600',
  },
];

export default function LandingSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // dynamically append Inbranded script when mounted
    if (mounted) {
      const script = document.createElement('script');
      script.src = 'https://inbranded.co/js/widget.js?t=1597116915';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [mounted]);

  return (
    <section className="flex flex-col items-center justify-center py-16 px-6 bg-white text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold text-red-600 mb-6"
      >
      The Great Redemption Power — I’m attending!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-xl text-gray-700 mb-8"
      >
          Create your personalized DP and invite your loved ones.
      </motion.p>

      {/* Social Icons */}
      <div className="flex gap-6 mb-10 flex-wrap justify-center">
        {socialLinks.map((social, idx) => (
          <motion.a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className={`p-4 rounded-full border-2 border-${social.color} text-${social.color} shadow-[0_0_15px_theme(colors.${social.color})] transition`}
            style={{
              boxShadow: `0 0 15px var(--tw-shadow-color)`,
            }}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>

      {/* Embed container */}
      {mounted && (
        <div className="w-full max-w-2xl">
          <ins
            className="inbr_embed"
            data-href="https://inbranded.co/c/3e55d212-331c-47fe-a151-5d50d7dec347"
          ></ins>
        </div>
      )}
    </section>
  );
}
