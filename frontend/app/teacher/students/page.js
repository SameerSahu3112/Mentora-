/**
 * Mentora Teacher Students
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function TeacherStudents() {
  return (
    <div className="teacher-layout">
      <nav className="mb-6">
        <Link href="/teacher/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Students</h1>

      <div className="card">
        <p className="text-secondary">
          Student lists will appear here based on your assigned batches. For privacy, student contact details are not visible to teachers.
        </p>
      </div>
    </div>
  );
}
