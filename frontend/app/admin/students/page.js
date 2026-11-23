"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminStudents() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/admin/users/`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUsers(data || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#001719] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse h-32 bg-[#082326] rounded" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001719] p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6">
          <a href="/admin/dashboard" className="text-[#0F4C5C] hover:text-[#0F4C5C] text-sm font-medium">← Back to Dashboard</a>
        </nav>
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Students</h1>

        <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
                <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Student ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Email</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Class</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="5" className="px-4 py-6 text-center text-secondary">No students found.</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-[#8a9294]/20 hover:bg-[#082326]/50">
                    <td className="px-4 py-3 text-sm font-medium text-[#0F4C5C]">{user.student_id || user.id.slice(-6)}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{user.full_name || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{user.email || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{user.class_level || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm"><span className="px-2 py-1 rounded bg-[#E9C46A]/20 text-[#E9C46A] font-label-sm text-label-sm font-bold">Active</span></td>
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
