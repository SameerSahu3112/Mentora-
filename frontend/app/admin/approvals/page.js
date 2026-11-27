"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminAPI } from "@/app/lib/api";

export default function AdminApprovals() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const loadApprovals = () => {
    setLoading(true);
    adminAPI
      .getApprovals()
      .then((data) => setApprovals(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load approvals"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadApprovals();
  }, []);

  const handleVote = async (id, vote) => {
    setError("");
    setBusyId(id);
    try {
      await adminAPI.voteApproval(id, { vote });
      loadApprovals();
    } catch (err) {
      setError(err.message || "Failed to submit vote");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return <div className="animate-pulse h-32 bg-[#082326] rounded" />;
  }

  return (
    <div>
      <nav className="mb-6">
        <Link href="/admin/dashboard" className="text-[#0F4C5C] hover:text-[#E9C46A] text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-2">Pending Approvals</h1>
      <p className="text-secondary mb-6">
        Critical business decisions require approval from both Admin accounts.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] text-sm">
          {error}
        </div>
      )}

      {approvals.length === 0 ? (
        <div className="bg-[#082326] p-8 rounded-lg shadow-sm border border-[#8a9294]/20 text-center">
          <p className="text-secondary">No pending approvals.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {approvals.map((approval) => (
            <div key={approval.id} className="bg-[#082326] p-4 rounded-lg shadow-sm border border-[#8a9294]/20">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#E9C46A]">
                    {(approval.action_type || "").replace(/_/g, " ")}
                  </h3>
                  <p className="text-secondary text-sm mt-1">
                    Proposed by: {approval.requester_id || "Admin"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={busyId === approval.id}
                    onClick={() => handleVote(approval.id, "approve")}
                    className="px-3 py-1.5 rounded bg-[#0F4C5C] text-white text-xs font-semibold hover:bg-[#E9C46A] hover:text-[#00363d] disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    disabled={busyId === approval.id}
                    onClick={() => handleVote(approval.id, "reject")}
                    className="px-3 py-1.5 rounded bg-[#93000a] text-white text-xs font-semibold disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
              <div className="mt-3 text-xs text-[#8a9294]">
                Payload: {JSON.stringify(approval.payload_snapshot || {})}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
