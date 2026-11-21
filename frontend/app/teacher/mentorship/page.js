/**
 * Mentora Teacher Mentorship Bookings
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function TeacherMentorship() {
  const bookings = [
    { id: 'bk1', status: 'approved', preferredTime: '2026-11-22T14:00:00Z', confirmedTime: '2026-11-22T14:00:00Z' },
    { id: 'bk2', status: 'requested', preferredTime: '2026-11-23T15:00:00Z', confirmedTime: null },
  ];

  const statusColors = {
    requested: 'badge-pending',
    approved: 'badge-active',
    rejected: 'badge-expired',
    cancelled: 'badge-expired',
    completed: 'badge-active',
  };

  return (
    <div className="teacher-layout">
      <nav className="mb-6">
        <Link href="/teacher/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Mentorship Bookings</h1>

      <div className="space-y-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-abyss-teal">Booking #{booking.id.slice(-6)}</h3>
                <p className="text-secondary text-sm mt-1">
                  Preferred: {new Date(booking.preferredTime).toLocaleString()}
                </p>
              </div>
              <span className={`badge ${statusColors[booking.status] || 'badge-pending'}`}>
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
