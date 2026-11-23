"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/admin/applications/`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setApplications(data || []))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, []);

  const statusColors = {
    pending: 'bg-[#E9C46A]/20 text-[#E9C46A] border border-[#E9C46A]',
    approved: 'bg-[#0F4C5C]/20 text-[#0F4C5C] border border-[#0F4C5C]',
    rejected: 'bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]',
    cancelled: 'bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]',
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#001719] p-6"><div className="max-w-7xl mx-auto"><div className="animate-pulse h-32 bg-[#082326] rounded" /></div></main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001719] p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6"><a href="/admin/dashboard" className="text-[#0F4C5C] hover:text-[#0F4C5C] text-sm font-medium">← Back to Dashboard</a></nav>
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Applications</h1>
        <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-hidden">
          <table className="w-full text-left">
            <thead><tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Student</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Batch</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Applied</th>
            </tr></thead>
            <tbody>
              {applications.length === 0 ? (
                <tr><td colSpan="4" className="px-4 py-6 text-center text-secondary">No applications found.</td></tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="border-b border-[#8a9294]/20 hover:bg-[#082326]/50">
                    <td className="px-4 py-3 text-sm text-secondary">{app.student_profile_id || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{app.batch_id || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[app.status] || 'bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]'`}>${app.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary">{new Date(app.applied_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
