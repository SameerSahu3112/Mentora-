"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_students: 0,
    active_enrollments: 0,
    pending_applications: 0,
    pending_payments: 0,
  });
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    async function loadStats() {
      try {
        const [usersRes, enrollRes] = await Promise.all([
          fetch(`${API_URL}/admin/users/`, { credentials: 'include' }),
          fetch(`${API_URL}/enrollments/student/enrollments`, { credentials: 'include' }),
        ]);
        const users = await usersRes.json();
        const enrollData = await enrollRes.json();
        setUsers(users || []);
        setEnrollments(enrollData || []);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <main className="min-h-screen bg-[#001719] text-on-surface">
      <nav className="bg-[#001719]/80 shadow border-b border-[#8a9294]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
                <span className="text-sm font-semibold text-[#E9C46A]">.</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface">
              <Link href="/admin/dashboard" className="hover:text-[#0F4C5C] transition-colors">Dashboard</Link>
              <Link href="/admin/students" className="hover:text-[#0F4C5C] transition-colors">Students</Link>
              <Link href="/admin/teachers" className="hover:text-[#0F4C5C] transition-colors">Teachers</Link>
              <Link href="/admin/courses" className="hover:text-[#0F4C5C] transition-colors">Courses</Link>
              <Link href="/admin/batches" className="hover:text-[#0F4C5C] transition-colors">Batches</Link>
              <Link href="/admin/applications" className="hover:text-[#0F4C5C] transition-colors">Applications</Link>
              <Link href="/admin/enrollments" className="hover:text-[#0F4C5C] transition-colors">Enrollments</Link>
              <Link href="/admin/payments" className="hover:text-[#0F4C5C] transition-colors">Payments</Link>
              <Link href="/admin/resources" className="hover:text-[#0F4C5C] transition-colors">Resources</Link>
              <Link href="/admin/mentorship" className="hover:text-[#0F4C5C] transition-colors">Mentorship</Link>
              <Link href="/admin/approvals" className="hover:text-[#0F4C5C] transition-colors">Approvals</Link>
              <Link href="/admin/audit-logs" className="hover:text-[#0F4C5C] transition-colors">Audit Logs</Link>
              <Link href="/admin/settings" className="hover:text-[#0F4C5C] transition-colors">Settings</Link>
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
            </a>
          </div>
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-lg font-semibold text-[#0F4C5C] mb-4">Manage Batches</h3>
            <Link href="/admin/batches" className="text-[#0F4C5C] font-medium text-sm hover:text-[#0F4C5C] transition-colors flex items-center gap-1">
              View all batches <span className="material-symbols-outlined text-[16px]">arrow_right</span>
            </a>
          </div>
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-lg font-semibold text-[#0F4C5C] mb-4">Pending Approvals</h3>
            <a href="/admin/approvals" className="text-[#0F4C5C] font-medium text-sm hover:text-[#D4A357] transition-colors flex items-center gap-1">
              Review approvals <span className="material-symbols-outlined text-[16px]">arrow_right</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
