"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TeacherStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/admin/students`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setStudents(data || []))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#001719] p-6">
        <div className="max-w-4xl mx-auto"><div className="animate-pulse h-32 bg-[#082326] rounded" /></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001719] p-6">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6"><a href="/teacher/dashboard" className="text-[#0F4C5C] hover:text-[#0F4C5C] text-sm font-medium">← Back to Dashboard</a></nav>
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Students</h1>
        <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
          <p className="text-secondary">Student lists will appear here based on your assigned batches. For privacy, student contact details are not visible to teachers.</p>
        </div>
      </div>
    </main>
  );
}
