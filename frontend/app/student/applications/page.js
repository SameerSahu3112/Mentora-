"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/student/applications`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setApplications(data || []))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, []);

  const statusColors = {
    pending: 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border',
    approved: 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal',
    rejected: 'bg-error-light text-error border border-error',
    cancelled: 'bg-border-color text-secondary border border-border-color',
  };

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
        <nav className="mb-6"><a href="/student/dashboard" className="text-[#0F4C5C] hover:text-[#0F4C5C] text-sm font-medium">← Back to Dashboard</a></nav>
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Your Applications</h1>

        {applications.length === 0 ? (
          <div className="bg-[#082326] p-8 rounded-lg shadow-sm border border-[#8a9294]/20 text-center">
            <p className="text-muted">No applications yet.</p>
            <Link href="/courses" className="mt-4 inline-block text-[#0F4C5C] font-medium hover:text-[#D4A357] transition-colors">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-[#082326] p-4 rounded-lg shadow-sm border border-[#8a9294]/20">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F4C5C]">Application #{app.id.slice(-6)}</h3>
                    <p className="text-secondary text-sm">{app.batch_id || 'N/A'}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[app.status] || 'bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]'}`}>
                    {app.status}
                  </span>
                </div>
                <div className="mt-3 grid md:grid-cols-4 gap-2 text-sm text-secondary">
                  <div>
                    <span className="block text-xs font-medium text-muted">Applied</span>
                    <span className="block">{new Date(app.applied_at).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-muted">Intro Call</span>
                    <span className="block text-[#0F4C5C]">{app.intro_status}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-muted">Deadline</span>
                    <span className="block">{new Date(app.intro_deadline_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-[#0F4C5C] italic">Thank you for registering with Mentora! Our team will contact you soon for your introductory session.</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
