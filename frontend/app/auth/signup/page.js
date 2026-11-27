"use client";

import { useState } from 'react';
import Link from 'next/link';
import { authAPI } from '@/app/lib/api';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    class_level: '',
    email: '',
    phone: '',
    school_name: '',
    coaching_institute_name: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await authAPI.signup(formData);
      setSuccess('Registration successful! You can now log in.');
      setFormData({
        full_name: '',
        class_level: '',
        email: '',
        phone: '',
        school_name: '',
        coaching_institute_name: '',
        password: '',
      });
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <main className="min-h-screen bg-[#001719] text-on-surface">
      <nav className="bg-[#001719]/80 shadow border-b border-[#8a9294]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
                <span className="text-sm font-semibold text-[#E9C46A]">.</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface">
              <Link href="/auth/login" className="hover:text-[#0F4C5C] transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-[#001719] text-on-surface">
        <div className="max-w-md mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0F4C5C]">Create Account</h1>
            <p className="text-secondary">Join Mentora for JEE preparation</p>
          </div>

          <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 p-8">
            {error && (
              <div className="mb-4 p-3 bg-[#93000a]/20 border border-[#93000a]/20 text-[#ffb4ab] text-sm rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-[#66d8d2]/20 border border-[#66d8d2]/20 text-[#66d8d2] text-sm rounded">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-[#8a9294]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Aarav Sharma"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">
                    Class
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-[#8a9294]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                    value={formData.class_level}
                    onChange={(e) => setFormData({ ...formData, class_level: e.target.value })}
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-[#8a9294]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-[#8a9294]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#8a9294]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                  value={formData.school_name}
                  onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                  placeholder="Delhi Public School"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Coaching Institute (optional)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#8a9294]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                  value={formData.coaching_institute_name}
                  onChange={(e) => setFormData({ ...formData, coaching_institute_name: e.target.value })}
                  placeholder="FIITJEE / Allen / etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-[#8a9294]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  minLength={8}
                  required
                />
              </div>

              <button type="submit" className="w-full py-3 bg-[#E9C46A] text-[#00363d] font-bold text-center rounded-lg hover:bg-[#D4A357] transition-colors">
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-secondary">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#0F4C5C] font-medium hover:text-[#D4A357] transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
