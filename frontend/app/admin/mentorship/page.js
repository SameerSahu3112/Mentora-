"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminAPI } from "@/app/lib/api";

export default function AdminMentorship() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminAPI
      .getMentorshipBookings()
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load mentorship bookings"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="animate-pulse h-32 bg-[#082326] rounded" />;
  }

  return (
    <div>
      <nav className="mb-6">
        <Link href="/admin/dashboard" className="text-[#0F4C5C] hover:text-[#E9C46A] text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">All Mentorship Bookings</h1>

      {error && (
        <div className="mb-4 p-3 rounded bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] text-sm">
          {error}
        </div>
      )}

      <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Student</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Mentor</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Preferred Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-secondary">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-[#8a9294]/20 hover:bg-[#001719]/40">
                  <td className="px-4 py-3 text-sm text-secondary">{booking.student_profile_id || "N/A"}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{booking.mentor_profile_id || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 text-xs font-semibold bg-[#E9C46A]/20 text-[#E9C46A] rounded">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-secondary">
                    {new Date(booking.preferred_time).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
