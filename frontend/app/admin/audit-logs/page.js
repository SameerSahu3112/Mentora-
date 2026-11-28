"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/admin/audit-logs`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setLogs(data || []))
      .catch(() => setLogs([]))
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
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Audit Logs</h1>
        <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-hidden">
          <table className="w-full text-left">
            <thead><tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Time</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Actor</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Action</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Entity</th>
            </tr></thead>
            <tbody>
              {logs.length === 0 ? (
                <tr><td colSpan="4" className="px-4 py-6 text-center text-secondary">No audit logs found.</td></tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="border-b border-[#8a9294]/20 hover:bg-[#082326]/50">
                    <td className="px-4 py-3 text-sm text-secondary">{new Date(log.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{log.actor_user_id || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{log.action}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{log.entity_type || 'N/A'}</td>
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
