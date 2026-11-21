/**
 * Mentora Admin Students
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function AdminStudents() {
  const students = [
    { id: 's1', studentId: 'MENT-2026-0001', fullName: 'Aarav Sharma', email: 'aarav@example.com', classLevel: '11' },
    { id: 's2', studentId: 'MENT-2026-0002', fullName: 'Priya Patel', email: 'priya@example.com', classLevel: '12' },
  ];

  return (
    <div className="admin-layout">
      <nav className="mb-6">
        <Link href="/admin/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Students</h1>

      <div className="card overflow-hidden">
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
              students.map((student) => (
                <tr key={student.id} className="border-b border-border-color hover:bg-abyss-teal-light">
                  <td className="px-4 py-3 text-sm font-medium text-abyss-teal">{student.studentId}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{student.fullName}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{student.email}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{student.classLevel}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="badge badge-active">Active</span>
                  </td>
                </tr>
              ))}
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
