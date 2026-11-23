export default function ApplicationsPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">Applications</h1>
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
            Submit batch applications and track their status. Each application automatically creates an introductory-call record.
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded border border-outline-variant/20 flex justify-between items-center">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">Spark 1.0 (April Depth)</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant block">Application ID: APP-2026-0914</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-tertiary-container/60 text-tertiary font-label-sm text-label-sm">Under Verification</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
