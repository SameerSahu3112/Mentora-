/**
 * Mentora Courses Page - Public
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CoursesPage() {
  const initialCourses = [
    {
      id: '1',
      name: 'Rise',
      examTarget: 'JEE Main January',
      price: '₹299',
      isActive: true,
    },
    {
      id: '2',
      name: 'Spark',
      examTarget: 'JEE Main April',
      price: '₹499',
      isActive: true,
    },
    {
      id: '3',
      name: 'Apex',
      examTarget: 'JEE Advanced',
      price: '₹699',
      isActive: true,
    },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />

      <section className="py-12">
        <div className="container">
          <div className="section-header">
            <h1>JEE Preparation Courses</h1>
            <p>Choose the right programme for your JEE journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {initialCourses.map((course) => (
              <div key={course.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 className="text-lg font-semibold text-abyss-teal">{course.name}</h3>
                  <span className="badge badge-active">Active</span>
                </div>
                <p className="text-secondary text-sm mb-3">{course.examTarget}</p>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="text-2xl font-bold text-abyss-teal">{course.price}</span>
                </div>
                <Link href={`/courses/${course.id}`} className="btn btn-outline btn-sm w-full">
                  View Batches
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
