"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/admin/payments`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setPayments(data || []))
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, []);

  const statusColors = {
    recorded: 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border',
    verified: 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal',
    failed: 'bg-error-light text-error border border-error',
    refunded: 'bg-border-color text-secondary border border-border-color',
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
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Payments</h1>
        <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-hidden">
          <table className="w-full text-left">
            <thead><tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Student</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Amount</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Method</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Date</th>
            </tr></thead>
            <tbody>
              {payments.length === 0 ? (
                <tr><td colSpan="5" className="px-4 py-6 text-center text-secondary">No payments found.</td></tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-[#8a9294]/20 hover:bg-[#082326]/50">
                    <td className="px-4 py-3 text-sm text-secondary">{payment.student_profile_id || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm font-medium text-[#0F4C5C]">₹{payment.final_amount}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{payment.payment_method || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm"><span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[payment.status] || 'bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]'`}}>{payment.status}</span></td>
                    <td className="px-4 py-3 text-sm text-secondary">{new Date(payment.payment_date).toLocaleDateString()}</td>
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
