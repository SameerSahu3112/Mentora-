"use client";

import Link from "next/link";
import { useState } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([
    { name: "Rise", price: "₹299" },
    { name: "Spark", price: "₹499" },
    { name: "Apex", price: "₹699" },
  ]);

  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <nav className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-display font-bold text-primary">Mentora</span>
                <span className="text-sm font-semibold text-secondary">.</span>
              </Link>
            </div>
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-on-surface-variant">
              <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
              <Link href="/about" className="hover:text-primary transition-colors">About</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="hidden sm:block text-sm font-medium text-surface hover:text-primary transition-colors">Login</Link>
              <Link href="/auth/signup" className="flex items-center gap-2 px-5 py-2 rounded-xl bg-secondary text-on-secondary font-label-md text-sm font-bold hover:bg-secondary-fixed-dim transition-all shadow-lg shadow-secondary/15 btn-press">
                Apply Now <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <h1 className="font-display text-[48px] lg:text-[64px] font-bold text-on-surface tracking-typical mb-6 animate-fade-in">
            Available Courses
          </h1>
          <p className="font-body-md text-lg text-on-surface-variant max-w-2xl leading-relaxed animate-fade-in stagger-1">
            Browse JEE Main January, JEE Main April, and JEE Advanced courses with clear pricing.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in stagger-2">
            {courses.map((course, i) => (
              <div
                key={i}
                className="group bg-surface-container p-6 rounded-xl border border-outline-variant/20 hover:bg-surface-container-high transition-all duration-300 glass-card animate-slide-up stagger-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-[28px] font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                      {course.name}
                    </h3>
                    <div className="font-display text-[36px] font-bold text-secondary mb-2">
                      {course.price}
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      JEE Preparation Track
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-outline-variant/20">
                    <Link
                      href="/auth/signup"
                      className="w-full py-3 rounded-xl bg-secondary text-on-secondary font-label-md text-sm font-bold shadow-lg shadow-secondary/15 hover:bg-secondary-fixed-dim transition-all active:scale-[0.98] btn-press"
                      style={{ textDecoration: "none" }}
                    >
                      Apply Now
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-fade-in stagger-3">
            <div>
              <span className="material-symbols-outlined text-[24px] text-secondary">description</span>
              <span className="font-semibold text-sm">Structured Syllabus</span>
            </div>
            <div>
              <span className="material-symbols-outlined text-[24px] text-primary">library_books</span>
              <span className="font-semibold text-sm">Recorded Archives</span>
            </div>
            <div>
              <span className="material-symbols-outlined text-[24px] text-tertiary">schedule</span>
              <span className="font-semibold text-sm">Weekly Mentorship</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
