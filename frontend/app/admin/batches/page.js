"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/batches/`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setBatches(data || []))
      .catch(() => setBatches([]))
      .finally(() => setLoading(false));
  }, []);

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
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Batches</h1>
        <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-hidden">
          <table className="w-full text-left">
            <thead><tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Batch Name</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Course</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Capacity</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Dates</th>
            </tr></thead>
            <tbody>
              {batches.length === 0 ? (
                <tr><td colSpan="5" className="px-4 py-6 text-center text-secondary">No batches found.</td></tr>
              ) : (
                batches.map((batch) => (
                  <tr key={batch.id} className="border-b border-[#8a9294]/20 hover:bg-[#082326]/50">
                    <td className="px-4 py-3 text-sm font-medium text-[#0F4C5C]">{batch.name}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{batch.course_name || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{batch.max_capacity}</td>
                    <td className="px-4 py-3 text-sm"><span className={`px-2 py-1 rounded ${batch.status === 'active' ? 'bg-[#E9C46A]/20 text-[#E9C46A]' : 'bg-[#E9C46A]/20 text-[#E9C46A]'}`}>{batch.status}</span></td>
                    <td className="px-4 py-3 text-sm text-secondary">{batch.start_date} to {batch.end_date}</td>
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
