"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function WorkersAnonymous() {
  const API = process.env.NEXT_PUBLIC_API_BASE;

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("message", form.message);

    try {
      const res = await fetch(`${API}/workers/submit.php`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (data.status === "success") {
        setStatusMsg(data.msg);
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatusMsg(data.msg || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("Network error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f9fbff] via-[#f1f5ff] to-[#e9f0ff] overflow-hidden">

     
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200/30 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200/30 blur-[110px] rounded-full"></div>
      </div>

      <div className="relative px-6 md:px-16 py-20">

        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-black"
        >
          Workers' Confidential Message Box
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-black max-w-2xl mx-auto mt-4 mb-12"
        >
          Share your concerns, feedback, or suggestions privately.  
          <span className="font-semibold text-black">Name and email are optional.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="max-w-2xl mx-auto bg-white shadow-xl border border-blue-500 rounded-3xl p-10 backdrop-blur-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME INPUT */}
            <div>
              <label className="text-gray-800 font-medium">Name (Optional)</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name (if you want follow-up)"
                className="w-full mt-2 p-4 rounded-xl border border-red-400 bg-white text-black shadow-sm focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
              />
            </div>

            
            <div>
              <label className="text-gray-800 font-medium">Email (Optional)</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mt-2 p-4 rounded-xl border border-red-400 bg-white text-black shadow-sm focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
              />
            </div>

       
            <div>
              <label className="text-gray-800 font-medium">Your Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full h-48 mt-2 p-4 rounded-xl border border-red-400 bg-white text-black shadow-sm focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
                placeholder="Type your message here..."
              ></textarea>
            </div>

          
            {statusMsg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-xl text-center font-medium ${
                  statusMsg.includes("submitted")
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {statusMsg}
              </motion.div>
            )}

          
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Confidential Message"}
            </motion.button>

          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-10 text-sm text-black"
        >
          Completely confidential — Only chapel leadership can view submitted messages.
        </motion.p>
      </div>
    </div>
  );
}
