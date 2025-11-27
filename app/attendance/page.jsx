"use client";

import { Suspense } from "react";
import AttendanceResult from "./Result";

export default function AttendancePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
        </div>
      }
    >
      <AttendanceResult />
    </Suspense>
  );
}
