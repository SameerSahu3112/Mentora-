"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminApprovals() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/admin/approvals/pending`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setApprovals(data || []))
      .catch(() => setApprovals([]))
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
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Pending Approvals</h1>
        <p className="text-secondary mb-6">Critical business decisions require approval from both Admin accounts.</p>
        {approvals.length === 0 ? (
          <div className="bg-[#082326] p-8 rounded-lg shadow-sm border border-[#8a9294]/20 text-center"><p className="text-secondary">No pending approvals.</p></div>
        ) : (
          <div className="space-y-3">
            {approvals.map((approval) => (
              <div key={approval.id} className="bg-[#082326] p-4 rounded-lg shadow-sm border border-[#8a9294]/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F4C5C]">{approval.action_type.replace(/_/g, ' ')}</h3>
                    <p className="text-secondary text-sm mt-1">Proposed by: {approval.requester_id || 'Admin'}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border rounded">Pending</span>
                </div>
                <div className="mt-3 text-xs text-md text-[#8a9294]">Payload: {JSON.stringify(approval.payload_snapshot || {})}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
