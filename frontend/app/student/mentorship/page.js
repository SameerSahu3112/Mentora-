export default function MentorshipPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">Mentorship</h1>
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20 space-y-4">
          <div>
            <span className="font-label-sm text-label-sm text-outline uppercase block">Weekly Batch Mentorship</span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-2">Advanced Rotational Dynamics</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Tuesday · 7:30 PM IST · Harshitraj Sir (NIT Bhopal)</p>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-outline uppercase block">1-on-1 Faculty Booking</span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-2">Request a Personal Session</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Select your assigned batch mentor and book a 25-minute slot.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
