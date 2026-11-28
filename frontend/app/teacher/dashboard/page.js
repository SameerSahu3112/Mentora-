"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { teacherAPI } from "@/app/lib/api";
import TeacherLayout from "@/app/components/layouts/TeacherLayout";
import ActionButton from "@/app/components/ui/ActionButton";
import StatusBadge from "@/app/components/ui/StatusBadge";

export default function TeacherDashboard() {
  const [stats, setStats] = useState({
    assigned_batches: 0,
    published_assets: 0,
    pending_1on1: 0,
    attendance_rate: "0%",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      teacherAPI.getMyBatches().catch(() => []),
      teacherAPI.getMyResources().catch(() => []),
      teacherAPI.getPendingMentorship().catch(() => []),
      teacherAPI.getAttendanceStats().catch(() => ({ rate: "0%" })),
    ]).then(([batches, resources, mentorship, attendance]) => {
      setStats({
        assigned_batches: Array.isArray(batches) ? batches.length : 0,
        published_assets: Array.isArray(resources)
          ? resources.filter((r) => r.status === "published").length
          : 0,
        pending_1on1: Array.isArray(mentorship)
          ? mentorship.filter((m) => m.status === "pending").length
          : 0,
        attendance_rate: attendance.rate || "0%",
      });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <TeacherLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse h-8 w-48 bg-surface-container rounded" />
        </div>
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout>
      <section className="relative overflow-hidden rounded-xl bg-surface-container-low p-6 shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-secondary/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-64 h-64 rounded-full bg-gradient-to-tr from-primary-container/30 to-transparent blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                Faculty Portal Active
              </span>
              <span className="font-label-sm text-label-sm text-outline px-2 py-0.5 rounded bg-surface-container-high">
                PRD §4.3 Compliant
              </span>
              <span className="font-label-sm text-label-sm text-secondary px-2 py-0.5 rounded bg-surface-container-highest">
                NIT-B Mentor Lead
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
              Welcome back, <span className="text-secondary font-display">Harshitraj Sir</span>
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Lead Faculty · Physics &amp; Problem Analytics. Student privacy shield currently active.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start xl:self-auto flex-wrap">
            <ActionButton variant="primary" size="md" icon="post_add">
              Draft New Resource
            </ActionButton>
            <ActionButton variant="outline" size="md" icon="verified">
              Dual Approval Hub
            </ActionButton>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 pt-4 border-t border-surface-container-high/60">
          <div className="p-4 rounded-xl bg-surface-container transition-transform hover:-translate-y-0.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Assigned Batches</span>
              <span className="material-symbols-outlined text-secondary text-[20px]">groups</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md font-bold text-on-surface">{stats.assigned_batches}</span>
              <span className="font-label-sm text-label-sm text-secondary">Active</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-1">Apex 1.0 · Spark 1.0</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-container transition-transform hover:-translate-y-0.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Published Assets</span>
              <span className="material-symbols-outlined text-primary text-[20px]">library_books</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md font-bold text-on-surface">{stats.published_assets}</span>
              <span className="font-label-sm text-label-sm text-tertiary">Live Content</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-1">Notes, DPPs &amp; Video Streams</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-container transition-transform hover:-translate-y-0.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">1-on-1 Pending</span>
              <span className="material-symbols-outlined text-secondary text-[20px]">schedule</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md font-bold text-secondary">{stats.pending_1on1}</span>
              <span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                Requires Action
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-1">25 min Doubt Clearing Slots</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-container transition-transform hover:-translate-y-0.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Cohort Attendance</span>
              <span className="material-symbols-outlined text-tertiary text-[20px]">equalizer</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md font-bold text-on-surface">{stats.attendance_rate}</span>
              <span className="font-label-sm text-label-sm text-tertiary">Weekly Avg</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden mt-1.5">
              <div className="h-full bg-secondary rounded-full" style={{ width: "94.2%" }} />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 p-4 rounded-xl bg-surface-container transition-transform hover:-translate-y-0.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Governance Queue</span>
              <span className="material-symbols-outlined text-secondary text-[20px]">policy</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md font-bold text-secondary">1</span>
              <span className="font-label-sm text-label-sm text-secondary-fixed-dim">Dual Review</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-1">Deletion §14 Dual-Sign</p>
          </div>
        </div>
      </section>

      {/* Grid: Roster Matrix & 1-on-1 Desk */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Module 1: Batches & Student Matrix */}
        <div className="xl:col-span-7 flex flex-col space-y-6">
          <div className="p-6 rounded-xl bg-surface-container-low shadow-lg flex flex-col h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-2 border-b border-outline-variant/20">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">grid_view</span>
                  <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                    Assigned Batches &amp; Student Matrix
                  </h2>
                </div>
                <p className="font-body-sm text-body-sm text-outline mt-0.5">
                  Track learning progress, topic velocity, and schedule interventions (§11)
                </p>
              </div>
              <div className="inline-flex p-1 rounded-xl bg-surface-container self-start sm:self-auto" id="batchTabs">
                <button className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-sm transition-all flex items-center gap-1.5">
                  <span>Apex 1.0</span>
                  <span className="px-1.5 py-0.2 rounded bg-surface text-secondary text-[10px]">Adv '26</span>
                </button>
                <button className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all flex items-center gap-1.5">
                  <span>Spark 1.0</span>
                  <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-outline text-[10px]">Apr '26</span>
                </button>
              </div>
            </div>

            {/* Privacy Shield Banner */}
            <div className="mb-4 p-3 rounded-xl bg-surface-container flex items-center justify-between gap-3 text-body-sm font-body-sm text-on-surface-variant">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary text-[18px]">lock</span>
                <span>Student direct contact information is shielded via <strong>Admin Privacy Guard</strong>. Faculty interactions are restricted to Portal Messaging and 1:1 Booking.</span>
              </div>
              <span className="shrink-0 px-2 py-0.5 rounded bg-surface-container-high font-label-sm text-label-sm text-secondary uppercase font-semibold">PERMISSIONS §4.3</span>
            </div>

            {/* Filter Chips Row */}
            <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
              <div className="flex items-center gap-2 flex-wrap" id="studentFilters">
                <button className="px-3 py-1 rounded-lg bg-surface-container-high text-secondary font-label-sm text-label-sm font-semibold transition-colors" data-filter="all">
                  All Students (48)
                </button>
                <button className="px-3 py-1 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1" data-filter="lagging">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Lagging (&lt;50%)
                </button>
                <button className="px-3 py-1 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors" data-filter="completed">
                  Completed DPPs
                </button>
                <button className="px-3 py-1 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors" data-filter="booked">
                  Booked 1:1
                </button>
              </div>
              <span className="font-label-sm text-label-sm text-outline">Showing 4 of 48 enrolled</span>
            </div>

            {/* Student Table */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="font-label-sm text-label-sm text-outline uppercase tracking-wider border-b border-outline-variant/20">
                    <th className="py-2.5 px-3">Student &amp; Roll</th>
                    <th className="py-2.5 px-3">Curriculum Progress</th>
                    <th className="py-2.5 px-3">Last Active Topic</th>
                    <th className="py-2.5 px-3">Mentorship Status</th>
                    <th className="py-2.5 px-3 text-right">Intervention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15 font-body-sm text-body-sm">
                  <tr className="hover:bg-surface-container/60 transition-colors group">
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-body-md font-semibold text-on-surface">Aarav Sharma</span>
                        <span className="font-label-sm text-label-sm text-outline">MENT-2026-0842</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="w-36">
                        <div className="flex items-center justify-between font-label-sm text-label-sm mb-1">
                          <span className="text-on-surface">75%</span>
                          <span className="text-outline">18/24 Mods</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-secondary rounded-full" style={{ width: "75%" }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-body-sm text-on-surface truncate max-w-[140px] block">Rigid Body Dynamics</span>
                      <span className="font-label-sm text-label-sm text-tertiary">Active Today</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">check_circle</span>
                        1 Active Slot
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-secondary hover:text-on-surface text-secondary font-label-sm text-label-sm transition-all" title="Log Faculty Assessment">
                        Note Focus
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container/60 transition-colors group">
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-body-md font-semibold text-on-surface">Priya Nambiar</span>
                        <span className="font-label-sm text-label-sm text-outline">MENT-2026-0619</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="w-36">
                        <div className="flex items-center justify-between font-label-sm text-label-sm mb-1">
                          <span className="text-on-surface">88%</span>
                          <span className="text-outline">21/24 Mods</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-tertiary rounded-full" style={{ width: "88%" }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-body-sm text-on-surface truncate max-w-[140px] block">Instantaneous Axis (IAOR)</span>
                      <span className="font-label-sm text-label-sm text-outline">Yesterday</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                        On Track
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-bright text-outline hover:text-on-surface font-label-sm text-label-sm transition-all">
                        View DPPs
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container/60 transition-colors group bg-error-container/10">
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-headline-sm text-body-md font-semibold text-on-surface">Rohan Verma</span>
                          <span className="w-2 h-2 rounded-full bg-error" title="Critical Lag"></span>
                        </div>
                        <span className="font-label-sm text-label-sm text-outline">MENT-2026-0704</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="w-36">
                        <div className="flex items-center justify-between font-label-sm text-label-sm mb-1">
                          <span className="text-error font-semibold">42%</span>
                          <span className="text-error">10/24 Mods</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-error rounded-full" style={{ width: "42%" }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-body-sm text-on-surface truncate max-w-[140px] block">Center of Mass Collisions</span>
                      <span className="font-label-sm text-label-sm text-error">Lagging 6 Days</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">alarm</span>
                        1:1 Pending
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold hover:bg-secondary-fixed transition-all shadow-sm">
                        Review Desk
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container/60 transition-colors group">
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-body-md font-semibold text-on-surface">Ananya Gupta</span>
                        <span className="font-label-sm text-label-sm text-outline">MENT-2026-0911</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="w-36">
                        <div className="flex items-center justify-between font-label-sm text-label-sm mb-1">
                          <span className="text-secondary font-semibold">92%</span>
                          <span className="text-outline">22/24 Mods</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-secondary rounded-full" style={{ width: "92%" }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-body-sm text-on-surface truncate max-w-[140px] block">Coriolis &amp; Fictitious Forces</span>
                      <span className="font-label-sm text-label-sm text-tertiary">Active Today</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm">
                        AIR &lt;500 Track
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-bright text-outline hover:text-on-surface font-label-sm text-label-sm transition-all">
                        Adv Sets
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-auto pt-4 flex items-center justify-between text-body-sm font-body-sm text-outline border-t border-outline-variant/20">
              <span>Student roster synchronized with Apex Central Registry.</span>
              <button className="text-secondary hover:underline font-label-sm text-label-sm flex items-center gap-1">
                <span>Export Roster Velocity (CSV)</span>
                <span className="material-symbols-outlined text-[14px]">download</span>
              </button>
            </div>
          </div>
        </div>

        {/* Module 2: 1-on-1 Mentorship Booking Desk */}
        <div className="xl:col-span-5 flex flex-col space-y-6">
          <div className="p-6 rounded-xl bg-surface-container-low shadow-lg flex flex-col h-full">
            <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-outline-variant/20">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">event_seat</span>
                  <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">1-on-1 Mentorship Desk</h2>
                </div>
                <p className="font-body-sm text-body-sm text-outline mt-0.5">Faculty slot approval &amp; rescheduling queue (§13.2)</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                3 Inbound
              </span>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1">
              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/20 transition-all hover:border-secondary/30 relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-body-md font-bold text-on-surface">Rohan Verma</span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container-high font-label-sm text-label-sm text-secondary">Spark 1.0</span>
                    </div>
                    <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[15px] text-secondary">calendar_today</span>
                      <span>Thursday, Feb 26 · 6:30 PM IST (25 min)</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-error-container/30 text-error font-label-sm text-label-sm font-semibold">Action Required</span>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-surface-container-low text-body-sm font-body-sm text-on-surface-variant">
                  <p className="text-outline text-label-sm font-label-sm uppercase tracking-wider mb-0.5">Focus Doubt Topic</p>
                  "Struggling with Center of Mass collisions in timed mock tests. Negative marking in Momentum Conservation is -8 in Test 04."
                </div>
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <button className="flex-1 min-w-[110px] py-1.5 px-3 rounded-lg bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold hover:bg-secondary-fixed transition-all flex items-center justify-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">check</span> Approve Slot
                  </button>
                  <button className="flex-1 min-w-[110px] py-1.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm transition-all flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">update</span> Propose Alternate
                  </button>
                  <button className="py-1.5 px-2.5 rounded-lg bg-surface-container-high text-error hover:bg-error-container/40 transition-all font-label-sm text-label-sm" title="Decline with academic note">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container/70 border border-primary-container/40 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-body-md font-bold text-on-surface">Kavita Nair</span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container-high font-label-sm text-label-sm text-primary">Apex 1.0</span>
                    </div>
                    <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[15px] text-tertiary">calendar_today</span>
                      <span>Friday, Feb 27 · 5:30 PM IST (25 min)</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-tertiary-container/40 text-tertiary-fixed-dim font-label-sm text-label-sm font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">videocam</span> Approved
                  </span>
                </div>
                <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="text-outline">Topic:</span> Rotational dynamics advanced trajectory paradoxes &amp; rolling without slipping constraints.
                </p>
                <div className="mt-3 flex items-center justify-between text-label-sm font-label-sm pt-2 border-t border-outline-variant/20">
                  <span className="text-tertiary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Mentora Meet Link Generated
                  </span>
                  <button className="text-secondary hover:underline flex items-center gap-0.5">
                    <span>View Brief</span>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/20 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-body-md font-bold text-on-surface">Aryan Deshmukh</span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container-high font-label-sm text-label-sm text-secondary">Spark 1.0</span>
                    </div>
                    <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[15px]">calendar_today</span>
                      <span>Saturday, Feb 28 · 7:00 PM IST (25 min)</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-outline font-label-sm text-label-sm">Pending</span>
                </div>
                <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="text-outline">Topic:</span> Reviewing DPP-04 negative marking reduction in Angular Momentum.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <button className="flex-1 py-1.5 px-3 rounded-lg bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold hover:bg-secondary-fixed transition-all flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check</span> Approve Slot
                  </button>
                  <button className="py-1.5 px-3 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-bright font-label-sm text-label-sm transition-all">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module 3: Curriculum & Resource Management Studio */}
      <section className="p-6 rounded-xl bg-surface-container-low shadow-lg flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">auto_stories</span>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Curriculum &amp; Resource Management Studio</h2>
            </div>
            <p className="font-body-sm text-body-sm text-outline mt-0.5">
              Physics faculty lecture modules, DPPs, and problem worksheets (§12 &amp; Permission Boundaries)
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3 py-1.5 rounded-lg bg-surface-container flex items-center gap-2 text-label-sm text-label-sm text-outline">
              <span className="material-symbols-outlined text-secondary text-[16px]">info</span>
              <span>Drafts &amp; Publish: Self-Serve · Permanent Deletion: Dual Admin Sign</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-primary-container/20 border-l-4 border-secondary flex items-start gap-4">
          <span className="material-symbols-outlined text-secondary text-[24px] mt-0.5 shrink-0">gavel</span>
          <div className="space-y-1">
            <h3 className="font-headline-sm text-body-md font-semibold text-secondary">Academic Content Governance Protocol (§12, §14)</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Faculty have full authority to draft, test, and publish study resources directly to assigned batches. Once published to enrolled aspirants, retraction, unpublishing, or permanent deletion enters the <strong>Admin Dual-Approval Queue</strong>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface-container flex flex-col justify-between space-y-4 transition-all hover:bg-surface-container-high/80 group">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2 py-0.5 rounded bg-tertiary-container/50 text-tertiary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> PUBLISHED
                </span>
                <span className="font-label-sm text-label-sm text-outline">PDF Notes</span>
              </div>
              <h4 className="font-headline-sm text-body-md font-bold text-on-surface group-hover:text-secondary transition-colors">
                Rigid Body Moment of Inertia - Complete Derivations
              </h4>
              <div className="space-y-1 text-body-sm font-body-sm text-outline">
                <p>Target: <span className="text-on-surface">Spark 1.0 &amp; Apex 1.0</span></p>
                <div className="flex items-center gap-3 font-label-sm text-label-sm pt-1">
                  <span className="flex items-center gap-1 text-on-surface"><span className="material-symbols-outlined text-[14px] text-secondary">visibility</span> 84 Views</span>
                  <span className="flex items-center gap-1 text-on-surface"><span className="material-symbols-outlined text-[14px] text-primary">download</span> 62 Downloads</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between gap-2">
              <button className="text-label-sm font-label-sm text-on-surface hover:text-secondary flex items-center gap-1 transition-colors">
                <span className="material-symbols-outlined text-[15px]">edit</span> Edit Metadata
              </button>
              <button className="text-label-sm font-label-sm text-error hover:underline flex items-center gap-0.5" title="Requires dual approval per PRD §12">
                <span className="material-symbols-outlined text-[15px]">delete_sweep</span> Request Deletion
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container flex flex-col justify-between space-y-4 transition-all hover:bg-surface-container-high/80 group">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2 py-0.5 rounded bg-tertiary-container/50 text-tertiary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> PUBLISHED
                </span>
                <span className="font-label-sm text-label-sm text-outline">DPP Worksheet</span>
              </div>
              <h4 className="font-headline-sm text-body-md font-bold text-on-surface group-hover:text-secondary transition-colors">
                DPP-04: Angular Momentum Conservation Problems
              </h4>
              <div className="space-y-1 text-body-sm font-body-sm text-outline">
                <p>Target: <span className="text-on-surface">Spark 1.0 (Class 12)</span></p>
                <div className="flex items-center gap-3 font-label-sm text-label-sm pt-1">
                  <span className="text-on-surface font-semibold">25 Numerical Questions</span>
                  <span className="text-tertiary">Active Submission</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between gap-2">
              <button className="text-label-sm font-label-sm text-on-surface hover:text-secondary flex items-center gap-1 transition-colors">
                <span className="material-symbols-outlined text-[15px]">edit</span> Edit
              </button>
              <button className="text-label-sm font-label-sm text-error hover:underline flex items-center gap-0.5" title="Requires dual approval">
                <span className="material-symbols-outlined text-[15px]">delete_sweep</span> Request Deletion
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container/60 border border-dashed border-secondary/40 flex flex-col justify-between space-y-4 transition-all hover:bg-surface-container">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> DRAFT
                </span>
                <span className="font-label-sm text-label-sm text-outline">Video + Notes</span>
              </div>
              <h4 className="font-headline-sm text-body-md font-bold text-on-surface">
                Gyroscope Precession &amp; Eulerian Angles Masterclass
              </h4>
              <div className="space-y-1 text-body-sm font-body-sm text-outline">
                <p>Target: <span className="text-secondary">Apex 1.0 (JEE Advanced)</span></p>
                <p className="font-label-sm text-label-sm text-secondary-fixed-dim pt-1">Recorded stream uploaded · 4 derivation slides pending review</p>
              </div>
            </div>
            <div className="pt-2 border-t border-outline-variant/20 flex items-center gap-2">
              <button className="flex-1 py-1.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold hover:bg-secondary-fixed transition-all text-center">
                Continue Editing
              </button>
              <button className="py-1.5 px-2 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm transition-all" title="Publish directly to batch">
                Publish
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-error-container/40 flex flex-col justify-between space-y-4 opacity-85">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2 py-0.5 rounded bg-error-container/30 text-error font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">lock_clock</span> PENDING ADMIN
                </span>
                <span className="font-label-sm text-label-sm text-outline">Archived PDF</span>
              </div>
              <h4 className="font-headline-sm text-body-md font-bold text-on-surface line-through opacity-75">
                Obsolete Mechanics Diagnostic Sheet v1
              </h4>
              <div className="space-y-1 text-body-sm font-body-sm text-outline">
                <p>Awaiting dual sign-off: <span className="text-error">Admin Review (§14)</span></p>
                <p className="font-label-sm text-label-sm text-outline-variant pt-1">Request ID: DEL-2026-0081 · Direct edit disabled</p>
              </div>
            </div>
            <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between text-label-sm font-label-sm text-outline">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">hourglass_top</span> In Queue
              </span>
              <span className="text-on-surface-variant font-semibold">Locked</span>
            </div>
          </div>
        </div>
      </section>

      {/* Module 4: Weekly Cohort Mentorship & Attendance Registry */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 p-6 rounded-xl bg-surface-container-low shadow-lg flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">videocam</span>
              <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Next Live Cohort</h3>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-surface-container-high to-surface-container space-y-4 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-2 -translate-y-2 w-20 h-20 rounded-full bg-secondary/10 blur-xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold uppercase">JEE Advanced</span>
                <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" /> Live in 4 hrs
                </span>
              </div>
              <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">Apex 1.0: Advanced Problem Solving Session</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Multi-body coupled rotation, slipping torques, and JEE Advanced 2016-2024 problem breakdowns.
              </p>
              <div className="pt-2 space-y-1 text-label-sm font-label-sm text-outline border-t border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span>Schedule:</span>
                  <span className="text-on-surface font-semibold">Tuesday · 7:30 PM IST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Expected Roster:</span>
                  <span className="text-secondary font-semibold">48 Students</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Platform:</span>
                  <span className="text-on-surface">Mentora Virtual Lab</span>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-surface-container flex items-start gap-2.5 text-body-sm font-body-sm text-outline">
              <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">lock_clock</span>
              <span>Recurring schedules managed by Admin. Teachers log session attendance and submit lecture telemetry.</span>
            </div>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-secondary text-on-secondary font-label-md text-label-md font-bold hover:bg-secondary-fixed-dim transition-all flex items-center justify-center gap-2 shadow-md shadow-secondary/10">
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            <span>Enter Faculty Studio</span>
          </button>
        </div>

        <div className="lg:col-span-8 p-6 rounded-xl bg-surface-container-low shadow-lg flex flex-col justify-between space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-outline-variant/20">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">how_to_reg</span>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Fast Attendance Marker Registry</h3>
                </div>
                <p className="font-body-sm text-body-sm text-outline mt-0.5">
                  Logging Session: <strong>Spark 1.0 - Rotation Week 08 (Feb 24, 2026)</strong>
                </p>
              </div>
              <div className="flex items-center gap-2 font-label-sm text-label-sm">
                <span className="px-2 py-1 rounded bg-surface-container text-tertiary font-semibold">46 Present</span>
                <span className="px-2 py-1 rounded bg-surface-container text-error font-semibold">3 Absent</span>
                <span className="px-2 py-1 rounded bg-surface-container text-secondary font-semibold">1 Excused</span>
              </div>
            </div>
            <div className="mt-4 space-y-2 max-h-[280px] overflow-y-auto pr-1">
              <div className="p-3 rounded-lg bg-surface-container flex items-center justify-between gap-3 transition-colors hover:bg-surface-container-high">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-label-sm text-label-sm font-bold">AS</span>
                  <div>
                    <p className="font-headline-sm text-body-sm font-semibold text-on-surface">Aarav Sharma</p>
                    <p className="font-label-sm text-label-sm text-outline">Roll: MENT-2026-0842 · Joined 7:28 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5" data-student="aarav">
                  <button className="attendance-btn px-3 py-1 rounded font-label-sm text-label-sm bg-tertiary-container text-tertiary-fixed font-semibold">Present</button>
                  <button className="attendance-btn px-2.5 py-1 rounded font-label-sm text-label-sm text-outline hover:text-on-surface">Absent</button>
                  <button className="attendance-btn px-2.5 py-1 rounded font-label-sm text-label-sm text-outline hover:text-on-surface">Excused</button>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-container flex items-center justify-between gap-3 transition-colors hover:bg-surface-container-high">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-label-sm text-label-sm font-bold">PN</span>
                  <div>
                    <p className="font-headline-sm text-body-sm font-semibold text-on-surface">Priya Nambiar</p>
                    <p className="font-label-sm text-label-sm text-outline">Roll: MENT-2026-0619 · Joined 7:29 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5" data-student="priya">
                  <button className="attendance-btn px-3 py-1 rounded font-label-sm text-label-sm bg-tertiary-container text-tertiary-fixed font-semibold">Present</button>
                  <button className="attendance-btn px-2.5 py-1 rounded font-label-sm text-label-sm text-outline hover:text-on-surface">Absent</button>
                  <button className="attendance-btn px-2.5 py-1 rounded font-label-sm text-label-sm text-outline hover:text-on-surface">Excused</button>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-error-container/10 border border-error-container/30 flex items-center justify-between gap-3 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-error-container/40 text-error flex items-center justify-center font-label-sm text-label-sm font-bold">RV</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-headline-sm text-body-sm font-semibold text-on-surface">Rohan Verma</p>
                      <span className="px-1.5 py-0.2 rounded bg-error-container text-on-error-container font-label-sm text-[10px]">Notice Sent</span>
                    </div>
                    <p className="font-label-sm text-label-sm text-error">Unexcused Missed Session</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5" data-student="rohan">
                  <button className="attendance-btn px-2.5 py-1 rounded font-label-sm text-label-sm text-outline hover:text-on-surface">Present</button>
                  <button className="attendance-btn px-3 py-1 rounded font-label-sm text-label-sm bg-error-container text-on-error-container font-semibold">Absent</button>
                  <button className="attendance-btn px-2.5 py-1 rounded font-label-sm text-label-sm text-outline hover:text-on-surface">Excused</button>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-container flex items-center justify-between gap-3 transition-colors hover:bg-surface-container-high">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-label-sm text-label-sm font-bold">AG</span>
                  <div>
                    <p className="font-headline-sm text-body-sm font-semibold text-on-surface">Ananya Gupta</p>
                    <p className="font-label-sm text-label-sm text-outline">Roll: MENT-2026-0911 · Joined 7:31 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5" data-student="ananya">
                  <button className="attendance-btn px-3 py-1 rounded font-label-sm text-label-sm bg-tertiary-container text-tertiary-fixed font-semibold">Present</button>
                  <button className="attendance-btn px-2.5 py-1 rounded font-label-sm text-label-sm text-outline hover:text-on-surface">Absent</button>
                  <button className="attendance-btn px-2.5 py-1 rounded font-label-sm text-label-sm text-outline hover:text-on-surface">Excused</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TeacherLayout>
  );
}
