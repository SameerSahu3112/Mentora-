"use client";

import Link from 'next/link';

export default function TeacherLayout({ children }) {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <nav className="bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/teacher/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-display font-bold text-secondary">Mentora</span>
                <span className="text-sm font-semibold text-tertiary">.</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface-variant hidden md:flex">
              <Link href="/teacher/dashboard" className="hover:text-secondary transition-colors">Dashboard</Link>
              <Link href="/teacher/batches" className="hover:text-secondary transition-colors">Batches</Link>
              <Link href="/teacher/students" className="hover:text-secondary transition-colors">Students</Link>
              <Link href="/teacher/resources" className="hover:text-secondary transition-colors">Resources</Link>
              <Link href="/teacher/mentorship" className="hover:text-secondary transition-colors">Mentorship</Link>
              <Link href="/teacher/attendance" className="hover:text-secondary transition-colors">Attendance</Link>
              <Link href="/teacher/profile" className="hover:text-secondary transition-colors">Profile</Link>
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
