/**
 * Mentora Student Notifications
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function NotificationsPage() {
  const notifications = [
    { id: 'n1', title: 'Application Received', message: 'Thank you for registering with Mentora! Our team will contact you soon.', read: true, createdAt: '2026-11-15' },
    { id: 'n2', title: 'Introductory Call Scheduled', message: 'Your intro call is scheduled for tomorrow at 10:00 AM.', read: false, createdAt: '2026-11-16' },
    { id: 'n3', title: 'Enrollment Activated', message: 'Your enrollment has been activated. You can now access resources.', read: false, createdAt: '2026-11-17' },
  ];

  return (
    <div className="student-layout">
      <nav className="mb-6">
        <Link href="/student/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Notifications</h1>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className={`card flex justify-between items-start ${!notification.read ? 'border-l-4 border-abyss-teal bg-abyss-teal-light' : ''}`}>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-abyss-teal">{notification.title}</h3>
              <p className="text-secondary text-sm mt-1">{notification.message}</p>
              <p className="text-xs text-muted mt-2">{new Date(notification.createdAt).toLocaleDateString()}</p>
            </div>
            {!notification.read && <span className="w-2 h-2 bg-abyss-teal rounded-full" />}
          </div>
        ))}
      </div>
    </div>
  );
}
