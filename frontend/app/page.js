/**
 * Mentora Home Page
 * Phase 10: Frontend Portal Completion
 * Brand: Abyss Teal + Desert Sand
 */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-primary rounded-lg shadow-md p-8 border border-border-color">
          <h1 className="text-4xl font-bold text-abyss-teal mb-4">Mentora</h1>
          <p className="text-secondary text-lg mb-6">
            JEE preparation platform — helping students in Classes 9–12 prepare for JEE Main and JEE Advanced.
          </p>
          <div className="bg-desert-sand-light rounded-lg p-6 border border-desert-sand-border">
            <h2 className="text-xl font-semibold text-abyss-teal mb-2">Get Started</h2>
            <p className="text-secondary mb-4">
              Browse courses, select a batch, register, and access learning resources with mentorship.
            </p>
            <a
              href="/courses"
              className="btn-primary"
            >
              Explore Courses
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
