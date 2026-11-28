"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { studentAPI } from "@/app/lib/api";
import StudentLayout from "@/app/components/layouts/StudentLayout";
import ActionButton from "@/app/components/ui/ActionButton";

export default function StudentDashboard() {
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentAPI.getMyEnrollments().catch(() => []).then((enrollments) => {
      const active = Array.isArray(enrollments) ? enrollments.find((e) => e.status === "active") : null;
      setEnrollment(active);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse h-8 w-48 bg-surface-container rounded" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      {/* Top alert bar */}
      <div className="w-full bg-surface-container-lowest px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-on-surface-variant font-label-sm text-label-sm border-b border-outline-variant/20">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-secondary font-semibold">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            MENTORA JEE MAIN 2026 APEX RUNTIME
          </span>
          <span className="hidden sm:inline text-outline-variant">|</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-tertiary">schedule</span>
            Next Live Lecture: <strong>Feb 25, 7:30 PM IST</strong>
          </span>
          <span className="hidden md:inline text-outline-variant">|</span>
          <span className="text-on-surface">Target Cutoff Target: <strong>99.4%ile (228+ Marks)</strong></span>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <span className="text-tertiary flex items-center gap-1 font-label-sm">
            <span className="material-symbols-outlined text-[14px]">cloud_done</span> Mentorship Portal v4.12
          </span>
          <span className="bg-surface-container px-2 py-0.5 rounded text-secondary font-label-sm">{enrollment?.batch_name || "Class 12 Spark Track"}</span>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 py-8 flex flex-col gap-8">

      {/* Section 1: Active Enrollment Hero */}
      <section className="relative w-full rounded-xl bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-low p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-80 h-32 bg-primary/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-1">
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
            <div className="flex flex-col mt-1">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Welcome back, <span className="text-secondary font-bold">Aarav Sharma</span>
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2 mt-1">
                <span className="material-symbols-outlined text-[18px] text-primary">school</span>
                <strong>{enrollment?.course_name || "Spark 1.0"}</strong> ({enrollment?.batch_name || "April Depth Track"} - JEE Main 2026 Comprehensive)
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-2">
              <div className="bg-surface-container-lowest/80 p-2 rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">event</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase">Target Exam Window</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">April 12, 2026 (Shift 1)</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest/80 p-2 rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[22px]">verified_user</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase">Access Buffer (§8.3)</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Active until April 19, 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-center gap-4 bg-surface-container-lowest/90 p-4 rounded-xl border border-secondary/20 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                  <circle className="text-surface-container-highest" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="6" />
                  <circle className="text-secondary transition-all duration-1000 ease-out" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="65" strokeLinecap="round" strokeWidth="6" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-headline-md text-headline-md leading-none text-secondary font-bold">48</span>
                  <span className="font-label-sm text-label-sm text-outline uppercase">Days</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">JEE Mains April '26</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Sprint Mode Active</span>
                <span className="font-body-sm text-body-sm text-tertiary flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> 38 Mock Tests Remaining
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
              <Link href="/student/resources" className="w-full px-4 py-2.5 rounded bg-secondary hover:bg-secondary-fixed-dim text-on-secondary font-label-md text-label-md font-bold tracking-wide transition-all transform active:scale-[0.98] text-center shadow-lg shadow-secondary/15 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                Resume: Rotational Mechanics (Ch. 4)
              </Link>
              <div className="grid grid-cols-2 gap-2 w-full">
                <button className="px-3 py-2 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold transition-colors flex items-center justify-center gap-1.5" onClick={() => document.getElementById('weekly-modal')?.classList.remove('hidden')}>
                  <span className="material-symbols-outlined text-[16px] text-tertiary">videocam</span> Batch Call
                </button>
                <button className="px-3 py-2 rounded bg-surface-container-high hover:bg-surface-container-highest text-secondary font-label-sm text-label-sm font-semibold transition-colors flex items-center justify-center gap-1.5" onClick={() => document.getElementById('booking-modal')?.classList.remove('hidden')}>
                  <span className="material-symbols-outlined text-[16px]">contact_support</span> 1-on-1 Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Quick Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container p-4 rounded-xl flex items-center gap-3 hover:bg-surface-container-high transition-colors">
          <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[26px]">task_alt</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">42 <span className="font-label-sm text-label-sm text-outline font-normal">/ 50</span></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">DPP Sheets Solved</span>
          </div>
        </div>
        <div className="bg-surface-container p-4 rounded-xl flex items-center gap-3 hover:bg-surface-container-high transition-colors">
          <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[26px]">bookmark_added</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">14</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Bookmarked Traps &amp; Formulas</span>
          </div>
        </div>
        <div className="bg-surface-container p-4 rounded-xl flex items-center gap-3 hover:bg-surface-container-high transition-colors">
          <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[26px]">forum</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">8 <span className="font-label-sm text-label-sm text-tertiary font-normal">Resolved</span></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Doubt Queries Handled</span>
          </div>
        </div>
        <div className="bg-surface-container-high p-4 rounded-xl flex items-center justify-between gap-3 shadow-md">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">Direct Download</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold truncate max-w-[140px]">JEE Formula Sheet</span>
            <span className="font-label-sm text-label-sm text-outline">Verified PDF • 4.2 MB</span>
          </div>
          <button className="p-3 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-fixed-dim transition-colors flex items-center justify-center" onClick={() => alert('Download started')}>
            <span className="material-symbols-outlined text-[20px]">download</span>
          </button>
        </div>
      </section>

      {/* Section 3: Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

      {/* Left: Content Library */}
      <section className="xl:col-span-7 flex flex-col gap-6" id="content-section">
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col gap-4 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-outline-variant/20">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Study Syllabus &amp; Artifacts (§10, §12)</span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Course Modules &amp; DPPs</h2>
            </div>
            <div className="flex items-center gap-3 bg-surface-container px-3 py-1.5 rounded-full">
              <span className="font-label-md text-label-md text-tertiary font-semibold">18/24 Modules (75%)</span>
              <div className="w-16 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-tertiary" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md">
            <span className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[16px]">folder</span> Spark 1.0
            </span>
            <span className="text-outline">/</span>
            <span className="flex items-center gap-1 text-on-surface">
              <span className="material-symbols-outlined text-[16px]">psychology</span> Physics Mechanics
            </span>
            <span className="text-outline">/</span>
            <span className="px-2 py-0.5 rounded bg-surface-container text-secondary font-semibold">Rigid Body Dynamics (Ch. 4)</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded bg-surface-container text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">info</span>
            <p>
              Note: Opening a file does <strong className="text-on-surface">NOT</strong> mark it as complete. Candidates must manually verify completion using the checkboxes below.
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-1">
            <div className="p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all flex flex-col md:flex-row md:items-center justify-between gap-3" id="res-row-1">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">description</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[17px]">Rigid Body Moment of Inertia - Complete Notes &amp; Derivations</span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest font-label-sm text-label-sm text-secondary font-medium">PDF Notes</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-on-surface-variant font-label-sm text-label-sm">
                    <span className="text-tertiary">Uploader: Harshitraj Sir (NIT Bhopal)</span>
                    <span>•</span>
                    <span>14.8 MB</span>
                    <span>•</span>
                    <span className="text-outline">Updated 2 days ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">
                <button className="p-2 rounded bg-surface-container-lowest hover:bg-surface-container-highest text-secondary transition-colors">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                </button>
                <a className="px-3 py-1.5 rounded bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-sm text-label-sm flex items-center gap-1.5 transition-colors" href="#">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">file_download</span> Signed PDF
                </a>
                <button className="px-3 py-1.5 rounded bg-surface-container-highest text-outline hover:text-on-surface font-label-sm text-label-sm flex items-center gap-1.5 transition-all">
                  <span className="material-symbols-outlined text-[18px]">check_box_outline_blank</span> <span>Mark Done</span>
                </button>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all flex flex-col md:flex-row md:items-center justify-between gap-3" id="res-row-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-tertiary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">assignment</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[17px]">DPP-04: Angular Momentum Conservation &amp; Collision Problems</span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest font-label-sm text-label-sm text-tertiary font-medium">Practice DPP Sheet</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-on-surface-variant font-label-sm text-label-sm">
                    <span className="text-tertiary">Uploader: Harshitraj Sir (NIT Bhopal)</span>
                    <span>•</span>
                    <span>25 High-Yield Problems</span>
                    <span>•</span>
                    <span>3.1 MB</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">
                <button className="p-2 rounded bg-surface-container-lowest hover:bg-surface-container-highest text-outline hover:text-secondary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">bookmark</span>
                </button>
                <a className="px-3 py-1.5 rounded bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-sm text-label-sm flex items-center gap-1.5 transition-colors" href="#">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">file_download</span> Signed PDF
                </a>
                <button className="px-3 py-1.5 rounded bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm flex items-center gap-1.5 transition-all">
                  <span className="material-symbols-outlined text-[18px]">check_box</span> <span>Completed</span>
                </button>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all flex flex-col md:flex-row md:items-center justify-between gap-3" id="res-row-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">smart_display</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[17px]">Instantaneous Axis of Rotation (IAOR) - Masterclass Walkthrough</span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest font-label-sm text-label-sm text-primary font-medium">Concept Video Link</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-on-surface-variant font-label-sm text-label-sm">
                    <span className="text-tertiary">Uploader: Naitik Sir (JEE Mentor)</span>
                    <span>•</span>
                    <span>Duration: 42 mins</span>
                    <span>•</span>
                    <span className="text-secondary font-semibold">1080p Stream</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">
                <button className="p-2 rounded bg-surface-container-lowest hover:bg-surface-container-highest text-secondary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>
                  <span className="material-symbols-outlined text-[20px]">bookmark</span>
                </button>
                <button className="px-3 py-1.5 rounded bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-sm text-label-sm flex items-center gap-1.5 transition-colors" onClick={() => alert('Opening secure HD lecture player...')}>
                  <span className="material-symbols-outlined text-[16px] text-primary">play_arrow</span> Stream
                </button>
                <button className="px-3 py-1.5 rounded bg-surface-container-highest text-outline hover:text-on-surface font-label-sm text-label-sm flex items-center gap-1.5 transition-all">
                  <span className="material-symbols-outlined text-[18px]">check_box_outline_blank</span> <span>Mark Done</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 mt-1">
            <span className="font-label-sm text-label-sm text-outline">Showing current active sprint chapter</span>
            <a className="font-label-md text-label-md text-secondary hover:underline flex items-center gap-1" href="#">
              Browse All 14 Physics Chapters <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* Right: Mentorship Center */}
      <section className="xl:col-span-5 flex flex-col gap-6">
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col gap-6 shadow-md">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Faculty Guidance (§13)</span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Mentorship Center</h2>
          </div>
          <div className="bg-surface-container px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-tertiary">verified</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase leading-none">Attendance</span>
              <span className="font-label-md text-label-md text-tertiary font-bold leading-none mt-0.5">92% (11/12)</span>
            </div>
          </div>

          {/* Weekly Batch Mentorship Live Card */}
          <div className="bg-surface-container p-4 rounded-xl flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-secondary" />
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Weekly Cohort Live Session
              </span>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">group</span> 28 Enrolled Registered
              </span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-snug">Advanced Rotational Dynamics &amp; High-Yield JEE Traps</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Deep analytical review of past 5 years' JEE Advanced trick questions, rolling friction paradoxes, and time allocation tactics.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 py-2 bg-surface-container-lowest/60 p-2 rounded-lg text-body-sm">
              <div>
                <span className="font-label-sm text-label-sm text-outline block uppercase">Lead Mentor</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">person</span> Harshitraj Singh Panwar
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">(NIT Bhopal Alumnus)</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-outline block uppercase">Schedule Timing</span>
                <span className="font-label-md text-label-md text-secondary font-bold flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">schedule</span> Tomorrow, 7:30 PM IST
                </span>
                <span className="font-label-sm text-label-sm text-tertiary">Rec. every Tuesday</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <a className="flex-1 py-2 rounded bg-secondary hover:bg-secondary-fixed-dim text-on-secondary font-label-md text-label-md font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-secondary/10" href="#" target="_blank">
                <span className="material-symbols-outlined text-[18px]">videocam</span> Join Google Meet
              </a>
              <button className="px-3 py-2 rounded bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1" onClick={() => alert('Session added to calendar')}>
                <span className="material-symbols-outlined text-[16px] text-secondary">notification_add</span> Reminder
              </button>
            </div>
          </div>

          {/* Active 1-on-1 Faculty Mentorship Booking */}
          <div className="bg-surface-container p-4 rounded-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Your 1-on-1 Faculty Desk (§13.2)</span>
              <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span> Approved by Mentor
              </span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-lowest flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold font-label-md">NM</div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-bold">Naitik Mujawadiya</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Assigned Batch Mentor</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-md text-label-md text-secondary font-bold block">Friday, Feb 27</span>
                  <span className="font-label-sm text-label-sm text-outline">5:00 PM IST (25 mins)</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-outline-variant/20 flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase">Agenda Focus</span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium">"Overcoming friction &amp; negative marking in Thermodynamics 3-hour mock tests."</span>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between gap-3">
              <span className="font-label-sm text-label-sm text-on-surface-variant">1 booking quota left this cycle</span>
              <button className="px-4 py-2 rounded bg-surface-container-highest hover:bg-surface-bright text-secondary font-label-md text-label-md font-semibold transition-colors flex items-center gap-1.5" onClick={() => document.getElementById('booking-modal')?.classList.remove('hidden')}>
                <span className="material-symbols-outlined text-[18px]">add_circle</span> Request New 1-on-1 Session
              </button>
            </div>
          </div>
        </div>

        {/* Applications & Intro Call Tracker */}
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col gap-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Cohort Applications (§8)</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Advanced Crucible Tracker</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-surface-container-high text-secondary font-label-sm text-label-sm font-semibold">Step 2 of 3</span>
          </div>
          <div className="p-4 rounded-xl bg-surface-container flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold text-[18px]">Apex 2.0 (JEE Advanced Crucible)</span>
                <span className="font-label-sm text-label-sm text-outline">Application ID: APP-2026-ADV-0914</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-surface-container-highest text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" /> Under Verification
              </span>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-lowest flex items-start gap-2 mt-1">
              <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">phone_in_talk</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Mandatory 7-Day Intro Call Scheduled</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">Phone Call with NIT Lead Mentor: Saturday, Feb 28 • 4:00 PM IST</span>
                <span className="font-label-sm text-label-sm text-tertiary mt-0.5">Within 7-day admissions verification policy window</span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-outline italic">"Introductory phone call is conducted before manual payment recording &amp; enrollment activation."</p>
          </div>
        </div>
      </section>
      </div>

      {/* Modals */}
      <div className="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/80 backdrop-blur-md" id="booking-modal">
        <div className="w-full max-w-lg bg-surface-container-high rounded-xl p-6 flex flex-col gap-4 shadow-2xl border border-secondary/30">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Batch Spark 1.0 Mentorship</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Request 1-on-1 Faculty Session</h3>
            </div>
            <button className="p-1 rounded hover:bg-surface-container-highest text-on-surface-variant" onClick={() => document.getElementById('booking-modal')?.classList.add('hidden')}>
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-outline uppercase">Select Assigned Batch Faculty (§13.2)</label>
              <select className="w-full bg-surface-container-lowest p-2.5 rounded text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary" id="mentor-select">
                <option value="NM">Naitik Mujawadiya — Physics Lead (Thermodynamics &amp; Mechanics)</option>
                <option value="HP">Harshitraj Singh Panwar — Head JEE Strategist &amp; Advanced Mathematics</option>
                <option value="AK">Dr. Ananya Kaul — Physical &amp; Organic Chemistry Specialist</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-outline uppercase">Discussion Agenda / Weak Area Topic</label>
              <input className="w-full bg-surface-container-lowest p-2.5 rounded text-on-surface font-body-md text-body-md placeholder-outline focus:outline-none focus:ring-1 focus:ring-secondary" id="agenda-input" placeholder="e.g. Center of Mass impulse problems &amp; speed optimization" type="text" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-outline uppercase">Proposed Date</label>
                <input className="w-full bg-surface-container-lowest p-2.5 rounded text-on-surface font-label-md text-label-md focus:outline-none focus:ring-1 focus:ring-secondary" type="date" defaultValue="2026-03-02" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-outline uppercase">Preferred Window</label>
                <select className="w-full bg-surface-container-lowest p-2.5 rounded text-on-surface font-label-md text-label-md focus:outline-none focus:ring-1 focus:ring-secondary">
                  <option>Evening (5:00 PM - 5:30 PM)</option>
                  <option>Late Evening (8:30 PM - 9:00 PM)</option>
                </select>
              </div>
            </div>
            <div className="p-3 rounded bg-surface-container-lowest text-body-sm text-on-surface-variant flex items-start gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">verified_user</span>
              <span>1-on-1 requests are confirmed within 12 hours by faculty depending on classroom schedules.</span>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button className="px-4 py-2 rounded text-outline hover:text-on-surface font-label-md text-label-md" onClick={() => document.getElementById('booking-modal')?.classList.add('hidden')}>
              Cancel
            </button>
            <button className="px-5 py-2 rounded bg-secondary hover:bg-secondary-fixed-dim text-on-secondary font-label-md text-label-md font-bold shadow-md" onClick={() => { alert('Request submitted'); document.getElementById('booking-modal')?.classList.add('hidden'); }}>
              Confirm Request
            </button>
          </div>
        </div>
      </div>
      <div className="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/80 backdrop-blur-md" id="weekly-modal">
        <div className="w-full max-w-md bg-surface-container-high rounded-xl p-6 flex flex-col gap-4 shadow-2xl border border-secondary/30">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Weekly Cohort Call</h3>
            <button className="p-1 rounded hover:bg-surface-container-highest text-on-surface-variant" onClick={() => document.getElementById('weekly-modal')?.classList.add('hidden')}>
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-body-md text-body-md text-on-surface">
              <strong>Batch Spark 1.0 Live Room</strong> will open 10 minutes prior to scheduled start (Tomorrow at 7:20 PM IST).
            </p>
            <div className="p-3 rounded bg-surface-container-lowest flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">info</span>
              <span className="font-label-sm text-label-sm text-outline">Microphones will default to mute; prepare questions in the doubt text channel beforehand.</span>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <button className="px-4 py-2 rounded bg-secondary text-on-secondary font-label-md text-label-md font-bold" onClick={() => document.getElementById('weekly-modal')?.classList.add('hidden')}>
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  </StudentLayout>
  );
}
