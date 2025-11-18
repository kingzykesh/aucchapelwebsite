"use client";

import { useState } from "react";
import { ArrowRight, ScanSearch } from "lucide-react";
import { motion } from "framer-motion";

export default function ChapelLogin() {
  const [matric, setMatric] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!matric.trim()) {
      setError("Please enter your matric number.");
      return;
    }

    
    window.location.href = `/attendance?matric=${encodeURIComponent(matric)}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-12">

   
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-lg p-10 rounded-2xl shadow-xl border border-blue-100"
      >
   
        <div className="text-center mb-10">
          <ScanSearch className="w-16 h-16 mx-auto text-blue-600 mb-4" />

          <h1 className="text-3xl font-bold text-blue-800">
            Chapel Attendance Check
          </h1>

          <p className="text-gray-600 mt-2">
            Enter your matric number to view your weekly attendance
          </p>
        </div>

      
        <form onSubmit={handleSubmit}>

          <label className="block text-gray-700 font-medium mb-2">
            Matric Number
          </label>

          <input
            type="text"
            value={matric}
            onChange={(e) => {
              setMatric(e.target.value);
              setError("");
            }}
            placeholder="e.g., AUL/CMP/22/093"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}

       
          <button
            type="submit"
            className="mt-6 w-full bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-800 transition-all"
          >
            Continue  
            <ArrowRight size={18} />
          </button>
        </form>

       
        <p className="text-center text-gray-500 text-sm mt-8">
          Anchor University Chapel — Inspiring Faith. Shaping Destiny.
        </p>
      </motion.div>
    </div>
  );
}
