"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/notifications/`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse h-32 bg-border-color rounded" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <a href="/student/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm">
            &larr; Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Notifications</h1>

        {notifications.length === 0 ? (
          <div className="bg-primary p-8 rounded-lg shadow-sm border border-border-color text-center">
            <p className="text-muted">No notifications.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-primary p-3 rounded-lg shadow-sm border border-border-color flex justify-between items-start ${!notification.read ? 'border-l-4 border-abyss-teal bg-abyss-teal-light' : ''}`}
              >
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-abyss-teal">{notification.title}</h3>
                  <p className="text-secondary text-sm mt-1">{notification.message}</p>
                  <p className="text-xs text-muted mt-2">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </p>
                </div>
                {!notification.read && (
                  <span className="w-2 h-2 bg-abyss-teal rounded-full" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
