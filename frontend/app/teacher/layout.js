/**
 * Mentora Teacher Portal Layout
 * Phase 10: Frontend Portal Completion
 */

import Link from 'next/link';

export default function TeacherLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/teacher/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-teal-600">Mentora</span>
                <span className="text-sm font-semibold text-gray-600 hidden sm:block">Teacher Portal</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/teacher/dashboard" className="text-sm text-gray-600 hover:text-teal-600">
                Dashboard
              </Link>
              <Link href="/teacher/batches" className="text-sm text-gray-600 hover:text-teal-600">
                Batches
              </Link>
              <Link href="/teacher/students" className="text-sm text-gray-600 hover:text-teal-600">
                Students
              </Link>
              <Link href="/teacher/resources" className="text-sm text-gray-600 hover:text-teal-600">
                Resources
              </Link>
              <Link href="/teacher/mentorship" className="text-sm text-gray-600 hover:text-teal-600">
                Mentorship
              </Link>
              <Link href="/teacher/attendance" className="text-sm text-gray-600 hover:text-teal-600">
                Attendance
              </Link>
              <Link href="/teacher/profile" className="text-sm text-gray-600 hover:text-teal-600">
                Profile
              </Link>
              <a href="/auth/login" className="text-sm text-teal-600 hover:text-teal-500">
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
