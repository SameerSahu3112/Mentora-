"use client";

import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#001719] text-on-surface">
      <nav className="bg-[#001719]/80 shadow border-b border-[#8a9294]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
                <span className="text-sm font-semibold text-[#E9C46A]">.</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
              <Link href="/courses" className="hover:text-[#0F4C5C] transition-colors">Courses</Link>
              <Link href="/about" className="text-[#E9C46A]">About Us</Link>
              <Link href="/contact" className="hover:text-[#0F4C5C] transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface">
              <a href="/auth/login" className="hover:text-[#0F4C5C] transition-colors">Login</a>
              <Link href="/auth/signup" className="bg-[#E9C46A] text-[#00363d] px-4 py-2 rounded font-medium hover:bg-[#D4A357] transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#0F4C5C] mb-6">About Mentora</h1>
        <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 p-6">
          <h2 className="text-xl font-semibold text-[#0F4C5C] mb-4">Our Story</h2>
          <p className="text-secondary text-sm mt-2">
            Mentora is a student-focused JEE preparation platform that helps students discover courses and batches, register for a programme, speak with the Mentora team, complete manual enrollment, access learning resources, and receive mentorship.
          </p>
        </div>
      </div>
    </main>
  );
}
