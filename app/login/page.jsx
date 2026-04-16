"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ScanSearch, TriangleAlert, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GoogleAd from "@/components/GoogleAd";

export default function ChapelLogin() {
  const [matric, setMatric] = useState("");
  const [error, setError] = useState("");
  const [showChooseModal, setShowChooseModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

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

  const showMaintenanceToast = () => {
    setToastMessage("Down for maintenance");

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage("");
      toastTimerRef.current = null;
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-12 flex flex-col items-center justify-start">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-5 right-5 z-[100] max-w-sm"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-white px-4 py-3 text-amber-900 shadow-xl">
              <TriangleAlert size={18} className="shrink-0 text-amber-600" />
              <p className="text-sm font-semibold">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-lg p-10 rounded-2xl shadow-xl border border-blue-100 mb-10"
      >
        <div className="text-center mb-10">
          <ScanSearch className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-blue-800">
            Chapel Attendance Check
          </h1>
          <p className="text-gray-600 mt-2">
            Enter your matric number to view your{" "}
            <strong className="text-red-500">WEEKLY ATTENDANCE</strong>
          </p>
        </div>

        <form onSubmit={openModal}>
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
        <GoogleAd slot="4710894449" />
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
                type="button"
                onClick={showMaintenanceToast}
                aria-disabled="true"
                className="w-full rounded-lg border border-red-200 bg-red-100 py-3 text-red-500 cursor-not-allowed"
              >
                I Have a Complaint
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
