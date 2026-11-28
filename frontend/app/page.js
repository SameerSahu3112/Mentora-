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

      {/* Hero section - design structure only, no data */}
      <section className="relative w-full pt-12 pb-24 overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full bg-primary-container blur-3xl animate-float" />
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-secondary-container/20 blur-[120px] animate-gradient" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Admissions banner - no specific numbers */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-secondary font-label-sm text-sm uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              Admissions Open
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-sm">
              <span className="material-symbols-outlined text-[14px] text-secondary">verified_user</span>
              Human Verification Protocol
            </span>
          </div>

          {/* Main headline - generic */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-display text-[54px] lg:text-[64px] font-bold text-on-surface tracking-tight animate-fade-in stagger-1">
                Strategic JEE Preparation
              </h1>
              <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl leading-relaxed animate-slide-up stagger-2">
                Targeted self-paced curricula for Classes 9–12 paired with weekly batch sessions and personal mentor calls. High-yield precision over passive video marathons.
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
              {/* Empty placeholder card - no stats */}
              <div className="p-6 rounded-2xl bg-surface-container space-y-5 shadow-2xl relative overflow-hidden border border-outline-variant/20">
                <div className="space-y-5">
                  {/* Placeholder - no specific metrics */}
                  <div className="h-12 w-12 rounded-xl bg-surface-container-highest flex items-center justify-center opacity-50">
                    <span className="material-symbols-outlined text-[24px] text-secondary">star</span>
                  </div>
                  <p className="text-center text-on-surface-variant text-sm">Key metrics will appear here</p>
                </div>
                <div className="space-y-3">
                  <div className="pt-4 border-t border-outline-variant/20">
                    <span className="text-on-surface-variant text-xs">Batch Fill</span>
                    <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/20">
                    <span className="text-on-surface-variant text-xs">Mentor Slots</span>
                    <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses section - generic */}
      <section className="w-full py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-secondary font-label-md text-sm uppercase tracking-widest mb-2">
                <span className="material-symbols-outlined text-[18px]">school</span> Curated Academic Tracks
              </div>
              <h2 className="font-display text-[40px] lg:text-[56px] font-bold text-on-surface tracking-tight animate-fade-in">
                Targeted Batches Available
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant max-w-xl mt-2 animate-slide-up">
                Browse structured chapter diagnostics, self-paced archives, and verified teacher access for each track.
              </p>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container text-on-surface-variant">
              <span>Max 50 Students/Batch</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Card 1: Generic */}
            <div className="flex flex-col justify-between rounded-2xl bg-surface-container p-6 lg:p-8 shadow-xl hover:bg-surface-container-high transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface-variant font-label-sm text-sm uppercase tracking-wide">Main Jan Sprint</span>
                  <span className="font-label-sm text-sm text-secondary">Class 11 & 12</span>
                </div>
                <h3 className="font-display text-sm font-bold text-on-surface">Rise</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1">JEE Main Focused Sprint</p>
                <div className="mt-6 flex items-baseline gap-2 pb-6">
                  <span className="font-display text-[40px] font-bold text-secondary">₹299</span>
                  <span className="font-label-sm text-sm text-on-surface-variant uppercase">Single Fee</span>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="font-label-sm text-sm text-on-surface-variant uppercase tracking-wider block">Available Cohort</label>
                  <div className="p-2.5 rounded-lg bg-surface-container-lowest flex items-center justify-between font-label-sm text-sm">
                    <span className="text-on-surface font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      Rise 1.0
                    </span>
                    <span className="text-secondary font-semibold">Seats Available</span>
                  </div>
                </div>
                <div className="space-y-3 font-body-sm text-xs text-on-surface-variant">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Comprehensive course modules</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Recorded video archives</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Weekly mentorship sessions</span>
                  </div>
                </div>
              </div>
              <div className="pt-8 mt-8 space-y-3">
                <Link href="/courses" className="w-full py-3 rounded-xl bg-surface-container-highest hover:bg-secondary hover:text-on-secondary text-secondary font-label-md text-sm font-semibold transition-all flex items-center justify-center gap-2">
                  <span>View All Batches</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <p className="font-label-sm text-sm text-center text-on-surface-variant flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary">Contact</span>
                  Admissions team will verify
                </p>
              </div>
            </div>

            {/* Card 2: Generic */}
            <div className="flex flex-col justify-between rounded-2xl bg-surface-container-high p-6 lg:p-8 shadow-2xl relative shadow-secondary/10 transform lg:-translate-y-2 animate-slide-up stagger-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-sm font-bold tracking-widest uppercase">Most Enrolled</div>
              <div>
                <div className="flex items-center justify-between mb-4 mt-1">
                  <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-sm uppercase tracking-wide font-semibold">April Depth Track</span>
                  <span className="font-label-sm text-sm text-secondary font-semibold">Class 12 & Droppers</span>
                </div>
                <h3 className="font-display text-sm font-bold text-on-surface">Spark</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1">JEE Main April Attempt</p>
                <div className="mt-6 flex items-baseline gap-2 pb-6">
                  <span className="font-display text-[40px] font-bold text-secondary">₹499</span>
                  <span className="font-label-sm text-sm text-on-surface-variant uppercase">Single Fee</span>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="font-label-sm text-sm text-secondary uppercase tracking-wider block font-semibold">Active Cohorts</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-2 rounded-lg bg-surface-container-lowest text-left hover:bg-surface-container font-label-sm text-sm">
                      <div className="text-on-surface font-medium truncate">Spark 1.0</div>
                    </button>
                    <button className="p-2 rounded-lg bg-surface-container-lowest text-left hover:bg-surface-container font-label-sm text-sm">
                      <div className="text-on-surface font-medium truncate">Spark 2.0</div>
                    </button>
                  </div>
                </div>
                <div className="space-y-3 font-body-sm text-xs text-on-surface-variant">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Complete high-yield modules</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Multi-tier test archive</span>
                  </div>
                </div>
              </div>
              <div className="pt-8 mt-8 space-y-3">
                <Link href="/courses" className="w-full py-3.5 rounded-xl bg-secondary text-on-secondary font-label-md text-sm font-bold shadow-lg shadow-secondary/20 hover:bg-secondary-fixed-dim transition-all flex items-center justify-center gap-2">
                  <span>Apply Now</span>
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                </Link>
                <p className="font-label-sm text-sm text-center text-on-surface-variant flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary">Guidance</span>
                  NIT Alumni support
                </p>
              </div>
            </div>

            {/* Card 3: Generic */}
            <div className="flex flex-col justify-between rounded-2xl bg-surface-container p-6 lg:p-8 shadow-xl hover:bg-surface-container-high transition-all duration-300 animate-slide-up stagger-3">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface-variant font-label-sm text-sm uppercase tracking-wide">Advanced Crucible</span>
                  <span className="font-label-sm text-sm text-secondary">Top Rank Focus</span>
                </div>
                <h3 className="font-display text-sm font-bold text-on-surface">Apex</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1">JEE Advanced Mastery</p>
                <div className="mt-6 flex items-baseline gap-2 pb-6">
                  <span className="font-display text-[40px] font-bold text-secondary">₹699</span>
                  <span className="font-label-sm text-sm text-on-surface-variant uppercase">Single Fee</span>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="font-label-sm text-sm text-on-surface-variant uppercase tracking-wider block">Target Batches</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-surface-container-lowest font-label-sm text-sm">
                      <div className="text-on-surface font-medium truncate">Apex 1.0</div>
                    </div>
                    <div className="p-2 rounded-lg bg-surface-container-lowest font-label-sm text-sm">
                      <div className="text-on-surface font-medium truncate">Apex 2.0</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 font-body-sm text-xs text-on-surface-variant">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Cross-subject problem archives</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>Concurrency locks enforced</span>
                  </div>
                </div>
              </div>
              <div className="pt-8 mt-8 space-y-3">
                <Link href="/courses" className="w-full py-3 rounded-xl bg-surface-container-highest hover:bg-secondary hover:text-on-secondary text-secondary font-label-md text-sm font-semibold transition-all flex items-center justify-center gap-2">
                  <span>Apply Now</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <p className="font-label-sm text-sm text-center text-on-surface-variant flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary">Assessment</span>
                  Diagnostic call required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow section - generic steps */}
      <section className="w-full py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3 animate-fade-in">
            <div className="inline-flex items-center gap-2 text-secondary font-label-sm text-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">account_tree</span> Transparent Process
            </div>
            <h2 className="font-display text-[40px] lg:text-[56px] font-bold text-on-surface tracking-tight">
              Enrollment Process
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant animate-slide-up">
              Every aspirant is evaluated and mapped to the correct batch capacity before access is granted.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between space-y-4 shadow-md animate-fade-in stagger-1">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-sm font-bold text-secondary">Step 1</span>
                  <span className="material-symbols-outlined text-[24px] text-secondary">travel_explore</span>
                </div>
                <h3 className="font-display text-sm font-semibold text-on-surface">Browse & Select</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Review available batches and confirm seat availability.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-sm">
                Capacity checked at DB level
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between space-y-4 shadow-md animate-fade-in stagger-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-sm font-bold text-secondary">Step 2</span>
                  <span className="material-symbols-outlined text-[24px] text-secondary">badge</span>
                </div>
                <h3 className="font-display text-sm font-semibold text-on-surface">Submit Application</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Provide details for student ID allocation.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-sm">
                ID generated immediately
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between space-y-4 shadow-md animate-fade-in stagger-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-sm font-bold text-secondary">Step 3</span>
                  <span className="material-symbols-outlined text-[24px] text-secondary">call_quality</span>
                </div>
                <h3 className="font-display text-sm font-semibold text-on-surface">Intro Call</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Mentor discusses syllabus and sets targets.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-sm">
                Within 7-day window
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between space-y-4 shadow-md animate-fade-in stagger-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-sm font-bold text-secondary">Step 4</span>
                  <span className="material-symbols-outlined text-[24px] text-secondary">account_balance_wallet</span>
                </div>
                <h3 className="font-display text-sm font-semibold text-on-surface">Payment Record</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  UPI/bank transfer logged with timestamp.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-sm">
                Manual reconciliation
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between space-y-4 shadow-md animate-fade-in stagger-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-sm font-bold text-secondary">Step 5</span>
                  <span className="material-symbols-outlined text-[24px] text-secondary">admin_panel_settings</span>
                </div>
                <h3 className="font-display text-sm font-semibold text-on-surface">Admin Approval</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Dual-admin clearance locks student to batch.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-sm">
                Credentials dispatched
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between space-y-4 shadow-md animate-fade-in stagger-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-sm font-bold text-secondary">Step 6</span>
                  <span className="material-symbols-outlined text-[24px] text-secondary">event_available</span>
                </div>
                <h3 className="font-display text-sm font-semibold text-on-surface">Access Granted</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Immediate access to materials and weekly mentorship.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm text-sm">
                Post-exam buffer included
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - generic */}
      <footer className="border-t border-outline-variant/20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-display font-bold text-primary">Mentora</span>
                <span className="text-sm font-semibold text-secondary">.</span>
              </Link>
              <p className="font-body-sm text-xs text-on-surface-variant">
                JEE preparation platform with courses, batches, mentorship, and learning resources.
              </p>
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
              <h4 className="font-label-sm text-sm text-secondary uppercase tracking-widest mb-4">Portals</h4>
              <ul className="space-y-2">
                <li><Link href="/student/dashboard" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Student</Link></li>
                <li><Link href="/teacher/dashboard" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Teacher</Link></li>
                <li><Link href="/admin/dashboard" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Admin</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-label-sm text-sm text-secondary uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">Privacy (§20)</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-outline-variant/20 pt-8">
            <p className="font-label-sm text-xs text-on-surface-variant text-center">
              Mentora &copy; 2026. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
