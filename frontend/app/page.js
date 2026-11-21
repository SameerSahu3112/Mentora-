/**
 * Mentora Home Page
 * Brand: Abyss Teal (~80%) + Desert Sand (~20%)
 * Inspired by clean modern SaaS design
 */

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>
              Master JEE with <span>Mentora</span>
            </h1>
            <p>
              JEE preparation platform for Classes 9–12. Discover courses, select batches,
              register, and access learning resources with weekly mentorship and personal guidance.
            </p>
            <div className="hero-buttons">
              <Link href="/courses" className="btn btn-primary btn-lg">
                Explore Courses
              </Link>
              <Link href="/auth/signup" className="btn btn-secondary btn-lg">
                Register Free
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(135deg, rgba(15, 76, 92, 0.1) 0%, rgba(233, 196, 106, 0.1) 100%)',
              borderRadius: '1rem',
              border: '1px solid rgba(15, 76, 92, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4A5A65',
              fontSize: '1.125rem'
            }}>
              📚 Course & Batch Explorer
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Mentora?</h2>
            <p>Complete JEE preparation platform designed for serious students</p>
          </div>

          <div className="features-grid">
            <div className="card">
              <div className="card-icon desert">📚</div>
              <h3>Course Discovery</h3>
              <p>Browse JEE Main January, JEE Main April, and JEE Advanced courses with clear pricing and exam dates.</p>
              <Link href="/courses" className="text-abyss-teal font-medium text-sm">Learn more →</Link>
            </div>
            <div className="card">
              <div className="card-icon">🎯</div>
              <h3>Batch Selection</h3>
              <p>Choose from multiple batches with different schedules, capacities, and assigned teachers.</p>
              <Link href="/courses" className="text-abyss-teal font-medium text-sm">View batches →</Link>
            </div>
            <div className="card">
              <div className="card-icon desert">📝</div>
              <h3>Simple Application</h3>
              <p>Select your course and batch, register, and submit your application in minutes.</p>
              <Link href="/auth/signup" className="text-abyss-teal font-medium text-sm">Apply now →</Link>
            </div>
            <div className="card">
              <div className="card-icon">👨‍🏫</div>
              <h3>Weekly Mentorship</h3>
              <p>Every batch has recurring weekly group mentorship sessions with assigned teachers.</p>
              <Link href="/about" className="text-abyss-teal font-medium text-sm">Learn more →</Link>
            </div>
            <div className="card">
              <div className="card-icon desert">📖</div>
              <h3>Learning Resources</h3>
              <p>Access PDF notes, images, practice sheets, video links, and text lessons for active enrollments.</p>
              <Link href="/student/resources" className="text-abyss-teal font-medium text-sm">Explore →</Link>
            </div>
            <div className="card">
              <div className="card-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Bookmark resources, mark lessons complete, and track your learning journey.</p>
              <Link href="/student/dashboard" className="text-abyss-teal font-medium text-sm">Track progress →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section py-12">
        <div className="container">
          <div className="stats-grid">
            <div>
              <div className="stat-number">3</div>
              <div className="stat-label">JEE Courses</div>
            </div>
            <div>
              <div className="stat-number">Classes 9-12</div>
              <div className="stat-label">Eligible Students</div>
            </div>
            <div>
              <div className="stat-number">Weekly</div>
              <div className="stat-label">Mentorship Sessions</div>
            </div>
            <div>
              <div className="stat-number">2</div>
              <div className="stat-label">Admin Approvals</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
