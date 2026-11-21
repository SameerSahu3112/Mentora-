"use client";
/**
 * Mentora Admin Batches
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function AdminBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
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
          <div className="animate-pulse h-32 bg-border-color rounded" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6">
          <a href="/admin/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm">
            &larr; Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Batches</h1>

        <div className="bg-primary rounded-lg shadow-sm border border-border-color overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-desert-sand-light border-b border-border-color">
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Batch Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Course</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Capacity</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Dates</th>
              </tr>
            </thead>
            <tbody>
              {batches.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-muted">
                    No batches found.
                  </td>
                </tr>
              ) : (
                batches.map((batch) => (
                  <tr key={batch.id} className="border-b border-border-color hover:bg-abyss-teal-light">
                    <td className="px-4 py-3 text-sm font-medium text-abyss-teal">{batch.name}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{batch.course_name || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{batch.capacity}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${batch.status === 'active' ? 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal' : 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border'}`}>
                        {batch.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary">{batch.startDate} to {batch.endDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
