/**
 * Mentora Student Applications
 * Brand: Abyss Teal + Desert Sand
 */

import { useEffect, useState } from 'react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/applications/student/applications`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statusColors = {
    pending: 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border',
    approved: 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal',
    rejected: 'bg-error-light text-error border border-error',
    cancelled: 'bg-border-color text-secondary border border-border-color',
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary p-6">
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
            ← Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Your Applications</h1>

        {applications.length === 0 ? (
          <div className="bg-primary p-8 rounded-lg shadow-sm border border-border-color text-center">
            <p className="text-muted">No applications yet.</p>
            <a href="/courses" className="mt-4 inline-block text-abyss-teal font-medium hover:text-abyss-teal-dark">
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-primary p-4 rounded-lg shadow-sm border border-border-color"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-abyss-teal">
                      Application #{app.id.slice(-6)}
                    </h3>
                    <p className="text-secondary text-sm">
                      Batch: {app.batch_name || 'N/A'}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[app.application_status] || 'bg-border-color text-secondary border border-border-color'}`}>
                    {app.application_status}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-secondary">
                  <div>
                    <span className="block text-xs font-medium text-muted">Applied</span>
                    <span className="block">{new Date(app.applied_at).toLocaleDateString()}</span>
                  </div>
                  {app.intro_session_status && (
                    <div>
                      <span className="block text-xs font-medium text-muted">Intro Call</span>
                      <span className="block capitalize text-abyss-teal">{app.intro_session_status}</span>
                    </div>
                  )}
                  {app.intro_deadline_at && (
                    <div>
                      <span className="block text-xs font-medium text-muted">Deadline</span>
                      <span className="block">{new Date(app.intro_deadline_at).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                {app.confirmation_message && (
                  <p className="mt-3 text-sm text-abyss-teal italic">{app.confirmation_message}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
