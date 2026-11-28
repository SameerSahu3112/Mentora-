"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminAPI } from "@/app/lib/api";
import SectionHeader from "@/app/components/ui/SectionHeader";
import KPICard from "@/app/components/ui/KPICard";
import StatusBadge from "@/app/components/ui/StatusBadge";
import ActionButton from "@/app/components/ui/ActionButton";
import AdminLayout from "@/app/components/layouts/AdminLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_students: 0,
    active_enrollments: 0,
    pending_applications: 0,
    pending_payments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminAPI.getStudents().catch(() => []),
      adminAPI.getEnrollments().catch(() => []),
      adminAPI.getApplications().catch(() => []),
      adminAPI.getPayments().catch(() => []),
    ]).then(([students, enrollments, applications, payments]) => {
      setStats({
        total_students: Array.isArray(students) ? students.length : 0,
        active_enrollments: Array.isArray(enrollments)
          ? enrollments.filter((e) => e.status === "active").length
          : 0,
        pending_applications: Array.isArray(applications)
          ? applications.filter((a) => a.status === "pending").length
          : 0,
        pending_payments: Array.isArray(payments)
          ? payments.filter((p) => p.status === "pending_payment").length
          : 0,
      });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse h-8 w-48 bg-surface-container rounded" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="flex flex-col lg:flex-row justify-between gap-6 p-6 rounded-xl bg-surface-container-low shadow-md relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 via-tertiary/5 to-transparent blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
            PRD §16 Executive Console
          </div>
          <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface">
            Institution Operations &amp; Governance Console
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Cryptographic Dual-Admin Governance Active • Mutual authorization enforced across batch life-cycle and roster mutations.
          </p>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-4 shrink-0 bg-surface-container px-4 py-2 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-md text-label-md font-bold ring-2 ring-surface">
                H
              </div>
              <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-md text-label-md font-bold ring-2 ring-surface">
                N
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase">Dual Keys Online</span>
              <span className="font-body-sm text-body-sm text-on-surface truncate">Admin 1 • Admin 2</span>
            </div>
          </div>
          <div className="h-8 w-px bg-outline-variant/30 hidden sm:block" />
          <div className="flex items-center gap-2">
            <ActionButton variant="outline" size="sm" icon="lock_reset">
              Rotate Keys
            </ActionButton>
            <ActionButton variant="primary" size="sm" icon="sync">
              Re-Sync Roster
            </ActionButton>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard label="Registered Aspirants" value={stats.total_students} delta="+18%" deltaLabel="this month" icon="group" variant="primary" />
        <KPICard label="Seat Occupancy" value="91.4%" delta="137 / 150 Seats" deltaLabel="0 Overbooked" icon="pie_chart" variant="secondary" />
        <KPICard label="§14 Pending Approvals" value="3 Critical" delta="Requires Admin 2 Co-Sign" icon="key" variant="secondary" />
        <KPICard label="7-Day Intro SLA" value="6 Due" delta="2 Critical (&lt;24h)" icon="ring_volume" variant="error" />
        <KPICard label="Manual Payments" value="₹18,400" delta="7 Transactions Pending" icon="account_balance_wallet" variant="tertiary" />
        <KPICard label="Mentorship Syncs" value="14 Syncs" delta="96.8% Faculty Attend" icon="school" variant="primary" />
      </section>

      {/* Two-Admin Dual-Approval Governance Desk */}
      <section className="flex flex-col rounded-xl bg-surface-container-low overflow-hidden shadow-sm">
        <div className="p-6 bg-surface-container flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded bg-secondary-container/40 text-secondary shrink-0">
              <span className="material-symbols-outlined text-[24px]">gavel</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Two-Admin Dual-Approval Governance Desk
                </h2>
                <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary font-label-sm text-label-sm font-semibold">
                  PRD §14 Protocol
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Single-admin bypass prohibited by database constraint.
                <code className="font-label-sm text-label-sm bg-surface-container-lowest px-1.5 py-0.5 rounded text-secondary">
                  CHECK(first_approver_id &lt;&gt; second_approver_id)
                </code>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant bg-surface-container-lowest px-3 py-1.5 rounded">
            <span className="material-symbols-outlined text-[16px] text-tertiary">fingerprint</span>
            <span>SHA-256 Ledger: #APPR-2026-8812</span>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="p-4 rounded-lg bg-surface-container flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-surface-container-high transition-colors">
            <div className="flex flex-col gap-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-error/20 text-error font-label-sm text-label-sm font-semibold uppercase">
                  High Impact
                </span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Remove Cohort Batch: Apex 2.0
                </span>
                <span className="text-on-surface-variant font-label-sm text-label-sm">• Requested 3h ago</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <span className="text-secondary font-semibold">Reason:</span> Consolidated with Apex 1.0 due to faculty capacity schedule.
              </p>
              <div className="flex items-center gap-4 text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1 text-tertiary">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  Admin 1 Approved
                </span>
                <span className="flex items-center gap-1 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
                  Awaiting Admin 2 Co-Signature
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <ActionButton variant="outline" size="sm" icon="visibility">
                Payload Diff
              </ActionButton>
              <ActionButton variant="danger" size="sm" icon="close">
                Reject
              </ActionButton>
              <ActionButton variant="primary" size="sm" icon="verified">
                Sign &amp; Execute
              </ActionButton>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-surface-container flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-surface-container-high transition-colors">
            <div className="flex flex-col gap-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold uppercase">
                  Content Purge
                </span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Permanent Resource Deletion: Obsolete Rotational Dynamics v1.pdf
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <span className="text-secondary font-semibold">Reason:</span> Superseded by updated syllabus derivations.
              </p>
              <div className="flex items-center gap-4 text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1 text-tertiary">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  Admin 1 Approved
                </span>
                <span className="flex items-center gap-1 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[14px]">key</span>
                  Pending Second Key
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <ActionButton variant="outline" size="sm" icon="history_edu">
                Audit Manifest
              </ActionButton>
              <ActionButton variant="primary" size="sm" icon="draw">
                Approve Deletion
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <section className="xl:col-span-7 flex flex-col rounded-xl bg-surface-container-low shadow-sm overflow-hidden">
          <div className="p-6 bg-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Intro Phone Call Queue
                </h2>
                <span className="px-2 py-0.5 rounded bg-error/20 text-error font-label-sm text-label-sm font-semibold">
                  7-Day Contact SLA
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Admin must record call outcome &amp; baseline academic alignment prior to activation.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <ActionButton variant="outline" size="sm" icon="file_download">
                Export
              </ActionButton>
              <ActionButton variant="primary" size="sm" icon="add">
                Log Intake
              </ActionButton>
            </div>
          </div>
          <div className="p-4 flex flex-col divide-y divide-outline-variant/15">
            <div className="py-4 first:pt-0 last:pb-0 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary text-label-lg">
                    AS
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-label-md text-label-md font-bold text-on-surface">Aarav Sharma</span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm">
                        Class 12
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-primary-container/40 text-primary font-label-sm text-label-sm">
                        Spark 1.0 (April Depth)
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-label-sm text-label-sm text-on-surface-variant">
                      <a className="flex items-center gap-1 text-tertiary hover:underline" href="tel:+919876543210">
                        <span className="material-symbols-outlined text-[14px]">call</span>
                        +91 98765-43210
                      </a>
                      <span>• Registered 2d ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-end justify-between sm:justify-center">
                  <span className="px-2 py-0.5 rounded bg-tertiary-container/60 text-tertiary font-label-sm text-label-sm font-semibold">
                    SCHEDULED: Today, 5:30 PM
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">5 days SLA left</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate max-w-md">
                  Focus: Weak in Rotational Kinematics &amp; Organic Chemistry synthesis mechanisms.
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <ActionButton variant="outline" size="sm" icon="event_available">
                    Reschedule
                  </ActionButton>
                  <ActionButton variant="primary" size="sm" icon="edit_note">
                    Log Outcome
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="xl:col-span-5 flex flex-col rounded-xl bg-surface-container-low shadow-sm overflow-hidden">
          <div className="p-6 bg-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Manual Payment Register
                </h2>
                <span className="px-2 py-0.5 rounded bg-tertiary-container/50 text-tertiary font-label-sm text-label-sm font-semibold">
                  PRD §9
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Zero-Gateway Direct UPI/NEFT manual reconciliation &amp; immediate access provisioning.
              </p>
            </div>
            <span className="px-2 py-1 rounded bg-surface-container-lowest text-secondary font-label-sm text-label-sm font-mono self-start sm:self-auto">
              7 Pending
            </span>
          </div>
          <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[560px]">
            <div className="p-4 rounded-lg bg-surface-container flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Rohan Verma</span>
                    <span className="font-label-sm text-label-sm text-secondary font-mono">MENT-2026-0704</span>
                  </div>
                  <span className="text-on-surface-variant font-body-sm text-body-sm">
                    Course: Spark 1.0 • Quoted: ₹499
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-headline-sm text-headline-sm font-bold text-secondary">₹499</span>
                  <div className="font-label-sm text-label-sm text-tertiary">UPI Transfer</div>
                </div>
              </div>
              <div className="p-2 rounded bg-surface-container-lowest font-label-sm text-label-sm flex items-center justify-between">
                <span className="text-on-surface-variant font-mono truncate">Ref: UPI/402918291024@okaxis</span>
                <button className="text-secondary hover:underline shrink-0 flex items-center gap-0.5">
                  <span>Verify Match</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Buffer: Access to Exam +7d</span>
                <div className="flex items-center gap-2">
                  <ActionButton variant="danger" size="sm" icon="close">
                    Discrepancy
                  </ActionButton>
                  <ActionButton variant="primary" size="sm" icon="bolt">
                    Activate Roster
                  </ActionButton>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-surface-container flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Ananya Gupta</span>
                    <span className="font-label-sm text-label-sm text-secondary font-mono">MENT-2026-0911</span>
                  </div>
                  <span className="text-on-surface-variant font-body-sm text-body-sm">
                    Course: Apex 1.0 (Crucible)
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary">Discount: ₹100 (Merit Scholarship)</span>
                </div>
                <div className="text-right">
                  <div className="line-through text-on-surface-variant font-label-sm text-label-sm">₹699</div>
                  <span className="font-headline-sm text-headline-sm font-bold text-secondary">₹599</span>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">IMPS / NEFT</div>
                </div>
              </div>
              <div className="p-2 rounded bg-surface-container-lowest font-label-sm text-label-sm flex items-center justify-between">
                <span className="text-on-surface-variant font-mono truncate">Ref: HDFC0001829281</span>
                <button className="text-secondary hover:underline shrink-0 flex items-center gap-0.5">
                  <span>View Slip</span>
                  <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                </button>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Routine 1-Click Action</span>
                <div className="flex items-center gap-2">
                  <ActionButton variant="danger" size="sm" icon="close">
                    Flag
                  </ActionButton>
                  <ActionButton variant="primary" size="sm" icon="bolt">
                    Activate Roster
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="flex flex-col rounded-xl bg-surface-container-low shadow-sm overflow-hidden">
        <div className="p-6 bg-surface-container flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Batch Capacity &amp; Concurrency Engine
              </h2>
              <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold">
                PRD §5.2 - §5.3
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Strict no-waitlist caps enforced via concurrency locks. Real-time seat consumption across active cohorts.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ActionButton variant="outline" size="sm">
              Manage Faculty Allocation
            </ActionButton>
            <ActionButton variant="primary" size="sm" icon="add_circle">
              + Create New Batch
            </ActionButton>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-surface-container flex flex-col justify-between gap-4 hover:bg-surface-container-high transition-colors">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">Rise 1.0</span>
                <span className="px-2 py-0.5 rounded bg-tertiary-container text-tertiary font-label-sm text-label-sm font-semibold">
                  ACTIVE
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Class 11 &amp; 12 Jan Sprint Cohort</span>
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Capacity Fill</span>
                  <span className="text-secondary font-bold">38 / 50 seats (76%)</span>
                </div>
                <div className="w-full bg-surface-container-lowest rounded-full h-2 overflow-hidden">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: "76%" }} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Faculty: Harshitraj Sir</span>
                <span>MWF 6:00 PM</span>
              </div>
              <ActionButton variant="outline" size="sm">
                Configure Roster • 12 Seats Left
              </ActionButton>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-surface-container flex flex-col justify-between gap-4 hover:bg-surface-container-high transition-colors">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">Spark 1.0</span>
                <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">
                  NEAR CAPACITY
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Class 12 &amp; Droppers April Depth</span>
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Capacity Fill</span>
                  <span className="text-secondary font-bold">47 / 50 seats (94%)</span>
                </div>
                <div className="w-full bg-surface-container-lowest rounded-full h-2 overflow-hidden">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: "94%" }} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Faculty: Harshitraj + Naitik</span>
                <span>Daily 7:30 PM</span>
              </div>
              <ActionButton variant="outline" size="sm">
                Concurrency Guard: 3 Seats Left
              </ActionButton>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-surface-container flex flex-col justify-between gap-4 hover:bg-surface-container-high transition-colors">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">Apex 1.0</span>
                <span className="px-2 py-0.5 rounded bg-error/20 text-error font-label-sm text-label-sm font-bold animate-pulse">
                  LOCK IMMINENT
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Advanced Crucible (Top 50 Rank Focus)</span>
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Capacity Fill</span>
                  <span className="text-error font-bold">48 / 50 seats (96%)</span>
                </div>
                <div className="w-full bg-surface-container-lowest rounded-full h-2 overflow-hidden">
                  <div className="bg-error h-2 rounded-full" style={{ width: "96%" }} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Faculty: Naitik Sir</span>
                <span>Strict No Waitlist</span>
              </div>
              <ActionButton variant="outline" size="sm">
                Auto-Lock at 50 Enforced (§5.3)
              </ActionButton>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-surface-container/60 flex flex-col justify-between gap-4 opacity-85 hover:opacity-100 transition-opacity">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface-variant">Apex 2.0</span>
                <span className="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm font-semibold">
                  PENDING §14
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Elite Problem Solving Cohort</span>
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Capacity Fill</span>
                  <span className="text-on-surface-variant font-bold">4 / 50 seats (8%)</span>
                </div>
                <div className="w-full bg-surface-container-lowest rounded-full h-2 overflow-hidden">
                  <div className="bg-outline-variant h-2 rounded-full" style={{ width: "8%" }} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Merger Target: Apex 1.0</span>
                <span>Awaiting Co-Sign</span>
              </div>
              <ActionButton variant="outline" size="sm">
                Review Merge Manifest
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col rounded-xl bg-surface-container-low shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-tertiary">history</span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Real-Time Administrative Audit Stream (§20)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Tamper-Proof Ledger</span>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="p-3 rounded bg-surface-container flex flex-col gap-1">
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-primary font-semibold">Admin 1 (Harshitraj S.)</span>
              <span className="text-on-surface-variant font-mono text-xs">14:32:18</span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">Enrollment activated: MENT-2026-0704</div>
          </div>
          <div className="p-3 rounded bg-surface-container flex flex-col gap-1">
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-secondary font-semibold">Admin 2 (Naitik M.)</span>
              <span className="text-on-surface-variant font-mono text-xs">14:28:04</span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">Payment verified: ₹499 UPI/402918291024</div>
          </div>
          <div className="p-3 rounded bg-surface-container flex flex-col gap-1">
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-primary font-semibold">Admin 1 (Harshitraj S.)</span>
              <span className="text-on-surface-variant font-mono text-xs">14:15:33</span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">Approval vote cast: Remove Batch Apex 2.0</div>
          </div>
          <div className="p-3 rounded bg-surface-container flex flex-col gap-1">
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-secondary font-semibold">System</span>
              <span className="text-on-surface-variant font-mono text-xs">14:10:12</span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">Seat lock released: Spark 1.0 (3 seats)</div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}
