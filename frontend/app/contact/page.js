"use client";

import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#001719] text-on-surface">
      <nav className="bg-[#001719]/80 shadow border-b border-[#8a9294]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
                <span className="text-sm font-semibold text-[#E9C46A]">.</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface">
              <Link href="/auth/login" className="hover:text-[#0F4C5C] transition-colors">
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
        <h1 className="text-4xl font-bold text-[#0F4C5C] mb-6">Contact / Help</h1>
        <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 p-8">
          <h2 className="text-xl font-bold text-[#0F4C5C] mb-4">Contact Us</h2>
          <p className="text-secondary text-sm mt-4">
            Have questions about our courses, batches, or enrollment? We're here to help.
          </p>
        </div>
      </div>
    </main>
  );
}
