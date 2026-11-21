/**
 * Mentora Teacher Dashboard
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function TeacherDashboard() {
  const batches = [
    { id: 'b1', name: 'Rise Batch 1.0', course: 'JEE Main January', capacity: 50, status: 'active' },
    { id: 'b2', name: 'Spark Batch 1.0', course: 'JEE Main April', capacity: 40, status: 'active' },
  ];

  return (
    <div className="teacher-layout">
      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Teacher Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-sm font-medium text-secondary mb-2">Assigned Batches</h3>
          <p className="text-2xl font-bold text-abyss-teal">{batches.length}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-secondary mb-2">Resources Created</h3>
          <p className="text-2xl font-bold text-abyss-teal">0</p>
        </div>
        <div className="card">
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
              <div key={batch.id} className="card">
                <h3 className="text-lg font-semibold text-abyss-teal">{batch.name}</h3>
                <p className="text-secondary text-sm mt-1">{batch.course}</p>
                <p className="text-secondary text-sm">Capacity: {batch.capacity}</p>
                <span className={`badge ${batch.status === 'active' ? 'badge-active' : 'badge-pending'}`}>
                  {batch.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
