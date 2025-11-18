"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, CheckCircle, XCircle, Sparkles } from "lucide-react";

export default function AttendanceResult() {
  const params = useSearchParams();
  const matric = params.get("matric");

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!matric) {
      setError("No matric number provided.");
      setLoading(false);
      return;
    }

    fetch(
      `https://dlcf.ezirimkingdom.com.ng/api/student.php?matric=${encodeURIComponent(
        matric
      )}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (!data.success) {
          setError(data.error || "Unable to load attendance.");
        } else {
          setStudent(data.student);
          setAttendance(data.attendance);
        }
      })
      .catch(() => setError("Unable to load attendance. Try again later."))
      .finally(() => setLoading(false));
  }, [matric]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <a href="/login" className="text-blue-700 underline">
          Go back
        </a>
      </div>
    );
  }

  const total = attendance.length;
  const present = attendance.filter((a) => a.mark == 1).length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <a href="/login" className="flex items-center gap-2 text-blue-700 mb-6">
        <ArrowLeft size={18} />
        Check another matric
      </a>

      <div className="max-w-4xl mx-auto bg-gray-50 shadow-md rounded-2xl p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-blue-800">{student.full_name}</h2>
          <p className="text-gray-600 mt-1">{student.matric_number}</p>
          <p className="text-gray-500 text-sm">{student.level}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 p-6 rounded-xl text-center shadow-sm border border-blue-100"
          >
            <CalendarDays className="mx-auto text-blue-600" size={32} />
            <h3 className="text-xl text-black font-semibold mt-3">{total}</h3>
            <p className="text-black">Total Services</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-green-50 p-6 rounded-xl text-center shadow-sm border border-green-100"
          >
            <CheckCircle className="mx-auto text-green-600" size={32} />
            <h3 className="text-xl text-black font-semibold mt-3">{present}</h3>
            <p className="text-gray-600">Times Present</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-purple-50 p-6 rounded-xl text-center shadow-sm border border-purple-100"
          >
            <div className="relative mx-auto w-20 h-20">
              <svg className="absolute inset-0">
                <circle cx="40" cy="40" r="35" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="#6b21a8"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={220}
                  strokeDashoffset={220 - (percentage / 100) * 220}
                  transition={{ duration: 1 }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-purple-700">
                {percentage}%
              </span>
            </div>
            <p className="text-gray-600 mt-3">Attendance Rate</p>
          </motion.div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Attendance Breakdown</h3>

          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a, index) => (
                <tr key={index} className="hover:bg-blue-50 transition">
                  <td className="border text-black p-2 text-center">{a.date}</td>
                  <td className="border p-2 text-center">
                    {a.mark == 1 ? (
                      <span className="text-green-600 font-semibold">Present</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Absent</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 bg-gradient-to-r from-blue-700 to-indigo-700 p-8 rounded-2xl text-white text-center shadow-lg"
        >
          
          <h3 className="text-2xl font-bold mb-2">Keep Growing Spiritually</h3>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Not forsaking the assembling of ourselves together… but encouraging one another. 
            <br />— Hebrews 10:25
          </p>
        </motion.div>
      </div>
    </div>
  );
}
