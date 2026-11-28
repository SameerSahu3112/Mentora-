"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/admin/applications`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setApplications(data || []))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, []);

  const statusColors = {
    pending: 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border',
    approved: 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal',
    rejected: 'bg-error-light text-error border border-error',
    cancelled: 'bg-border-color text-secondary border border-border-color',
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#001719] p-6">
        <div className="max-w-7xl mx-auto"><div className="animate-pulse h-32 bg-[#082326] rounded" /></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001719] p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6"><a href="/admin/dashboard" className="text-[#0F4C5C] hover:text-[#0F4C5C] text-sm font-medium">← Back to Dashboard</a></nav>
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Applications</h1>
        <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
                <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Student</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Course</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Batch</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr><td colSpan="5" className="px-4 py-6 text-center text-secondary">No applications found.</td></tr>
              ) : null}
              {applications.map((application) => (
                <tr key={application.id} className="border-b border-[#8a9294]/20 hover:bg-[#082326]/50">
                  <td className="px-4 py-3 text-sm text-secondary">{application.student_profile_id || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{application.course_id || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{application.batch_id || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm"><span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[application.status] || 'bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]'}`}>{application.status}</span></td>
                  <td className="px-4 py-3 text-sm text-secondary">{new Date(application.applied_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
