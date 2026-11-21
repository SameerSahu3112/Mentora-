/**
 * Mentora Contact Page
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />

      <section className="py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-abyss-teal mb-6">Contact / Help</h1>

          <div className="bg-primary rounded-lg shadow-sm p-8 border border-border-color">
            <h2 className="text-xl font-semibold text-abyss-teal mb-4">Get in Touch</h2>
            <p className="text-secondary mb-6">
              Reach out to the Mentora team for help with courses, batches, enrollment, or any questions.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <div>
                <h3 className="font-semibold text-abyss-teal mb-3">Contact Information</h3>
                <p className="text-secondary mb-3">
                  Have questions about our courses, batches, or enrollment process? We're here to help.
                </p>
                <div style={{ marginBottom: '1rem' }}>
                  <span className="text-sm font-medium text-secondary block">Email</span>
                  <p className="text-secondary">support@mentora.example.com</p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <span className="text-sm font-medium text-secondary block">Phone</span>
                  <p className="text-secondary">+91 98765 43210</p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <span className="text-sm font-medium text-secondary block">Hours</span>
                  <p className="text-secondary">Mon - Sat: 10:00 AM - 6:00 PM IST</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-abyss-teal mb-3">Send a Message</h3>
                <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter your name" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" placeholder="Enter your email" />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" className="form-control" placeholder="What is this about?" />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea className="form-control" rows={4} placeholder="Type your message here..."></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
