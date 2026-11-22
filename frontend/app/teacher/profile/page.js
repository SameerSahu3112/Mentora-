"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TeacherProfile() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/auth/me`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setTeacher(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse h-32 bg-border-color rounded" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary p-6">
      <div className="max-w-2xl mx-auto">
        <nav className="mb-6">
          <a href="/teacher/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
            ← Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Teacher Profile</h1>

        <div className="bg-primary rounded-lg shadow-sm border border-border-color p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-abyss-teal-light rounded-full flex items-center justify-center text-abyss-teal text-xl font-bold">
              {teacher?.full_name ? teacher.full_name.charAt(0) : 'T'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-abyss-teal">{teacher?.full_name || 'Teacher'}</h2>
              <p className="text-desert-sand-dark font-medium">Teacher</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-secondary mb-1">Email</p>
              <p className="text-secondary">{teacher?.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-secondary mb-1">Role</p>
              <p className="text-secondary capitalize">{teacher?.role || 'teacher'}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-medium text-secondary mb-2">Note:</p>
            <p className="text-secondary text-sm">
              Your phone number is not displayed to students for privacy. Students can contact you through mentorship bookings.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
