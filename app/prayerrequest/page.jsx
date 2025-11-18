"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function PrayerRequestPage() {
  const API = process.env.NEXT_PUBLIC_API_BASE;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    reach_out: false,
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("phone", form.phone);
    fd.append("message", form.message);
    fd.append("reach_out", form.reach_out ? "yes" : "no");

    try {
      const res = await fetch(`${API}/prayer/submit.php`, {
        method: "POST",
        body: fd,
      });

      const result = await res.json();

      if (result.status === "success") {
        setStatusMsg("Your request has been received. We are praying for you.");
        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
          reach_out: false,
        });
      } else {
        setStatusMsg(result.msg || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("Network error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0b1b3a] to-black text-white py-20 px-6">

     
      <div className="absolute inset-0 -z-10 opacity-30 bg-[url('/textures/light-pattern.png')] bg-cover"></div>

      <div className="max-w-3xl mx-auto">

      
        <div className="text-center mb-10 animate-fadeIn">
          
          <h1 className="text-4xl font-bold tracking-wide">
            Prayer Request
          </h1>
          <p className="text-gray-300 mt-2">
            “Call unto Me and I will answer you.” – Jeremiah 33:3
          </p>
        </div>

       
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 animate-slideUp">

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm mb-1">Name (Optional)</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email (Optional)</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="yourname@example.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Phone Number (Optional)</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="080xxxxxxxx"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Your Prayer Request *</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="w-full h-40 bg-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write what you want us to pray about..."
              ></textarea>
            </div>

            {/* Reach out toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.reach_out}
                onChange={(e) =>
                  setForm({ ...form, reach_out: e.target.checked })
                }
                className="h-5 w-5 rounded border-gray-300"
              />
              <span className="text-gray-200">
                I want someone to reach out to me and pray with me
              </span>
            </label>

            {/* Status Message */}
            {statusMsg && (
              <p className="mt-2 bg-green-600/70 text-white p-3 rounded-lg text-sm">
                {statusMsg}
              </p>
            )}

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Send Prayer Request"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
