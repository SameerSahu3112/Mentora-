"use client";

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#001719] text-on-surface">
      <nav className="bg-[#001719]/80 shadow border-b border-[#8a9294]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
              <span className="text-sm font-semibold text-[#E9C46A]">.</span>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium text-on-surface-variant">
              <Link href="/courses" className="hover:text-[#0F4C5C] transition-colors">Courses</Link>
              <Link href="/about" className="hover:text-[#0F4C5C] transition-colors">About</th>
              <Link href="/contact" className="hover:text-[#0F4C5C] transition-colors">Contact</th>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface">
              <a href="/auth/login" className="hover:text-[#0F4C5C] transition-colors">
                Login
              </a>
              <Link href="/auth/signup" className="bg-[#E9C46A] text-[#00363d] px-4 py-2 rounded font-medium hover:bg-[#D4A357] transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0F4C5C]">Mentora</h1>
          <p className="text-lg text-secondary mt-2">
            JEE preparation platform helping students discover courses, apply for batches, and access learning resources with mentorship.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 p-6">
            <h3 className="text-lg font-bold text-[#0F4C5C] mb-4">Courses</h3>
            <p className="text-secondary text-sm">Browse available courses and batches</p>
            <Link href="/courses" className="mt-4 inline-block text-[#0F4C5C] font-medium text-sm hover:text-[#D4A357]">
              Browse Courses &rarr;
            </Link>
          </div>
          <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 p-6">
            <h3 className="text-lg font-bold text-[#0F4C5C] mb-4">Student Portal</h3>
            <p className="text-secondary text-sm">Access your enrollments, resources, and mentorship</p>
            <Link href="/student/dashboard" className="mt-4 inline-block text-[#0F4C5C] font-medium text-sm hover:text-[#D4A357] transition-colors">
              Student Portal <span className="material-symbols-outlined text-[16px]">arrow_right</span>
            </Link>
          </div>
          <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 p-6">
            <h3 className="text-lg font-bold text-[#0F4C5C] mb-4">Teacher Portal</h3>
            <p className="text-secondary text-sm">Manage batches, students, and resources</p>
            <Link href="/teacher/dashboard" className="mt-4 inline-block text-[#0F4C5C] font-medium text-sm hover:text-[#D4A357] transition-colors">
              Teacher Portal <span className="material-symbols-outlined text-[16px]">arrow_right</span>
            </Link>
          </div>
          <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 p-6">
            <h3 className="text-lg font-bold text-[#0F4C5C] mb-4">Admin Portal</h3>
            <p className="text-secondary text-sm">Admin dashboard for platform management</p>
            <Link href="/admin/dashboard" className="mt-4 inline-block text-[#0F4C5C] font-medium text-sm hover:text-[#D4A357] transition-colors">
              Admin Portal <span className="material-symbols-outlined text-[16px]">arrow_right</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
