"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function CourseDetailPage({ params }) {
  const courseId = params.courseId;

  const courseData = {
    id: courseId,
    name: 'Rise',
    examTarget: 'JEE Main January',
    price: '₹299',
    description: 'Rise course covers JEE Main January with comprehensive coverage of Physics, Chemistry, and Mathematics.',
  };

  const batches = [
    { id: 'b1', name: 'Batch 1.0', startDate: 'Nov 2026', endDate: 'Mar 2027', capacity: 50, status: 'active' },
    { id: 'b2', name: 'Batch 2.0', startDate: 'Dec 2026', endDate: 'Apr 2027', capacity: 40, status: 'active' },
  ];

  return (
    <main className="min-h-screen bg-[#001719] text-on-surface">
      <nav className="bg-[#001719]/80 backdrop-blur-md border-b border-[#8a9294]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link href="/courses" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
              <span className="text-sm font-semibold text-[#E9C46A]">.</span>
            </Link>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
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

      <main className="max-w-7xl mx-auto px-4 py-6">
        <nav className="mb-6">
          <Link href="/courses" className="text-abyss-teal hover:text-[#0F4C5C] text-sm font-medium">
            ← Back to Courses
          </a>
        </nav>

        <div className="bg-[#082326] rounded-lg shadow-md p-6 border border-[#8a9294]/20 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#0F4C5C]">{courseData.name}</h1>
              <p className="text-[#E9C46A] font-medium mt-1">{courseData.examTarget}</p>
              <p className="text-secondary text-lg mt-2">
                Price: ₹{courseData.price}
              </p>
              {courseData.description && (
                <p className="text-secondary mt-4">{courseData.description}</p>
              )}
            </div>
            <Link href="/auth/login" className="px-6 py-3 bg-[#E9C46A] text-[#00363d] font-bold text-center rounded-lg hover:bg-[#D4A357] transition-colors">
              Apply Now
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#0F4C5C] mb-4">Available Batches</h2>
          {batches.length === 0 ? (
            <p className="text-secondary">No batches available yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {batches.map((batch) => (
                <div key={batch.id} className="bg-[#082326] p-4 rounded-lg shadow-sm border border-[#8a9294]/20">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-[#0F4C5C]">{batch.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${batch.status === 'active' ? 'bg-[#E9C46A]/20 text-[#E9C46A]' : 'bg-[#E9C46A]/20 text-[#E9C46A]'}`}>
                      {batch.status}
                    </span>
                  </div>
                  <p className="text-secondary text-sm mt-1">
                    {batch.startDate} to {batch.endDate}
                  </p>
                  <p className="text-secondary text-sm">
                    Capacity: {batch.capacity} seats
                  </p>
                  {batch.status === 'active' && (
                    <button
                      onClick={() => window.location.href = '/auth/login'}
                      className="mt-3 w-full py-2 rounded bg-[#E9C46A] text-[#00363d] font-bold text-center hover:bg-[#D4A357] transition-colors"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </main>
  );
}
