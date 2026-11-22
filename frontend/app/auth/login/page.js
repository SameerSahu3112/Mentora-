"use client";

import { useEffect, useState } from "react";

export default function LoginPage() {
  const [selection, setSelection] = useState(null);
  const [applicationQuery, setApplicationQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const batch = params.get("batch");
    const price = params.get("price");

    setApplicationQuery(window.location.search);
    if (batch) {
      setSelection({
        batch,
        price: price && /^\d+$/.test(price) ? Number(price) : null,
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container p-6 rounded-xl border border-outline-variant/20 shadow-xl">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-2 text-center">Sign In</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant text-center mb-6">Student ID or Email + Password</p>
        {selection && (
          <p role="status" className="font-body-sm text-body-sm text-secondary text-center mb-6">
            Continuing with {selection.batch}
            {selection.price !== null && ` • ₹${selection.price}`}
          </p>
        )}
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
          New to Mentora? <a href={`/auth/signup${applicationQuery}`} className="text-secondary hover:underline">Register</a>
        </p>
      </div>
    </main>
  );
}
