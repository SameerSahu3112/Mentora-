"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminMentorship() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/mentorship/bookings`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setBookings(data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#001719] p-6">
        <div className="max-w-7xl mx-auto"><div className="animate-pulse h-32 bg-[#082326] rounded" /></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001719] p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6"><a href="/admin/dashboard" className="text-[#0F4C5C] hover:text-[#0F4C5C] text-sm font-medium">← Back to Dashboard</a></nav>
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">All Mentorship Bookings</h1>
        <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-hidden">
          <table className="w-full text-left">
            <thead><tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Student</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Mentor</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Preferred Time</th>
            </tr></thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan="4" className="px-4 py-6 text-center text-secondary">No bookings found.</td></tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-[#8a9294]/20 hover:bg-[#082326]/50">
                    <td className="px-4 py-3 text-sm text-secondary">{booking.student_profile_id || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{booking.mentor_profile_id || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm"><span className="px-2 py-1 text-xs font-semibold bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border rounded">{booking.status}</span></td>
                    <td className="px-4 py-3 text-sm text-secondary">{new Date(booking.preferred_time).toLocaleString()}</td>
                  </tr>
                ))}
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
