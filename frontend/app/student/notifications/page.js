export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">Notifications</h1>
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20 space-y-3">
          <div className="p-3 rounded border-b border-outline-variant/20 flex justify-between items-start">
            <div>
              <span className="font-label-sm text-label-sm text-secondary block">Intro Call Scheduled</span>
              <span className="font-body-sm text-body-sm text-on-surface">Your 7-day intro call is set for Saturday, Feb 28 • 4:00 PM IST</span>
            </div>
            <span className="font-label-sm text-label-sm text-tertiary">Today</span>
          </div>
        </div>
      </section>
    </main>
  );
}
