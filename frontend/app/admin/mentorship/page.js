"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminMentorship() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/mentorship/bookings`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setBookings(data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const bookingStatuses = {
    requested: 'bg-[#E9C46A]/20 text-[#D4A357] border border-[#E9C46A]/50',
    approved: 'bg-[#E9C46A]/20 text-[#D4A357] border border-[#E9C46A]/50',
    rejected: 'bg-[#E9C46A]/20 text-[#D4A357] border border-[#E9C46A]/50',
    cancelled: 'bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]/50',
    completed: 'bg-[#E9C46A]/20 text-[#D4A357] border border-[#E9C46A]/50',
  };

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
            <thead>
              <tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
                <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Student</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Mentor</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Preferred Time</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Confirmed Time</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan="5" className="px-4 py-6 text-center text-secondary">No bookings found.</td></tr>
              ) : null}
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-[#8a9294]/20 hover:bg-[#082326]/50">
                  <td className="px-4 py-3 text-sm text-secondary">{booking.student_profile_id || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{booking.mentor_profile_id || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm"><span className={`px-2 py-1 text-xs font-semibold rounded ${bookingStatuses[booking.status] || 'bg-[#E9C46A]/20 text-[#E9C46A] border border-[#8a9294]'}`}>{booking.status}</span></td>
                  <td className="px-4 py-3 text-sm text-secondary">{booking.preferred_time ? new Date(booking.preferred_time).toLocaleDateString() : '-'}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{booking.confirmed_time ? new Date(booking.confirmed_time).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
