"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setAdmin(data))
      .catch(() => setLoading(false));

    fetch(`${API_URL}/admin/enrollments`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setEnrollments(data || []))
      .catch(() => setEnrollments([]))
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total_students: enrollments.length,
    active_enrollments: enrollments.filter(e => e.status === 'active').length,
    pending_applications: enrollments.filter(e => e.status === 'pending_payment').length,
    pending_payments: enrollments.filter(e => e.status === 'pending_payment').length,
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#001719] p-6">
        <div className="max-w-7xl mx-auto"><div className="animate-pulse flex items-center justify-center h-64"><div className="h-8 w-48 bg-[#082326] rounded" /></div></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001719]">
      <nav className="bg-[#001719]/80 shadow border-b border-[#8a9294]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
                <span className="text-sm font-semibold text-[#E9C46A]">.</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
              <span className="text-secondary font-medium">{admin?.full_name || 'Admin'}</span>
              <a href="/auth/login" className="text-sm text-[#0F4C5C] hover:text-[#0F4C5C]">Sign Out</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-sm font-medium text-secondary mb-2">Total Students</h3>
            <p className="text-2xl font-bold text-[#0F4C5C]">{stats.total_students}</p>
          </div>
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-sm font-medium text-secondary mb-2">Active Enrollments</h3>
            <p className="text-2xl font-bold text-[#0F4C5C]">{stats.active_enrollments}</p>
          </div>
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-sm font-medium text-secondary mb-2">Pending Applications</h3>
            <p className="text-2xl font-bold text-[#E9C46A]">{stats.pending_applications}</p>
          </div>
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-sm font-medium text-secondary mb-2">Pending Payments</h3>
            <p className="text-2xl font-bold text-[#0F4C5C]">{stats.pending_payments}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-lg font-semibold text-[#0F4C5C] mb-4">Manage Students</h3>
            <Link href="/admin/students" className="text-[#0F4C5C] font-medium text-sm hover:text-[#D4A357] transition-colors flex items-center gap-1">
              View all students <span className="material-symbols-outlined text-[16px]">arrow_right</span>
            </Link>
          </div>
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-lg font-semibold text-[#0F4C5C] mb-4">Manage Batches</h3>
            <Link href="/admin/batches" className="text-[#0F4C5C] font-medium text-sm hover:text-[#0F4C5C] transition-colors flex items-center gap-1">
              View all batches <span className="material-symbols-outlined text-[16px]">arrow_right</span>
            </Link>
          </div>
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-lg font-semibold text-[#0F4C5C] mb-4">Pending Approvals</h3>
            <Link href="/admin/approvals" className="text-[#0F4C5C] font-medium text-sm hover:text-[#D4A357] transition-colors flex items-center gap-1">
              Review approvals <span className="material-symbols-outlined text-[16px]">arrow_right</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
