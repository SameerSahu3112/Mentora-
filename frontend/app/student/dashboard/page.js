"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setLoading(false));

    fetch(`${API_URL}/enrollments/student/enrollments`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setEnrollments(data || []))
      .catch(() => setEnrollments([]))
      .finally(() => setLoading(false));

    fetch(`${API_URL}/notifications/`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setNotifications(data || []))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#001719] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse flex items-center justify-center h-64">
            <div className="h-8 w-48 bg-[#082326] rounded" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001719]">
      <nav className="bg-[#001719]/80 shadow border-b border-[#8a9294]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/student/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
                <span className="text-sm font-semibold text-[#E9C46A]">.</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
              <Link href="/student/dashboard" className="hover:text-[#0F4C5C] transition-colors">Dashboard</Link>
              <Link href="/student/applications" className="hover:text-[#0F4C5C] transition-colors">Applications</Link>
              <Link href="/student/enrollments" className="hover:text-[#0F4C5C] transition-colors">Enrollments</Link>
              <Link href="/student/resources" className="hover:text-[#0F4C5C] transition-colors">Resources</Link>
              <Link href="/student/mentorship" className="hover:text-[#0F4C5C] transition-colors">Mentorship</Link>
              <Link href="/student/notifications" className="hover:text-[#0F4C5C] transition-colors">Notifications</Link>
              <Link href="/student/profile" className="hover:text-[#0F4C5C] transition-colors">Profile</Link>
              <a href="/auth/login" className="text-sm text-[#0F4C5C] hover:text-[#0F4C5C]">Sign Out</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Student Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-sm font-medium text-secondary mb-2">Active Enrollments</h3>
            <p className="text-2xl font-bold text-[#0F4C5C]">
              {enrollments.filter((e) => e.status === 'active').length}
            </p>
          </div>
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-sm font-medium text-secondary mb-2">Pending Applications</h3>
            <p className="text-2xl font-bold text-[#E9C46A]">
              {enrollments.filter((e) => e.status === 'pending_payment').length}
            </p>
          </div>
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-sm font-medium text-secondary mb-2">Unread Notifications</h3>
            <p className="text-2xl font-bold text-[#0F4C5C]">
              {notifications.filter((n) => !n.read).length}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#0F4C5C] mb-4">Your Enrollments</h2>
          {enrollments.length === 0 ? (
            <p className="text-secondary">No enrollments yet. Apply for a batch to get started.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} className="bg-[#082326] p-4 rounded-lg shadow-sm border border-[#8a9294]/20">
                  <h3 className="text-lg font-semibold text-[#0F4C5C]">Enrollment #{enrollment.id.slice(-6)}</h3>
                  <p className="text-secondary text-sm">{enrollment.course_id || 'Course'}</p>
                  <p className="text-secondary text-sm">{enrollment.batch_id || 'Batch'}</td>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[enrollment.status] || 'bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]'`}}>
                    {enrollment.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#0F4C5C] mb-4">Recent Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-muted">No notifications.</p>
          ) : (
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className="bg-[#082326] p-3 rounded-lg shadow-sm border border-[#8a9294]/20 flex justify-between items-start ${!notification.read ? 'border-l-4 border-[#0F4C5C] bg-[#0F4C5C]/20' : ''}"
                >
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-[#0F4C5C]">{notification.title}</h3>
                    <p className="text-secondary text-sm mt-1">{notification.message}</p>
                    <p className="text-xs text-muted mt-2">{new Date(notification.created_at).toLocaleDateString()}</p>
                  </div>
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-[#0F4C5C]" />
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
