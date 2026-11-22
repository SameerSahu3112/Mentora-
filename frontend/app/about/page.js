"use client";

import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#001719] text-on-surface">
      <nav className="bg-[#001719]/80 backdrop-blur-md border-b border-[#8a9294]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
              <span className="text-sm font-semibold text-[#E9C46A]">.</span>
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-medium text-on-surface-variant">
              <Link href="/courses" className="hover:text-[#0F4C5C] transition-colors">Courses</Link>
              <Link href="/about" className="text-[#E9C46A]">About Us</Link>
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

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#0F4C5C] mb-6">About Mentora</h1>

        <section className="bg-[#082326] rounded-xl p-8 border border-[#8a9294]/20 mb-8">
          <h2 className="text-2xl font-bold text-[#0F4C5C] mb-4">Our Story</h2>
          <p className="text-on-surface-variant mb-4">
            Mentora is a student-focused JEE preparation platform that helps students discover courses and batches,
            register for a programme, speak with the Mentora team, complete manual enrollment, access learning
            resources, and receive mentorship.
          </p>
          <p className="text-on-surface-variant">
            We believe every student deserves access to quality JEE preparation with personalized mentorship,
            regardless of their location or background.
          </p>
        </section>

        <section className="bg-[#082326] rounded-xl p-8 border border-[#8a9294]/20">
          <h2 className="text-2xl font-bold text-[#0F4C5C] mb-4">Our Founders</h2>
          <p className="text-on-surface-variant">
            Mentora is founded by Harshitraj Singh Panwar and Naitik Mujawadiya, described as NIT Bhopal
            students/NITians with three years of JEE experience. Founder profiles and photos will be published
            only after appropriate consent and verification.
          </p>
        </section>
      </main>
    </div>
  );
}
