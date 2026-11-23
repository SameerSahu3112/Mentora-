"use client";

import { useEffect, useState } from "react";

function formatStatus(value) {
  return value
    ? value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "Not scheduled";
}

function formatDate(value) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [createdId, setCreatedId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCreatedId(params.get("created") || "");

    const loadApplications = async () => {
      try {
        const response = await fetch("/api/v1/applications/student/applications", {
          credentials: "include",
        });
        const result = await response.json();
        if (!response.ok) {
          setError(result.detail || result.title || "Applications could not be loaded.");
          return;
        }
        setApplications(result);
      } catch {
        setError("Unable to reach Mentora. Please try again shortly.");
      } finally {
        setIsLoading(false);
      }
    };

    loadApplications();
  }, []);

  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">
          Applications
        </h1>
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
            Track your batch applications and introductory phone-call status.
          </p>
          {createdId && (
            <p role="status" className="text-sm text-secondary mb-4">
              Your application was submitted. The Mentora team will contact you soon.
            </p>
          )}
          {error && (
            <div role="alert" className="text-sm text-red-600">
              <p>{error}</p>
              {error.toLowerCase().includes("authentication") && (
                <a className="underline" href="/auth/login">Sign in</a>
              )}
            </div>
          )}
          {isLoading ? (
            <p role="status" className="text-sm text-on-surface-variant">Loading applications...</p>
          ) : !error && applications.length === 0 ? (
            <p className="text-sm text-on-surface-variant">
              You have no applications yet. Browse courses to choose a batch.
            </p>
          ) : (
            <div className="space-y-3">
              {applications.map((application) => (
                <article
                  key={application.application_id}
                  className={`p-4 rounded border border-outline-variant/20 ${
                    application.application_id === createdId ? "ring-2 ring-secondary" : ""
                  }`}
                >
                  <div className="flex flex-wrap justify-between gap-3">
                    <div>
                      <h2 className="font-semibold">{application.batch_name || "Batch application"}</h2>
                      <p className="text-xs text-on-surface-variant">
                        Applied {formatDate(application.applied_at)}
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded bg-tertiary-container/60 text-tertiary text-sm">
                      {formatStatus(application.application_status)}
                    </span>
                  </div>
                  <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-on-surface-variant">Introductory call</dt>
                      <dd>{formatStatus(application.intro_session_status)}</dd>
                    </div>
                    <div>
                      <dt className="text-on-surface-variant">Scheduled</dt>
                      <dd>{formatDate(application.intro_scheduled_at) || "Not scheduled yet"}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
