"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TeacherResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/resources/teacher/resources`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch(() => setResources([]))
      .finally(() => setLoading(false));
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
          <a href="/teacher/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
            &larr; Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">My Resources</h1>

        <div className="flex justify-between items-center mb-4">
          <button className="btn btn-primary">
            Create Resource
          </button>
        </div>

        {resources.length === 0 ? (
          <div className="bg-primary p-8 rounded-lg shadow-sm border border-border-color text-center">
            <p className="text-muted">No resources yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-primary p-3 rounded-lg shadow-sm border border-border-color flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-abyss-teal">{resource.title}</h3>
                  <p className="text-xs text-secondary">{resource.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${resource.isPublished ? 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal' : 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border'}`}>
                  {resource.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
