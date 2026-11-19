/**
 * Mentora Student Dashboard
 * Phase 10: Frontend Portal Completion
 * Brand: Abyss Teal + Desert Sand
 */

import { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/auth/me`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setLoading(false));

    fetch(`${API_URL}/api/v1/enrollments/student/enrollments`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setEnrollments(data))
      .catch(() => setEnrollments([]));

    fetch(`${API_URL}/api/v1/notifications/`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse flex items-center justify-center h-64">
            <div className="h-8 w-48 bg-border-color rounded" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary">
      <nav className="bg-primary shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/student/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-abyss-teal">Mentora</span>
                <span className="text-sm font-semibold text-secondary hidden sm:block">Student Portal</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-secondary font-medium">{user?.full_name || 'Student'}</span>
              <a href="/auth/login" className="text-sm text-abyss-teal hover:text-abyss-teal-dark">
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Student Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
            <h3 className="text-sm font-medium text-secondary mb-2">Active Enrollments</h3>
            <p className="text-2xl font-bold text-abyss-teal">
              {enrollments.filter((e) => e.status === 'active').length}
            </p>
          </div>
          <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
            <h3 className="text-sm font-medium text-secondary mb-2">Pending Applications</h3>
            <p className="text-2xl font-bold text-desert-sand-dark">
              {enrollments.filter((e) => e.status === 'pending_payment').length}
            </p>
          </div>
          <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
            <h3 className="text-sm font-medium text-secondary mb-2">Unread Notifications</h3>
            <p className="text-2xl font-bold text-abyss-teal">
              {notifications.filter((n) => !n.is_read).length}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-abyss-teal mb-4">Your Enrollments</h2>
          {enrollments.length === 0 ? (
            <p className="text-muted">No enrollments yet. Apply for a batch to get started.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="bg-primary p-4 rounded-lg shadow-sm border border-border-color"
                >
                  <h3 className="text-lg font-semibold text-abyss-teal">
                    Enrollment #{enrollment.id.slice(-6)}
                  </h3>
                  <p className="text-secondary text-sm mt-1">
                    Status: {enrollment.status}
                  </p>
                  {enrollment.access_until && (
                    <p className="text-secondary text-sm">
                      Access until: {enrollment.access_until}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-abyss-teal mb-4">Recent Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-muted">No notifications.</p>
          ) : (
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-primary p-3 rounded-lg shadow-sm border border-border-color flex justify-between items-start ${
                    !notification.is_read ? 'border-l-4 border-abyss-teal bg-abyss-teal-light' : ''
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-abyss-teal">{notification.title}</h3>
                    <p className="text-secondary text-sm mt-1">{notification.message}</p>
                    <p className="text-xs text-muted mt-2">
                      {new Date(notification.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {!notification.is_read && (
                    <span className="w-2 h-2 bg-abyss-teal rounded-full" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

import Link from 'next/link';
