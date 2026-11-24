"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TeacherBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/batches/`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setBatches(data || []))
      .catch(() => setBatches([]))
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
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Assigned Batches</h1>

        {batches.length === 0 ? (
          <div className="bg-[#082326] p-8 rounded-lg shadow-sm border border-[#8a9294]/20 text-center">
            <p className="text-muted">No batches assigned to you.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {batches.map((batch) => (
              <div key={batch.id} className="bg-[#082326] p-4 rounded-lg shadow-sm border border-[#8a9294]/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F4C5C]">{batch.name}</h3>
                    <p className="text-secondary text-sm">{batch.course_name || 'Course'}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${batch.status === 'active' ? 'bg-[#E9C46A]/20 text-[#E9C46A]' : 'bg-[#E9C46A]/20 text-[#E9C46A]'}`}>
                    {batch.status}
                  </span>
                </div>
                <div className="mt-3 text-sm text-secondary grid md:grid-cols-3 gap-2">
                  <div>
                    <span className="block text-xs font-medium text-muted">Start</span>
                    <span className="block">{batch.start_date}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-muted">End</span>
                    <span className="block">{batch.endDate}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-muted">Capacity</span>
                    <span className="block">{batch.capacity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
