"use client";

import { useState } from 'react';
import Link from 'next/link';
import { authAPI } from '@/app/lib/api';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login({ identifier, password });
      const role = response?.user?.role || response?.role;
      if (role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else if (role === 'teacher') {
        window.location.href = '/teacher/dashboard';
      } else {
        window.location.href = '/student/dashboard';
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#001719] text-on-surface">
      <nav className="bg-[#001719]/80 shadow border-b border-[#8a9294]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#0F4C5C]">Mentora</span>
              <span className="text-sm font-semibold text-[#E9C46A]">.</span>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-on-surface">
              <Link href="/auth/signup" className="hover:text-[#0F4C5C] transition-colors">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 p-8">
            <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6 text-center">Welcome Back</h1>

            {error && (
              <div className="mb-4 p-3 bg-[#93000a]/20 border border-[#93000a]/20 text-[#ffb4ab] text-sm rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Student ID or Email
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#8a9294]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter Student ID or email"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-secondary mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-[#8a9294]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#0F4C5C] text-white font-bold rounded-lg hover:bg-[#E9C46A] hover:text-[#00363d] transition-colors"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-secondary">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-[#0F4C5C] font-medium hover:text-[#D4A357] transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
