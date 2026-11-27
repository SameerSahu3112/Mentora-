"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { teacherAPI } from "@/app/lib/api";

export default function AttendancePage() {
  const [sessions, setSessions] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([teacherAPI.getSessions(), teacherAPI.getAttendance()])
      .then(([s, a]) => {
        setSessions(Array.isArray(s) ? s : []);
        setAttendance(Array.isArray(a) ? a : []);
      })
      .catch((err) => setError(err.message || "Failed to load attendance data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="animate-pulse h-32 bg-[#082326] rounded" />;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <nav className="mb-6">
        <Link href="/teacher/dashboard" className="text-[#0F4C5C] hover:text-[#E9C46A] text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-2">Attendance</h1>
      <p className="text-secondary text-sm mb-6">
        Weekly batch mentorship sessions and recorded attendance.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#082326] p-5 rounded-lg border border-[#8a9294]/20">
          <h2 className="text-lg font-semibold text-[#E9C46A] mb-3">Sessions ({sessions.length})</h2>
          {sessions.length === 0 ? (
            <p className="text-sm text-secondary">No mentorship sessions scheduled.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {sessions.map((s) => (
                <li key={s.id} className="border-b border-[#8a9294]/10 pb-2">
                  <span className="font-medium">{s.topic || "Weekly Mentorship"}</span>
                  <span className="block text-xs text-secondary">
                    {new Date(s.scheduled_at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-[#082326] p-5 rounded-lg border border-[#8a9294]/20">
          <h2 className="text-lg font-semibold text-[#E9C46A] mb-3">Attendance Records ({attendance.length})</h2>
          {attendance.length === 0 ? (
            <p className="text-sm text-secondary">No attendance records yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {attendance.map((rec) => (
                <li key={rec.id} className="flex justify-between border-b border-[#8a9294]/10 pb-2">
                  <span>{rec.student_profile_id}</span>
                  <span className="text-[#E9C46A] font-semibold">{rec.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
