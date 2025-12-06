"use client";

import { useState } from "react";
import { ArrowRight, ScanSearch, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GoogleAd from "@/components/GoogleAd";

export default function ChapelLogin() {
  const [matric, setMatric] = useState("");
  const [error, setError] = useState("");

  const [showChooseModal, setShowChooseModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  const [complaintLoading, setComplaintLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    matricNumber: "",
    type: "",
    details: "",
  });

  const openModal = (e) => {
    e.preventDefault();
    if (!matric.trim()) {
      setError("Please enter your matric number.");
      return;
    }
    setShowChooseModal(true);
  };

  const goToAttendance = () => {
    window.location.href = `/attendance?matric=${encodeURIComponent(matric)}`;
  };

  const openComplaintForm = () => {
    setShowChooseModal(false);
    setForm({ ...form, matricNumber: matric });
    setShowComplaintModal(true);
  };

  const submitComplaint = async (e) => {
    e.preventDefault();
    setComplaintLoading(true);
    setStatusMsg("");

    try {
      const API = process.env.NEXT_PUBLIC_API_BASE;

      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("matric", form.matricNumber);
      fd.append("type", form.type);
      fd.append("details", form.details);

      const res = await fetch(`${API}/complaints/submit.php`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      setStatusMsg(data.msg);

      if (data.status === "success") {
        setForm({
          name: "",
          email: "",
          matricNumber: "",
          type: "",
          details: "",
        });

        setTimeout(() => {
          setShowComplaintModal(false);
        }, 2000);
      }
    } catch {
      setStatusMsg("Network error, try again.");
    }

    setComplaintLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-12 flex flex-col items-center justify-start">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-lg p-10 rounded-2xl shadow-xl border border-blue-100 mb-10"
      >
        <div className="text-center mb-10">
          <ScanSearch className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-blue-800">Chapel Attendance Check</h1>
          <p className="text-gray-600 mt-2">
            Enter your matric number to view your{" "}
            <strong className="text-red-500">WEEKLY ATTENDANCE</strong>
          </p>
        </div>

        <form onSubmit={openModal}>
          <label className="block text-gray-700 font-medium mb-2">Matric Number</label>

          <input
            type="text"
            value={matric}
            onChange={(e) => {
              setMatric(e.target.value);
              setError("");
            }}
            placeholder="e.g., AUL/CMP/22/000"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="mt-6 w-full bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-800 transition-all"
          >
            Continue
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Anchor University Chapel, Inspiring Faith. Shaping Destiny.
        </p>
      </motion.div>

      <div className="w-full max-w-4xl flex justify-center mt-4 mb-12">
        <GoogleAd adSlot="4710894449" className="my-6" />
      </div>

      <AnimatePresence>
        {showChooseModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setShowChooseModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={26} />
              </button>

              <h2 className="text-2xl font-bold text-blue-800 mb-6">
                What would you like to do?
              </h2>

              <button
                onClick={goToAttendance}
                className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 mb-3"
              >
                Continue to View Attendance
              </button>

              <button
                onClick={openComplaintForm}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
              >
                I Have a Complaint
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showComplaintModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl relative max-h-[90vh] overflow-y-auto"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
            >
              <button
                onClick={() => setShowComplaintModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={28} />
              </button>

              <h2 className="text-3xl font-bold text-blue-800 mb-8">Submit a Complaint</h2>

              <form onSubmit={submitComplaint} className="space-y-6">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-gray-300 text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />

                <input
                  type="text"
                  value={form.matricNumber}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-700"
                />

                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-black focus:ring-2 focus:ring-red-500 outline-none"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  required
                >
                  <option value="">-- Select Complaint Type --</option>
                  <option value="Student Not Found">Student Not Found</option>
                  <option value="Attendance Incomplete">Attendance Incomplete</option>
                  <option value="Wrong Attendance Assigned">Wrong Attendance Assigned</option>
                  <option value="Other">Other</option>
                </select>

                <textarea
                  placeholder="Describe your complaint..."
                  className="w-full h-32 border border-gray-300 text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  required
                ></textarea>

                {statusMsg && (
                  <p className="text-center text-sm bg-green-100 text-green-700 p-3 rounded-lg">
                    {statusMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={complaintLoading}
                  className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
                >
                  {complaintLoading ? "Submitting..." : "Submit Complaint"}
                </button>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
