"use client";

import { useState } from 'react';
import Link from 'next/link';

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
    <main className="min-h-screen bg-[#001719] text-on-surface">
      <nav className="bg-[#001719]/80 backdrop-blur-md border-b border-[#8a9294]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
              <span className="text-sm font-semibold text-[#E9C46A]">.</span>
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-medium text-on-surface-variant">
              <Link href="/courses" className="text-[#E9C46A]">Courses</Link>
              <Link href="/about" className="hover:text-[#0F4C5C] transition-colors">About</Link>
              <Link href="/contact" className="hover:text-[#0F4C5C] transition-colors">Contact</Link>
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0F4C5C]">JEE Preparation Courses</h1>
          <p className="text-lg text-on-surface-variant mt-2">
            Choose the right programme for your JEE journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initialCourses.map((course) => {
            const badgeClass = course.isDroppers
              ? 'px-2 py-1 rounded bg-[#E9C46A]/20 text-[#E9C46A] font-label-sm text-label-sm font-bold'
              : 'px-2 py-1 rounded bg-[#E9C46A]/20 text-[#E9C46A] font-label-sm text-label-sm font-bold';

            return (
              <div key={course.id} className="bg-[#082326] rounded-xl p-6 border border-[#8a9294]/20 shadow-lg flex flex-col hover:border-[#0F4C5C]/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#0F4C5C]">{course.name}</h3>
                  <span className={badgeClass}>
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
                <Link href={`/courses/${course.id}`} className="w-full py-3 rounded bg-[#E9C46A] text-[#00363d] font-bold text-center hover:bg-[#D4A357] transition-colors">
                  View Batches
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </main>
  );
}
