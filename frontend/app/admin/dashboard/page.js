/**
 * Mentora Admin Dashboard
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function AdminDashboard() {
  const stats = {
    totalStudents: 150,
    activeEnrollments: 89,
    pendingApplications: 12,
    pendingPayments: 5,
  };

  return (
    <div className="admin-layout">
      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <h3 className="text-sm font-medium text-secondary mb-2">Total Students</h3>
          <p className="text-2xl font-bold text-abyss-teal">{stats.totalStudents}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-secondary mb-2">Active Enrollments</h3>
          <p className="text-2xl font-bold text-abyss-teal">{stats.activeEnrollments}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-secondary mb-2">Pending Applications</h3>
          <p className="text-2xl font-bold text-desert-sand-dark">{stats.pendingApplications}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-secondary mb-2">Pending Payments</h3>
          <p className="text-2xl font-bold text-abyss-teal">{stats.pendingPayments}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-abyss-teal mb-4">Manage Students</h3>
          <Link href="/admin/students" className="text-abyss-teal font-medium text-sm hover:text-abyss-teal-dark">
            View all students →
          </Link>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-abyss-teal mb-4">Manage Batches</h3>
          <Link href="/admin/batches" className="text-abyss-teal font-medium text-sm hover:text-abyss-teal-dark">
            View all batches →
          </Link>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-abyss-teal mb-4">Pending Approvals</h3>
          <Link href="/admin/approvals" className="text-abyss-teal font-medium text-sm hover:text-abyss-teal-dark">
            Review approvals →
          </Link>
        </div>
      </div>
    </div>
  );
}
