/**
 * Mentora Courses Page - Public
 * Phase 10: Frontend Portal Completion
 * Brand: Abyss Teal + Desert Sand
 */

import { useState, useEffect } from 'react';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/courses/`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const initialCourses = [
    {
      id: '1',
      name: 'Rise',
      exam_target: 'JEE Main January',
      price: '₹299',
      is_active: true,
    },
    {
      id: '2',
      name: 'Spark',
      exam_target: 'JEE Main April',
      price: '₹499',
      is_active: true,
    },
    {
      id: '3',
      name: 'Apex',
      exam_target: 'JEE Advanced',
      price: '₹699',
      is_active: true,
    },
  ];

  const displayCourses = courses.length > 0 ? courses : initialCourses;

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-abyss-teal mb-6">Courses</h1>
          <p className="text-muted">Loading courses...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-abyss-teal">JEE Preparation Courses</h1>
          <p className="text-secondary mt-2">Choose the right programme for your JEE journey.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {displayCourses.map((course) => (
            <div
              key={course.id}
              className="bg-primary rounded-lg shadow-md overflow-hidden border border-border-color"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-abyss-teal">{course.name}</h2>
                <p className="text-desert-sand-dark font-medium mt-1">
                  {course.exam_target}
                </p>
                <p className="text-secondary text-sm mt-2">
                  Starts from {course.price}
                </p>
              </div>
              <div className="px-6 py-4">
                <a
                  href={`/courses/${course.id}`}
                  className="block w-full bg-abyss-teal text-white text-center py-2 rounded-md font-semibold hover:bg-abyss-teal-dark transition-colors"
                >
                  View Batches
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
