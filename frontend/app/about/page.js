export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">About Mentora</h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
          Mentora is a student-focused JEE preparation platform that helps students discover courses and batches, register for a programme, speak with the Mentora team, complete manual enrollment, access learning resources, and receive mentorship.
        </p>
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-4">Our Founders</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
            Built by Harshitraj Singh Panwar and Naitik Mujawadiya — NIT Bhopal alumni with over three years of JEE mentorship and curriculum design experience.
          </p>
          <p className="font-body-sm text-body-sm text-outline italic">
            We never publish photos, names, testimonials, or results without appropriate consent. Placeholders used until supplied and verified.
          </p>
        </div>
      </section>
    </main>
  );
}
