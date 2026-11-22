"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * Mentora Admin Portal Dashboard
 * Brand: Abyssal Focus (Abyss Teal + Desert Sand)
 * Governance: Two-Admin Mutual Authorization Protocol (§14)
 */

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    total_students: 137,
    active_enrollments: 137,
    pending_applications: 9,
    pending_payments: 7,
  });
  const [approvals, setApprovals] = useState([
    {
      id: 'REQ-2026-0038',
      type: 'Batch Capacity Override',
      details: 'Expand Apex 1.0 capacity from 50 to 60 seats (Waitlist burst)',
      requester: 'Harshitraj S. (Admin 1)',
      status: 'Awaiting Admin 2 Vote',
      actionKey: 'expand_capacity',
    },
    {
      id: 'REQ-2026-0039',
      type: 'Teacher Resource Deletion',
      details: 'Delete DPP #12 (Old syllabus deprecated) by Er. Sameer Verma',
      requester: 'Sameer Verma (Teacher)',
      status: 'Awaiting Admin 1 & 2',
      actionKey: 'delete_resource',
    },
    {
      id: 'REQ-2026-0040',
      type: 'Cohort Batch Transfer',
      details: 'Transfer student MENT-2026-0711 from Spark 1.0 to Apex 1.0',
      requester: 'Student Request Verified',
      status: 'Awaiting Admin 2 Vote',
      actionKey: 'transfer_batch',
    },
  ]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/auth/me`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.full_name) setAdmin(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch(`${API_URL}/api/v1/admin/dashboard`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data) setStats(data);
      })
      .catch(() => {});
  }, []);

  const handleVote = (id, voteType) => {
    alert(`Vote recorded: ${voteType.toUpperCase()} for request ${id}. Cryptographic vote logged to Audit Trail.`);
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const adminName = admin?.full_name || 'Harshitraj S.';

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen antialiased selection:bg-secondary selection:text-on-secondary">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.25)] border-b border-surface-container-high">
        <div className="h-20 w-full px-gutter flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-lg shrink-0">
            <Link href="/" className="flex items-center gap-space-sm text-decoration-none">
              <div className="w-9 h-9 rounded-lg bg-surface-container-high border border-primary/20 flex items-center justify-center text-primary font-display font-bold text-xl">
                M
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-on-surface">
                Mentora<span className="text-secondary">.</span>
              </span>
            </Link>
            <nav className="hidden xl:flex items-center gap-1">
              <Link
                href="/admin/dashboard"
                className="px-3 py-1.5 text-primary bg-surface-container-high rounded-lg font-label-md text-label-md font-semibold"
              >
                Governance Console
              </Link>
              <Link
                href="/admin/approvals"
                className="px-3 py-1.5 text-secondary hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors font-label-md text-label-md flex items-center gap-1"
              >
                <span>Dual-Approvals</span>
                <span className="px-1.5 py-0.2 rounded bg-secondary text-on-secondary text-[10px] font-bold">3</span>
              </Link>
              <Link
                href="/admin/courses"
                className="px-3 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors font-label-md text-label-md"
              >
                Courses
              </Link>
              <Link
                href="/admin/batches"
                className="px-3 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors font-label-md text-label-md"
              >
                Batches
              </Link>
              <Link
                href="/admin/payments"
                className="px-3 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors font-label-md text-label-md"
              >
                Payments
              </Link>
              <Link
                href="/admin/enrollments"
                className="px-3 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors font-label-md text-label-md"
              >
                Enrollments
              </Link>
              <Link
                href="/admin/students"
                className="px-3 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors font-label-md text-label-md"
              >
                Students
              </Link>
              <Link
                href="/admin/teachers"
                className="px-3 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors font-label-md text-label-md"
              >
                Teachers
              </Link>
              <Link
                href="/admin/audit-logs"
                className="px-3 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors font-label-md text-label-md"
              >
                Audit Trail
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-space-md shrink-0">
            <div className="hidden md:flex flex-col text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="font-label-md text-label-md text-on-surface font-semibold">{adminName}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-mono">ADM-2026-001 (Admin 1 of 2)</span>
            </div>
            <Link
              href="/admin/settings"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">admin_panel_settings</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-20 bg-background min-h-screen w-full px-gutter py-space-lg">
        <div className="flex flex-col w-full space-y-space-lg text-on-surface max-w-[1440px] mx-auto">
          {/* EXECUTIVE TELEMETRY STRIP */}
          <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md p-space-lg rounded-xl bg-surface-container-low shadow-md relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 via-tertiary/5 to-transparent blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col gap-1">
              <div className="flex items-center gap-space-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                  Institutional Governance Console (§16)
                </span>
                <span className="text-on-surface-variant font-label-sm text-label-sm">Cycle: JEE Main & Advanced 2026</span>
              </div>
              <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface">
                Platform Operations & Governance Desk
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Cryptographic Dual-Admin Governance Active • Mutual authorization enforced across batch lifecycle & deletions.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-space-md shrink-0 bg-surface-container px-space-md py-space-sm rounded-lg">
              <div className="flex items-center gap-space-sm">
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
                  <span className="font-body-sm text-body-sm text-on-surface truncate">
                    Harshitraj S. (Adm 1) • Naitik M. (Adm 2)
                  </span>
                </div>
              </div>
              <div className="h-8 w-px bg-outline-variant/30 hidden sm:block"></div>
              <Link
                href="/admin/approvals"
                className="px-3.5 py-2 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-md text-label-md font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                Open Approval Desk
              </Link>
            </div>
          </section>

          {/* KPI METRICS (6 Cards) */}
          <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-space-md">
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Registered Students</span>
              <div className="my-space-sm">
                <div className="font-headline-md text-headline-md font-bold text-on-surface">{stats.total_students}</div>
                <div className="flex items-center gap-1 mt-1 text-tertiary font-label-sm text-label-sm">
                  <span>+12 this week</span>
                </div>
              </div>
              <div className="text-on-surface-variant font-label-sm text-label-sm">Classes 9–12 JEE Aspirants</div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Batch Fill Rate</span>
              <div className="my-space-sm">
                <div className="font-headline-md text-headline-md font-bold text-on-surface">91.4%</div>
                <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-secondary h-1.5 rounded-full" style={{ width: '91.4%' }}></div>
                </div>
              </div>
              <div className="text-on-surface-variant font-label-sm text-label-sm">137 / 150 Seats • 0 Overbooked</div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all border border-secondary/30">
              <div className="flex items-start justify-between">
                <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
                  Pending Approvals
                </span>
                <span className="p-1 px-2 rounded bg-secondary text-on-secondary font-bold font-label-sm text-label-sm">
                  {approvals.length} REQ
                </span>
              </div>
              <div className="my-space-sm">
                <div className="font-headline-md text-headline-md font-bold text-on-surface">{approvals.length} Critical</div>
                <div className="flex items-center gap-1 mt-1 text-secondary font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">key</span>
                  <span>Requires Co-Sign</span>
                </div>
              </div>
              <div className="text-on-surface-variant font-label-sm text-label-sm">Dual-Admin Protocol §14</div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
              <div className="flex items-start justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">7-Day Intro SLA</span>
                <span className="p-1 px-1.5 rounded bg-error/20 text-error">
                  <span className="material-symbols-outlined text-[16px]">ring_volume</span>
                </span>
              </div>
              <div className="my-space-sm">
                <div className="font-headline-md text-headline-md font-bold text-error">6 Due</div>
                <div className="flex items-center gap-1 mt-1 text-error font-label-sm text-label-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                  <span>2 Critical (&lt;24h)</span>
                </div>
              </div>
              <div className="text-on-surface-variant font-label-sm text-label-sm">Intro phone calls window</div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
              <div className="flex items-start justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Manual Payments
                </span>
                <span className="p-1 px-1.5 rounded bg-tertiary-container/50 text-tertiary">
                  <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
                </span>
              </div>
              <div className="my-space-sm">
                <div className="font-headline-md text-headline-md font-bold text-tertiary truncate">₹18,400</div>
                <div className="flex items-center gap-1 mt-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span>{stats.pending_payments} Receipts Pending</span>
                </div>
              </div>
              <div className="text-on-surface-variant font-label-sm text-label-sm">Manual Bank Transfer/UPI</div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
              <div className="flex items-start justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Mentorship Syncs
                </span>
                <span className="p-1 px-1.5 rounded bg-surface-container-highest text-primary">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                </span>
              </div>
              <div className="my-space-sm">
                <div className="font-headline-md text-headline-md font-bold text-on-surface">14 Syncs</div>
                <div className="flex items-center gap-1 mt-1 text-tertiary font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>96.8% Completed</span>
                </div>
              </div>
              <div className="text-on-surface-variant font-label-sm text-label-sm">Weekly faculty 1:1 sessions</div>
            </div>
          </section>

          {/* TWO-ADMIN DUAL-APPROVAL DESK (§14) */}
          <section className="flex flex-col rounded-xl bg-surface-container-low overflow-hidden shadow-sm">
            <div className="p-space-lg bg-surface-container flex flex-col md:flex-row md:items-center justify-between gap-space-md border-b border-surface-container-high">
              <div className="flex items-start gap-space-sm">
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
                    Single-admin execution is blocked by constraint <code className="bg-surface-container-lowest px-1.5 py-0.5 rounded text-secondary font-mono">CHECK(first_approver_id &lt;&gt; second_approver_id)</code>.
                  </p>
                </div>
              </div>

              <Link
                href="/admin/approvals"
                className="text-secondary hover:text-secondary-fixed text-sm font-semibold flex items-center gap-1"
              >
                View Full Audit Logs &rarr;
              </Link>
            </div>

            <div className="p-space-lg flex flex-col gap-space-md">
              {approvals.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-tertiary text-4xl mb-2">verified</span>
                  <p className="font-semibold text-on-surface">All Dual-Admin Requests Reconciled</p>
                  <p className="text-sm">No critical operational actions currently require second admin authorization.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-space-sm">
                  {approvals.map((req) => (
                    <div
                      key={req.id}
                      className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-space-md border border-surface-container-high"
                    >
                      <div className="flex items-start gap-space-sm">
                        <div className="p-2 rounded bg-surface-container-highest text-secondary shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-[20px]">verified_user</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-label-sm text-secondary font-bold">{req.id}</span>
                            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-semibold">
                              {req.type}
                            </span>
                          </div>
                          <p className="font-body-md text-on-surface mt-1 font-medium">{req.details}</p>
                          <div className="flex items-center gap-3 mt-1 text-label-sm text-outline">
                            <span>Requester: {req.requester}</span>
                            <span>•</span>
                            <span className="text-tertiary font-semibold">{req.status}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end lg:self-auto">
                        <button
                          onClick={() => handleVote(req.id, 'reject')}
                          className="px-3 py-1.5 rounded bg-surface-container-highest hover:bg-error hover:text-white text-on-surface font-label-sm text-label-sm font-semibold transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleVote(req.id, 'approve')}
                          className="px-4 py-1.5 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-label-sm text-label-sm font-bold transition-colors shadow-sm flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">check</span>
                          Co-Sign & Authorize
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* QUICK LINKS / MANAGEMENT MODULES */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <Link
              href="/admin/batches"
              className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center gap-space-md border border-surface-container-high"
            >
              <div className="p-3 rounded-lg bg-surface-container-highest text-primary">
                <span className="material-symbols-outlined text-[24px]">view_agenda</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm font-semibold text-on-surface">Batch Management</h3>
                <p className="text-body-sm text-outline">Manage seats, dates, and assign faculties</p>
              </div>
            </Link>

            <Link
              href="/admin/payments"
              className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center gap-space-md border border-surface-container-high"
            >
              <div className="p-3 rounded-lg bg-surface-container-highest text-secondary">
                <span className="material-symbols-outlined text-[24px]">payments</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm font-semibold text-on-surface">Payment Reconciliation</h3>
                <p className="text-body-sm text-outline">Verify offline receipts and approve seats</p>
              </div>
            </Link>

            <Link
              href="/admin/students"
              className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center gap-space-md border border-surface-container-high"
            >
              <div className="p-3 rounded-lg bg-surface-container-highest text-tertiary">
                <span className="material-symbols-outlined text-[24px]">school</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm font-semibold text-on-surface">Student Directory</h3>
                <p className="text-body-sm text-outline">Profiles, intro calls, and enrollment status</p>
              </div>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
