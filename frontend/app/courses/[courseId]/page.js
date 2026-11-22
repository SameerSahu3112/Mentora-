"use client";

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CourseDetailPage({ params }) {
  const courseId = params?.courseId || '1';

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
    <div className="min-h-screen bg-[#001719] text-on-surface flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <nav className="mb-6">
          <Link href="/courses" className="text-[#E9C46A] hover:underline text-sm font-medium flex items-center gap-1">
            ← Back to Courses
          </Link>
        </nav>

        <div className="bg-[#082326] rounded-xl shadow-md p-6 border border-[#8a9294]/20 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#0F4C5C]">{courseData.name}</h1>
              <p className="text-[#E9C46A] font-medium mt-1">{courseData.examTarget}</p>
              <p className="text-secondary text-lg mt-2 font-semibold">
                Price: {courseData.price}
              </p>
              {courseData.description && (
                <p className="text-on-surface-variant mt-3 text-sm leading-relaxed">{courseData.description}</p>
              )}
            </div>
            <Link
              href="/auth/signup"
              className="px-6 py-3 bg-[#E9C46A] text-[#00363d] font-bold text-center rounded-lg hover:bg-[#D4A357] transition-colors shrink-0"
            >
              Enroll Now
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#0F4C5C] mb-4">Available Batches</h2>
          {batches.length === 0 ? (
            <p className="text-secondary">No batches available yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {batches.map((batch) => (
                <div key={batch.id} className="bg-[#082326] p-5 rounded-xl shadow-sm border border-[#8a9294]/20">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-[#0F4C5C]">{batch.name}</h3>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded bg-[#E9C46A]/20 text-[#E9C46A]">
                      {batch.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-sm mt-2">
                    Schedule: {batch.startDate} to {batch.endDate}
                  </p>
                  <p className="text-secondary text-sm mt-1">
                    Capacity: {batch.capacity} seats
                  </p>
                  {batch.status === 'active' && (
                    <Link
                      href="/auth/signup"
                      className="mt-4 w-full py-2.5 rounded bg-[#E9C46A] text-[#00363d] font-bold text-center hover:bg-[#D4A357] transition-colors block"
                    >
                      Apply for Batch
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
