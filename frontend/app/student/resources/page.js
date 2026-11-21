/**
 * Mentora Student Resources
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function ResourcesPage() {
  const resources = [
    { id: 'r1', title: 'JEE Main Physics Notes', type: 'pdf', description: 'Comprehensive physics notes for JEE Main' },
    { id: 'r2', title: 'Algebra Practice Sheet', type: 'assignment_sheet', description: 'Algebra practice problems with solutions' },
    { id: 'r3', title: 'Organic Chemistry Diagrams', type: 'image', description: 'Key reaction mechanisms and diagrams' },
    { id: 'r4', title: 'Calculus Video Lecture', type: 'external_video', description: 'External video link for calculus concepts' },
  ];

  const typeIcons = { pdf: '📄', image: '🖼️', assignment_sheet: '📋', external_video: '▶️', external_document: '📎', text_lesson: '📝' };

  return (
    <div className="student-layout">
      <nav className="mb-6">
        <Link href="/student/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Learning Resources</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <div key={resource.id} className="card">
            <div className="text-2xl mb-2">{typeIcons[resource.type] || '📄'}</div>
            <h3 className="text-lg font-semibold text-abyss-teal">{resource.title}</h3>
            <p className="text-secondary text-sm mb-2">{resource.description || 'No description'}</p>
            <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border rounded">
              {resource.type.replace('_', ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
