export default function AdminPaymentsPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">Manual Payments</h1>
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Record manual payments (UPI, NEFT, cash). No payment gateway in v1.</p>
        </div>
      </section>
    </main>
  );
}
