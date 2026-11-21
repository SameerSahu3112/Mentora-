/**
 * Mentora Teacher Attendance
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function TeacherAttendance() {
  return (
    <div className="teacher-layout">
      <nav className="mb-6">
        <Link href="/teacher/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Attendance</h1>

      <div className="card">
        <p className="text-secondary">
          Attendance marking will be available for your assigned weekly sessions.
        </p>
      </div>
    </div>
  );
}
