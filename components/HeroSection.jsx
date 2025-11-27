"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Music2, 
} from "lucide-react";

export default function HeroSection() {
  const images = [
    "/images/image5.jpg",
  "/images/image4.jpg",
  "/images/image2.jpg",
  "/images/image7.jpg",
  "/jerry.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      
      <section className="relative h-[92vh] w-full overflow-hidden">

       
        <div className="absolute inset-0">
          {images.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={img}
                alt="Chapel background"
                fill
                className="object-cover object-[center_20%]"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        
        <div className="absolute inset-0 bg-black/70"></div>

        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

          <span className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm mb-4 animate-fadeIn">
            OUR VISION
          </span>

          <h1 className="text-white font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight drop-shadow-xl animate-slideUp">
            WE ENVISION ALL MEN <br />
            BECOMING RAPTURABLE <br />
            <span className="text-red-500">LIFE IN CHRIST</span>
          </h1>

          <div className="mt-8 flex gap-5 animate-fadeIn">
            <a
              href="/sermons"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
            >
              WATCH LIVE
            </a>

            <button
              onClick={() => setShowModal(true)}
              className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition"
            >
              QUICK LINKS
            </button>
          </div>
        </div>
      </section>

   
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
    
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Connect With Us
            </h2>

          
            <div className="grid grid-cols-3 gap-5 text-center">

              {/* INSTAGRAM */}
              <a href="https://www.instagram.com/au_chapel/" target="_blank" className="group">
                <div className="p-4 rounded-xl bg-pink-100 group-hover:bg-pink-200 transition flex items-center justify-center">
                  <Instagram className="h-8 w-8 text-pink-600 group-hover:scale-110 transition" />
                </div>
                <p className="text-sm mt-2">Instagram</p>
              </a>

              {/* YOUTUBE */}
              <a href="https://www.youtube.com/@aul_chapel" target="_blank" className="group">
                <div className="p-4 rounded-xl bg-red-100 group-hover:bg-red-200 transition flex items-center justify-center">
                  <Youtube className="h-8 w-8 text-red-600 group-hover:scale-110 transition" />
                </div>
                <p className="text-sm mt-2">YouTube</p>
              </a>

              {/* FACEBOOK */}
              <a href="https://web.facebook.com/anchoruniversitychapel" target="_blank" className="group">
                <div className="p-4 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition flex items-center justify-center">
                  <Facebook className="h-8 w-8 text-blue-700 group-hover:scale-110 transition" />
                </div>
                <p className="text-sm mt-2">Facebook</p>
              </a>

             

            </div>

          
            <button
              onClick={() => setShowModal(false)}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
