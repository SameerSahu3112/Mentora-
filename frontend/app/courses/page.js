"use client";

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CoursesPage() {
  const initialCourses = [
    {
      id: '1',
      name: 'Rise',
      examTarget: 'JEE Main January',
      price: '₹299',
      isActive: true,
      isDroppers: false,
      seatsAvailable: 45,
      totalCapacity: 50,
    },
    {
      id: '2',
      name: 'Spark',
      examTarget: 'JEE Main April',
      price: '₹499',
      isActive: true,
      isDroppers: true,
      seatsAvailable: 38,
      totalCapacity: 50,
    },
    {
      id: '3',
      name: 'Apex',
      examTarget: 'JEE Advanced',
      price: '₹699',
      isActive: true,
      isDroppers: false,
      seatsAvailable: 40,
      totalCapacity: 50,
    },
  ];

  return (
    <div className="min-h-screen bg-[#001719] text-on-surface flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0F4C5C]">JEE Preparation Courses</h1>
          <p className="text-lg text-on-surface-variant mt-2">
            Choose the right programme for your JEE journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initialCourses.map((course) => (
            <div
              key={course.id}
              className="bg-[#082326] rounded-xl p-6 border border-[#8a9294]/20 shadow-lg flex flex-col justify-between hover:border-[#0F4C5C]/50 transition-colors"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#0F4C5C]">{course.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      course.isDroppers
                        ? 'bg-[#E9C46A]/40 text-[#E9C46A]'
                        : 'bg-[#E9C46A]/20 text-[#E9C46A]'
                    }`}
                  >
                    {course.isDroppers ? 'DROPPERS' : 'Regular'}
                  </span>
                </div>
                <p className="text-secondary text-sm mb-3">{course.examTarget}</p>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-[#0F4C5C]">{course.price}</span>
                </div>
                <div className="mt-4 text-xs text-secondary">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">people</span>
                    {course.seatsAvailable} / {course.totalCapacity} seats
                  </span>
                </div>
              </div>
              <Link
                href={`/courses/${course.id}`}
                className="w-full py-3 mt-6 rounded bg-[#E9C46A] text-[#00363d] font-bold text-center hover:bg-[#D4A357] transition-colors block"
              >
                View Batches
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
