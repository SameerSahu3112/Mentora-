"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(true);
    setFormData({ full_name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-[#001719] text-on-surface">
      <nav className="bg-[#001719]/80 backdrop-blur-md border-b border-[#8a9294]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
              <span className="text-sm font-semibold text-[#E9C46A]">.</span>
            </Link>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface">
              <Link href="/auth/login" className="hover:text-[#0F4C5C] transition-colors">
                Login
              </Link>
              <Link href="/auth/signup" className="bg-[#E9C46A] text-[#00363d] px-4 py-2 rounded font-medium hover:bg-[#D4A357] transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#0F4C5C] mb-6">Contact / Help</h1>

        <div className="bg-[#082326] rounded-lg p-8 border border-[#8a9294]/20">
          <h2 className="text-xl font-bold text-[#0F4C5C] mb-4">Contact / Help</h2>
          <p className="text-on-surface-variant mb-6">
            Reach out to the Mentora team for help with courses, batches, and enrollment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#082326] p-6 rounded-lg border border-[#8a9294]/20">
              <h3 className="text-lg font-bold text-[#0F4C5C] mb-4">Contact Information</h3>
              <p className="text-on-surface-variant mb-4">
                Have questions about our courses, batches, or enrollment process? We're here to help.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span class="material-symbols-outlined text-[#E9C46A] text-[18px] flex-shrink-0">email</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-secondary uppercase">Email</p>
                    <p className="text-secondary">support@mentora.example.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span class="material-symbols-outlined text-[#E9C46A] text-[18px] flex-shrink-0">phone</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-secondary uppercase">Phone</p>
                    <p className="text-secondary">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span class="material-symbols-outlined text-[#E9C46A] text-[18px] flex-shrink-0">school</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-secondary uppercase">Hours</p>
                    <p className="text-secondary">Mon - Sat: 10:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#082326] p-6 rounded-lg border border-[#8a9294]/20">
              <h3 className="font-lg font-bold text-[#0F4C5C] mb-4">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                  <label className="block text-xs font-medium text-secondary mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-[#8a9294]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="block text-xs font-medium text-secondary mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-[#8a9294]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="block text-xs font-medium text-secondary mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-[#8a9294]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What is this about?"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="block text-xs font-medium text-secondary mb-1">
                    Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-[#8a9294]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message here..."
                    rows={4}
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#E9C46A] text-[#00363d] font-bold rounded-lg hover:bg-[#D4A357] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
