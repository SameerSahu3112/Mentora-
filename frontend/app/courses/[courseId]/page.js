export default function CourseDetailPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">Course Details</h1>
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-4">Spark — JEE Main April</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Comprehensive masterclass for the JEE Main April attempt.</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-surface-container-low p-3 rounded border border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-outline block">Price</span>
              <span className="font-headline-md text-headline-md font-bold text-secondary">₹499</span>
            </div>
            <div className="bg-surface-container-low p-3 rounded border border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-outline block">Exam Target</span>
              <span className="font-headline-md text-headline-md font-bold text-secondary">JEE Main — April</span>
            </div>
          </div>
          <button className="w-full py-3 rounded bg-secondary text-on-secondary font-label-md text-label-md font-bold hover:bg-secondary-fixed transition-colors">
            View Batches & Apply
          </button>
        </div>
      </section>
    </main>
  );
}
