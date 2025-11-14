"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Sermon", href: "/sermons" },
    { name: "Giving", href: "/give" },
    { name: "Library", href: "/library" },
    { name: "Anonymous", href: "/anonymous" },
    { name: "Login", href: "/login" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

       
        <Link href="/" className="flex items-center">
            <img src="/auc-white.png" alt="AUC Chapel" className="h-8 w-auto" />
            <span className="sr-only">AUC Chapel</span>
        </Link>

       
        <div className="hidden md:flex gap-8 text-white">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="hover:text-blue-400 transition duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>


        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden text-white"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

     
      {open && (
        <div className="md:hidden bg-black/90 text-white p-6 space-y-6">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-lg hover:text-blue-400 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
