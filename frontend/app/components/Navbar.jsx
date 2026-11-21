/**
 * Shared Navbar Component
 * Brand: Abyss Teal + Desert Sand
 * All links use Next.js Link for proper client-side navigation
 */

import Link from 'next/link';

export default function Navbar({ currentUser = null }) {
  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="logo">
          Mentora<span style={{ color: '#E9C46A' }}>.</span>
        </Link>

        <div className="nav-links">
          <Link href="/" className={currentUser?.role === 'student' ? 'active' : ''}>Home</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          {currentUser && currentUser.role === 'admin' && (
            <>
              <Link href="/admin/dashboard">Admin</Link>
              <Link href="/admin/approvals">Approvals</Link>
            </>
          )}
          {currentUser && currentUser.role === 'teacher' && (
            <>
              <Link href="/teacher/dashboard">Dashboard</Link>
              <Link href="/teacher/batches">Batches</Link>
            </>
          )}
          {currentUser && currentUser.role === 'student' && (
            <>
              <Link href="/student/dashboard">Dashboard</Link>
              <Link href="/student/enrollments">Enrollments</Link>
            </>
          )}
        </div>

        <div className="nav-actions">
          {currentUser ? (
            <>
              <span className="text-sm font-medium text-secondary mr-4">
                {currentUser.full_name || 'User'}
              </span>
              <button
                onClick={() => {
                  // Clear session and redirect
                  if (typeof window !== 'undefined') {
                    // Clear any session data
                    window.location.href = '/auth/login';
                  }
                }}
                className="btn btn-outline btn-sm"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn btn-outline btn-sm">
                Sign In
              </Link>
              <Link href="/auth/signup" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
