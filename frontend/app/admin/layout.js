/**
 * Mentora Admin Portal Layout
 * Phase 10: Frontend Portal Completion
 */

import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-teal-600">Mentora</span>
                <span className="text-sm font-semibold text-gray-600 hidden sm:block">Admin Portal</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-sm text-gray-600 hover:text-teal-600">
                Dashboard
              </Link>
              <Link href="/admin/students" className="text-sm text-gray-600 hover:text-teal-600">
                Students
              </Link>
              <Link href="/admin/teachers" className="text-sm text-gray-600 hover:text-teal-600">
                Teachers
              </Link>
              <Link href="/admin/courses" className="text-sm text-gray-600 hover:text-teal-600">
                Courses
              </Link>
              <Link href="/admin/batches" className="text-sm text-gray-600 hover:text-teal-600">
                Batches
              </Link>
              <Link href="/admin/applications" className="text-sm text-gray-600 hover:text-teal-600">
                Applications
              </Link>
              <Link href="/admin/enrollments" className="text-sm text-gray-600 hover:text-teal-600">
                Enrollments
              </Link>
              <Link href="/admin/payments" className="text-sm text-gray-600 hover:text-teal-600">
                Payments
              </Link>
              <Link href="/admin/resources" className="text-sm text-gray-600 hover:text-teal-600">
                Resources
              </Link>
              <Link href="/admin/mentorship" className="text-sm text-gray-600 hover:text-teal-600">
                Mentorship
              </Link>
              <Link href="/admin/approvals" className="text-sm text-gray-600 hover:text-teal-600">
                Approvals
              </Link>
              <Link href="/admin/audit-logs" className="text-sm text-gray-600 hover:text-teal-600">
                Audit Logs
              </Link>
              <Link href="/admin/settings" className="text-sm text-gray-600 hover:text-teal-600">
                Settings
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
