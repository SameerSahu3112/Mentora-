"use client";

export default function TeacherAttendance() {
  return (
    <main className="min-h-screen bg-[#001719] p-6">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6"><a href="/teacher/dashboard" className="text-[#0F4C5C] hover:text-[#0F4C5C] text-sm font-medium">← Back to Dashboard</a></nav>
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Attendance</h1>
        <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
          <p className="text-secondary">Attendance marking will be available for your assigned weekly sessions.</p>
        </div>
      </div>
    </main>
  );
}
