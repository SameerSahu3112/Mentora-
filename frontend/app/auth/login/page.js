"use client";

import { useState } from 'react';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.user.role === 'admin' ? '/admin/dashboard' : data.user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard';
      } else {
        const data = await response.json();
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('Unable to connect to server');
    }
  };

  return (
    <main className="min-h-screen bg-[#001719] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0F4C5C]">Mentora</h1>
          <p className="text-secondary">JEE Preparation Platform</p>
        </div>

        <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 p-8">
          <h2 className="text-2xl font-bold text-[#0F4C5C] mb-6 text-center">Welcome Back</h2>

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
                placeholder="e.g., MENT-2026-0001 or email@example.com"
                required
              />
            </div>

            <div>
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

            <button type="submit" className="w-full py-3 bg-[#0F4C5C] text-white font-bold rounded-lg hover:bg-[#D4A357] transition-colors">
              Sign In
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
    </main>
  );
}
