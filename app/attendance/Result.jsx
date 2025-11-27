"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  XCircle,
  BookOpen,
  Flame,
  Home,
} from "lucide-react";

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
        if (data.error) {
          setError(data.error);
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
          transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
          className="w-14 h-14 border-4 border-blue-700 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <p className="text-red-600 text-lg mb-4 font-semibold">{error}</p>
        <a
          href="/login"
          className="text-blue-700 underline hover:text-blue-900 transition"
        >
          Go back
        </a>
      </div>
    );
  }

 
  const grouped = {
    mbs: null,
    trh: null,
    sws: null,
  };

  attendance.forEach((a) => {
    const d = new Date(a.date);
    const day = d.getDay();

    if (day === 1) grouped.mbs = a;
    else if (day === 4) grouped.trh = a;
    else if (day === 0 || day === 6) grouped.sws = a; 
  });

  const mbs = grouped.mbs;
  const trh = grouped.trh;
  const sws = grouped.sws;

  
  const weeklyServices = 3;

  const present =
    (mbs?.mark == 1 ? 1 : 0) +
    (trh?.mark == 1 ? 1 : 0) +
    (sws?.mark == 1 ? 1 : 0);

  const percentage = Math.round((present / weeklyServices) * 100);

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "—";


  return (
    <div className="min-h-screen bg-gray-50 py-14 px-6">
    
      <a
        href="/login"
        className="flex items-center gap-2 text-blue-700 mb-8 hover:text-blue-900"
      >
        <ArrowLeft size={18} />
        Check another matric
      </a>

   
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 pb-16">
      
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            {student.full_name}
          </h2>
          <p className="text-gray-700 mt-2 text-lg">{student.matric_number}</p>
          <p className="text-gray-500 text-sm">{student.level}</p>
        </motion.div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
         
          <div className="bg-blue-50 p-6 rounded-xl text-center border shadow-sm">
            <CalendarDays className="mx-auto text-blue-700" size={34} />
            <h3 className="text-2xl font-extrabold text-blue-800 mt-3">
              {weeklyServices}
            </h3>
            <p className="text-gray-600">Weekly Services</p>
          </div>

        
          <div className="bg-green-50 p-6 rounded-xl text-center border shadow-sm">
            <CheckCircle2 className="mx-auto text-green-600" size={34} />
            <h3 className="text-2xl font-extrabold text-green-700 mt-3">
              {present}
            </h3>
            <p className="text-gray-600">Times Present</p>
          </div>

         
          <div className="bg-purple-50 p-6 rounded-xl text-center border shadow-sm">
            <div className="relative mx-auto w-24 h-24">
              <svg className="absolute inset-0">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                  fill="none"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#6b21a8"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={260}
                  strokeDashoffset={260 - (percentage / 100) * 260}
                  transition={{ duration: 1 }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-purple-700">
                {percentage}%
              </span>
            </div>
            <p className="text-gray-600 mt-3">Attendance Rate</p>
          </div>
        </div>

        
        <h3 className="text-xl font-bold text-gray-800 mb-5">
          Service Attendance
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
    
          <ServiceCard
           
            title="MBS (Monday Bible Study)"
            date={formatDate(mbs?.date)}
            present={mbs?.mark == 1}
          />

          {/* TRH */}
          <ServiceCard
           
            title="TRH (Thursday Revival Hour)"
            date={formatDate(trh?.date)}
            present={trh?.mark == 1}
          />

          
          <ServiceCard
            
            title="SWS (Sunday Worship Service)"
            date={formatDate(sws?.date)}
            present={sws?.mark == 1}
          />
        </div>

       
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-14 bg-gradient-to-r from-blue-700 to-indigo-700 p-10 rounded-2xl text-white text-center shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-2">
            Keep Growing in God’s Presence
          </h3>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Not forsaking the assembling of ourselves together…  
             <strong>Hebrews 10:25</strong>
          </p>
        </motion.div>
      </div>
    </div>
  );
}


function ServiceCard({ icon, title, date, present }) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h4 className="font-bold text-gray-800 text-lg">{title}</h4>
      </div>

      <p className="text-gray-600 text-sm mb-2">
        <strong>Date:</strong> {date}
      </p>

      {present ? (
        <span className="text-green-600 flex items-center gap-1 font-semibold">
          <CheckCircle2 size={16} /> Present
        </span>
      ) : (
        <span className="text-red-600 flex items-center gap-1 font-semibold">
          <XCircle size={16} /> Absent
        </span>
      )}
    </div>
  );
}
