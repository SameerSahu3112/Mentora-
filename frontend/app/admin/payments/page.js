"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/admin/payments`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setPayments(data))
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
      <main className="min-h-screen bg-gray-50 p-6">
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
            &larr; Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Payments</h1>

        <div className="bg-primary rounded-lg shadow-sm border border-border-color overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-desert-sand-light border-b border-border-color">
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Student</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Amount</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Method</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-muted">
                    No payments found.
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-border-color hover:bg-abyss-teal-light">
                    <td className="px-4 py-3 text-sm text-secondary">{payment.student_profile_id || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm font-medium text-abyss-teal">₹{payment.final_amount}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{payment.payment_method || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[payment.status] || 'bg-border-color text-secondary border border-border-color'}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary">{new Date(payment.payment_date).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
