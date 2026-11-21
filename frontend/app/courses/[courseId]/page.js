/**
 * Mentora Course Detail Page
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CourseDetailPage({ params }) {
  const courseId = params.courseId;

  const courseData = {
    id: courseId,
    name: 'JEE Course',
    examTarget: 'JEE Exam',
    price: '₹0',
    description: 'Course details loading from API...',
  };

  const batches = [
    { id: 'b1', name: 'Batch 1.0', startDate: 'Nov 2026', endDate: 'Mar 2027', capacity: 50, status: 'active' },
    { id: 'b2', name: 'Batch 2.0', startDate: 'Dec 2026', endDate: 'Apr 2027', capacity: 40, status: 'active' },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />

      <section className="py-12">
        <div className="container">
          <nav className="mb-6">
            <Link href="/courses" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
              ← Back to Courses
            </Link>
          </nav>

          <div className="bg-primary rounded-lg shadow-sm p-6 border border-border-color mb-8">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 className="text-3xl font-bold text-abyss-teal">{courseData.name}</h1>
                <p className="text-desert-sand-dark font-medium mt-2">{courseData.examTarget}</p>
                <p className="text-secondary text-lg mt-2">Price: {courseData.price}</p>
                {courseData.description && (
                  <p className="text-secondary mt-4">{courseData.description}</p>
                )}
              </div>
              <Link href="/auth/login" className="btn btn-primary">
                Apply Now
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-abyss-teal mb-4">Available Batches</h2>
            {batches.length === 0 ? (
              <p className="text-muted">No batches available yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {batches.map((batch) => (
                  <div key={batch.id} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <h3 className="text-lg font-semibold text-abyss-teal">{batch.name}</h3>
                      <span className={`badge ${batch.status === 'active' ? 'badge-active' : 'badge-pending'}`}>
                        {batch.status}
                      </span>
                    </div>
                    <p className="text-secondary text-sm mb-2">{batch.startDate} to {batch.endDate}</p>
                    <p className="text-secondary text-sm mb-3">Capacity: {batch.capacity} seats</p>
                    <Link href="/auth/login" className="btn btn-outline btn-sm w-full">
                      Apply for This Batch
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
