/**
 * Mentora Student Portal Layout
 * Phase 10: Frontend Portal Completion
 */

import Link from 'next/link';

export default function StudentLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/student/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-teal-600">Mentora</span>
                <span className="text-sm font-semibold text-gray-600 hidden sm:block">Student Portal</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/student/dashboard" className="text-sm text-gray-600 hover:text-teal-600">
                Dashboard
              </Link>
              <Link href="/student/applications" className="text-sm text-gray-600 hover:text-teal-600">
                Applications
              </Link>
              <Link href="/student/enrollments" className="text-sm text-gray-600 hover:text-teal-600">
                Enrollments
              </Link>
              <Link href="/student/resources" className="text-sm text-gray-600 hover:text-teal-600">
                Resources
              </Link>
              <Link href="/student/mentorship" className="text-sm text-gray-600 hover:text-teal-600">
                Mentorship
              </Link>
              <Link href="/student/notifications" className="text-sm text-gray-600 hover:text-teal-600">
                Notifications
              </Link>
              <Link href="/student/profile" className="text-sm text-gray-600 hover:text-teal-600">
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
