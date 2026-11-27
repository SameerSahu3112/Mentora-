"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminAPI } from "@/app/lib/api";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const loadPayments = () => {
    setLoading(true);
    adminAPI
      .getPayments()
      .then((data) => setPayments(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load payments"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const handleVerify = async (id) => {
    setError("");
    setBusyId(id);
    try {
      await adminAPI.verifyPayment(id);
      loadPayments();
    } catch (err) {
      setError(err.message || "Failed to verify payment");
    } finally {
      setBusyId(null);
    }
  };

  const statusColors = {
    recorded: "bg-[#E9C46A]/20 text-[#E9C46A] border border-[#E9C46A]",
    verified: "bg-[#0F4C5C]/20 text-[#E9C46A] border border-[#0F4C5C]",
    failed: "bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]",
    refunded: "bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]",
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
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Payments</h1>

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
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Amount</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Method</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Date</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-secondary">
                  No payments found.
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id} className="border-b border-[#8a9294]/20 hover:bg-[#001719]/40">
                  <td className="px-4 py-3 text-sm text-secondary">{payment.student_profile_id || "N/A"}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#E9C46A]">₹{payment.final_amount}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{payment.payment_method || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        statusColors[payment.status] || "bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-secondary">
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {payment.status === "recorded" && (
                      <button
                        type="button"
                        disabled={busyId === payment.id}
                        onClick={() => handleVerify(payment.id)}
                        className="px-2.5 py-1 rounded bg-[#0F4C5C] text-white text-xs font-semibold hover:bg-[#E9C46A] hover:text-[#00363d] disabled:opacity-50"
                      >
                        Verify
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
