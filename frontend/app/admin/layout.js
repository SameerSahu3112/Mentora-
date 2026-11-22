"use client";

import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <nav className="bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-display font-bold text-secondary">Mentora</span>
                <span className="text-sm font-semibold text-tertiary">.</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface-variant hidden md:flex">
              <Link href="/admin/dashboard" className="hover:text-secondary transition-colors">Dashboard</Link>
              <Link href="/admin/students" className="hover:text-secondary transition-colors">Students</Link>
              <Link href="/admin/teachers" className="hover:text-secondary transition-colors">Teachers</Link>
              <Link href="/admin/courses" className="hover:text-secondary transition-colors">Courses</Link>
              <Link href="/admin/batches" className="hover:text-secondary transition-colors">Batches</Link>
              <Link href="/admin/applications" className="hover:text-secondary transition-colors">Applications</Link>
              <Link href="/admin/enrollments" className="hover:text-secondary transition-colors">Enrollments</Link>
              <Link href="/admin/payments" className="hover:text-secondary transition-colors">Payments</Link>
              <Link href="/admin/resources" className="hover:text-secondary transition-colors">Resources</Link>
              <Link href="/admin/mentorship" className="hover:text-secondary transition-colors">Mentorship</Link>
              <Link href="/admin/approvals" className="hover:text-secondary transition-colors">Approvals</Link>
              <Link href="/admin/audit-logs" className="hover:text-secondary transition-colors">Audit Logs</Link>
              <Link href="/admin/settings" className="hover:text-secondary transition-colors">Settings</Link>
              <a href="/auth/login" className="text-sm text-tertiary hover:text-secondary">Sign Out</a>
            </div>
            <div className="md:hidden">
              <button className="text-on-surface-variant">☰</button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </main>
  );
}
