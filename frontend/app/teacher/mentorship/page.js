"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TeacherMentorship() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/mentorship/bookings`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const statusColors = {
    requested: 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border',
    approved: 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal',
    rejected: 'bg-error-light text-error border border-error',
    cancelled: 'bg-border-color text-secondary border border-border-color',
    completed: 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal',
  };

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
          <a href="/teacher/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
            &larr; Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Mentorship Bookings</h1>

        <div className="space-y-3">
          {bookings.length === 0 ? (
            <div className="bg-primary p-8 rounded-lg shadow-sm border border-border-color text-center">
              <p className="text-muted">No bookings yet.</p>
            </div>
          ) : (
            bookings.map((booking) => (
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
            ))
          )}
        </div>
      </div>
    </main>
  );
}
