"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/student/resources`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setResources(data || []))
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
        <nav className="mb-6"><a href="/student/dashboard" className="text-[#0F4C5C] hover:text-[#0F4C5C] text-sm font-medium">← Back to Dashboard</a></nav>
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Learning Resources</h1>
        {resources.length === 0 ? (
          <div className="bg-[#082326] p-8 rounded-lg shadow-sm border border-[#8a9294]/20 text-center">
            <p className="text-muted">No resources available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-[#082326] p-4 rounded-lg shadow-sm border border-[#8a9294]/20">
                <div className="text-2xl mb-2">📄</div>
                <h3 className="text-lg font-semibold text-[#0F4C5C]">{resource.title}</h3>
                <p className="text-secondary text-sm mt-1">{resource.description || 'No description'}</p>
                <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border rounded">
                  {resource.type.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
