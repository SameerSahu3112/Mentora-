"use client";

import { useState } from 'react';

export default function AdminDashboard() {
  const [auditExpanded, setAuditExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      {/* TOP HEADER / EXECUTIVE TELEMETRY STRIP */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 md:p-6 rounded-xl bg-surface-container-low shadow-md relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 via-tertiary/5 to-transparent blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
              PRD §16 Executive Console
            </span>
            <span className="text-on-surface-variant font-label-sm text-label-sm">Cycle: JEE Main &amp; Advanced 2026</span>
          </div>
          <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface">
            Institution Operations &amp; Governance Console
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Cryptographic Dual-Admin Governance Active • Mutual authorization enforced across batch life-cycle and roster mutations.
          </p>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0 bg-surface-container px-3 py-1 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-md text-label-md font-bold ring-2 ring-surface">H</div>
              <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-md text-label-md font-bold ring-2 ring-surface">N</div>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase">Dual Keys Online</span>
              <span className="font-body-sm text-body-sm text-on-surface truncate">Harshitraj S. (Adm 1) • Naitik M. (Adm 2)</span>
            </div>
          </div>
          <div className="h-8 w-px bg-outline-variant/30 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-colors" type="button">
              <span className="material-symbols-outlined text-[16px] text-tertiary">lock_reset</span>
              Rotate Keys
            </button>
            <button className="px-3 py-1.5 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors shadow-sm" type="button">
              <span className="material-symbols-outlined text-[16px]">sync</span>
              Re-Sync Roster
            </button>
          </div>
        </div>
      </section>

      {/* KPI METRICS GRID: 6 CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2">
        <div className="p-3 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Registered Aspirants</span>
            <span className="p-1.5 rounded bg-primary-container/40 text-primary">
              <span className="material-symbols-outlined text-[18px]">group</span>
            </span>
          </div>
          <div className="my-1">
            <div className="font-headline-md text-headline-md font-bold text-on-surface">1,248</div>
            <div className="flex items-center gap-1 mt-1 text-tertiary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+18% this month</span>
            </div>
          </div>
          <div className="text-on-surface-variant font-label-sm text-label-sm">412 Enrolled • 836 In Funnel</div>
        </div>
        <div className="p-3 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Seat Occupancy</span>
            <span className="p-1.5 rounded bg-secondary-container/40 text-secondary">
              <span className="material-symbols-outlined text-[18px]">pie_chart</span>
            </span>
          </div>
          <div className="my-1">
            <div className="font-headline-md text-headline-md font-bold text-secondary">91.4%</div>
            <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-1 overflow-hidden">
              <div className="bg-secondary h-1.5 rounded-full" style={{ width: "91.4%" }}></div>
            </div>
          </div>
          <div className="text-on-surface-variant font-label-sm text-label-sm">137 / 150 Seats • 0 Overbooked</div>
        </div>
        <div className="p-3 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">§14 Pending Approvals</span>
            <span className="p-1.5 rounded bg-secondary text-on-secondary font-bold font-label-sm text-label-sm">3 REQ</span>
          </div>
          <div className="my-1">
            <div className="font-headline-md text-headline-md font-bold text-on-surface">3 Critical</div>
            <div className="flex items-center gap-1 mt-1 text-secondary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px]">key</span>
              <span>Requires Admin 2 Co-Sign</span>
            </div>
          </div>
          <div className="text-on-surface-variant font-label-sm text-label-sm">0 Expired • Checkbox Protocol</div>
        </div>
        <div className="p-3 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">7-Day Intro SLA</span>
            <span className="p-1.5 rounded bg-error/20 text-error">
              <span className="material-symbols-outlined text-[18px]">ring_volume</span>
            </span>
          </div>
          <div className="my-1">
            <div className="font-headline-md text-headline-md font-bold text-error">6 Due</div>
            <div className="flex items-center gap-1 mt-1 text-error font-label-sm text-label-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
              <span>2 Critical SLA (&lt;24h)</span>
            </div>
          </div>
          <div className="text-on-surface-variant font-label-sm text-label-sm">4 Due within 48h window</div>
        </div>
        <div className="p-3 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Manual Payments</span>
            <span className="p-1.5 rounded bg-tertiary-container/50 text-tertiary">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            </span>
          </div>
          <div className="my-1">
            <div className="font-headline-md text-headline-md font-bold text-tertiary truncate">₹18,400</div>
            <div className="flex items-center gap-1 mt-1 text-on-surface-variant font-label-sm text-label-sm">
              <span>7 Transactions Pending</span>
            </div>
          </div>
          <div className="text-on-surface-variant font-label-sm text-label-sm">Zero-Gateway Manual Reconciliation</div>
        </div>
        <div className="p-3 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Mentorship Syncs</span>
            <span className="p-1.5 rounded bg-surface-container-highest text-primary">
              <span className="material-symbols-outlined text-[18px]">school</span>
            </span>
          </div>
          <div className="my-1">
            <div className="font-headline-md text-headline-md font-bold text-on-surface">14 Syncs</div>
            <div className="flex items-center gap-1 mt-1 text-tertiary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>96.8% Faculty Attend</span>
            </div>
          </div>
          <div className="text-on-surface-variant font-label-sm text-label-sm">Rise, Spark &amp; Apex Cohorts</div>
        </div>
      </section>

      {/* TWO-ADMIN DUAL-APPROVAL GOVERNANCE DESK */}
      <section className="flex flex-col rounded-xl bg-surface-container-low overflow-hidden shadow-sm">
        <div className="p-4 bg-surface-container flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-2">
            <div className="p-1 rounded bg-secondary-container/40 text-secondary shrink-0">
              <span className="material-symbols-outlined text-[24px]">gavel</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Two-Admin Dual-Approval Governance Desk</h2>
                <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary font-label-sm text-label-sm font-semibold">PRD §14 Protocol</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Single-admin bypass prohibited by database constraint <code className="font-label-sm text-label-sm bg-surface-container-lowest px-1.5 py-0.5 rounded text-secondary">CHECK(first_approver_id &lt;&gt; second_approver_id)</code>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-0.5 font-label-sm text-label-sm text-on-surface-variant bg-surface-container-lowest px-3 py-1.5 rounded">
            <span className="material-symbols-outlined text-[16px] text-tertiary">fingerprint</span>
            <span>SHA-256 Ledger: #APPR-2026-8812</span>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          {/* Ticket 1 */}
          <div className="p-2 rounded-lg bg-surface-container flex flex-col lg:flex-row lg:items-center justify-between gap-2 hover:bg-surface-container-high transition-colors">
            <div className="flex flex-col gap-1 max-w-2xl">
              <div className="flex flex-wrap items-center gap-1">
                <span className="px-2 py-0.5 rounded bg-error/20 text-error font-label-sm text-label-sm font-semibold uppercase">High Impact</span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">Remove Cohort Batch: Apex 2.0 (Elite Problem Solving)</span>
                <span className="text-on-surface-variant font-label-sm text-label-sm">• Requested 3h ago</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <span className="text-secondary font-semibold">Reason:</span> Consolidated with Apex 1.0 due to faculty capacity schedule. Current 4 enrolled students to be reassigned automatically.
              </p>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1 text-tertiary">
                  <span className="material-symbols-outlined text-[14px]">check</span> Harshitraj S. (Adm 1) Approved
                </span>
                <span className="flex items-center gap-1 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[14px]">hourglass_top</span> Awaiting Naitik M. (Adm 2) Co-Signature
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className="px-3 py-1.5 rounded bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-label-md text-label-md flex items-center gap-1 transition-colors" type="button">
                <span className="material-symbols-outlined text-[16px]">visibility</span> Payload Diff
              </button>
              <button className="px-3 py-1.5 rounded bg-surface-container-lowest hover:bg-error/30 text-error font-label-md text-label-md transition-colors" type="button">Reject</button>
              <button className="px-4 py-1.5 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors shadow-sm" type="button">
                <span className="material-symbols-outlined text-[16px]">verified</span> Sign &amp; Execute (Admin 2)
              </button>
            </div>
          </div>
          {/* Ticket 2 */}
          <div className="p-2 rounded-lg bg-surface-container flex flex-col lg:flex-row lg:items-center justify-between gap-2 hover:bg-surface-container-high transition-colors">
            <div className="flex flex-col gap-1 max-w-2xl">
              <div className="flex flex-wrap items-center gap-1">
                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold uppercase">Content Purge</span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">Permanent Resource Deletion: Obsolete Rotational Dynamics Derivations v1.pdf</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <span className="text-secondary font-semibold">Reason:</span> Superseded by DPP-04 updated syllabus derivations with 2025 JEE Advanced format. File size: 24.8 MB.
              </p>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1 text-tertiary">
                  <span className="material-symbols-outlined text-[14px]">check</span> Harshitraj S. (Adm 1) Approved
                </span>
                <span className="flex items-center gap-1 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[14px]">key</span> Pending Second Key
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className="px-3 py-1.5 rounded bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-label-md text-label-md flex items-center gap-1 transition-colors" type="button">
                <span className="material-symbols-outlined text-[16px]">history_edu</span> Audit Manifest
              </button>
              <button className="px-4 py-1.5 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors shadow-sm" type="button">
                <span className="material-symbols-outlined text-[16px]">draw</span> Approve Deletion
              </button>
            </div>
          </div>
          {/* Ticket 3 */}
          <div className="p-2 rounded-lg bg-surface-container flex flex-col lg:flex-row lg:items-center justify-between gap-2 hover:bg-surface-container-high transition-colors">
            <div className="flex flex-col gap-1 max-w-2xl">
              <div className="flex flex-wrap items-center gap-1">
                <span className="px-2 py-0.5 rounded bg-tertiary-container text-tertiary font-label-sm text-label-sm font-semibold uppercase">Pricing Governance</span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">Tuition Price Adjustment: Spark 2.0 Cohort ₹499 → ₹449 Early Bird</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <span className="text-secondary font-semibold">Reason:</span> Time-bounded holiday promotional window for Class 12 aspirants. Margin threshold remains above minimum operational SLA.
              </p>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[14px]">pending_actions</span> Pending Initial Vote (0 / 2 signatures recorded)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className="px-3 py-1.5 rounded bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors" type="button">
                Pricing Impact Graph
              </button>
              <button className="px-4 py-1.5 rounded bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors" type="button">
                <span className="material-symbols-outlined text-[16px]">how_to_vote</span> Cast Initial Vote (Adm 1)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN WORKFLOW GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* LEFT: 7-DAY INTRODUCTORY CALL SLA DISPATCH QUEUE */}
        <section className="xl:col-span-7 flex flex-col rounded-xl bg-surface-container-low shadow-sm overflow-hidden">
          <div className="p-4 bg-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Intro Phone Call Queue</h2>
                <span className="px-2 py-0.5 rounded bg-error/20 text-error font-label-sm text-label-sm font-semibold">7-Day Contact SLA</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Admin must record call outcome &amp; baseline academic alignment prior to activation.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="px-3 py-1.5 rounded bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1 transition-colors" type="button">
                <span className="material-symbols-outlined text-[16px]">file_download</span> Export
              </button>
              <button className="px-3 py-1.5 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-md text-label-md font-semibold flex items-center gap-1 transition-colors" type="button">
                <span className="material-symbols-outlined text-[16px]">add</span> Log Intake
              </button>
            </div>
          </div>
          <div className="p-2 flex flex-col divide-y divide-outline-variant/15">
            {/* Aarav Sharma */}
            <div className="py-2 first:pt-0 last:pb-0 flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary text-label-lg font-label-lg">AS</div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-label-md text-label-md font-bold text-on-surface">Aarav Sharma</span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm">Class 12</span>
                      <span className="px-1.5 py-0.2 rounded bg-primary-container/40 text-primary font-label-sm text-label-sm">Spark 1.0 (April Depth)</span>
                    </div>
                    <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                      <a className="flex items-center gap-1 text-tertiary hover:underline" href="tel:+919876543210">
                        <span className="material-symbols-outlined text-[14px]">call</span> +91 98765-43210
                      </a>
                      <span>• Registered 2d ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-end justify-between sm:justify-center">
                  <span className="px-2 py-0.5 rounded bg-tertiary-container/60 text-tertiary font-label-sm text-label-sm font-semibold">SCHEDULED: Today, 5:30 PM</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">5 days SLA left</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate max-w-md">Focus: Weak in Rotational Kinematics &amp; Organic Chemistry synthesis mechanisms.</p>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="px-3 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors" type="button">Reschedule</button>
                  <button className="px-3 py-1 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-sm text-label-sm font-bold flex items-center gap-1 transition-colors" type="button">
                    <span className="material-symbols-outlined text-[14px]">edit_note</span> Log Outcome
                  </button>
                </div>
              </div>
            </div>
            {/* Isha Sundaram - CRITICAL SLA */}
            <div className="py-2 flex flex-col gap-1 bg-error/5 -mx-2 px-2 rounded">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center font-bold text-error text-label-lg font-label-lg">IS</div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-label-md text-label-md font-bold text-on-surface">Isha Sundaram</span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm">Class 11</span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Rise 1.0 (Jan Fast-Track)</span>
                    </div>
                    <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                      <a className="flex items-center gap-1 text-tertiary hover:underline" href="tel:+919422188901">
                        <span className="material-symbols-outlined text-[14px]">call</span> +91 94221-88901
                      </a>
                      <span>• Registered 6d ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-end justify-between sm:justify-center">
                  <span className="px-2 py-0.5 rounded bg-error text-on-error font-label-sm text-label-sm font-bold animate-pulse">URGENT: 18h Remaining</span>
                  <span className="font-label-sm text-label-sm text-error mt-0.5 font-semibold">First Attempt Pending</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <p className="font-body-sm text-body-sm text-error/90 truncate max-w-md">SLA Expiration Warning: Intro contact required before automatic queue de-prioritization.</p>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="px-3 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm transition-colors" type="button">Mark Missed</button>
                  <button className="px-3 py-1 rounded bg-error text-on-error hover:bg-error/90 font-label-sm text-label-sm font-bold flex items-center gap-1 transition-colors" type="button">
                    <span className="material-symbols-outlined text-[14px]">call</span> Call Now &amp; Log
                  </button>
                </div>
              </div>
            </div>
            {/* Kabir Mehta */}
            <div className="py-2 first:pt-0 last:pb-0 flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-secondary text-label-lg font-label-lg">KM</div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-label-md text-label-md font-bold text-on-surface">Kabir Mehta</span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm">Dropper (JEE 2026)</span>
                      <span className="px-1.5 py-0.2 rounded bg-secondary-container/40 text-secondary font-label-sm text-label-sm">Apex 1.0 (Crucible)</span>
                    </div>
                    <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                      <a className="flex items-center gap-1 text-tertiary hover:underline" href="tel:+919811233451">
                        <span className="material-symbols-outlined text-[14px]">call</span> +91 98112-33451
                      </a>
                      <span>• Registered 3d ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-end justify-between sm:justify-center">
                  <span className="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm font-semibold">RESCHEDULE REQUESTED</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">4 days SLA left</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate max-w-md">Student Note: "Currently giving Allen test series till 4 PM. Available post 6:30 PM."</p>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="px-3 py-1 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-colors" type="button">
                    <span className="material-symbols-outlined text-[14px]">event_available</span> Confirm 6:30 PM Slot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: MANUAL PAYMENT VERIFICATION & ENROLLMENT ACTIVATION CONSOLE */}
        <section className="xl:col-span-5 flex flex-col rounded-xl bg-surface-container-low shadow-sm overflow-hidden">
          <div className="p-4 bg-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Manual Payment Register</h2>
                <span className="px-2 py-0.5 rounded bg-tertiary-container/50 text-tertiary font-label-sm text-label-sm font-semibold">PRD §9</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Zero-Gateway Direct UPI/NEFT manual reconciliation &amp; immediate access provisioning.</p>
            </div>
            <span className="px-2 py-1 rounded bg-surface-container-lowest text-secondary font-label-sm text-label-sm self-start sm:self-auto font-mono">7 Pending</span>
          </div>
          <div className="p-2 flex flex-col gap-2 overflow-y-auto max-h-[580px]">
            {/* Payment 1: Rohan Verma */}
            <div className="p-2 rounded-lg bg-surface-container flex flex-col gap-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Rohan Verma</span>
                    <span className="font-label-sm text-label-sm text-secondary font-mono">MENT-2026-0704</span>
                  </div>
                  <span className="text-on-surface-variant font-body-sm text-body-sm">Course: Spark 1.0 • Quoted: ₹499</span>
                </div>
                <div className="text-right">
                  <span className="font-headline-sm text-headline-sm font-bold text-secondary">₹499</span>
                  <div className="font-label-sm text-label-sm text-tertiary">UPI Transfer</div>
                </div>
              </div>
              <div className="p-1 rounded bg-surface-container-lowest font-label-sm text-label-sm flex items-center justify-between">
                <span className="text-on-surface-variant font-mono truncate">Ref: UPI/402918291024@okaxis</span>
                <button className="text-secondary hover:underline shrink-0 flex items-center gap-0.5" type="button">
                  Verify Match
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Buffer: Access to Exam +7d</span>
                <div className="flex items-center gap-1">
                  <button className="px-2.5 py-1 rounded bg-surface-container-highest hover:bg-error/30 text-error font-label-sm text-label-sm transition-colors" type="button">Discrepancy</button>
                  <button className="px-3.5 py-1 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-sm text-label-sm font-bold flex items-center gap-1 transition-colors shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[14px]">bolt</span> Activate Roster
                  </button>
                </div>
              </div>
            </div>
            {/* Payment 2: Ananya Gupta */}
            <div className="p-2 rounded-lg bg-surface-container flex flex-col gap-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Ananya Gupta</span>
                    <span className="font-label-sm text-label-sm text-secondary font-mono">MENT-2026-0911</span>
                  </div>
                  <span className="text-on-surface-variant font-body-sm text-body-sm">Course: Apex 1.0 (Crucible)</span>
                  <span className="font-label-sm text-label-sm text-tertiary">Discount: ₹100 (Merit Scholarship)</span>
                </div>
                <div className="text-right">
                  <div className="line-through text-on-surface-variant font-label-sm text-label-sm">₹699</div>
                  <span className="font-headline-sm text-headline-sm font-bold text-secondary">₹599</span>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">IMPS / NEFT</div>
                </div>
              </div>
              <div className="p-1 rounded bg-surface-container-lowest font-label-sm text-label-sm flex items-center justify-between">
                <span className="text-on-surface-variant font-mono truncate">Ref: HDFC0001829281 (Recvd 14:12)</span>
                <button className="text-secondary hover:underline shrink-0 flex items-center gap-0.5" type="button">
                  View Slip
                  <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                </button>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Routine 1-Click Action</span>
                <div className="flex items-center gap-1">
                  <button className="px-2.5 py-1 rounded bg-surface-container-highest hover:bg-error/30 text-error font-label-sm text-label-sm transition-colors" type="button">Flag</button>
                  <button className="px-3.5 py-1 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-sm text-label-sm font-bold flex items-center gap-1 transition-colors shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[14px]">bolt</span> Activate Roster
                  </button>
                </div>
              </div>
            </div>
            {/* Payment 3: Devansh Patil */}
            <div className="p-2 rounded-lg bg-surface-container flex flex-col gap-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Devansh Patil</span>
                    <span className="font-label-sm text-label-sm text-secondary font-mono">MENT-2026-1102</span>
                  </div>
                  <span className="text-on-surface-variant font-body-sm text-body-sm">Course: Rise 1.0 • Office Counter</span>
                </div>
                <div className="text-right">
                  <span className="font-headline-sm text-headline-sm font-bold text-secondary">₹299</span>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Cash Receipt #889</div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span className="font-label-sm text-label-sm text-tertiary">Verified by Front Desk Staff</span>
                <button className="px-3.5 py-1 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-sm text-label-sm font-bold flex items-center gap-1 transition-colors shadow-sm" type="button">
                  <span className="material-symbols-outlined text-[14px]">bolt</span> Activate Roster
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* BATCH CAPACITY & CONCURRENCY CONTROLS */}
      <section className="flex flex-col rounded-xl bg-surface-container-low shadow-sm overflow-hidden">
        <div className="p-4 bg-surface-container flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Batch Capacity &amp; Concurrency Engine</h2>
              <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold">PRD §5.2 - §5.3</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Strict no-waitlist caps enforced via concurrency locks. Real-time seat consumption across active cohorts.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" type="button">Manage Faculty Allocation</button>
            <button className="px-3.5 py-1.5 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors shadow-sm" type="button">
              <span className="material-symbols-outlined text-[16px]">add_circle</span> + Create New Batch
            </button>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
          {/* Cohort 1: Rise 1.0 */}
          <div className="p-2 rounded-lg bg-surface-container flex flex-col justify-between gap-2 hover:bg-surface-container-high transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-start justify-between">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">Rise 1.0</span>
                <span className="px-2 py-0.5 rounded bg-tertiary-container text-tertiary font-label-sm text-label-sm font-semibold">ACTIVE</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Class 11 &amp; 12 Jan Sprint Cohort</span>
              <div className="mt-1 flex flex-col gap-0.5">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Capacity Fill</span>
                  <span className="text-secondary font-bold">38 / 50 seats (76%)</span>
                </div>
                <div className="w-full bg-surface-container-lowest rounded-full h-1 overflow-hidden">
                  <div className="bg-secondary h-1 rounded-full" style={{ width: "76%" }}></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Faculty: Harshitraj Sir</span>
                <span>MWF 6:00 PM</span>
              </div>
              <button className="w-full py-1 rounded bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold transition-colors" type="button">
                Configure Roster • 12 Seats Left
              </button>
            </div>
          </div>
          {/* Cohort 2: Spark 1.0 */}
          <div className="p-2 rounded-lg bg-surface-container flex flex-col justify-between gap-2 hover:bg-surface-container-high transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-start justify-between">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">Spark 1.0</span>
                <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">NEAR CAPACITY</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Class 12 &amp; Droppers April Depth</span>
              <div className="mt-1 flex flex-col gap-0.5">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Capacity Fill</span>
                  <span className="text-secondary font-bold">47 / 50 seats (94%)</span>
                </div>
                <div className="w-full bg-surface-container-lowest rounded-full h-1 overflow-hidden">
                  <div className="bg-secondary h-1 rounded-full" style={{ width: "94%" }}></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Faculty: Harshitraj + Naitik</span>
                <span>Daily 7:30 PM</span>
              </div>
              <button className="w-full py-1 rounded bg-secondary/20 hover:bg-secondary/30 text-secondary font-label-sm text-label-sm font-semibold transition-colors" type="button">
                Concurrency Guard: 3 Seats Left
              </button>
            </div>
          </div>
          {/* Cohort 3: Apex 1.0 */}
          <div className="p-2 rounded-lg bg-surface-container flex flex-col justify-between gap-2 hover:bg-surface-container-high transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-start justify-between">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">Apex 1.0</span>
                <span className="px-2 py-0.5 rounded bg-error/20 text-error font-label-sm text-label-sm font-bold animate-pulse">LOCK IMMINENT</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Advanced Crucible (Top 50 Rank Focus)</span>
              <div className="mt-1 flex flex-col gap-0.5">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Capacity Fill</span>
                  <span className="text-error font-bold">48 / 50 seats (96%)</span>
                </div>
                <div className="w-full bg-surface-container-lowest rounded-full h-1 overflow-hidden">
                  <div className="bg-error h-1 rounded-full" style={{ width: "96%" }}></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Faculty: Naitik Sir</span>
                <span>Strict No Waitlist</span>
              </div>
              <button className="w-full py-1 rounded bg-error/15 text-error font-label-sm text-label-sm font-semibold hover:bg-error/25 transition-colors" type="button">
                Auto-Lock at 50 Enforced (§5.3)
              </button>
            </div>
          </div>
          {/* Cohort 4: Apex 2.0 */}
          <div className="p-2 rounded-lg bg-surface-container/60 flex flex-col justify-between gap-2 opacity-85 hover:opacity-100 transition-opacity">
            <div className="flex flex-col gap-1">
              <div className="flex items-start justify-between">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface-variant">Apex 2.0</span>
                <span className="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm font-semibold">PENDING §14</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Elite Problem Solving Cohort</span>
              <div className="mt-1 flex flex-col gap-0.5">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Capacity Fill</span>
                  <span className="text-on-surface-variant font-bold">4 / 50 seats (8%)</span>
                </div>
                <div className="w-full bg-surface-container-lowest rounded-full h-1 overflow-hidden">
                  <div className="bg-outline-variant h-1 rounded-full" style={{ width: "8%" }}></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Merger Target: Apex 1.0</span>
                <span>Awaiting Co-Sign</span>
              </div>
              <button className="w-full py-1 rounded bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm transition-colors" type="button">
                Review Merge Manifest
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT ADMINISTRATIVE AUDIT LOG STRIP */}
      <section className="flex flex-col rounded-xl bg-surface-container-low shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-tertiary">history</span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Real-Time Administrative Audit Stream (§20)</h3>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Tamper-Proof Ledger</span>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
          {/* Event 1 */}
          <div className="p-1 rounded bg-surface-container flex flex-col gap-0.5">
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-primary font-semibold">Admin 1 (Harshitraj S.)</span>
              <span className="text-outline text-[10px]">14:32:18 IST</span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface">Approved Dual Sign: Remove Cohort Batch Apex 2.0</span>
            <span className="font-label-sm text-label-sm text-tertiary">Status: Executed</span>
          </div>
          {/* Event 2 */}
          <div className="p-1 rounded bg-surface-container flex flex-col gap-0.5">
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-secondary font-semibold">Admin 2 (Naitik M.)</span>
              <span className="text-outline text-[10px]">14:29:04 IST</span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface">Co-Signed: Permanent Resource Deletion v1.pdf</span>
            <span className="font-label-sm text-label-sm text-tertiary">Status: Executed</span>
          </div>
          {/* Event 3 */}
          <div className="p-1 rounded bg-surface-container flex flex-col gap-0.5">
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-primary font-semibold">Admin 1 (Harshitraj S.)</span>
              <span className="text-outline text-[10px]">14:15:33 IST</span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface">Proposed: Tuition Price Adjustment Spark 2.0 ₹499 → ₹449</span>
            <span className="font-label-sm text-label-sm text-secondary">Status: Pending Initial Vote</span>
          </div>
          {/* Event 4 */}
          <div className="p-1 rounded bg-surface-container flex flex-col gap-0.5">
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-secondary font-semibold">Admin 2 (Naitik M.)</span>
              <span className="text-outline text-[10px]">13:48:11 IST</span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface">Logged Intake: Intro Phone Call - Isha Sundaram</span>
            <span className="font-label-sm text-label-sm text-tertiary">Status: SLA Critical</span>
          </div>
        </div>
      </section>
    </main>
  );
}
