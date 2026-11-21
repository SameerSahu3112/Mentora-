/**
 * Mentora Student Profile
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function ProfilePage() {
  const profile = {
    fullName: 'Aarav Sharma',
    studentId: 'MENT-2026-0001',
    email: 'aarav@example.com',
    classLevel: '11',
    phone: '+91 98765 43210',
    schoolName: 'Delhi Public School',
    role: 'student',
  };

  return (
    <div className="student-layout">
      <nav className="mb-6">
        <Link href="/student/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">My Profile</h1>

      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-abyss-teal-light rounded-full flex items-center justify-center text-abyss-teal text-xl font-bold">
            {profile.fullName ? profile.fullName.charAt(0) : 'S'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-abyss-teal">{profile.fullName}</h2>
            <p className="text-desert-sand-dark font-medium">Student ID: {profile.studentId}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-secondary mb-1">Email</p>
            <p className="text-secondary">{profile.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-secondary mb-1">Class</p>
            <p className="text-secondary">{profile.classLevel}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-secondary mb-1">Phone</p>
            <p className="text-secondary">{profile.phone}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-secondary mb-1">School</p>
            <p className="text-secondary">{profile.schoolName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-secondary mb-1">Role</p>
            <p className="text-secondary capitalize">{profile.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
