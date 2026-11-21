/**
 * Mentora Student Dashboard
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function StudentDashboard() {
  const enrollments = [
    { id: 'e1', course: 'JEE Main January', batch: 'Rise Batch 1.0', status: 'active', accessUntil: '2027-01-20' },
    { id: 'e2', course: 'JEE Main April', batch: 'Spark Batch 1.0', status: 'pending_payment', accessUntil: '2027-04-15' },
  ];

  const notifications = [
    { id: 'n1', title: 'Application Received', message: 'Thank you for registering with Mentora!', read: true },
    { id: 'n2', title: 'Introductory Call Scheduled', message: 'Your intro call is scheduled for tomorrow at 10:00 AM', read: false },
  ];

  return (
    <div className="student-layout">
      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Student Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-sm font-medium text-secondary mb-2">Active Enrollments</h3>
          <p className="text-2xl font-bold text-abyss-teal">{enrollments.filter(e => e.status === 'active').length}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-secondary mb-2">Pending Applications</h3>
          <p className="text-2xl font-bold text-desert-sand-dark">{enrollments.filter(e => e.status === 'pending_payment').length}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-secondary mb-2">Unread Notifications</h3>
          <p className="text-2xl font-bold text-abyss-teal">{notifications.filter(n => !n.read).length}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-abyss-teal mb-4">Your Enrollments</h2>
        {enrollments.length === 0 ? (
          <p className="text-muted">No enrollments yet. Apply for a batch to get started.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="card">
                <h3 className="text-lg font-semibold text-abyss-teal">Enrollment #{enrollment.id.slice(-6)}</h3>
                <p className="text-secondary text-sm mb-1">{enrollment.course}</p>
                <p className="text-secondary text-sm mb-1">{enrollment.batch}</p>
                <span className={`badge ${enrollment.status === 'active' ? 'badge-active' : 'badge-pending'}`}>
                  {enrollment.status.replace('_', ' ')}
                </span>
                {enrollment.accessUntil && (
                  <p className="text-secondary text-sm mt-2">Access until: {enrollment.accessUntil}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-abyss-teal mb-4">Recent Notifications</h2>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className={`card flex justify-between items-start ${!notification.read ? 'border-l-4 border-abyss-teal bg-abyss-teal-light' : ''}`}>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-abyss-teal">{notification.title}</h3>
                <p className="text-secondary text-sm mt-1">{notification.message}</p>
              </div>
              {!notification.read && <span className="w-2 h-2 bg-abyss-teal rounded-full" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
