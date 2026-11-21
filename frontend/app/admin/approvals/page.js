/**
 * Mentora Admin Approvals
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function AdminApprovals() {
  const approvals = [
    { id: 'ap1', actionType: 'reject_enrollment', requesterId: 'Admin 1', payload: { enrollmentId: 'E001', reason: 'Non-payment' } },
    { id: 'ap2', actionType: 'delete_course', requesterId: 'Admin 2', payload: { courseId: 'C005', reason: 'Discontinued' } },
  ];

  return (
    <div className="admin-layout">
      <nav className="mb-6">
        <Link href="/admin/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Pending Approvals</h1>

      <p className="text-secondary mb-6">
        Critical business decisions require approval from both Admin accounts.
      </p>

      {approvals.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-muted">No pending approvals.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {approvals.map((approval) => (
            <div key={approval.id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-abyss-teal">
                    {approval.actionType.replace(/_/g, ' ')}
                  </h3>
                  <p className="text-secondary text-sm mt-1">
                    Proposed by: {approval.requesterId}
                  </p>
                </div>
                <span className="badge badge-pending">Pending</span>
              </div>
              <div className="mt-3 text-xs text-muted">
                Payload: {JSON.stringify(approval.payload)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
