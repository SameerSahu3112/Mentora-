export default function AdminTeachersPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">Teachers</h1>
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Teacher accounts are created by Admin only. No teacher self-registration.</p>
        </div>
      </section>
    </main>
  );
}
