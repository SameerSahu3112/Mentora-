"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/enrollments/student/enrollments`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setEnrollments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statusColors = {
    pending_payment: 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border',
    active: 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal',
    expired: 'bg-error-light text-error border border-error',
    cancelled: 'bg-border-color text-secondary border border-border-color',
    rejected: 'bg-error-light text-error border border-error',
  };

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
          <a href="/student/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
            &larr; Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">My Enrollments</h1>

        {enrollments.length === 0 ? (
          <div className="bg-primary p-8 rounded-lg shadow-sm border border-border-color text-center">
            <p className="text-muted">No enrollments yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="bg-primary p-4 rounded-lg shadow-sm border border-border-color">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-abyss-teal">
                      Enrollment #{enrollment.id.slice(-6)}
                    </h3>
                    <p className="text-secondary text-sm">
                      Course: {enrollment.course_id} &bull; Batch: {enrollment.batch_id}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[enrollment.status] || 'bg-border-color text-secondary border border-border-color'}`}>
                    {enrollment.status.replace('_', ' ')}
                  </span>
                </div>
                {enrollment.access_until && (
                  <div className="mt-3 text-sm text-secondary">
                    Access until: {enrollment.access_until}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
