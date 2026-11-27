"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = '/api/v1';

  useEffect(() => {
    const loadData = async () => {
      try {
        const [meRes, enrollRes] = await Promise.all([
          fetch(`${API_URL}/auth/me`, { credentials: 'include' }),
          fetch(`${API_URL}/enrollments/student/enrollments`, { credentials: 'include' }),
        ]);
        const userData = await meRes.json();
        const enrollData = await enrollRes.json();
        setUser(userData);
        setEnrollments(Array.isArray(enrollData) ? enrollData : []);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-[#001719] text-on-surface">
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
        {loading ? (
          <div className="animate-pulse flex items-center justify-center h-64">
            <div className="h-8 w-48 bg-[#082326] rounded" />
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Student Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
                <h3 className="text-sm font-medium text-secondary mb-2">Active Enrollments</h3>
                <p className="text-2xl font-bold text-[#0F4C5C]">{enrollments.filter((e) => e.status === 'active').length}</p>
              </div>
              <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
                <h3 className="text-sm font-medium text-secondary mb-2">Pending Applications</h3>
                <p className="text-2xl font-bold text-[#E9C46A]">{enrollments.filter((e) => e.status === 'pending_payment').length}</p>
              </div>
              <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
                <h3 className="text-sm font-medium text-secondary mb-2">Not Found</h3>
                <p className="text-2xl font-bold text-[#0F4C5C]">0</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#0F4C5C] mb-4">Your Enrollments</h2>
              {enrollments.length === 0 ? (
                <p className="text-secondary">No enrollments yet. <Link href="/courses" className="text-[#0F4C5C] font-medium hover:text-[#D4A357]">Browse courses</Link>.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="bg-[#082326] p-4 rounded-lg shadow-sm border border-[#8a9294]/20">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-[#0F4C5C]">{enrollment.course || 'Course'}</h3>
                          <p className="text-secondary text-sm">{enrollment.batch || 'Batch'}</p>
                        </div>
                        <span className={`px-2 py-1 rounded ${enrollment.status === 'active' ? 'bg-[#E9C46A]/20 text-[#E9C46A]' : 'bg-[#E9C46A]/20 text-[#E9C46A]'}`}>{enrollment.status}</span>
                      </div>
                      {enrollment.access_until && (
                        <div className="mt-3 text-sm text-secondary">
                          Access until: {enrollment.access_until}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
