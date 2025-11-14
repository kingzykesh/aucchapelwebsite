"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AnonymousPage() {
  const API = process.env.NEXT_PUBLIC_API_BASE;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    const formData = new FormData();
    formData.append("message", message);

    try {
      const res = await fetch(`${API}/anonymous/submit.php`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("RESULT:", result);

      if (result.status === "success") {
        setStatusMsg("Your message has been submitted anonymously.");
        setMessage("");
      } else {
        setStatusMsg(result.msg || "Unable to submit message.");
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("Network error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f8fbff] via-[#eef4ff] to-[#e5edff] overflow-hidden">
      
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 opacity-20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300 opacity-20 blur-3xl rounded-full animate-pulse"></div>
      </div>

   
      <div className="relative px-6 md:px-16 py-24">
        
     
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 tracking-tight"
        >
          Send an Anonymous Message
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mt-4 mb-12"
        >
          Share your thoughts privately. No identity, no tracking — just honesty and care.
        </motion.p>

       
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl mx-auto backdrop-blur-xl bg-white/60 shadow-2xl border border-white/40 rounded-3xl p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <label className="text-gray-700 font-medium">Your Message</label>

            <textarea
              className="w-full h-48 border border-gray-300/60 rounded-xl p-4 text-black bg-white/70 shadow-sm focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
              placeholder="Type your anonymous message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

       
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
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Message"}
            </motion.button>
          </form>
        </motion.div>


        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-10 text-sm text-gray-500"
        >
          Your identity remains completely anonymous. Only chapel leadership will see submitted messages.
        </motion.p>
      </div>
    </div>
  );
}
