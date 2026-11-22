"use client";

import { useEffect, useState } from "react";

export default function SignupPage() {
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
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-2 text-center">Register</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant text-center mb-6">Create your Mentora student account</p>
        {selection && (
          <p role="status" className="font-body-sm text-body-sm text-secondary text-center mb-6">
            Applying for {selection.batch}
            {selection.price !== null && ` • ₹${selection.price}`}
          </p>
        )}
        <form className="space-y-4">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Full Name</label>
            <input type="text" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary" placeholder="Aarav Sharma" />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Class</label>
            <select className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary">
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Email</label>
            <input type="email" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary" placeholder="email@domain.com" />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Phone Number</label>
            <input type="tel" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary" placeholder="+91 98765 43210" />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Password</label>
            <input type="password" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary" placeholder="••••••••" />
          </div>
          <button type="button" className="w-full py-3 rounded bg-secondary text-on-secondary font-label-md text-label-md font-bold hover:bg-secondary-fixed transition-colors">
            Register
          </button>
        </form>
        <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-6">
          Already have an account? <a href={`/auth/login${applicationQuery}`} className="text-secondary hover:underline">Sign In</a>
        </p>
      </div>
    </main>
  );
}
