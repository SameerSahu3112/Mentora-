/**
 * Mentora Student Enrollments
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function EnrollmentsPage() {
  const enrollments = [
    { id: 'e1', course: 'JEE Main January', batch: 'Rise Batch 1.0', status: 'active', accessUntil: '2027-01-20' },
    { id: 'e2', course: 'JEE Main April', batch: 'Spark Batch 1.0', status: 'pending_payment', accessUntil: '2027-04-15' },
    { id: 'e3', course: 'JEE Advanced', batch: 'Apex Batch 1.0', status: 'expired', accessUntil: '2026-05-15' },
  ];

  const statusColors = {
    pending_payment: 'badge-pending',
    active: 'badge-active',
    expired: 'badge-expired',
    cancelled: 'badge-expired',
    rejected: 'badge-expired',
  };

  return (
    <div className="student-layout">
      <nav className="mb-6">
        <Link href="/student/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">My Enrollments</h1>

      <div className="space-y-4">
        {enrollments.map((enrollment) => (
          <div key={enrollment.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-abyss-teal">Enrollment #{enrollment.id.slice(-6)}</h3>
                <p className="text-secondary text-sm">{enrollment.course}</p>
                <p className="text-secondary text-sm">{enrollment.batch}</p>
              </div>
              <span className={`badge ${statusColors[enrollment.status] || 'badge-pending'}`}>
                {enrollment.status.replace('_', ' ')}
              </span>
            </div>
            {enrollment.accessUntil && (
              <div className="mt-3 text-sm text-secondary">
                Access until: {enrollment.accessUntil}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
