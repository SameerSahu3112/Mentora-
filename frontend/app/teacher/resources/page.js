/**
 * Mentora Teacher Resources
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function TeacherResources() {
  const resources = [
    { id: 'r1', title: 'JEE Main Physics Notes', type: 'pdf', isPublished: true },
    { id: 'r2', title: 'Algebra Practice Sheet', type: 'assignment_sheet', isPublished: false },
  ];

  return (
    <div className="teacher-layout">
      <nav className="mb-6">
        <Link href="/teacher/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">My Resources</h1>

      <div className="flex justify-between items-center mb-4">
        <Link href="/teacher/dashboard" className="btn btn-primary">
          Create Resource
        </Link>
      </div>

      <div className="space-y-3">
        {resources.map((resource) => (
          <div key={resource.id} className="card flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-abyss-teal">{resource.title}</h3>
              <p className="text-xs text-secondary">{resource.type}</p>
            </div>
            <span className={`badge ${resource.isPublished ? 'badge-active' : 'badge-pending'}`}>
              {resource.isPublished ? 'Published' : 'Draft'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
