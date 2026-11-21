/**
 * Mentora Student Mentorship
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function MentorshipPage() {
  const sessions = [
    { id: 's1', sessionDate: '2026-11-20', startTime: '2026-11-20T10:00:00Z', status: 'upcoming' },
    { id: 's2', sessionDate: '2026-11-27', startTime: '2026-11-27T10:00:00Z', status: 'upcoming' },
  ];

  const bookings = [
    { id: 'bk1', status: 'approved', preferredTime: '2026-11-22T14:00:00Z', confirmedTime: '2026-11-22T14:00:00Z' },
  ];

  return (
    <div className="student-layout">
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
              <div key={session.id} className="card">
                <p className="text-sm font-medium text-abyss-teal">
                  {session.sessionDate} at {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <span className="badge badge-active">{session.status}</span>
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
              <div key={booking.id} className="card">
                <p className="text-sm font-medium text-abyss-teal">Booking #{booking.id.slice(-6)}</p>
                <p className="text-secondary text-sm mt-1">Status: {booking.status}</p>
                {booking.confirmedTime && (
                  <p className="text-secondary text-sm">Confirmed: {new Date(booking.confirmedTime).toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
