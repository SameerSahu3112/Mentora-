"use client";

export const dynamic = "force-client";

import Link from "next/link";
import { useState } from "react";
import { studentAPI } from "@/app/lib/api";
import StudentLayout from "@/app/components/layouts/StudentLayout";

export default function StudentDashboard() {
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentAPI.getMyEnrollments().catch(() => []).then((enrollments) => {
      const active = Array.isArray(enrollments) ? enrollments.find((e) => e.status === "active") : null;
      setEnrollment(active);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse h-8 w-48 bg-surface-container rounded" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <section className="py-12 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-display text-[36px] text-on-surface tracking-tight mb-4">
            Student Dashboard
          </h1>
          <p className="font-body-md text-on-surface-variant mb-6">
            Your personalized learning dashboard. All data will populate from your enrolled batches.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span>Active Enrollment</span>
                <span className="font-display text-bold">{enrollment?.course_name || "No active enrollment"}</span>
              </div>
            </div>
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span>Resources</span>
                <span className="font-display text-bold">0</span>
              </div>
            </div>
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span>Mentorship Bookings</span>
                <span className="font-display text-bold">0</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </StudentLayout>
  );
}
