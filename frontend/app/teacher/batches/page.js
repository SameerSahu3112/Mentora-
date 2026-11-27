"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { teacherAPI } from "@/app/lib/api";

export default function TeacherBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    teacherAPI
      .getMyBatches()
      .then((data) => setBatches(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load assigned batches"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="animate-pulse h-32 bg-[#082326] rounded" />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="mb-6">
        <Link href="/teacher/dashboard" className="text-[#0F4C5C] hover:text-[#E9C46A] text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Assigned Batches</h1>

      {error && (
        <div className="mb-4 p-3 rounded bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] text-sm">
          {error}
        </div>
      )}

      {batches.length === 0 ? (
        <div className="bg-[#082326] p-8 rounded-lg shadow-sm border border-[#8a9294]/20 text-center">
          <p className="text-secondary">No batches assigned to you.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {batches.map((batch) => (
            <div key={batch.id} className="bg-[#082326] p-4 rounded-lg shadow-sm border border-[#8a9294]/20">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-[#E9C46A]">{batch.name}</h3>
                  <p className="text-secondary text-sm">{batch.course_name || "Course"}</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded bg-[#E9C46A]/20 text-[#E9C46A]">
                  {batch.status}
                </span>
              </div>
              <div className="mt-3 text-sm text-secondary grid md:grid-cols-3 gap-2">
                <div>
                  <span className="block text-xs font-medium text-muted">Start</span>
                  <span className="block">{batch.start_date}</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-muted">End</span>
                  <span className="block">{batch.end_date}</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-muted">Capacity</span>
                  <span className="block">{batch.max_capacity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
