/**
 * Mentora Course Detail Page - Public
 * Phase 10: Frontend Portal Completion
 * Brand: Abyss Teal + Desert Sand
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CourseDetailPage({ params }) {
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const courseId = params.courseId;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/batches/?course_id=${courseId}`)
      .then((res) => res.json())
      .then((data) => setBatches(data))
      .catch(() => setBatches([]));
  }, [courseId]);

  const courseData = course || {
    id: courseId,
    name: 'Course',
    exam_target: 'JEE Exam',
    price: '₹0',
    description: 'Course details loading...',
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-abyss-teal mb-6">Course Details</h1>
          <p className="text-muted">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6">
          <a href="/courses" className="text-abyss-teal hover:text-abyss-teal-dark text-sm">
            ← Back to Courses
          </a>
        </nav>

        <div className="bg-primary rounded-lg shadow-md p-6 border border-border-color mb-6">
          <h1 className="text-3xl font-bold text-abyss-teal">{courseData.name}</h1>
          <p className="text-desert-sand-dark font-medium mt-2">{courseData.exam_target}</p>
          <p className="text-secondary text-lg mt-2">
            Price: ₹{courseData.price || '0'}
          </p>
          {courseData.description && (
            <p className="text-secondary mt-4">{courseData.description}</p>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-abyss-teal mb-4">Available Batches</h2>
          {batches.length === 0 ? (
            <p className="text-muted">No batches available yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {batches.map((batch) => (
                <div
                  key={batch.id}
                  className="bg-primary p-4 rounded-lg shadow-sm border border-border-color"
                >
                  <h3 className="text-lg font-semibold text-abyss-teal">{batch.name}</h3>
                  <p className="text-secondary text-sm mt-1">
                    {batch.start_date} to {batch.end_date}
                  </p>
                  <p className="text-secondary text-sm">
                    Capacity: {batch.max_capacity} seats
                  </p>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    batch.status === 'active'
                      ? 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal'
                      : 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border'
                  }`}>
                    {batch.status}
                  </span>
                  {batch.status === 'active' && (
                    <button
                      onClick={() => router.push('/auth/login')}
                      className="mt-3 block w-full bg-abyss-teal text-white text-center py-2 rounded-md font-semibold hover:bg-abyss-teal-dark"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
