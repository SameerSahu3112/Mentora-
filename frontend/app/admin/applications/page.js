"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminAPI } from "@/app/lib/api";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const loadApplications = () => {
    setLoading(true);
    adminAPI
      .getApplications()
      .then((data) => setApplications(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load applications"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleDecision = async (id, status) => {
    setError("");
    setBusyId(id);
    try {
      await adminAPI.decideApplication(id, { status });
      loadApplications();
    } catch (err) {
      setError(err.message || "Failed to update application");
    } finally {
      setBusyId(null);
    }
  };

  const statusColors = {
    pending: "bg-[#E9C46A]/20 text-[#E9C46A] border border-[#E9C46A]",
    approved: "bg-[#0F4C5C]/20 text-[#E9C46A] border border-[#0F4C5C]",
    rejected: "bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]",
    cancelled: "bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]",
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
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Applications</h1>

      {error && (
        <div className="mb-4 p-3 rounded bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] text-sm">
          {error}
        </div>
      )}

      <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Student</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Batch</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Applied</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-secondary">
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id} className="border-b border-[#8a9294]/20 hover:bg-[#001719]/40">
                  <td className="px-4 py-3 text-sm text-secondary">{app.student_profile_id || "N/A"}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{app.batch_id || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        statusColors[app.status] || "bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-secondary">
                    {new Date(app.applied_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm flex gap-2">
                    {app.status === "pending" && (
                      <>
                        <button
                          type="button"
                          disabled={busyId === app.id}
                          onClick={() => handleDecision(app.id, "approved")}
                          className="px-2.5 py-1 rounded bg-[#0F4C5C] text-white text-xs font-semibold hover:bg-[#E9C46A] hover:text-[#00363d] disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          disabled={busyId === app.id}
                          onClick={() => handleDecision(app.id, "rejected")}
                          className="px-2.5 py-1 rounded bg-[#93000a] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
