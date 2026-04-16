"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Phone, // Added Phone icon
  CreditCard,
  Users,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Building2,
  BookOpen,
  Settings2
} from "lucide-react";

export default function HQTripForm() {
  const API = process.env.NEXT_PUBLIC_API_BASE + "/hq_trip";

  const [form, setForm] = useState({
    full_name: "",
    phone_number: "", // Added phone_number to state
    matric_number: "",
    gender: "",
    level: "",
  });

  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [customFaculty, setCustomFaculty] = useState("");
  const [customDepartment, setCustomDepartment] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [count, setCount] = useState(0);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [attendance, setAttendance] = useState(null);
  const [eligible, setEligible] = useState(null);

  const map = {
    CMP: { faculty: "Sciences", dept: "Computer Science" },
    PYE: { faculty: "Sciences", dept: "Physics" },
    BIO: { faculty: "Sciences", dept: "Biological Sciences" },
    CHM: { faculty: "Sciences", dept: "Chemical Science" },
    MTH: { faculty: "Sciences", dept: "Mathematical Science" },
    PHY: { faculty: "Sciences", dept: "Physics" },
    ACC: { faculty: "HSM", dept: "Accounting" },
    BUS: { faculty: "HSM", dept: "Business Admin" },
    ECO: { faculty: "HSM", dept: "Economics" },
    MAC: { faculty: "HSM", dept: "Mass Communication" },
    LAW: { faculty: "Law", dept: "Law" },
    MLS: { faculty: "FBAMS", dept: "Medical Lab Science" },
    NSC: { faculty: "FBAMS", dept: "Nursing Science" },
    ARC: { faculty: "Environmental", dept: "Architecture" },
  };

  useEffect(() => {
    fetch(`${API}/count.php`)
      .then((res) => res.json())
      .then((data) => setCount(data.total || 0))
      .catch(() => {});
  }, []);

  const detectMatric = async (value) => {
    const parts = value.toUpperCase().split("/");
    const code = parts[1];

    if (map[code]) {
      setFaculty(map[code].faculty);
      setDepartment(map[code].dept);
      setUseCustom(false);
    } else {
      setFaculty("");
      setDepartment("");
      setUseCustom(true);
    }

    if (value.length > 8) {
      try {
        const res = await fetch(
          `https://dlcf.ezirimkingdom.com.ng/api/student_semester.php?matric=${value}`
        );
        const data = await res.json();
        if (data.success) {
          const perc = data.summary.percentage;
          setAttendance(perc);
          setEligible(perc >= 10);
        } else {
          setAttendance(null);
          setEligible(false);
        }
      } catch {
        setAttendance(null);
        setEligible(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eligible) {
      setStatus("❌ You are not eligible (attendance must be ≥ 10%)");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("faculty", useCustom ? customFaculty : faculty);
      fd.append("department", useCustom ? customDepartment : department);

      const res = await fetch(`${API}/submit.php`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (data.status === "success") {
        setStatus("success");
        setCount((prev) => prev + 1);
        setForm({ full_name: "", phone_number: "", matric_number: "", gender: "", level: "" });
        setFaculty("");
        setDepartment("");
        setCustomFaculty("");
        setCustomDepartment("");
        setAttendance(null);
      } else {
        if (data.msg.includes("limit")) setShowLimitModal(true);
        else setStatus(data.msg);
      }
    } catch {
      setStatus("Network error. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="h-48 w-full relative">
          <img src="/hq.webp" alt="HQ Header" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-end p-6">
            <h1 className="text-2xl font-bold text-white">Easter Retreat Registration</h1>
          </div>
        </div>

        <div className="p-8">
          {/* COUNTER SECTION */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-blue-700 flex items-center gap-1">
                <Users size={16} /> Capacity
              </span>
              <span className="text-sm font-bold text-gray-600">{count} / 500</span>
            </div>
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden border border-gray-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(count / 500) * 100}%` }}
                className="bg-blue-600 h-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="input-style"
                required
              />
            </div>

            {/* PHONE NUMBER - NEW FIELD ADDED HERE */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone_number}
                onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                className="input-style"
                required
              />
            </div>

            {/* MATRIC */}
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Matric Number (e.g. AUL/CMP/22/000)"
                value={form.matric_number}
                onChange={(e) => {
                  setForm({ ...form, matric_number: e.target.value });
                  detectMatric(e.target.value);
                }}
                className="input-style uppercase"
                required
              />
            </div>

            {/* FACULTY/DEPT BOX */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Settings2 size={14} /> Academic Info
                </p>
                <button
                  type="button"
                  onClick={() => setUseCustom(!useCustom)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition px-2 py-1 bg-blue-50 rounded-md"
                >
                  {useCustom ? "Switch to Auto Detect" : "Enter Manually"}
                </button>
              </div>

              {!useCustom ? (
                <div className="flex items-center gap-3 text-slate-700 font-medium bg-white p-3 rounded-xl border border-dashed border-slate-300">
                  <Building2 size={18} className="text-slate-400" />
                  <span className={faculty ? "text-slate-900" : "text-slate-400 italic text-sm"}>
                    {faculty ? `${faculty} — ${department}` : "Waiting for matric number..."}
                  </span>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      placeholder="Enter Faculty"
                      value={customFaculty}
                      onChange={(e) => setCustomFaculty(e.target.value)}
                      className="input-style text-sm"
                      required={useCustom}
                    />
                  </div>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      placeholder="Enter Department"
                      value={customDepartment}
                      onChange={(e) => setCustomDepartment(e.target.value)}
                      className="input-style text-sm"
                      required={useCustom}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* ATTENDANCE DISPLAY */}
            <AnimatePresence>
              {attendance !== null && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={`p-4 rounded-2xl flex items-center gap-3 border ${
                    eligible ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"
                  }`}
                >
                  {eligible ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  <div className="text-sm">
                    <p className="font-bold">Attendance: {attendance}%</p>
                    <p className="opacity-90">{eligible ? "Beautiful to See you here." : "Minimum 40% attendance required."}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* GENDER & LEVEL GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="input-style appearance-none"
                  required
                >
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  className="input-style appearance-none"
                  required
                >
                  <option value="">Level</option>
                  <option>100</option>
                  <option>200</option>
                  <option>300</option>
                  <option>400</option>
                </select>
              </div>
            </div>

            {/* STATUS MESSAGE */}
            {status && status !== "success" && (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="p-3 bg-red-100 text-red-700 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2">
                <AlertCircle size={16} /> {status}
              </motion.div>
            )}
            
            {status === "success" && (
               <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="p-3 bg-green-100 text-green-700 rounded-xl text-center text-sm font-bold">
                 Registration Successful! 🎉
               </motion.div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg active:scale-95 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800 text-white shadow-blue-200"
              }`}
            >
              {loading ? "Processing..." : "Complete Registration"}
              {!loading && <Send size={18} />}
            </button>
          </form>
        </div>
      </motion.div>

      {/* LIMIT MODAL */}
      <AnimatePresence>
        {showLimitModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white p-8 rounded-3xl text-center max-w-sm shadow-2xl">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Waitlist Active</h2>
              <p className="mt-2 text-red-600 font-medium">JESUS ONLY! JESUS LOVES YOU! See you at Service tomorrow, Be Blessed.</p>
              <button
                onClick={() => setShowLimitModal(false)}
                className="mt-6 w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition"
              >
                Understood
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 14px 14px 14px 48px;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          font-size: 15px;
          color: #1e293b;
          background: #ffffff;
          outline: none;
          transition: all 0.2s ease;
        }
        .input-style:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          background: #f8faff;
        }
        .input-style::placeholder {
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}