/**
 * Mentora Admin Students
 * Brand: Abyss Teal + Desert Sand
 */

import { useEffect, useState } from 'react';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/admin/users`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setStudents(data || []))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary p-6">
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
            ← Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Students</h1>

        <div className="bg-primary rounded-lg shadow-sm border border-border-color overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-desert-sand-light border-b border-border-color">
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Student ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Email</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Class</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-muted">
                    No students found.
                  </td>
                </tr>
              ) : (
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-border-color hover:bg-abyss-teal-light">
                    <td className="px-4 py-3 text-sm font-medium text-abyss-teal">
                      {student.student_id || student.id.slice(-6)}
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary">
                      {student.full_name || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary">
                      {student.email || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary">
                      {student.class_level || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 text-xs font-semibold bg-abyss-teal-light text-abyss-teal border border-abyss-teal rounded">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
