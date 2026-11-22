export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">Learning Resources</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
          Access published resources covered by your active enrollments. Opening a resource does not automatically mark it complete.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Rigid Body Notes', type: 'PDF', size: '14.8 MB' },
            { title: 'DPP-04 Angular Momentum', type: 'DPP', size: '3.1 MB' },
            { title: 'IAOR Masterclass', type: 'Video', size: '42 min' },
          ].map((r) => (
            <div key={r.title} className="bg-surface-container p-4 rounded-lg border border-outline-variant/20">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-1">{r.title}</h3>
              <span className="font-label-sm text-label-sm text-secondary">{r.type}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant block mt-1">{r.size}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
