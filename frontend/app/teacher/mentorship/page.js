"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { teacherAPI } from "@/app/lib/api";

export default function TeacherMentorshipPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const loadBookings = () => {
    setLoading(true);
    teacherAPI
      .getBookings()
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load mentorship bookings"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatus = async (id, status) => {
    setError("");
    setBusyId(id);
    try {
      await teacherAPI.updateBooking(id, { status });
      loadBookings();
    } catch (err) {
      setError(err.message || "Failed to update booking");
    } finally {
      setBusyId(null);
    }
  };

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
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-2">Mentorship Bookings</h1>
      <p className="text-secondary text-sm mb-6">
        Manage your 1-on-1 mentorship bookings and approvals.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] text-sm">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="bg-[#082326] p-8 rounded-lg border border-[#8a9294]/20 text-center text-secondary">
          No mentorship bookings found.
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-[#082326] p-4 rounded-lg border border-[#8a9294]/20 flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="text-sm font-semibold text-[#E9C46A]">
                  Student: {booking.student_profile_id}
                </p>
                <p className="text-xs text-secondary mt-1">
                  Preferred: {new Date(booking.preferred_time).toLocaleString()} | Status: {booking.status}
                </p>
              </div>
              {booking.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={busyId === booking.id}
                    onClick={() => handleStatus(booking.id, "approved")}
                    className="px-3 py-1.5 rounded bg-[#0F4C5C] text-white text-xs font-semibold hover:bg-[#E9C46A] hover:text-[#00363d] disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    disabled={busyId === booking.id}
                    onClick={() => handleStatus(booking.id, "rejected")}
                    className="px-3 py-1.5 rounded bg-[#93000a] text-white text-xs font-semibold disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
