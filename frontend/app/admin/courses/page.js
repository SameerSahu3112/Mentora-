"use client";
/**
 * Mentora Admin Courses
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/courses/`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse h-32 bg-border-color rounded" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6">
          <a href="/admin/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm">
            &larr; Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Courses</h1>

        <div className="bg-primary rounded-lg shadow-sm border border-border-color overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-desert-sand-light border-b border-border-color">
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Exam Target</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Price</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Exam Date</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-muted">
                    No courses found.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="border-b border-border-color hover:bg-abyss-teal-light">
                    <td className="px-4 py-3 text-sm font-medium text-abyss-teal">{course.name}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{course.exam_target || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-secondary">₹{course.price}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{course.exam_date || 'Not set'}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${course.is_active ? 'bg-abyss-teal-light text-abyss-teal border border-abyss-teal' : 'bg-desert-sand-light text-desert-sand-dark border border-desert-sand-border'}`}>
                        {course.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
