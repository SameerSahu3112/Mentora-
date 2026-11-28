"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/admin/resources`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setResources(data || []))
      .catch(() => setResources([]))
      .finally(() => setLoading(false));
  }, []);

  const statusColors = {
    pdf: 'bg-[#FEE2E2]/50 text-[#DC2626]/80 border border-[#E57373]/20',
    image: 'bg-[#E9C46A]/20 text-[#D4A357] border border-[#E9C46A]/50',
    external_video: 'bg-[#FFF9C4]/50 text-[#D4A357] border border-[#E9C46A]/50',
    external_document: 'bg-[#FFF9C4]/50 text-[#D4A357] border border-[#E9C46A]/50',
    text_lesson: 'bg-[#E9C46A]/20 text-[#D4A357] border border-[#E9C46A]/50',
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
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Resources</h1>
        <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
                <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Title</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Type</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Uploader</th>
              </tr>
            </thead>
            <tbody>
              {resources.length === 0 ? (
                <tr><td colSpan="4" className="px-4 py-6 text-center text-secondary">No resources found.</td></tr>
              ) : (
                resources.map((resource) => (
                  <tr key={resource.id} className="border-b border-[#8a9294]/20 hover:bg-[#082326]/50">
                    <td className="px-4 py-3 text-sm font-medium text-[#0F4C5C]">{resource.title}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{resource.type}</td>
                    <td className="px-4 py-3 text-sm"><span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[resource.status] || 'bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]'`}}>{resource.status}</span></td>
                    <td className="px-4 py-3 text-sm text-secondary">{resource.uploader_id || 'N/A'}</td>
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
