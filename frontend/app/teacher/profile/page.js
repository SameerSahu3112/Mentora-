/**
 * Mentora Teacher Profile
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function TeacherProfile() {
  const teacher = {
    fullName: 'Rajesh Kumar',
    email: 'rajesh@mentora.example.com',
    role: 'teacher',
  };

  return (
    <div className="teacher-layout">
      <nav className="mb-6">
        <Link href="/teacher/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Teacher Profile</h1>

      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-abyss-teal-light rounded-full flex items-center justify-center text-abyss-teal text-xl font-bold">
            {teacher.fullName ? teacher.fullName.charAt(0) : 'T'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-abyss-teal">{teacher.fullName}</h2>
            <p className="text-desert-sand-dark font-medium">Teacher</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-secondary mb-1">Email</p>
            <p className="text-secondary">{teacher.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-secondary mb-1">Role</p>
            <p className="text-secondary capitalize">{teacher.role}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-medium text-secondary mb-2">Note:</p>
          <p className="text-secondary text-sm">
            Your phone number is not displayed to students for privacy. Students can contact you through mentorship bookings.
          </p>
        </div>
      </div>
    </div>
  );
}
