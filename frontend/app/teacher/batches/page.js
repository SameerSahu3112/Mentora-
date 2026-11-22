export default function TeacherBatchesPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">Assigned Batches</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Apex 1.0', 'Spark 1.0'].map((batch) => (
            <div key={batch} className="bg-surface-container p-4 rounded-lg border border-outline-variant/20">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{batch}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Assigned teacher</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
