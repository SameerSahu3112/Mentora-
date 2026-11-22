"use client";

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleSelectBatch = (batchName, price) => {
    const params = new URLSearchParams({
      batch: batchName,
      price: String(price),
    });
    router.push(`/auth/signup?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      {/* SECTION 1: HERO */}
      <section className="relative w-full pt-12 pb-20 overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-container blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-secondary-container/20 blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Top Eyebrow Tag Row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
              Admissions Open • JEE 2025/2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px] text-secondary">verified_user</span>
              No Automated Checkouts • Human Verification Protocol
            </span>
          </div>
          {/* Main Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="font-headline-lg text-headline-lg lg:text-[54px] lg:leading-[60px] font-bold text-on-surface tracking-tight">
                Strategic JEE Preparation with <br className="hidden sm:inline" />
                <span className="text-secondary underline decoration-secondary/30 decoration-wavy">Guaranteed 1-on-1 Mentorship</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Targeted self-paced curricula for Classes 9–12 paired with mandatory weekly batch sessions and personal mentor calls from NIT Bhopal alumni. High-yield precision over passive video marathons.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-secondary text-on-secondary font-label-md text-label-md shadow-lg shadow-secondary/10 hover:bg-secondary-fixed transition-all active:scale-[0.98]"
                  href="#batches-section"
                >
                  <span>Explore Official Batches</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-high text-on-surface hover:text-secondary hover:bg-surface-bright transition-all font-label-md text-label-md"
                  href="#workflow-section"
                >
                  <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                  <span>How Enrollment Works</span>
                </a>
              </div>
            </div>
            {/* Hero Aside Visual Data Widget */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-surface-container space-y-5 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Cohort Integrity</span>
                <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm">Active Monitoring</span>
              </div>
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between font-label-sm text-label-sm mb-1.5">
                    <span className="text-on-surface-variant">Batch Fill Velocity (Apex JEE Adv)</span>
                    <span className="text-secondary font-semibold">90% Full</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-label-sm text-label-sm mb-1.5">
                    <span className="text-on-surface-variant">Weekly Mentor Slots Claimed</span>
                    <span className="text-tertiary font-semibold">48 / 50</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                    <div className="h-full bg-tertiary rounded-full" style={{ width: "96%" }}></div>
                  </div>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
                  Strict Concurrency Guard
                </span>
                <span className="text-secondary">0 Overbooking</span>
              </div>
            </div>
          </div>
          {/* Hero 4 Quick Stat Pill Counter Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 p-4 rounded-xl bg-surface-container-low shadow-md">
            <div className="p-3">
              <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Programs</div>
              <div className="font-headline-md text-headline-md text-on-surface font-bold mt-0.5">3 Targeted</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Rise • Spark • Apex</p>
            </div>
            <div className="p-3">
              <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Access Buffer</div>
              <div className="font-headline-md text-headline-md text-on-surface font-bold mt-0.5">Exam + 7 Days</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">No premature dropouts</p>
            </div>
            <div className="p-3">
              <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Starting Tuition</div>
              <div className="font-headline-md text-headline-md text-secondary font-bold mt-0.5">₹299</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Direct single-fee access</p>
            </div>
            <div className="p-3">
              <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Mentorship Method</div>
              <div className="font-headline-md text-headline-md text-on-surface font-bold mt-0.5">Weekly 1:1</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Direct alumni phone calls</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 3 OFFICIAL MENTORA COURSES */}
      <section className="w-full py-20 bg-surface" id="batches-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-secondary font-label-md text-label-md uppercase tracking-widest mb-2">
                <span className="material-symbols-outlined text-[18px]">school</span>
                Curated Academic Tracks
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                Targeted Batches for JEE 2025 &amp; 2026
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-2">
                Each track includes structured chapter diagnostics, self-paced archives, verified teacher access, and manual seat activation.
              </p>
            </div>
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
              <span className="px-3 py-1 rounded-lg bg-surface-container-high text-secondary font-semibold">Strict Capacity Guard</span>
              <span className="px-3 py-1">Max 50 Students/Batch</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* CARD 1: RISE */}
            <div className="flex flex-col justify-between rounded-2xl bg-surface-container p-6 lg:p-8 shadow-xl transition-all duration-300 hover:bg-surface-container-high">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wide">
                    Main Jan Sprint
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">Class 11 &amp; 12</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Rise</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">JEE Main (January Attempt) Focused Sprint</p>
                <div className="mt-6 flex items-baseline gap-2 pb-6">
                  <span className="font-headline-lg text-headline-lg font-bold text-secondary">₹299</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Single Fee • No Recurring</span>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">Available Cohort</label>
                  <div className="p-2.5 rounded-lg bg-surface-container-lowest flex items-center justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      Rise 1.0 (Jan Fast-Track)
                    </span>
                    <span className="text-secondary font-semibold">38/50 Filled</span>
                  </div>
                </div>
                <div className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Access valid until <strong className="text-on-surface">Jan Exam Date + 7 Days</strong> buffer</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Curated recorded modules &amp; downloadable analytical formula PDFs</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Weekly live batch strategic mentorship session</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Direct 1-on-1 teacher call booking on portal</span>
                  </div>
                </div>
              </div>
              <div className="pt-8 mt-8 space-y-3">
                <button
                  className="w-full py-3 rounded-xl bg-surface-container-highest hover:bg-secondary hover:text-on-secondary text-secondary font-label-md text-label-md transition-all font-semibold flex items-center justify-center gap-2"
                  onClick={() => handleSelectBatch('Rise 1.0', 299)}
                >
                  <span>Apply for Rise Batch</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
                <p className="font-label-sm text-label-sm text-center text-on-surface-variant flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary">phone_in_talk</span>
                  Verified via Founder Strategy Call
                </p>
              </div>
            </div>

            {/* CARD 2: SPARK */}
            <div className="flex flex-col justify-between rounded-2xl bg-surface-container-high p-6 lg:p-8 shadow-2xl relative shadow-secondary/10 transform lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold tracking-widest uppercase shadow-md">
                Most Enrolled Program
              </div>
              <div>
                <div className="flex items-center justify-between mb-4 mt-1">
                  <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wide font-semibold">
                    April Depth Track
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">Class 12 &amp; Droppers</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Spark</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">JEE Main (April Attempt) Comprehensive Masterclass</p>
                <div className="mt-6 flex items-baseline gap-2 pb-6">
                  <span className="font-headline-lg text-headline-lg font-bold text-secondary">₹499</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Single Fee • Zero Upsells</span>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block font-semibold">Active Cohorts</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-2 rounded-lg bg-surface-container-lowest text-left hover:bg-surface-container font-label-sm text-label-sm" type="button">
                      <div className="text-on-surface font-medium truncate">Spark 1.0</div>
                      <div className="text-secondary text-[11px]">47/50 (Last 3)</div>
                    </button>
                    <button className="p-2 rounded-lg bg-surface-container-lowest text-left hover:bg-surface-container font-label-sm text-label-sm" type="button">
                      <div className="text-on-surface font-medium truncate">Spark 2.0</div>
                      <div className="text-tertiary text-[11px]">Open • 24/50</div>
                    </button>
                  </div>
                </div>
                <div className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Full access buffer until <strong className="text-on-surface">April Exam Date + 7 Days</strong></span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Complete high-yield chapter modules &amp; multi-tier test archive</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Mandatory weekly batch review + personalized weak-point audit</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Priority 1:1 personal teacher bookings directly on portal</span>
                  </div>
                </div>
              </div>
              <div className="pt-8 mt-8 space-y-3">
                <button
                  className="w-full py-3.5 rounded-xl bg-secondary text-on-secondary font-label-md text-label-md font-bold shadow-lg shadow-secondary/20 hover:bg-secondary-fixed transition-all flex items-center justify-center gap-2"
                  onClick={() => handleSelectBatch('Spark (April Target)', 499)}
                >
                  <span>Apply for Spark Batch</span>
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                </button>
                <p className="font-label-sm text-label-sm text-center text-on-surface-variant flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                  Direct NIT Alumni Guidance
                </p>
              </div>
            </div>

            {/* CARD 3: APEX */}
            <div className="flex flex-col justify-between rounded-2xl bg-surface-container p-6 lg:p-8 shadow-xl transition-all duration-300 hover:bg-surface-container-high">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wide">
                    Advanced Crucible
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">Top 10k Rank Target</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Apex</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">JEE Advanced Rigour &amp; Multi-Concept Mastery</p>
                <div className="mt-6 flex items-baseline gap-2 pb-6">
                  <span className="font-headline-lg text-headline-lg font-bold text-secondary">₹699</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Single Fee • Comprehensive</span>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">Target Batches</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-surface-container-lowest font-label-sm text-label-sm">
                      <div className="text-on-surface font-medium truncate">Apex 1.0</div>
                      <div className="text-secondary text-[11px]">45/50 Seats</div>
                    </div>
                    <div className="p-2 rounded-lg bg-surface-container-lowest font-label-sm text-label-sm">
                      <div className="text-on-surface font-medium truncate">Apex 2.0</div>
                      <div className="text-tertiary text-[11px]">28/50 Open</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Active until <strong className="text-on-surface">JEE Advanced Date + 7 Days</strong></span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Multi-concept cross-subject problem archives (Math/Phy/Chem)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Strict batch concurrency locks (No crowded rooms)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Bi-weekly dedicated 1:1 strategy calls with lead mentors</span>
                  </div>
                </div>
              </div>
              <div className="pt-8 mt-8 space-y-3">
                <button
                  className="w-full py-3 rounded-xl bg-surface-container-highest hover:bg-secondary hover:text-on-secondary text-secondary font-label-md text-label-md transition-all font-semibold flex items-center justify-center gap-2"
                  onClick={() => handleSelectBatch('Apex (JEE Advanced)', 699)}
                >
                  <span>Apply for Apex Batch</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
                <p className="font-label-sm text-label-sm text-center text-on-surface-variant flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary">phone_in_talk</span>
                  Diagnostic Pre-Evaluation Call
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW ENROLLMENT WORKS */}
      <section className="w-full py-20 bg-surface-container-lowest" id="workflow-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-secondary font-label-md text-label-md uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">account_tree</span>
              PRD-Governed Transparent Workflow
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              How Enrollment Works: Step-by-Step
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Mentora prohibits impersonal automated checkouts. Every aspirant is evaluated, mapped to the correct batch capacity, and manually verified before access is granted.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: "STEP 01",
                icon: "travel_explore",
                title: "Browse Course & Pick Target Batch",
                desc: "Examine Rise, Spark, or Apex. Confirm live seat availability with zero-overbooking safeguards enforced directly at the database level.",
                note: "Capacity strictly capped at 50 per batch",
              },
              {
                step: "STEP 02",
                icon: "badge",
                title: "Submit Student Application",
                desc: "Provide student name, academic grade (Class 9–12 / Dropper), contact number, and target exam year. Unique Student ID generated immediately.",
                note: "Instant tracking ID allocated",
              },
              {
                step: "STEP 03",
                icon: "call_quality",
                title: "Free Introductory Phone Call",
                desc: "Within 7 days of application, an Admin or NIT mentor calls the student and parent to audit syllabus completion and set realistic targets.",
                note: "Direct 1:1 strategy alignment",
              },
              {
                step: "STEP 04",
                icon: "account_balance_wallet",
                title: "Manual Payment Recording",
                desc: "Direct UPI or bank transfer recorded by the administrator. Transaction reference is cataloged with timestamp & amount verification.",
                note: "Secure, non-automated accounting",
              },
              {
                step: "STEP 05",
                icon: "admin_panel_settings",
                title: "Admin Activation Protocol",
                desc: "Two-admin security clearance locks the student to the selected batch schedule, unlocks learning materials, and assigns the primary mentor.",
                note: "Portal credentials dispatched via SMS/Email",
              },
              {
                step: "STEP 06",
                icon: "event_available",
                title: "Access & Weekly 1:1 Mentorship",
                desc: "Immediate access to practice sheets and video modules. Regular weekly batch sessions and bookable personal mentor slots until Exam Date + 7 Days.",
                note: "Guaranteed post-exam buffer",
              },
            ].map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between space-y-4 shadow-md">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-label-lg text-label-lg font-bold text-secondary">{step.step}</span>
                    <span className="material-symbols-outlined text-on-surface-variant text-[24px]">{step.icon}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{step.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-label-sm">
                  • {step.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: MENTORSHIP ECOSYSTEM */}
      <section className="w-full py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-secondary font-label-md text-label-md uppercase tracking-widest mb-2">
                <span className="material-symbols-outlined text-[18px]">hub</span>
                PRD Section §13 Ecosystem
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                The Three Pillars of Mentora Mentorship
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-2">
                Automated test series fail without human accountability. Mentora constructs a disciplined three-layer feedback loop for every single student.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-surface-container space-y-6 shadow-xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[26px]">groups</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Weekly Batch Mentorship</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Fixed recurring live sessions with mandatory attendance logging. The mentor reviews aggregate weekly error reports, tackles common conceptual bottlenecks, and sets the sprint goals for the upcoming 7 days.
                </p>
              </div>
              <ul className="space-y-2 font-label-sm text-label-sm text-secondary">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  Real-time attendance &amp; accountability
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  Peer benchmarking without toxic competition
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-surface-container space-y-6 shadow-xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[26px]">person_check</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">1-on-1 Assigned Teacher</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Book individual 25-minute slots on the student portal with your specific batch mentor. Address personal psychological friction, chapter-specific doubts, and personalized test-taking time management.
                </p>
              </div>
              <ul className="space-y-2 font-label-sm text-label-sm text-secondary">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  Calendar slot booking directly in portal
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  Private video/voice deep problem breakdown
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-surface-container space-y-6 shadow-xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[26px]">support_agent</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Dedicated Admin Mentorship</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Continuous operational support handled by founders and senior administrators. Immediate help with batch timetable shifts, parent progress reports, leave requests, and academic roadmap readjustments.
                </p>
              </div>
              <ul className="space-y-2 font-label-sm text-label-sm text-secondary">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  Direct WhatsApp/Phone helpline for parents
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  Batch transfer &amp; syllabus rescheduling
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FOUNDERS & NIT BHOPAL CREDIBILITY */}
      <section className="w-full py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-surface-container">
                <img
                  className="w-full h-80 object-cover"
                  alt="Two focused young Indian engineering mentors collaborating at a modern desk"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPz0njMWI8itdTZddT5UApzOXsmcmS3TwP4y51SVVqzBfGoN2onlJCigYtI2kNed4-SpoTLULinhlE7EyjqBZ6xovvw6XM8hKePj6GqGZep8YND7zEr-oq0GRY1jBPHeIjJ97NGpurRjn1q7NChn53EHrSZGc2xY6UE1QI0QN5cJjBwjJdB_J9hBvwVTjBP6pljjKqX48Xly-kAvZ1rD2m0m-MZFW0FsZCpFeNHML2"
                />
                <div className="p-6 space-y-3 bg-surface-container-high">
                  <div className="flex items-center gap-2 text-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    NIT Bhopal Alumni Network
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Harshitraj Singh Panwar &amp; Naitik Mujawadiya
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Co-Founders &amp; Academic Directors with over 3 continuous years of JEE mentorship and curriculum design experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm uppercase tracking-widest">
                Academic Integrity Manifesto
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                Built by Engineers Who Cleared the Crucible
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                The Indian test prep industry is plagued by sensationalist billboard advertising, fabricated topper claims, and algorithmic bots that ignore a student's actual psychological state.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                At Mentora, our thesis is simple: <strong className="text-on-surface">JEE rank is an outcome of error rectification, not video hours watched.</strong> We intentionally cap batch sizes at 50 students so that our mentors know each student's specific weak chapters.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-surface-container space-y-1">
                  <div className="font-label-md text-label-md text-secondary font-semibold">Zero Fake Claims</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">We never buy or duplicate topper ranks. Real students, real scores.</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container space-y-1">
                  <div className="font-label-md text-label-md text-secondary font-semibold">100% Human Mentors</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">No automated AI bots posing as teachers in doubt channels.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: BATCH AVAILABILITY & CAPACITY TRACKER */}
      <section className="w-full py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-secondary font-label-md text-label-md uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[18px]">table_chart</span>
                Live Capacity Registry
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                Batch Availability &amp; Timetable
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Enforced by concurrency locks. Applications close automatically when seat caps are reached.
              </p>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-tertiary"></span>
              Updated 4 minutes ago
            </div>
          </div>
          <div className="w-full overflow-x-auto rounded-2xl bg-surface-container shadow-xl">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead className="bg-surface-container-high text-on-surface font-label-sm text-label-sm uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Batch ID &amp; Target</th>
                  <th className="py-4 px-6">Course</th>
                  <th className="py-4 px-6">Weekly Schedule</th>
                  <th className="py-4 px-6">Capacity Status</th>
                  <th className="py-4 px-6">Fee</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest/20 font-body-sm text-body-sm">
                <tr className="hover:bg-surface-container-high/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-on-surface">
                    Rise 1.0 (Jan Fast-Track)
                    <div className="font-label-sm text-label-sm text-on-surface-variant font-normal">Class 11 &amp; 12 Syllabus Rapid</div>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">Rise</td>
                  <td className="py-4 px-6 text-on-surface-variant">Mon, Wed, Fri • 6:00 PM IST</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: "76%" }}></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">38/50</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-label-md text-label-md text-secondary font-bold">₹299</td>
                  <td className="py-4 px-6 text-right">
                    <button className="px-4 py-1.5 rounded-lg bg-secondary text-on-secondary font-label-sm text-label-sm hover:bg-secondary-fixed transition-all font-semibold" onClick={() => handleSelectBatch('Rise 1.0', 299)}>
                      Apply
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-high/50 transition-colors bg-surface-container-high/20">
                  <td className="py-4 px-6 font-semibold text-on-surface">
                    Spark 1.0 (April Depth)
                    <div className="font-label-sm text-label-sm text-on-surface-variant font-normal">Class 12 &amp; Droppers</div>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">Spark</td>
                  <td className="py-4 px-6 text-on-surface-variant">Tue, Thu, Sat • 7:30 PM IST</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                        <div className="h-full bg-error rounded-full" style={{ width: "94%" }}></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-error font-semibold">47/50 (Last 3)</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-label-md text-label-md text-secondary font-bold">₹499</td>
                  <td className="py-4 px-6 text-right">
                    <button className="px-4 py-1.5 rounded-lg bg-secondary text-on-secondary font-label-sm text-label-sm hover:bg-secondary-fixed transition-all font-semibold" onClick={() => handleSelectBatch('Spark 1.0', 499)}>
                      Apply Fast
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-high/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-on-surface">
                    Spark 2.0 (April Wave)
                    <div className="font-label-sm text-label-sm text-on-surface-variant font-normal">Full Syllabus Depth</div>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">Spark</td>
                  <td className="py-4 px-6 text-on-surface-variant">Mon, Wed, Fri • 8:00 PM IST</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary rounded-full" style={{ width: "48%" }}></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-tertiary font-semibold">24/50</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-label-md text-label-md text-secondary font-bold">₹499</td>
                  <td className="py-4 px-6 text-right">
                    <button className="px-4 py-1.5 rounded-lg bg-surface-container-highest text-secondary hover:bg-secondary hover:text-on-secondary font-label-sm text-label-sm transition-all font-semibold" onClick={() => handleSelectBatch('Spark 2.0', 499)}>
                      Apply
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-high/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-on-surface">
                    Apex 1.0 (Advanced Crucible)
                    <div className="font-label-sm text-label-sm text-on-surface-variant font-normal">Multi-Concept Focus</div>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">Apex</td>
                  <td className="py-4 px-6 text-on-surface-variant">Tue, Thu, Sun • 6:30 PM IST</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: "90%" }}></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">45/50</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-label-md text-label-md text-secondary font-bold">₹699</td>
                  <td className="py-4 px-6 text-right">
                    <button className="px-4 py-1.5 rounded-lg bg-secondary text-on-secondary font-label-sm text-label-sm hover:bg-secondary-fixed transition-all font-semibold" onClick={() => handleSelectBatch('Apex 1.0', 699)}>
                      Apply
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-high/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-on-surface">
                    Apex 2.0 (Elite Problem Solving)
                    <div className="font-label-sm text-label-sm text-on-surface-variant font-normal">Advanced Problem Sets</div>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">Apex</td>
                  <td className="py-4 px-6 text-on-surface-variant">Tue, Thu, Sat • 5:00 PM IST</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary rounded-full" style={{ width: "8%" }}></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-tertiary font-semibold">4/50 Open</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-label-md text-label-md text-secondary font-bold">₹699</td>
                  <td className="py-4 px-6 text-right">
                    <button className="px-4 py-1.5 rounded-lg bg-surface-container-highest text-secondary hover:bg-secondary hover:text-on-secondary font-label-sm text-label-sm transition-all font-semibold" onClick={() => handleSelectBatch('Apex 2.0', 699)}>
                      Apply
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
