"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MentorshipPage() {
  const [sessions, setSessions] = useState([
    { id: 's1', sessionDate: '2026-11-20', startTime: '2026-11-20T10:00:00Z', status: 'upcoming' },
    { id: 's2', sessionDate: '2026-11-27', startTime: '2026-11-27T10:00:00Z', status: 'upcoming' },
  ]);
  const [bookings, setBookings] = useState([
    { id: 'bk1', status: 'approved', preferredTime: '2026-11-22T14:00:00Z', confirmedTime: '2026-11-22T14:00:00Z' },
  ]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/mentorship/sessions/upcoming/placeholder-batch-id`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setSessions(data || []))
      .catch(() => setSessions([]));

    fetch(`${API_URL}/api/v1/mentorship/bookings`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setBookings(data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse h-32 bg-border-color rounded" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <Link href="/student/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
            ← Back to Dashboard
          </Link>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Mentorship</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-abyss-teal mb-4">Weekly Batch Sessions</h2>
          {sessions.length === 0 ? (
            <p className="text-muted">No upcoming weekly sessions.</p>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="bg-primary p-3 rounded-lg shadow-sm border border-border-color">
                  <p className="text-sm font-medium text-abyss-teal">
                    {session.sessionDate} at {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
          <h2 className="text-xl font-bold text-abyss-teal mb-4">One-to-One Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-muted">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-primary p-3 rounded-lg shadow-sm border border-border-color">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-abyss-teal">Booking #{booking.id.slice(-6)}</h3>
                      <p className="text-secondary text-sm mt-1">
                        Preferred: {new Date(booking.preferred_time).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[booking.status] || 'bg-border-color text-secondary border border-border-color'}`}>
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
