"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);


  const fetchTestimonials = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/testimony/fetch_public.php`)
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => { fetchTestimonials(); }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [index, testimonials]);

  const nextSlide = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  if (testimonials.length === 0) return null;
  const t = testimonials[index];

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/testimony/add.php`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      setLoading(false);
      setShowModal(false);
      fetchTestimonials();
      alert("Testimony submitted! Awaiting approval.");
    } catch (err) {
      console.error(err);
      alert("Error submitting testimony");
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full py-20 bg-white flex flex-col items-center">

      
      <h2 className="text-3xl text-black md:text-4xl font-bold text-center mb-3">
        How God is Changing Lives on Our Campus
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mb-12">
        Hear real stories from students experiencing God's transforming power.
      </p>

    
      <button
        onClick={prevSlide}
        className="absolute left-10 top-1/2 -translate-y-1/2 bg-white shadow-lg w-12 h-12 flex items-center justify-center rounded-full hover:scale-105 transition z-10"
      >
        <ChevronLeft size={26} className="text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-10 top-1/2 -translate-y-1/2 bg-white shadow-lg w-12 h-12 flex items-center justify-center rounded-full hover:scale-105 transition z-10"
      >
        <ChevronRight size={26} className="text-gray-700" />
      </button>

      
      <div className="relative w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="bg-white shadow-xl border border-gray-100 rounded-3xl p-12"
          >
           
            <p className="text-gray-800 text-xl md:text-2xl leading-relaxed italic text-center mb-10">
              “{t.message}”
            </p>

           
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg max-w-3xl mx-auto mb-10">
              <p className="font-semibold text-blue-700 mb-1">Impact:</p>
              <p className="text-gray-700 leading-relaxed">{t.impact ?? t.message}</p>
            </div>

           
            <div className="flex items-center justify-center gap-4">
              {t.image && (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE}/uploads/${t.image}`}
                  className="w-14 h-14 rounded-full object-cover shadow"
                />
              )}
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">{t.name}</h4>
                <p className="text-gray-600">{t.department}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      
      <div className="flex gap-2 mt-8">
        {testimonials.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      
      <button
        onClick={() => setShowModal(true)}
        className="mt-10 px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition font-semibold hover:scale-105"
      >
        Share Your Testimony
      </button>

    
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative">
            
            
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl text-black font-semibold text-center mb-6">
              Share Your Testimony
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <input
                name="name"
                required
                placeholder="Your full name"
                className="w-full border text-black rounded-lg px-4 py-3 focus:ring-blue-500 focus:ring-2"
              />

              <input
                name="department"
                required
                placeholder="Department / Level"
                className="w-full border text-black rounded-lg px-4 py-3 focus:ring-blue-500 focus:ring-2"
              />

              <textarea
                name="message"
                required
                placeholder="Your Testimony"
                className="w-full border text-black rounded-lg px-4 h-32 py-3 focus:ring-blue-500 focus:ring-2"
              ></textarea>

              <input
                name="impact"
                placeholder="Impact (optional)"
                className="w-full border-red-500 text-black rounded-lg px-4 py-3 focus:ring-blue-500 focus:ring-2"
              />

              <label className="block text-black font-medium">Upload Image (Optional):</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                {loading ? "Submitting..." : "Submit Testimony"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
