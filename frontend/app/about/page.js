/**
 * Mentora About Us Page
 * Phase 10: Frontend Portal Completion
 * Brand: Abyss Teal + Desert Sand
 */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-abyss-teal mb-6">About Us</h1>
        <section className="bg-primary rounded-lg shadow-md p-6 border border-border-color mb-8">
          <h2 className="text-xl font-semibold text-abyss-teal mb-4">Our Story</h2>
          <p className="text-secondary">
            Mentora is a student-focused JEE preparation platform helping students in Classes 9–12 prepare for JEE Main and JEE Advanced.
          </p>
        </section>
        <section className="bg-desert-sand-light rounded-lg p-6 border border-desert-sand-border">
          <h2 className="text-xl font-semibold text-abyss-teal mb-4">Founders</h2>
          <p className="text-secondary">
            Founder profiles will be displayed here once supplied and verified. No photos, roles, ranks, degrees, or achievements are published without consent.
          </p>
        </section>
      </div>
    </main>
  );
}
