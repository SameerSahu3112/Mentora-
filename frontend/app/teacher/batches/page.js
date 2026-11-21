/**
 * Mentora Teacher Batches
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function TeacherBatches() {
  const batches = [
    { id: 'b1', name: 'Rise Batch 1.0', course: 'JEE Main January', startDate: 'Nov 2026', endDate: 'Mar 2027', capacity: 50, status: 'active' },
    { id: 'b2', name: 'Spark Batch 1.0', course: 'JEE Main April', startDate: 'Dec 2026', endDate: 'Apr 2027', capacity: 40, status: 'active' },
  ];

  return (
    <div className="teacher-layout">
      <nav className="mb-6">
        <Link href="/teacher/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Assigned Batches</h1>

      <div className="space-y-4">
        {batches.map((batch) => (
          <div key={batch.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-abyss-teal">{batch.name}</h3>
                <p className="text-secondary text-sm">{batch.course}</p>
              </div>
              <span className={`badge ${batch.status === 'active' ? 'badge-active' : 'badge-pending'}`}>
                {batch.status}
              </span>
            </div>
            <div className="mt-3 text-sm text-secondary grid md:grid-cols-3 gap-2">
              <div>
                <span className="block text-xs font-medium text-muted">Start</span>
                <span className="block">{batch.startDate}</span>
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
  );
}
