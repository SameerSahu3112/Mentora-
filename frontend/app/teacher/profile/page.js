"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authAPI } from "@/app/lib/api";

export default function TeacherProfile() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    authAPI
      .me()
      .then((data) => setTeacher(data))
      .catch((err) => setError(err.message || "Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="animate-pulse h-32 bg-[#082326] rounded max-w-2xl mx-auto" />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <nav className="mb-6">
        <Link href="/teacher/dashboard" className="text-[#0F4C5C] hover:text-[#E9C46A] text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Teacher Profile</h1>

      {error && (
        <div className="mb-4 p-3 rounded bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] text-sm">
          {error}
        </div>
      )}

      <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-[#0F4C5C]/20 rounded-full flex items-center justify-center text-[#E9C46A] text-xl font-bold">
            {teacher?.full_name ? teacher.full_name.charAt(0) : "T"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#E9C46A]">{teacher?.full_name || "Teacher"}</h2>
            <p className="text-secondary font-medium">Teacher</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-secondary mb-1">Email</p>
            <p className="text-on-surface">{teacher?.email || "N/A"}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-secondary mb-1">Role</p>
            <p className="text-on-surface capitalize">{teacher?.role || "teacher"}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-medium text-secondary mb-2">Note:</p>
          <p className="text-secondary text-sm">
            Your phone number is not displayed to students for privacy. Students can contact you through mentorship bookings.
          </p>
        </div>
      </div>
    </div>
  );
}
