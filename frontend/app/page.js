"use client";

import { useState } from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#001719] text-on-surface">
      {/* Hero Section */}
      <section class="bg-[#0F4C5C] text-on-surface py-12 lg:py-20 px-4 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div class="space-y-6">
              <h1 class="text-4xl font-bold text-on-surface leading-tight">
                Master JEE with <span class="text-[#E9C46A]">Mentora</span>
              </h1>
              <p class="text-lg text-on-surface-variant mt-4">
                Student-focused JEE preparation platform helping students in Classes 9–12 prepare for JEE Main and JEE Advanced with recorded learning, mentorship, and expert guidance.
              </p>
              <div class="flex flex-wrap gap-3 mt-6">
                <a href="/auth/signup" class="px-6 py-3 bg-[#E9C46A] text-[#00363d] font-semibold rounded-xl hover:bg-[#D4A357] transition-colors">
                  Get Started Free
                </button>
                <a href="/courses" class="px-6 py-3 rounded-lg border border-[#8a9294] text-on-surface hover:bg-[#8a9294]/20 transition-colors">
                  Explore Courses
                </button>
              </div>
              <div class="mt-8 flex items-center gap-4 text-sm text-on-surface-variant">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#E9C46A] animate-pulse"></span>
                  <span>3 Initial Courses</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary text-[18px]">schedule</span>
                  <span>Weekly Mentorship Included</span>
                </div>
              </div>
            </div>
            <div class="flex justify-center">
              <div class="w-full max-w-md">
                <div class="relative">
                  <div class="absolute -inset-2 bg-[#E9C46A]/20 rounded-xl blur-xl"></div>
                  <div class="relative bg-[#001719] rounded-xl p-2 border border-[#8a9294]/20 shadow-2xl">
                    <div class="flex items-center justify-between mb-6">
                      <div class="flex items-center gap-2">
                        <span class="w-8 h-8 rounded bg-[#E9C46A]/20 text-[#E9C46A] flex items-center justify-center">
                          <span class="material-symbols-outlined text-[16px]">school</span>
                        </span>
                        <div>
                          <span class="font-semibold text-on-surface text-sm">Spark 1.0</span>
                          <span class="text-xs text-on-surface-variant">JEE Main April 2026</span>
                        </div>
                      </div>
                      <span class="px-2 py-0.5 rounded bg-[#E9C46A]/20 text-[#E9C46A] text-xs font-bold">Active</span>
                    </div>
                    <div class="flex items-center gap-2 mb-6">
                      <span class="material-symbols-outlined text-[#E9C46A] text-[18px]">schedule</span>
                      <span class="text-on-surface font-semibold">Weekly Mentorship: Thursday 7:30 PM</span>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mb-6">
                      <div class="p-3 rounded bg-[#082326]">
                        <p class="text-xs text-outline font-semibold uppercase tracking-wider">Exam Target</span>
                        <p class="text-lg font-bold text-on-surface">April 12, 2026</span>
                      </div>
                      <div class="p-3 rounded bg-[#082326]">
                        <p class="text-xs text-outline font-semibold uppercase">Access Until</span>
                        <p class="text-lg font-bold text-on-surface">Apr 19, 2026</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 text-xs text-on-surface-variant mb-4">
                      <span class="material-symbols-outlined text-secondary text-[16px]">people</span>
                      <span>48 Students Enrolled</span>
                    </div>
                    <button class="w-full py-3 rounded-lg bg-[#E9C46A] text-[#00363d] font-bold hover:bg-[#D4A357] transition-colors">
                      Join Spark 1.0 — Application Open
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section class="py-12 lg:py-20 px-4 lg:px-8 bg-[#001719]">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-on-surface mb-4">Why Choose Mentora?</h2>
            <p class="text-lg text-on-surface-variant max-w-2xl mx-auto">
              Complete JEE preparation platform designed for serious students preparing for JEE Main and JEE Advanced.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-[#082326] rounded-xl p-6 border border-[#8a9294]/20 hover:border-[#0F4C5C]/50 transition-colors">
              <div class="w-10 h-10 rounded bg-[#E9C46A]/20 text-[#E9C46A] flex items-center justify-center mb-4">
                <span class="material-symbols-outlined text-[24px]">school</span>
              </div>
              <h3 class="text-lg font-bold text-on-surface mb-2">Course Discovery</h3>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Browse JEE Main January, JEE Main April, and JEE Advanced courses with clear pricing and exam dates.
              </p>
            </div>
            <div class="bg-[#082326] rounded-xl p-6 border border-[#8a9294]/20 hover:border-[#0F4C5C]/50 transition-colors">
              <div class="w-10 h-10 rounded bg-[#E9C46A]/20 text-[#E9C46A] flex items-center justify-center mb-4">
                <span class="material-symbols-outlined text-[24px]">assignment</span>
              </div>
              <h3 class="text-lg font-bold text-on-surface mb-2">Batch Selection</h3>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Choose from multiple batches with different schedules, capacities, and assigned teachers.
              </p>
            </div>
            <div class="bg-[#082326] rounded-xl p-6 border border-[#8a9294]/20 hover:border-[#0F4C5C]/50 transition-colors">
              <div class="w-10 h-10 rounded bg-[#E9C46A]/20 text-[#E9C46A] flex items-center justify-center mb-4">
                <span class="material-symbols-outlined text-[24px]">person</span>
              </div>
              <h3 class="text-lg font-bold text-on-surface mb-2">Weekly Mentorship</h3>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Every batch has recurring weekly group mentorship sessions with assigned teachers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
