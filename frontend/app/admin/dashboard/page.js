/**
 * Mentora Admin Dashboard
 * Brand: Abyss Teal + Desert Sand
 */

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    total_students: 0,
    active_enrollments: 0,
    pending_applications: 0,
    pending_payments: 0,
  });
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/auth/me`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setAdmin(data))
      .catch(() => setLoading(false));

    fetch(`${API_URL}/api/v1/admin/dashboard`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setStats({ total_students: 0, active_enrollments: 0, pending_applications: 0, pending_payments: 0 }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse flex items-center justify-center h-64">
            <div className="h-8 w-48 bg-border-color rounded" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary">
      <nav className="bg-primary shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-abyss-teal">Mentora</span>
                <span className="text-sm font-semibold text-secondary hidden sm:block">Admin Portal</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-secondary font-medium">{admin?.full_name || 'Admin'}</span>
              <a href="/auth/login" className="text-sm text-abyss-teal hover:text-abyss-teal-dark">
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
            <h3 className="text-sm font-medium text-secondary mb-2">Total Students</h3>
            <p className="text-2xl font-bold text-abyss-teal">{stats.total_students}</p>
          </div>
          <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
            <h3 className="text-sm font-medium text-secondary mb-2">Active Enrollments</h3>
            <p className="text-2xl font-bold text-abyss-teal">{stats.active_enrollments}</p>
          </div>
          <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
            <h3 className="text-sm font-medium text-secondary mb-2">Pending Applications</h3>
            <p className="text-2xl font-bold text-desert-sand-dark">{stats.pending_applications}</p>
          </div>
          <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
            <h3 className="text-sm font-medium text-secondary mb-2">Pending Payments</h3>
            <p className="text-2xl font-bold text-abyss-teal">{stats.pending_payments}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
            <h3 className="text-lg font-semibold text-abyss-teal mb-4">Manage Students</h3>
            <a href="/admin/students" className="text-abyss-teal font-medium text-sm hover:text-abyss-teal-dark">
              View all students →
            </a>
          </div>
          <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
            <h3 className="text-lg font-semibold text-abyss-teal mb-4">Manage Batches</h3>
            <a href="/admin/batches" className="text-abyss-teal font-medium text-sm hover:text-abyss-teal-dark">
              View all batches →
            </a>
          </div>
          <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
            <h3 className="text-lg font-semibold text-abyss-teal mb-4">Pending Approvals</h3>
            <a href="/admin/approvals" className="text-abyss-teal font-medium text-sm hover:text-abyss-teal-dark">
              Review approvals →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

import Link from 'next/link';
