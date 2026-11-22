"use client";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container p-6 rounded-xl border border-outline-variant/20 shadow-xl">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-2 text-center">Sign In</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant text-center mb-6">Student ID or Email + Password</p>
        <form className="space-y-4">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Student ID or Email</label>
            <input type="text" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary" placeholder="MENT-2026-0842 or email@domain.com" />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Password</label>
            <input type="password" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary" placeholder="••••••••" />
          </div>
          <button type="button" className="w-full py-3 rounded bg-secondary text-on-secondary font-label-md text-label-md font-bold hover:bg-secondary-fixed transition-colors">
            Sign In
          </button>
        </form>
        <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-6">
          New to Mentora? <a href="/auth/signup" className="text-secondary hover:underline">Register</a>
        </p>
      </div>
    </main>
  );
}
