/**
 * Mentora Admin Approvals
 * Brand: Abyss Teal + Desert Sand
 */

import { useEffect, useState } from 'react';

export default function AdminApprovals() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/admin/approvals/pending`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setApprovals(data))
      .catch(() => setApprovals([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse h-32 bg-border-color rounded" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6">
          <a href="/admin/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm">
            ← Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Pending Approvals</h1>

        <p className="text-secondary mb-6">
          Critical business decisions require approval from both Admin accounts.
        </p>

        {approvals.length === 0 ? (
          <div className="bg-primary p-8 rounded-lg shadow-sm border border-border-color text-center">
            <p className="text-muted">No pending approvals.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {approvals.map((approval) => (
              <div key={approval.id} className="bg-primary p-4 rounded-lg shadow-sm border border-border-color">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-abyss-teal">
                      {approval.action_type.replace(/_/g, ' ')}
                    </h3>
                    <p className="text-secondary text-sm mt-1">
                      Proposed by: {approval.requester_id || 'Admin'}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border rounded">
                    Pending
                  </span>
                </div>
                <div className="mt-3 text-xs text-muted">
                  Payload: {JSON.stringify(approval.payload_snapshot || {})}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
