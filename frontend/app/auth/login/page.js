"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [selection, setSelection] = useState(null);
  const [applicationQuery, setApplicationQuery] = useState("");
  const [error, setError] = useState("");
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
      const response = await fetch("/api/v1/auth/login", {
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
        setError(result.detail || result.title || "Sign in failed. Check your credentials.");
        return;
      }

      if (selection) {
        if (result.user.role !== "student") {
          setError("Sign in with a student account to submit a batch application.");
          return;
        }
        const batchesResponse = await fetch("/api/v1/batches/?active_only=true", {
          credentials: "include",
        });
        if (!batchesResponse.ok) {
          let batchesError;
          try {
            batchesError = await batchesResponse.json();
          } catch {
            batchesError = null;
          }
          setError(
            batchesError?.detail ||
              batchesError?.title ||
              "Signed in, but batches could not be loaded. Please try again."
          );
          return;
        }
        const batches = await batchesResponse.json();
        const selected = batches.find(
          (batch) => batch.name.toLowerCase() === selection.batch.toLowerCase()
        );
        if (!selected) {
          setError("That batch is not currently available for applications.");
          return;
        }

        const applicationResponse = await fetch("/api/v1/applications/student/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            course_id: selected.course_id,
            batch_id: selected.id,
          }),
        });
        let applicationResult;
        try {
          applicationResult = await applicationResponse.json();
        } catch {
          setError("Signed in, but the application could not be confirmed.");
          return;
        }
        if (!applicationResponse.ok) {
          setError(
            applicationResult.detail ||
              applicationResult.title ||
              "The application could not be submitted."
          );
          return;
        }
        router.push(`/student/applications?created=${encodeURIComponent(applicationResult.id)}`);
        return;
      }

      const dashboardByRole = {
        admin: "/admin/dashboard",
        teacher: "/teacher/dashboard",
        student: "/student/dashboard",
      };
      const dashboard = dashboardByRole[result.user.role];
      if (!dashboard) {
        setError("Your account has an unsupported role. Please contact Mentora support.");
        return;
      }
      router.push(dashboard);
    } catch {
      setError("Unable to reach Mentora. Please try again shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {error && <p role="alert" className="text-sm text-red-600 mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Student ID or Email</label>
            <input name="identifier" type="text" required className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary" autoComplete="username" />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Password</label>
            <input name="password" type="password" required className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-on-surface focus:outline-none focus:border-secondary" autoComplete="current-password" />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded bg-secondary text-on-secondary font-label-md text-label-md font-bold hover:bg-secondary-fixed transition-colors disabled:opacity-60">
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-6">
          New to Mentora? <a href={`/auth/signup${applicationQuery}`} className="text-secondary hover:underline">Register</a>
        </p>
      </div>
    </main>
  );
}
