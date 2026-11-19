/**
 * Mentora Login Page
 * Phase 10: Frontend Portal Completion
 * Brand: Abyss Teal + Desert Sand
 */

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
        window.location.href = data.user.role === 'admin'
          ? '/admin/dashboard'
          : data.user.role === 'teacher'
            ? '/teacher/dashboard'
            : '/student/dashboard';
      } else {
        const data = await response.json();
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('Unable to connect to server');
    }
  };

  return (
    <main className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-abyss-teal">Mentora</h1>
          <p className="text-secondary">JEE Preparation Platform</p>
        </div>

        <div className="bg-primary rounded-lg shadow-md p-8 border border-border-color">
          <h2 className="text-2xl font-semibold text-abyss-teal mb-6 text-center">Welcome Back</h2>

          {error && (
            <div className="mb-4 p-3 bg-error-light border border-error rounded text-error text-sm">
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
                className="w-full px-3 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus-ring-abyss-teal"
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
                className="w-full px-3 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-abyss-teal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-secondary">
            Don't have an account?{' '}
            <a href="/auth/signup" className="text-abyss-teal font-medium hover:text-abyss-teal-dark">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
