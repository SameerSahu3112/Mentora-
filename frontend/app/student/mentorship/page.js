"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MentorshipPage() {
  const [sessions, setSessions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/mentorship/sessions/upcoming/placeholder-batch-id`, { credentials: 'include' }),
      fetch(`${API_URL}/mentorship/bookings`, { credentials: 'include' }),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([sessions, bookings]) => {
        setSessions(sessions || []);
        setBookings(bookings || []);
      })
      .catch(() => {
        setSessions([]);
        setBookings([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#001719] p-6">
        <div className="max-w-4xl mx-auto"><div className="animate-pulse h-32 bg-[#082326] rounded" /></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001719] p-6">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6"><a href="/student/dashboard" className="text-[#0F4C5C] hover:text-[#0F4C5C] text-sm font-medium">← Back to Dashboard</a></nav>
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Mentorship</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#0F4C5C] mb-4">Weekly Batch Sessions</h2>
          {sessions.length === 0 ? (
            <p className="text-secondary">No upcoming weekly sessions.</p>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="bg-[#082326] p-3 rounded-lg shadow-sm border border-[#8a9294]/20">
                  <p className="text-sm font-medium text-[#0F4C5C]">
                    {session.session_date} at {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <span className="text-xs font-semibold px-2 py-1 bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border rounded">
                    {session.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-abyss-teal mb-4">One-to-One Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-muted">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-[#082326] p-3 rounded-lg shadow-sm border border-[#8a9294]/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-abyss-teal">Booking #{booking.id.slice(-6)}</h3>
                      <p className="text-secondary text-sm mt-1">Preferred: {new Date(booking.preferred_time).toLocaleString()}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[booking.status] || 'bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]'}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const statusColors = {
  requested: 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border',
  approved: 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal',
  rejected: 'bg-error-light text-error border border-error',
  cancelled: 'bg-border-color text-secondary border border-border-color',
  completed: 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal',
};
