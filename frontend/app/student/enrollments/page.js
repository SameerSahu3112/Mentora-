export default function EnrollmentsPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">Enrollments</h1>
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
            Active enrollments grant access to published resources. Expired enrollments preserve history but block protected access.
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded border border-outline-variant/20 flex justify-between items-center">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">Spark 1.0 — JEE Main April</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant block">Access until April 19, 2026</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-tertiary-container/60 text-tertiary font-label-sm text-label-sm">ACTIVE</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
