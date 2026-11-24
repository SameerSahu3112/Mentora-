"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/auth/me`, { credentials: 'include' }),
      fetch(`${API_URL}/batches/`, { credentials: 'include' }),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([teacher, batches]) => {
        setTeacher(teacher);
        setBatches(batches || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#001719] p-6">
        <div className="max-w-7xl mx-auto"><div className="animate-pulse flex items-center justify-center h-64"><div className="h-8 w-48 bg-[#082326] rounded" /></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001719] text-on-surface">
      <nav className="bg-[#001719]/80 shadow border-b border-[#8a9294]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/teacher/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
                <span className="text-sm font-semibold text-[#E9C46A]">.</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface">
              <span className="text-secondary font-medium">{teacher?.full_name || 'Teacher'}</span>
              <a href="/auth/login" className="text-sm text-[#0F4C5C] hover:text-[#0F4C5C]">Sign Out</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Teacher Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-sm font-medium text-secondary mb-2">Assigned Batches</h3>
            <p className="text-2xl font-bold text-[#0F4C5C]">{batches.length}</p>
          </div>
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-sm font-medium text-secondary mb-2">Resources Created</h3>
            <p className="text-2xl font-bold text-[#0F4C5C]">0</p>
          </div>
          <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
            <h3 className="text-sm font-medium text-secondary mb-2">Pending Bookings</h3>
            <p className="text-2xl font-bold text-[#E9C46A]">0</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#0F4C5C] mb-4">Your Assigned Batches</h2>
          {batches.length === 0 ? (
            <p className="text-secondary">No batches assigned yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {batches.map((batch) => (
                <div key={batch.id} className="bg-[#082326] p-4 rounded-lg shadow-sm border border-[#8a9294]/20">
                  <h3 className="text-lg font-semibold text-[#0F4C5C]">{batch.name}</h3>
                  <p className="text-secondary text-sm mt-1">{batch.course_name || 'Course'}</p>
                  <p className="text-secondary text-sm">Capacity: {batch.capacity}</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${batch.status === 'active' ? 'bg-[#E9C46A]/20 text-[#E9C46A]' : 'bg-[#E9C46A]/20 text-[#E9C46A]'}`}>{batch.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
