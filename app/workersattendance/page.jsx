"use client";

import { useState } from "react";
import { CalendarDays, Send, X } from "lucide-react";

export default function AttendanceComplaint() {
  const API = process.env.NEXT_PUBLIC_API_BASE;

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    name: "",
    matric_number: "",
    email: "",
    phone: "",
    department: "",
    dates_absent: [],
  });

  const departments = [
    "Maintenance",
    "Choir",
    "Ushering",
    "Colporteur",
    "Prayer",
    "GPT",
    "Library",
  ];

  const addDate = (date) => {
    if (!date) return;
    if (!form.dates_absent.includes(date)) {
      setForm({
        ...form,
        dates_absent: [...form.dates_absent, date],
      });
    }
  };

  const removeDate = (date) => {
    setForm({
      ...form,
      dates_absent: form.dates_absent.filter((d) => d !== date),
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        fd.append(key, Array.isArray(value) ? value.join(",") : value)
      );

      const res = await fetch(`${API}/attendance/submit.php`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      setStatus(data.msg || "Submission completed.");

      if (data.status === "success") {
        setForm({
          name: "",
          email: "",
          phone: "",
          department: "",
          dates_absent: [],
        });
      }
    } catch (err) {
      console.error(err);
      setStatus("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white/80 backdrop-blur-xl max-w-2xl w-full rounded-3xl shadow-2xl border border-white/40 p-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <CalendarDays className="w-14 h-14 mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">
            Workers Attendance Complaint
          </h1>
          <p className="text-gray-600 mt-2">
            Kindly submit this form if you were absent from duty on any service day.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={submitForm} className="space-y-6">

          {/* FULL NAME */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
            />
          </div>

{/* Matric Number */}
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-1">
    Matric Number
  </label>
  <input
    type="text"
    placeholder="AUL/CMP/22/000"
    required
    value={form.matric_number}
    onChange={(e) =>
      setForm({ ...form, matric_number: e.target.value })
    }
    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900
               focus:ring-2 focus:ring-blue-500 outline-none"
  />
</div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="example@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              placeholder="0800 000 0000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* DEPARTMENT */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Department
            </label>
            <select
              required
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* MULTI-DATE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dates You Were Absent
            </label>

            <input
              type="date"
              onChange={(e) => addDate(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white focus:ring-4 focus:ring-blue-200 outline-none transition"
            />

            {form.dates_absent.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.dates_absent.map((date) => (
                  <span
                    key={date}
                    className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border border-blue-200"
                  >
                    {date}
                    <button
                      type="button"
                      onClick={() => removeDate(date)}
                      className="hover:text-red-600 transition"
                    >
                      <X size={14} strokeWidth={3} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* STATUS */}
          {status && (
            <div
              className={`text-center text-sm p-4 rounded-xl border ${
                status.toLowerCase().includes("error") ||
                status.toLowerCase().includes("network")
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "bg-green-50 border-green-200 text-green-700"
              }`}
            >
              {status}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-800 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
            {!loading && <Send size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
