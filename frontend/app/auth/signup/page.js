"use client";

import { useEffect, useState } from "react";

export default function SignupPage() {
  const [selection, setSelection] = useState(null);
  const [applicationQuery, setApplicationQuery] = useState("");
  const [error, setError] = useState("");
  const [studentId, setStudentId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      let result;
      try {
        result = await response.json();
      } catch {
        setError("The server returned an unreadable response. Please try again.");
        return;
      }
      if (!response.ok) {
        setError(
          result.detail || result.title || "Registration failed. Please check your details."
        );
        return;
      }
      setStudentId(result.student_id);
    } catch {
      setError("Unable to reach Mentora. Please try again shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {error && <p role="alert" className="text-sm text-red-600 mb-4">{error}</p>}
        {studentId && (
          <div role="status" className="text-sm text-secondary mb-4">
            Registration successful. Your Student ID is <strong>{studentId}</strong>.
            <a href={`/auth/login${applicationQuery}`} className="block mt-2 underline">Continue to sign in</a>
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Full Name</label>
            <input name="full_name" type="text" required maxLength={255} className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary" autoComplete="name" />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Class</label>
            <select name="class_level" required defaultValue="9" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary">
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Email</label>
            <input name="email" type="email" required maxLength={255} className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary" autoComplete="email" />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Phone Number</label>
            <input name="phone" type="tel" required maxLength={32} className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary" autoComplete="tel" />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Password</label>
            <input name="password" type="password" required minLength={8} className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary" autoComplete="new-password" />
          </div>
          <button type="submit" disabled={isSubmitting || Boolean(studentId)} className="w-full py-3 rounded bg-secondary text-on-secondary font-label-md text-label-md font-bold hover:bg-secondary-fixed transition-colors disabled:opacity-60">
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-6">
          Already have an account? <a href={`/auth/login${applicationQuery}`} className="text-secondary hover:underline">Sign In</a>
        </p>
      </div>
    </main>
  );
}
