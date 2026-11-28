"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/enrollments/student/enrollments`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setEnrollments(data || []))
      .catch(() => setEnrollments([]))
      .finally(() => setLoading(false));
  }, []);

  const statusColors = {
    pending_payment: 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border',
    active: 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal',
    expired: 'bg-error-light text-error border border-error',
    cancelled: 'bg-border-color text-secondary border border-border-color',
    rejected: 'bg-error-light text-error border border-error',
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#001719] p-6">
        <div className="max-w-4xl mx-auto"><div className="animate-pulse h-32 bg-[#082326] rounded" /></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001719] p-6">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6"><a href="/student/dashboard" className="text-[#0F4C5C] hover:text-[#0F4C5C] text-sm font-medium">← Back to Dashboard</a></nav>
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">My Enrollments</h1>

        {enrollments.length === 0 ? (
          <div className="bg-[#082326] p-8 rounded-lg shadow-sm border border-[#8a9294]/20 text-center">
            <p className="text-muted">No enrollments yet.</p>
            <Link href="/courses" className="mt-4 inline-block text-[#0F4C5C] font-medium hover:text-[#D4A357] transition-colors">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="bg-[#082326] p-4 rounded-lg shadow-sm border border-[#8a9294]/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F4C5C]">Enrollment #{enrollment.id.slice(-6)}</h3>
                    <p className="text-secondary text-sm">{enrollment.course_id}</td>
                    <p className="text-secondary text-sm">{enrollment.batch_id || 'Batch'}</td>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[enrollment.status] || 'bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]'`}}>
                    {enrollment.status.replace('_', ' ')}
                  </span>
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
    </main>
  );
}
