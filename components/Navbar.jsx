"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // this prevents the rest of the body/page scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Sermon", href: "/sermons" },
    { name: "Gallery", href: "/gallery" },
    { name: "Giving", href: "/give" },
    { name: "Library", href: "/library" },
    { name: "Anonymous", href: "/anonymous" },
    { name: "Login", href: "/login" },
  ];

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  const mobileLinkVars = {
    initial: {
      y: "30vh",
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        ease: [0, 0.55, 0.45, 1],
        duration: 0.7,
      },
    },
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center z-50">
          <img src="/auc-white.png" alt="AUC Chapel" className="h-8 w-auto" />
          <span className="sr-only">AUC Chapel</span>
        </Link>

        <div className="hidden md:flex gap-8 text-white">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition duration-200 ${
                  isActive ? "text-blue-500 font-bold" : "text-white"
                } hover:text-blue-500`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Open/Close Navbar"
          onClick={() => setOpen(!open)}
          className="md:hidden text-white cursor-pointer z-50"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen bg-black origin-top px-8 flex flex-col justify-center md:hidden"
          >
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col gap-4"
            >
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <div key={link.name} className="overflow-hidden">
                    <motion.div variants={mobileLinkVars}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`text-3xl font-semibold uppercase tracking-tight transition-colors ${
                          isActive
                            ? "text-blue-500"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

