export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">Profile</h1>
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center text-secondary font-display font-bold text-2xl">AS</div>
            <div className="flex flex-col gap-2">
              <span className="font-headline-md text-headline-md text-on-surface font-bold">Aarav Sharma</span>
              <span className="font-label-sm text-label-sm text-secondary">MENT-2026-0842</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Class 12 • Spark 1.0</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
