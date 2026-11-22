export default function ContactPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">Contact / Help</h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8">
          Reach the Mentora team for batch inquiries, application support, or general questions.
        </p>
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-3">Get in Touch</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">
            Email: support@mentora.example.com
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
            Introductory calls are scheduled within 7 days of application per our enrollment workflow.
          </p>
        </div>
      </section>
    </main>
  );
}
