"use client";

import { useState } from 'react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#001719] text-on-surface">
      {/* Top Banner - Intro Call Scheduling */}
      <section className="px-4 py-2.5 flex items-center justify-between gap-space-sm text-text-secondary font-label-sm text-label-sm border-b border-outline-variant/20 bg-surface-container-lowest">
        <div className="flex items-center gap-space-md flex-wrap">
          <div class="flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            MENTORA JEE MAIN 2026 APEX RUNTIME
          </div>
          <span class="hidden sm:inline text-outline-variant">|</span>
          <span class="flex items-center gap-1 text-tertiary font-label-sm text-label-sm">
            <span class="material-symbols-outlined text-[14px] text-tertiary">schedule</span>
            Next Live Lecture: Feb 25, 7:30 PM IST
          </span>
          <span class="hidden md:inline text-outline-variant">|</span>
          <span class="text-on-surface font-label-sm text-label-sm">
            Target Cutoff: <span class="text-secondary font-semibold">99.4%ile (228+ Marks)</span>
          </span>
        </div>
        <div className="flex items-center gap-space-md ml-auto">
          <span className="text-tertiary flex items-center gap-1 font-label-sm text-label-sm">
            <span class="material-symbols-outlined text-[14px]">cloud_done</span> Mentorship Portal v4.12
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-container text-secondary font-label-sm text-label-sm">
            Class 12 Spark Track
          </span>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative w-full px-4 py-12 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
            <div className="flex flex-col gap-space-md max-w-2xl">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-bold tracking-wider uppercase">
                  Active Enrolled
                </span>
                <span className="px-2.5 py-1 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm">
                  ID: MENT-2026-0842
                </span>
                <span className="px-2.5 py-1 rounded bg-tertiary-container/60 text-on-tertiary-container font-label-sm text-label-sm">
                  Class 12 Aspirant
                </span>
              </div>
              <div className="flex flex-col">
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Welcome back, <span className="text-secondary font-bold">Aarav Sharma</span>
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2 mt-1">
                  <span class="material-symbols-outlined text-[18px] text-primary">school</span>
                  <strong>Spark 1.0</strong> (April Depth Target - JEE Main 2026 Comprehensive)
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mt-space-xs pt-space-xs">
                <div className="bg-surface-container-lowest/80 p-space-sm rounded-lg flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[22px]">event</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline uppercase">Exam Date</span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">April 12, 2026 (Shift 1)</span>
                  </div>
                </div>
                <div className="bg-surface-container-lowest/80 p-space-sm rounded-lg flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-tertiary text-[22px]">verified_user</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline uppercase">Access Until</span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">April 19, 2026</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-auto flex flex-col gap-space-md bg-surface-container-lowest/90 p-space-lg rounded-xl border border-secondary/20 shadow-xl">
              <div className="flex items-center gap-space-md">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                    <circle className="text-surface-container-highest" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="6" />
                    <circle className="text-secondary transition-all duration-1000 ease-out" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="65" strokeLinecap="round" strokeWidth="6" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-headline-md text-headline-lg text-abyss-teal font-bold">48</span>
                    <span className="font-label-sm text-label-sm text-outline uppercase">Days</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    JEE Main April '26
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Sprint Mode Active</span>
                  <span className="font-body-sm text-body-sm text-tertiary flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> 38 Mock Tests Remaining
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 mt-4 border-t border-outline-variant/20">
                <a href="/auth/login" className="w-full py-2.5 rounded bg-[#0F4C5C] text-on-abyss-teal font-label-md text-label-md font-bold text-center hover:bg-[#0F4C5C]/90 flex items-center justify-center gap-2 transition-all">
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                  Resume: Rotational Mechanics (Ch. 4)
                </a>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <button className="px-3 py-2 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-bold transition-colors flex items-center gap-1.5" onclick={() => document.getElementById('weekly-modal').classList.remove('hidden')}>
                    <span className="material-symbols-outlined text-[16px] text-tertiary">videocam</span> Batch Call
                  </button>
                  <button className="px-3 py-2 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm font-bold transition-colors flex items-center gap-1.5" onclick={document.getElementById('booking-modal')?.classList.remove('hidden')}>
                    <span className="material-symbols-outlined text-[16px] text-tertiary">contact_support</span>
                    1-to-1 Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Mentorship Section */}
      <section className="py-12 lg:py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">school</span>
              <h2 className="text-xl font-bold text-[#0F4C5C]">Daily Study Plan</h2>
            </div>
            <div className="text-secondary text-sm">Track daily progress &amp; upcoming sessions</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#082326] rounded-lg p-6 border border-[#8a9294]/20 flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#082326] flex items-center justify-center text-[#E9C46A] font-bold text-xl">
                📄
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Daily Practice Sheet</span>
                <span className="font-label-sm text-label-sm text-secondary">Algebra - Quadratic Equations</span>
              </div>
            </div>
            <div className="bg-[#082326] rounded-lg p-6 border border-[#8a9294]/20 flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#E9C46A]/20 text-[#E9C46A] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">image</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Batch Applied</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Spark 1.0 (JEE Main April)</h3>
              </div>
            </div>
            <div className="bg-[#082326] rounded-lg p-6 border border-[#8a9294]/20 flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#E9C46A]/20 text-[#E9C46A] flex items-center justify-center font-bold text-[24px]">
                📝
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Weekly Test</span>
                <span className="font-label-sm text-label-sm text-secondary">Full-Length Mock Test - 23</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-12 lg:py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F4C5C]">Why Choose Mentora?</h2>
            <p className="text-lg text-secondary mt-2 max-w-2xl mx-auto">
              Complete JEE preparation platform designed for serious students preparing for JEE Main and JEE Advanced.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#082326] rounded-lg p-6 border border-[#8a9294]/20 hover:border-[#0F4C5C]/50 transition-colors">
              <div className="w-10 h-10 rounded bg-[#E9C46A]/20 text-[#E9C46A] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[24px]">school</span>
              </div>
              <h3 className="text-lg font-bold text-[#0F4C5C] mb-2">Course Discovery</h3>
              <p className="text-sm text-secondary leading-relaxed">
                Browse JEE Main January, JEE Main April, and JEE Advanced courses with clear pricing and exam dates.
              </p>
            </div>
            <div className="bg-[#082326] rounded-lg p-6 border border-[#8a9294]/20 hover:border-[#0F4C5C]/50 transition-colors">
              <div className="w-10 h-10 rounded bg-[#E9C46A]/20 text-[#E9C46A] flex items-center justify-center mb-4">
                <span class="material-symbols-outlined text-[24px]">assignment</span>
              </div>
              <h3 className="text-lg font-bold text-[#0F4C5C] mb-2">Batch Selection</h3>
              <p className="text-sm text-secondary leading-relaxed">
                Choose from multiple batches with different schedules, capacities, and assigned teachers.
              </p>
            </div>
            <div className="bg-[#082326] rounded-lg p-6 border border-[#8a9294]/20 hover:border-[#0F4C5C]/50 transition-colors">
              <div className="w-10 h-10 rounded bg-[#E9C46A]/20 text-[#E9C46A] flex items-center justify-center mb-4">
                <span class="material-symbols-outlined text-[24px]">person</span>
              </div>
              <h3 className="text-lg font-bold text-[#0F4C5C] mb-2">Weekly Mentorship</h3>
              <p className="text-sm text-secondary leading-relaxed">
                Every batch has recurring weekly group mentorship sessions with assigned teachers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
