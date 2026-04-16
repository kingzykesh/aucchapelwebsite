"use client";

import { useSearchParams } from "next/navigation";
import GoogleAd from "@/components/GoogleAd";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
  ChevronDown,
} from "lucide-react";

export default function SemesterAttendance() {
  const params = useSearchParams();
  const matric = params.get("matric");

  const [data, setData] = useState(null);
  const [openWeek, setOpenWeek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!matric) {
      setError("No matric number provided.");
      setLoading(false);
      return;
    }

    fetch(
      `https://dlcf.ezirimkingdom.com.ng/api/student_semester.php?matric=${encodeURIComponent(
        matric
      )}`
    )
      .then((r) => r.json())
      .then((res) => {
        if (!res.success) setError(res.error || "Unable to fetch attendance.");
        else {
          setData(res);
          // open latest week by default (top)
          if (res.weeks?.length) setOpenWeek(res.weeks[0].week_start);
        }
      })
      .catch(() => setError("Network error. Try again later."))
      .finally(() => setLoading(false));
  }, [matric]);

  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.05, ease: "linear" }}
          className="w-14 h-14 border-4 border-white/60 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-950 px-6">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-red-300 text-lg font-semibold">{error}</p>
          <a
            href="/login"
            className="inline-flex items-center justify-center mt-5 px-4 py-2 rounded-xl bg-white text-gray-900 font-semibold hover:opacity-90 transition"
          >
            <ArrowLeft size={18} className="mr-2" />
            Check another matric
          </a>
        </div>
      </div>
    );
  }

  const { student, summary, weeks } = data;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top glow */}
      <div className="absolute inset-x-0 -top-40 h-80 bg-gradient-to-r from-blue-600/30 via-indigo-500/20 to-purple-600/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 py-10 md:py-14">
        {/* Sticky Back */}
        <div className="sticky top-4 z-40 flex justify-end">
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-gray-900 font-semibold shadow hover:opacity-90 transition"
          >
            <ArrowLeft size={18} />
            Check another matric
          </a>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-8 md:mt-10"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/60">
                  Second Semester Attendance Overview
                </p>
                <h1 className="mt-2 text-3xl md:text-4xl font-extrabold leading-tight">
                  {student.full_name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-white/70">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">
                    {student.matric_number}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">
                    {student.level}
                  </span>
                </div>

                <p className="mt-4 text-white/60 text-sm">
                  This report gives you the official total services recorded, and a mini computation from
                  your attendance records.
                </p>
              </div>

              <div className="flex gap-4">
                <MiniStat
                  label="Total Services"
                  value={summary?.total_services ?? "—"}
                  icon={<CalendarDays size={18} />}
                />
                <MiniStat
                  label="Total Present"
                  value={summary?.total_marks ?? "—"}
                  icon={<CheckCircle2 size={18} />}
                />
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4">
              <GlassCard>
                <p className="text-sm text-white/60">Attendance Rate</p>
                <div className="mt-4 flex items-center gap-4">
                  <ProgressRing percentage={summary?.percentage ?? 0} />
                  <div>
                    <p className="text-3xl font-extrabold">
                      {summary?.percentage ?? 0}%
                    </p>
                    <p className="text-white/60 text-sm mt-1">
                      Based on {summary?.total_services ?? 0} recorded services
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <p className="text-sm text-white/60">Legend</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-300" />
                    <span>Present = 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 size={16} className="text-yellow-300" />
                    <span>Also Present = 0.5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle size={16} className="text-red-300" />
                    <span>Absent = 0</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <p className="text-sm text-white/60">Semester Range</p>
                <p className="mt-4 text-lg font-semibold">
                  April 13, 2026 → Till Date
                </p>
                <p className="text-white/60 text-sm mt-1">
                  Automatically expands as new services are recorded.
                </p>
              </GlassCard>
            </div>
          </div>
        </motion.div>

        {/* Weeks */}
        <div className="mt-10">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Weekly Breakdown
          </h2>

          <div className="space-y-4">
            {weeks?.map((week, idx) => {
              const isOpen = openWeek === week.week_start;
              const weekLabel = fmtDate(week.week_start);

              return (
                <motion.div
                  key={week.week_start}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(0.2, idx * 0.03) }}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenWeek((p) => (p === week.week_start ? null : week.week_start))
                    }
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 grid place-items-center">
                        <CalendarDays size={18} className="text-white/80" />
                      </span>
                      <div className="text-left">
                        <p className="font-semibold">Week of {weekLabel}</p>
                        <p className="text-sm text-white/60">
                          Tap to view services
                        </p>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="text-white/70" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                          {week.services?.map((s, i) => (
                            <ServiceTile key={i} s={s} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

           <div className="my-10">
                    <GoogleAd slot="4710894449" />
                  </div>

          {/* Footer encouragement */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/25 via-indigo-500/20 to-purple-600/25 p-8 md:p-10 text-center backdrop-blur-xl"
          >
            <p className="text-2xl font-extrabold">Keep Growing 🌿</p>
            <p className="text-white/70 mt-2 max-w-2xl mx-auto">
              Not forsaking the assembling of ourselves together…{" "}
              <span className="font-semibold">Hebrews 10:25</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, icon }) {
  return (
    <div className="min-w-[150px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3">
      <div className="flex items-center gap-2 text-white/70 text-sm">
        <span className="text-white/70">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="mt-1 text-2xl font-extrabold">{value}</div>
    </div>
  );
}

function GlassCard({ children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/[0.07] transition">
      {children}
    </div>
  );
}

function ProgressRing({ percentage }) {
  const clean = Number.isFinite(Number(percentage)) ? Number(percentage) : 0;
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clean / 100) * circumference;

  return (
    <div className="relative w-28 h-28">
      <svg width="112" height="112" className="absolute inset-0">
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="10"
          fill="none"
        />
        <motion.circle
          cx="56"
          cy="56"
          r={radius}
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center leading-tight">
          <div className="text-xl font-extrabold">{clean}%</div>
          <div className="text-[11px] text-white/60 -mt-0.5">Rate</div>
        </div>
      </div>
    </div>
  );
}

function ServiceTile({ s }) {
  const mark = Number(s.mark ?? 0);

  const status =
    mark === 1
      ? { label: "Present", icon: <CheckCircle2 size={16} className="text-green-300" /> }
      : mark === 0.5
      ? { label: "Late (0.5)", icon: <Clock3 size={16} className="text-yellow-300" /> }
      : { label: "Absent", icon: <XCircle size={16} className="text-red-300" /> };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">{s.day}</p>
          <p className="text-sm text-white/60 mt-1">{s.date}</p>
        </div>

        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold">
          {mark}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
        {status.icon}
        <span className="text-white/80">{status.label}</span>
      </div>
    </motion.div>
  );
}
