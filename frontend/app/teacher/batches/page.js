/**
 * Mentora Teacher Batches
 * Brand: Abyss Teal + Desert Sand
 */

import { useEffect, useState } from 'react';

export default function TeacherBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/batches/`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setBatches(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse h-32 bg-border-color rounded" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <a href="/teacher/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm">
            ← Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Assigned Batches</h1>

        {batches.length === 0 ? (
          <div className="bg-primary p-8 rounded-lg shadow-sm border border-border-color text-center">
            <p className="text-muted">No batches assigned to you.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {batches.map((batch) => (
              <div key={batch.id} className="bg-primary p-4 rounded-lg shadow-sm border border-border-color">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-abyss-teal">{batch.name}</h3>
                    <p className="text-secondary text-sm">{batch.course_name || 'Course'}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    batch.status === 'active'
                      ? 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal'
                      : 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border'
                  }`}>
                    {batch.status}
                  </span>
                </div>
                <div className="mt-3 text-sm text-secondary grid grid-cols-2 gap-2">
                  <div>
                    <span className="block text-xs font-medium text-muted">Start</span>
                    <span className="block">{batch.start_date}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-muted">End</span>
                    <span className="block">{batch.end_date}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-muted">Capacity</span>
                    <span className="block">{batch.max_capacity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
