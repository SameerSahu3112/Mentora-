"use client";

import Link from 'next/link';

export default function StudentLayout({ children }) {
  return (
    <main className="min-h-screen bg-[#001719] text-on-surface">
      <nav className="bg-[#001719]/80 backdrop-blur-md border-b border-[#8a9294]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/student/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
                <span className="text-sm font-semibold text-[#E9C46A]">.</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
              <Link href="/student/dashboard" className="hover:text-[#0F4C5C] transition-colors">Dashboard</Link>
              <Link href="/student/applications" className="hover:text-[#0F4C5C] transition-colors">Applications</Link>
              <Link href="/student/enrollments" className="hover:text-[#0F4C5C] transition-colors">Enrollments</Link>
              <Link href="/student/resources" className="hover:text-[#0F4C5C] transition-colors">Resources</Link>
              <Link href="/student/mentorship" className="hover:text-[#0F4C5C] transition-colors">Mentorship</Link>
              <Link href="/student/notifications" className="hover:text-[#0F4C5C] transition-colors">Notifications</Link>
              <Link href="/student/profile" className="hover:text-[#0F4C5C] transition-colors">Profile</Link>
              <a href="/auth/login" className="text-sm text-abyss-teal hover:text-[#0F4C5C] text-secondary hover:text-[#0F4C5C]">
                Sign Out
              </a>
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
