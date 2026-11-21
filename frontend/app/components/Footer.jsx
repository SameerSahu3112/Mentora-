/**
 * Shared Footer Component
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div className="logo" style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F4C5C', marginBottom: '1rem', display: 'block' }}>
              Mentora<span style={{ color: '#E9C46A' }}>.</span>
            </div>
            <p style={{ color: '#7A8A94', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              JEE preparation platform helping students in Classes 9–12 prepare for JEE Main and JEE Advanced with recorded learning, mentorship, and expert guidance.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="#" style={{ color: 'rgba(15, 76, 92, 0.6)', fontSize: '1.25rem' }} aria-label="Facebook">Facebook</a>
              <a href="#" style={{ color: 'rgba(15, 76, 92, 0.6)', fontSize: '1.25rem' }} aria-label="Twitter">Twitter</a>
              <a href="#" style={{ color: 'rgba(15, 76, 92, 0.6)', fontSize: '1.25rem' }} aria-label="Instagram">Instagram</a>
              <a href="#" style={{ color: 'rgba(15, 76, 92, 0.6)', fontSize: '1.25rem' }} aria-label="LinkedIn">LinkedIn</a>
            </div>
          </div>
          <div>
            <h3 style={{ color: '#0F4C5C', fontSize: '1.125rem', marginBottom: '1.5rem' }}>Platform</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '0.75rem' }}><Link href="/courses" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>Courses & Batches</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link href="/about" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>About Us</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link href="/contact" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>Contact / Help</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link href="/auth/login" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>Student Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: '#0F4C5C', fontSize: '1.125rem', marginBottom: '1.5rem' }}>Student Portal</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '0.75rem' }}><Link href="/student/dashboard" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>Dashboard</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link href="/student/applications" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>Applications</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link href="/student/enrollments" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>Enrollments</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link href="/student/resources" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>Resources</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: '#0F4C5C', fontSize: '1.125rem', marginBottom: '1.5rem' }}>Admin & Teacher</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '0.75rem' }}><Link href="/admin/dashboard" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>Admin Dashboard</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link href="/teacher/dashboard" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>Teacher Dashboard</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link href="/admin/approvals" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>Approvals</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link href="/admin/audit-logs" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>Audit Logs</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(15, 76, 92, 0.1)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: '#7A8A94' }}>
          <span>© 2026 Mentora Inc. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/privacy-policy" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms-of-use" style={{ color: 'rgba(15, 76, 92, 0.7)', textDecoration: 'none' }}>Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
