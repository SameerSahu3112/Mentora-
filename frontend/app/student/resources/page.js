"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ResourcesPage() {
  const [resources, setResources] = useState([
    { id: 'r1', title: 'JEE Main Physics Notes', type: 'pdf', description: 'Comprehensive physics notes for JEE Main', isPublished: true },
    { id: 'r2', title: 'Algebra Practice Sheet', type: 'assignment_sheet', description: 'Algebra practice problems with solutions', isPublished: true },
    { id: 'r3', title: 'Organic Chemistry Diagrams', type: 'image', description: 'Key reaction mechanisms and diagrams', isPublished: true },
    { id: 'r4', title: 'Calculus Video Lecture', type: 'external_video', description: 'External video link for calculus concepts', isPublished: true },
  ]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/resources/student/resources`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch(() => setLoading(false));
  }, []);

  const typeIcons = {
    pdf: '📄',
    image: '🖼️',
    assignment_sheet: '📋',
    external_video: '▶️',
    external_document: '📎',
    text_lesson: '📝',
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
          <Link href="/student/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
            ← Back to Dashboard
          </Link>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Learning Resources</h1>

        <div className="grid md:grid-cols-3 gap-4">
          {resources.length === 0 ? (
            <div className="bg-primary p-8 rounded-lg shadow-sm border border-border-color text-center">
              <p className="text-muted">No resources available yet.</p>
            </div>
          ) : (
            resources.map((resource) => (
              <div key={resource.id} className="bg-primary p-4 rounded-lg shadow-sm border border-border-color">
                <div className="text-2xl mb-2">{typeIcons[resource.type] || '📄'}</div>
                <h3 className="text-lg font-semibold text-abyss-teal">{resource.title}</h3>
                <p className="text-secondary text-sm mt-1">{resource.description || 'No description'}</p>
                <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border rounded">
                  {resource.type.replace('_', ' ')}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
