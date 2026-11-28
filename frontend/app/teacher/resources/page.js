"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TeacherResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

  useEffect(() => {
    fetch(`${API_URL}/resources/teacher/resources`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setResources(data || []))
      .catch(() => setResources([]))
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
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">My Resources</h1>

        <div className="flex justify-between items-center mb-4">
          <button className="btn-primary">Create Resource</button>
        </div>

        {resources.length === 0 ? (
          <div className="bg-[#082326] p-8 rounded-lg shadow-sm border border-[#8a9294]/20 text-center">
            <p className="text-muted">No resources yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-[#082326] p-3 rounded-lg shadow-sm border border-[#8a9294]/20 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-[#0F4C5C]">{resource.title}</h3>
                  <p className="text-xs text-secondary">{resource.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${resource.isPublished ? 'bg-[#E9C46A]/20 text-[#E9C46A]' : 'bg-[#E9C46A]/20 text-[#E9C46A]'}`}>
                  {resource.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
