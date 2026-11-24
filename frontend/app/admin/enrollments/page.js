"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/admin/enrollments`, {
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
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse h-32 bg-[#082326] rounded" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001719] p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6">
          <a href="/admin/dashboard" className="text-[#0F4C5C] hover:text-[#0F4C5C] text-sm font-medium">
            ← Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Enrollments</h1>

        <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
                <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Student</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Course</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Batch</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Access Until</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-secondary">
                    No enrollments found.
                  </td>
                </tr>
              ) : (
                enrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="border-b border-[#8a9294]/20 hover:bg-[#082326]/50">
                    <td className="px-4 py-3 text-sm text-secondary">{enrollment.student_profile_id || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{enrollment.course_id || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{enrollment.batch_id || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[enrollment.status] || 'bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]'`}}>
                        {enrollment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary">{enrollment.access_until || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
