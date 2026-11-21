/**
 * Mentora Student Applications
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function ApplicationsPage() {
  const applications = [
    { id: 'a1', course: 'JEE Main January', batch: 'Rise Batch 1.0', status: 'pending', appliedAt: '2026-11-15', introStatus: 'pending', introDeadline: '2026-11-22' },
    { id: 'a2', course: 'JEE Main April', batch: 'Spark Batch 1.0', status: 'approved', appliedAt: '2026-11-10', introStatus: 'scheduled', introDeadline: '2026-11-17' },
  ];

  const statusColors = {
    pending: 'badge-pending',
    approved: 'badge-active',
    rejected: 'badge-expired',
    cancelled: 'badge-expired',
  };

  return (
    <div className="student-layout">
      <nav className="mb-6">
        <Link href="/student/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Your Applications</h1>

      {applications.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-muted">No applications yet.</p>
          <Link href="/courses" className="mt-4 inline-block text-abyss-teal font-medium hover:text-abyss-teal-dark">
            Browse Courses →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="card">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-abyss-teal">Application #{app.id.slice(-6)}</h3>
                  <p className="text-secondary text-sm">{app.batch}</p>
                </div>
                <span className={`badge ${statusColors[app.status] || 'badge-pending'}`}>
                  {app.status}
                </span>
              </div>
              <div className="mt-3 grid md:grid-cols-4 gap-2 text-sm text-secondary">
                <div>
                  <span className="block text-xs font-medium text-muted">Applied</span>
                  <span className="block">{app.appliedAt}</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-muted">Intro Call</span>
                  <span className="block text-abyss-teal">{app.introStatus}</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-muted">Deadline</span>
                  <span className="block">{app.introDeadline}</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-abyss-teal italic">
                Thank you for registering with Mentora! Our team will contact you soon for your introductory session.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
