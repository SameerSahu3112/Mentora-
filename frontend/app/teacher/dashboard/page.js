"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/auth/me`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setTeacher(data))
      .catch(() => setLoading(false));

    fetch(`${API_URL}/api/v1/batches/`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setBatches(data))
      .catch(() => setBatches([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
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
              <Link href="/teacher/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-abyss-teal">Mentora</span>
                <span className="text-sm font-semibold text-secondary hidden sm:block">Teacher Portal</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-secondary font-medium">{teacher?.full_name || 'Teacher'}</span>
              <a href="/auth/login" className="text-sm text-abyss-teal hover:text-abyss-teal-dark">
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Teacher Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
            <h3 className="text-sm font-medium text-secondary mb-2">Assigned Batches</h3>
            <p className="text-2xl font-bold text-abyss-teal">{batches.length}</p>
          </div>
          <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
            <h3 className="text-sm font-medium text-secondary mb-2">Resources Created</h3>
            <p className="text-2xl font-bold text-abyss-teal">0</p>
          </div>
          <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
            <h3 className="text-sm font-medium text-secondary mb-2">Pending Bookings</h3>
            <p className="text-2xl font-bold text-desert-sand-dark">0</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-abyss-teal mb-4">Your Assigned Batches</h2>
          {batches.length === 0 ? (
            <p className="text-muted">No batches assigned yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {batches.map((batch) => (
                <div key={batch.id} className="bg-primary p-4 rounded-lg shadow-sm border border-border-color">
                  <h3 className="text-lg font-semibold text-abyss-teal">{batch.name}</h3>
                  <p className="text-secondary text-sm mt-1">{batch.course_name || 'Course'}</p>
                  <p className="text-secondary text-sm">Capacity: {batch.capacity}</td>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${batch.status === 'active' ? 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal' : 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border'}`}>
                    {batch.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
