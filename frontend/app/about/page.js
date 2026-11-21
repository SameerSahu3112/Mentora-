/**
 * Mentora About Us Page
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />

      <section className="py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-abyss-teal mb-6">About Mentora</h1>
          
          <div className="bg-primary rounded-lg shadow-sm p-6 border border-border-color mb-8">
            <h2 className="text-xl font-semibold text-abyss-teal mb-4">Our Story</h2>
            <p className="text-secondary mb-4">
              Mentora is a student-focused JEE preparation platform that helps students discover courses and batches,
              register for a programme, speak with the Mentora team, complete manual enrollment, access learning
              resources, and receive mentorship.
            </p>
            <p className="text-secondary">
              We believe every student deserves access to quality JEE preparation with personalized mentorship,
              regardless of their location or background.
            </p>
          </div>

          <div className="bg-desert-sand-light rounded-lg p-6 border border-desert-sand-border mb-8">
            <h2 className="text-xl font-semibold text-abyss-teal mb-4">Our Founders</h2>
            <p className="text-secondary">
              Mentora is founded by Harshitraj Singh Panwar and Naitik Mujawadiya, described as NIT Bhopal
              students/NITians with three years of JEE experience. Founder profiles and photos will be published
              only after appropriate consent and verification.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="card">
              <div className="card-icon">🎯</div>
              <h3>JEE Focused</h3>
              <p className="text-secondary text-sm">Specialized in JEE Main January, JEE Main April, and JEE Advanced preparation.</p>
            </div>
            <div className="card">
              <div className="card-icon desert">👨‍🏫</div>
              <h3>Mentorship</h3>
              <p className="text-secondary text-sm">Weekly batch mentorship and one-to-one sessions with assigned teachers.</p>
            </div>
            <div className="card">
              <div className="card-icon">📚</div>
              <h3>Resources</h3>
              <p className="text-secondary text-sm">PDF notes, diagrams, practice sheets, video links, and text lessons.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
