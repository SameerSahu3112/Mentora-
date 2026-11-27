"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminAPI } from "@/app/lib/api";

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const loadEnrollments = () => {
    setLoading(true);
    adminAPI
      .getEnrollments()
      .then((data) => setEnrollments(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load enrollments"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  const handleReject = async (id) => {
    setError("");
    setBusyId(id);
    try {
      await adminAPI.rejectEnrollment(id, "Rejected by admin");
      loadEnrollments();
    } catch (err) {
      setError(err.message || "Failed to reject enrollment");
    } finally {
      setBusyId(null);
    }
  };

  const handleCancel = async (id) => {
    setError("");
    setBusyId(id);
    try {
      await adminAPI.cancelEnrollment(id, "Cancelled by admin");
      loadEnrollments();
    } catch (err) {
      setError(err.message || "Failed to cancel enrollment");
    } finally {
      setBusyId(null);
    }
  };

  const statusColors = {
    pending_payment: "bg-[#E9C46A]/20 text-[#E9C46A] border border-[#E9C46A]",
    active: "bg-[#0F4C5C]/20 text-[#E9C46A] border border-[#0F4C5C]",
    expired: "bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]",
    cancelled: "bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]",
    rejected: "bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]",
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
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Enrollments</h1>

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
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Course</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Batch</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Access Until</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-secondary" colSpan="6">
                  No enrollments found.
                </td>
              </tr>
            ) : (
              enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="border-b border-[#8a9294]/20 hover:bg-[#001719]/40">
                  <td className="px-4 py-3 text-sm text-secondary">{enrollment.student_profile_id || "N/A"}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{enrollment.course_id || "N/A"}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{enrollment.batch_id || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        statusColors[enrollment.status] || "bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]"
                      }`}
                    >
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-secondary">{enrollment.access_until || "N/A"}</td>
                  <td className="px-4 py-3 text-sm flex gap-2">
                    {enrollment.status === "pending_payment" && (
                      <button
                        type="button"
                        disabled={busyId === enrollment.id}
                        onClick={() => handleReject(enrollment.id)}
                        className="px-2.5 py-1 rounded bg-[#93000a] text-white text-xs font-semibold disabled:opacity-50"
                      >
                        Reject
                      </button>
                    )}
                    {(enrollment.status === "pending_payment" || enrollment.status === "active") && (
                      <button
                        type="button"
                        disabled={busyId === enrollment.id}
                        onClick={() => handleCancel(enrollment.id)}
                        className="px-2.5 py-1 rounded bg-[#8a9294]/30 text-white text-xs font-semibold disabled:opacity-50"
                      >
                        Cancel
                      </button>
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
