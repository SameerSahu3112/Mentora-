"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#001719] p-6">
        <div className="max-w-2xl mx-auto"><div className="animate-pulse h-32 bg-[#082326] rounded" /></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001719] p-6">
      <div className="max-w-2xl mx-auto">
        <nav className="mb-6"><a href="/student/dashboard" className="text-[#0F4C5C] hover:text-[#0F4C5C] text-sm font-medium">← Back to Dashboard</a></nav>
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">My Profile</h1>

        <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#0F4C5C]/20 rounded-full flex items-center justify-center text-[#0F4C5C] text-xl font-bold">
              {profile?.full_name ? profile.full_name.charAt(0) : 'S'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0F4C5C]">{profile?.full_name || 'Student'}</h2>
              <p className="text-desert-sand-dark font-medium">Student ID: {profile?.student_id || 'N/A'}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-secondary mb-1">Email</p>
              <p className="text-secondary">{profile?.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-secondary mb-1">Class</p>
              <p className="text-secondary">{profile?.class_level || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-secondary mb-1">Phone</p>
              <p className="text-secondary">{profile?.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-secondary mb-1">School</p>
              <p className="text-secondary">{profile?.school_name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-secondary mb-1">Role</p>
              <p className="text-secondary capitalize">{profile?.role || 'student'}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
