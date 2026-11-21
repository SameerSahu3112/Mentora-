"use client";

export default function TeacherAttendance() {
  return (
    <main className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <a href="/teacher/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
            &larr; Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Attendance</h1>

        <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
          <p className="text-secondary">
            Attendance marking will be available for your assigned weekly sessions.
          </p>
        </div>
      </div>
    </main>
  );
}
