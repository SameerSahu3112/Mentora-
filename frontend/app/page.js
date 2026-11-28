import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
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

      <section className="relative w-full pt-12 pb-24 overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full bg-primary-container blur-3xl animate-float" />
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-secondary-container/20 blur-[120px] animate-gradient" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-secondary font-label-sm text-sm uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              Admissions Open • JEE 2025/2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-sm">
              <span className="material-symbols-outlined text-[14px] text-secondary">verified_user</span>
              No Automated Checkouts • Human Verification
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-display text-[54px] lg:text-[64px] font-bold text-on-surface tracking-tight animate-fade-in stagger-1">
                Strategic JEE Preparation with{" "}
                <span className="text-secondary underline decoration-secondary/30 decoration-wavy">
                  Guaranteed 1-on-1 Mentorship
                </span>
              </h1>
              <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl leading-relaxed animate-slide-up stagger-2">
                Targeted self-paced curricula for Classes 9–12 paired with mandatory weekly batch sessions and personal mentor calls from NIT Bhopal alumni. High-yield precision over passive video marathons.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 animate-slide-up stagger-3">
                <Link href="/courses" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-secondary text-on-secondary font-label-md text-sm font-bold shadow-lg shadow-secondary/15 hover:bg-secondary-fixed-dim transition-all active:scale-[0.98] btn-press">
                  <span>Explore Batches</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-high text-on-surface hover:text-secondary hover:bg-surface-bright transition-all font-label-md text-sm">
                  <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                  How Enrollment Works
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 animate-fade-in stagger-4">
              <div className="p-6 rounded-2xl bg-surface-container space-y-5 shadow-2xl relative overflow-hidden border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-sm text-secondary uppercase tracking-widest">Cohort Integrity</span>
                  <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm text-sm">Active Monitoring</span>
                </div>
                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between font-label-sm text-sm mb-1.5">
                      <span className="text-on-surface-variant">Batch Fill Velocity (Apex JEE Adv)</span>
                      <span className="text-secondary font-semibold">90% Full</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                      <div className="h-full bg-secondary rounded-full animate-fill-progress" style={{ "--fill-width": "90%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-sm text-sm mb-1.5">
                      <span className="text-on-surface-variant">Weekly Mentor Slots Claimed</span>
                      <span className="text-tertiary font-semibold">48 / 50</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                      <div className="h-full bg-tertiary rounded-full animate-fill-progress" style={{ "--fill-width": "96%" }} />
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-between text-on-surface-variant font-label-sm text-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">lock</span> Strict Concurrency Guard
                  </span>
                  <span className="text-secondary">0 Overbooking</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 p-4 rounded-xl bg-surface-container-low shadow-lg animate-slide-up stagger-5">
            <div className="p-3">
              <div className="font-label-sm text-sm text-secondary uppercase tracking-wider">Programs</div>
              <div className="font-headline-md text-sm font-bold text-on-surface mt-0.5">3 Targeted</div>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1">Rise • Spark • Apex</p>
            </div>
            <div className="p-3">
              <div className="font-label-sm text-sm text-secondary uppercase tracking-wider">Access Buffer</div>
              <div className="font-headline-md text-sm font-bold text-on-surface mt-0.5">Exam + 7 Days</div>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1">No premature dropouts</p>
            </div>
            <div className="p-3">
              <div className="font-label-sm text-sm text-secondary uppercase tracking-wider">Starting Tuition</div>
              <div className="font-headline-md text-sm font-bold text-secondary mt-0.5">₹299</div>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1">Direct single-fee access</p>
            </div>
            <div className="p-3">
              <div className="font-label-sm text-sm text-secondary uppercase tracking-wider">Mentorship Method</div>
              <div className="font-headline-md text-sm font-bold text-on-surface mt-0.5">Weekly 1:1</div>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1">Direct alumni phone calls</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-surface" id="batches-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-secondary font-label-sm text-sm uppercase tracking-widest mb-2">
                <span className="material-symbols-outlined text-[18px]">school</span> Curated Academic Tracks
              </div>
              <h2 className="font-display text-[40px] lg:text-[56px] font-bold text-on-surface tracking-tight animate-fade-in">
                Targeted Batches for JEE 2025 &amp; 2026
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant max-w-xl mt-2 animate-slide-up">
                Each track includes structured chapter diagnostics, self-paced archives, verified teacher access, and manual seat activation.
              </p>
            </div>
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-surface-container font-label-sm text-sm text-on-surface-variant animate-fade-in stagger-1">
              <span className="px-3 py-1 rounded-lg bg-surface-container-high text-secondary font-semibold">Strict Capacity Guard</span>
              <span className="px-3 py-1">Max 50 Students/Batch</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            <div className="flex flex-col justify-between rounded-2xl bg-surface-container p-6 lg:p-8 shadow-xl hover:bg-surface-container-high transition-all duration-300 glass-card">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface-variant font-label-sm text-sm uppercase tracking-wide">Main Jan Sprint</span>
                  <span className="font-label-sm text-sm text-secondary">Class 11 &amp; 12</span>
                </div>
                <h3 className="font-headline-md text-sm font-bold text-on-surface">Rise</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1">JEE Main (January Attempt) Focused Sprint</p>
                <div className="mt-6 flex items-baseline gap-2 pb-6">
                  <span className="font-display text-[40px] font-bold text-secondary">₹299</span>
                  <span className="font-label-sm text-sm text-on-surface-variant uppercase">Single Fee • No Recurring</span>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="font-label-sm text-sm text-on-surface-variant uppercase tracking-wider block">Available Cohort</label>
                  <div className="p-2.5 rounded-lg bg-surface-container-lowest flex items-center justify-between font-label-sm text-sm">
                    <span className="text-on-surface font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span> Rise 1.0 (Jan Fast-Track)
                    </span>
                    <span className="text-secondary font-semibold">38/50 Filled</span>
                  </div>
                </div>
                <div className="space-y-3 font-body-sm text-xs text-on-surface-variant">
                  <div className="flex items-start gap-2.5"><span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span><span>Access valid until <strong className="text-on-surface">Jan Exam Date + 7 Days</strong> buffer</span></div>
                  <div className="flex items-start gap-2.5"><span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span><span>Curated recorded modules &amp; downloadable analytical formula PDFs</span></div>
                  <div className="flex items-start gap-2.5"><span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span><span>Weekly live batch strategic mentorship session</span></div>
                  <div className="flex items-start gap-2.5"><span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span><span>Direct 1-on-1 teacher call booking on portal</span></div>
                </div>
              </div>
              <div className="pt-8 mt-8 space-y-3">
                <Link href="/auth/signup" className="w-full py-3 rounded-xl bg-surface-container-highest hover:bg-secondary hover:text-on-secondary text-secondary font-label-md text-sm font-semibold transition-all flex items-center justify-center gap-2">
                  <span>Apply for Rise Batch</span><span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <p className="font-label-sm text-sm text-center text-on-surface-variant flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[14px] text-secondary">phone_in_talk</span> Verified via Founder Strategy Call</p>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-2xl bg-surface-container-high p-6 lg:p-8 shadow-2xl relative shadow-secondary/10 transform lg:-translate-y-2 animate-slide-up stagger-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-sm font-bold tracking-widest uppercase shadow-md">Most Enrolled Program</div>
              <div>
                <div className="flex items-center justify-between mb-4 mt-1">
                  <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-sm uppercase tracking-wide font-semibold">April Depth Track</span>
                  <span className="font-label-sm text-sm text-secondary font-semibold">Class 12 &amp; Droppers</span>
                </div>
                <h3 className="font-headline-md text-sm font-bold text-on-surface">Spark</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1">JEE Main (April Attempt) Comprehensive Masterclass</p>
                <div className="mt-6 flex items-baseline gap-2 pb-6">
                  <span className="font-display text-[40px] font-bold text-secondary">₹499</span>
                  <span className="font-label-sm text-sm text-on-surface-variant uppercase">Single Fee • Zero Upsells</span>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="font-label-sm text-sm text-secondary uppercase tracking-wider block font-semibold">Active Cohorts</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-2 rounded-lg bg-surface-container-lowest text-left hover:bg-surface-container font-label-sm text-sm">
                      <div className="text-on-surface font-medium truncate">Spark 1.0</div><div className="text-secondary text-[11px]">47/50 (Last 3)</div>
                    </button>
                    <button className="p-2 rounded-lg bg-surface-container-lowest text-left hover:bg-surface-container font-label-sm text-sm">
                      <div className="text-on-surface font-medium truncate">Spark 2.0</div><div className="text-tertiary text-[11px]">Open • 24/50</div>
                    </button>
                  </div>
                </div>
                <div className="space-y-3 font-body-sm text-xs text-on-surface-variant">
                  <div className="flex items-start gap-2.5"><span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span><span>Full access buffer until <strong className="text-on-surface">April Exam Date + 7 Days</strong></span></div>
                  <div className="flex items-start gap-2.5"><span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span><span>Complete high-yield chapter modules &amp; multi-tier test archive</span></div>
                  <div className="flex items-start gap-2.5"><span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span><span>Mandatory weekly batch review + personalized weak-point audit</span></div>
                  <div className="flex items-start gap-2.5"><span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span><span>Priority 1:1 personal teacher bookings directly on portal</span></div>
                </div>
              </div>
              <div className="pt-8 mt-8 space-y-3">
                <Link href="/auth/signup" className="w-full py-3.5 rounded-xl bg-secondary text-on-secondary font-label-md text-sm font-bold shadow-lg shadow-secondary/20 hover:bg-secondary-fixed-dim transition-all flex items-center justify-center gap-2">
                  <span>Apply for Spark Batch</span><span className="material-symbols-outlined text-[18px]">verified_user</span>
                </Link>
                <p className="font-label-sm text-sm text-center text-on-surface-variant flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[14px] text-secondary">verified</span> Direct NIT Alumni Guidance</p>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-2xl bg-surface-container p-6 lg:p-8 shadow-xl hover:bg-surface-container-high transition-all duration-300 glass-card animate-slide-up stagger-3">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface-variant font-label-sm text-sm uppercase tracking-wide">Advanced Crucible</span>
                  <span className="font-label-sm text-sm text-secondary">Top 10k Rank Target</span>
                </div>
                <h3 className="font-headline-md text-sm font-bold text-on-surface">Apex</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1">JEE Advanced Rigour &amp; Multi-Concept Mastery</p>
                <div className="mt-6 flex items-baseline gap-2 pb-6">
                  <span className="font-display text-[40px] font-bold text-secondary">₹699</span>
                  <span className="font-label-sm text-sm text-on-surface-variant uppercase">Single Fee • Comprehensive</span>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="font-label-sm text-sm text-on-surface-variant uppercase tracking-wider block">Target Batches</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-surface-container-lowest font-label-sm text-sm"><div className="text-on-surface font-medium truncate">Apex 1.0</div><div className="text-secondary text-[11px]">45/50 Seats</div></div>
                    <div className="p-2 rounded-lg bg-surface-container-lowest font-label-sm text-sm"><div className="text-on-surface font-medium truncate">Apex 2.0</div><div className="text-tertiary text-[11px]">28/50 Open</div></div>
                  </div>
                </div>
                <div className="space-y-3 font-body-sm text-xs text-on-surface-variant">
                  <div className="flex items-start gap-2.5"><span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span><span>Active until <strong className="text-on-surface">JEE Advanced Date + 7 Days</strong></span></div>
                  <div className="flex items-start gap-2.5"><span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span><span>Multi-concept cross-subject problem archives (Math/Phy/Chem)</span></div>
                  <div className="flex items-start gap-2.5"><span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span><span>Strict batch concurrency locks (No crowded rooms)</span></div>
                  <div className="flex items-start gap-2.5"><span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span><span>Bi-weekly dedicated 1:1 strategy calls with lead mentors</span></div>
                </div>
              </div>
              <div className="pt-8 mt-8 space-y-3">
                <Link href="/auth/signup" className="w-full py-3 rounded-xl bg-surface-container-highest hover:bg-secondary hover:text-on-secondary text-secondary font-label-md text-sm font-semibold transition-all flex items-center justify-center gap-2">
                  <span>Apply for Apex Batch</span><span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <p className="font-label-sm text-sm text-center text-on-surface-variant flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[14px] text-secondary">phone_in_talk</span> Diagnostic Pre-Evaluation Call</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-surface-container-lowest" id="workflow-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3 animate-fade-in">
            <div className="inline-flex items-center gap-2 text-secondary font-label-sm text-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">account_tree</span> PRD-Governed Transparent Workflow
            </div>
            <h2 className="font-display text-[40px] lg:text-[56px] font-bold text-on-surface tracking-tight">
              How Enrollment Works: Step-by-Step
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant animate-slide-up">
              Mentora prohibits impersonal automated checkouts. Every aspirant is evaluated, mapped to the correct batch capacity, and manually verified before access is granted.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between space-y-4 shadow-md animate-fade-in stagger-1">
              <div className="space-y-3">
                <div className="flex items-center justify-between"><span className="font-label-sm text-sm font-bold text-secondary">STEP 01</span><span className="material-symbols-outlined text-[24px] text-secondary">travel_explore</span></div>
                <h3 className="font-headline-sm text-sm font-semibold text-on-surface">Browse Course &amp; Pick Target Batch</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">Examine Rise, Spark, or Apex. Confirm live seat availability with zero-overbooking safeguards.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-sm">Capacity strictly capped at 50 per batch</div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between space-y-4 shadow-md animate-fade-in stagger-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between"><span className="font-label-sm text-sm font-bold text-secondary">STEP 02</span><span className="material-symbols-outlined text-[24px] text-secondary">badge</span></div>
                <h3 className="font-headline-sm text-sm font-semibold text-on-surface">Submit Student Application</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">Provide student name, academic grade, contact number, and target exam year. Unique Student ID generated immediately.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-sm">Instant tracking ID allocated</div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between space-y-4 shadow-md animate-fade-in stagger-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between"><span className="font-label-sm text-sm font-bold text-secondary">STEP 03</span><span className="material-symbols-outlined text-[24px] text-secondary">call_quality</span></div>
                <h3 className="font-headline-sm text-sm font-semibold text-on-surface">Free Introductory Phone Call</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">Within 7 days of application, an Admin or NIT mentor calls the student and parent to audit syllabus completion.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-sm">Direct 1:1 strategy alignment</div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between space-y-4 shadow-md animate-fade-in stagger-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between"><span className="font-label-sm text-sm font-bold text-secondary">STEP 04</span><span className="material-symbols-outlined text-[24px] text-secondary">account_balance_wallet</span></div>
                <h3 className="font-headline-sm text-sm font-semibold text-on-surface">Manual Payment Recording</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">Direct UPI or bank transfer recorded by the administrator. Transaction reference cataloged with timestamp.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-sm">Secure, non-automated accounting</div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between space-y-4 shadow-md animate-fade-in stagger-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between"><span className="font-label-sm text-sm font-bold text-secondary">STEP 05</span><span className="material-symbols-outlined text-[24px] text-secondary">admin_panel_settings</span></div>
                <h3 className="font-headline-sm text-sm font-semibold text-on-surface">Admin Activation Protocol</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">Two-admin security clearance locks the student to the batch schedule, unlocks learning materials.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-sm">Portal credentials dispatched via SMS/Email</div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between space-y-4 shadow-md animate-fade-in stagger-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between"><span className="font-label-sm text-sm font-bold text-secondary">STEP 06</span><span className="material-symbols-outlined text-[24px] text-secondary">event_available</span></div>
                <h3 className="font-headline-sm text-sm font-semibold text-on-surface">Access &amp; Weekly 1:1 Mentorship</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">Immediate access to practice sheets and video modules. Weekly batch sessions until Exam Date + 7 Days.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-sm">Guaranteed post-exam buffer</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-outline-variant/20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2"><span className="text-xl font-display font-bold text-primary">Mentora</span><span className="text-sm font-semibold text-secondary">.</span></Link>
              <p className="font-body-sm text-xs text-on-surface-variant">JEE preparation platform with courses, batches, mentorship, and learning resources for Classes 9–12.</p>
            </div>
            <div>
              <h4 className="font-label-sm text-sm text-secondary uppercase tracking-widest mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link href="/courses" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Courses</Link></li>
                <li><Link href="/about" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/contact" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-label-sm text-sm text-secondary uppercase tracking-widest mb-4">Student Portals</h4>
              <ul className="space-y-2">
                <li><Link href="/student/dashboard" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Student Dashboard</Link></li>
                <li><Link href="/teacher/dashboard" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Teacher Dashboard</Link></li>
                <li><Link href="/admin/dashboard" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Admin Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-label-sm text-sm text-secondary uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Student Privacy (§20)</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-outline-variant/20 pt-8">
            <p className="font-label-sm text-xs text-on-surface-variant text-center">Mentora &copy; 2026. Built for JEE aspirants. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
