"use client";

import { ExternalLink, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function GalleryPage() {
  const [activeAlbum, setActiveAlbum] = useState(null);

  const albums = [
    {
      title: "DAY 4",
      date: "April 20th, 2025",
      cover: "/gallery/day4.jpg",
      link: "https://dlcfanchoruniversity.pixieset.com/day4/",
    },
    {
      title: "DAY 2",
      date: "April 20th, 2025",
      cover: "/gallery/day2.jpg",
      link: "https://dlcfanchoruniversity.pixieset.com/day2-1/",
    },
    {
      title: "DAY 3",
      date: "April 18th, 2025",
      cover: "/gallery/day3.jpg",
      link: "https://dlcfanchoruniversity.pixieset.com/day2/",
    },
  ];

  return (
    <>
      
      <section className="h-[60vh] relative flex items-center justify-center text-center bg-gradient-to-b from-black via-[#0b1b3a] to-[#001122]">
        <div className="absolute inset-0 opacity-40 bg-cover bg-center bg-[url('/hero/chapel-bg.jpg')]"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-white drop-shadow-lg animate-fadeIn">
            CHAPEL GALLERY
          </h1>
          <p className="mt-4 text-gray-300 text-lg md:text-xl animate-slideUp">
            Moments of Worship • Community • Revival • Transformation
          </p>
        </div>
      </section>

      
      <div className="min-h-screen bg-white py-24 px-6 md:px-16">

        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-14 tracking-wider">
          Explore Our Moments
        </h2>

        <div className="grid md:grid-cols-3 gap-16 max-w-7xl mx-auto">

          {albums.map((album, i) => (
            <div
              key={i}
              className="group cursor-pointer"
              onClick={() => setActiveAlbum(album)}
            >
             
              <div className="relative w-full h-[330px] rounded-2xl overflow-hidden shadow-xl transition transform group-hover:scale-[1.04] group-hover:shadow-2xl">

          
                <Image
                  src={album.cover}
                  alt={album.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />

               
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>

               
                <div className="absolute bottom-0 w-full p-5 text-white">
                  <h3 className="text-xl font-bold">{album.title}</h3>
                  <p className="text-sm text-gray-200 tracking-wide">
                    {album.date}
                  </p>
                </div>

                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
                  <ExternalLink className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      {activeAlbum && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setActiveAlbum(null)}
        >
          <div
            className="bg-white w-[95%] max-w-6xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
          
            <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-6 w-6 text-blue-700" />
                <h2 className="text-xl font-semibold text-gray-800">
                  {activeAlbum.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveAlbum(null)}
                className="p-2 rounded-full hover:bg-gray-200 transition"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            
            <iframe
              src={activeAlbum.link}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
