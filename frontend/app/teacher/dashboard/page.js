"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authAPI, teacherAPI } from "@/app/lib/api";

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const [batches, setBatches] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([authAPI.me(), teacherAPI.getMyBatches(), teacherAPI.getBookings()])
      .then(([meData, batchData, bookingData]) => {
        setTeacher(meData);
        setBatches(Array.isArray(batchData) ? batchData : []);
        setBookings(Array.isArray(bookingData) ? bookingData : []);
      })
      .catch((err) => {
        setError(err.message || "Failed to load teacher dashboard. Please sign in as a Teacher.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse flex items-center justify-center h-64">
        <div className="h-8 w-48 bg-[#082326] rounded" />
      </div>
    );
  }

  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F4C5C]">Teacher Dashboard</h1>
          {teacher?.full_name && (
            <p className="text-sm text-secondary mt-1">Welcome back, {teacher.full_name}</p>
          )}
        </div>
        <div className="flex gap-3">
          <Link
            href="/teacher/resources"
            className="px-4 py-2 rounded-lg bg-[#0F4C5C] text-white text-sm font-semibold hover:bg-[#E9C46A] hover:text-[#00363d] transition-colors"
          >
            + Manage Resources
          </Link>
          <Link
            href="/teacher/mentorship"
            className="px-4 py-2 rounded-lg bg-[#E9C46A] text-[#00363d] text-sm font-semibold hover:bg-[#D4A357] transition-colors"
          >
            Mentorship Bookings
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] text-sm flex items-center justify-between gap-4">
          <span>{error}</span>
          <Link href="/auth/login" className="underline font-semibold whitespace-nowrap">
            Sign in
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/teacher/batches" className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20 hover:border-[#E9C46A]/60 transition-colors">
          <h3 className="text-sm font-medium text-secondary mb-2">Assigned Batches</h3>
          <p className="text-2xl font-bold text-[#0F4C5C]">{batches.length}</p>
        </Link>
        <Link href="/teacher/mentorship" className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20 hover:border-[#E9C46A]/60 transition-colors">
          <h3 className="text-sm font-medium text-secondary mb-2">Total Bookings</h3>
          <p className="text-2xl font-bold text-[#0F4C5C]">{bookings.length}</p>
        </Link>
        <Link href="/teacher/mentorship" className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20 hover:border-[#E9C46A]/60 transition-colors">
          <h3 className="text-sm font-medium text-secondary mb-2">Pending Bookings</h3>
          <p className="text-2xl font-bold text-[#E9C46A]">{pendingBookings}</p>
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#0F4C5C] mb-4">Your Assigned Batches</h2>
        {batches.length === 0 ? (
          <p className="text-secondary">No batches assigned yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {batches.map((batch) => (
              <div key={batch.id} className="bg-[#082326] p-4 rounded-lg shadow-sm border border-[#8a9294]/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-[#E9C46A]">{batch.name}</h3>
                    <p className="text-secondary text-sm mt-1">{batch.course_name || "Course"}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded bg-[#E9C46A]/20 text-[#E9C46A]">
                    {batch.status}
                  </span>
                </div>
                <p className="text-secondary text-sm mt-2">
                  Capacity: {batch.max_capacity ?? "N/A"} | {batch.start_date} to {batch.end_date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
