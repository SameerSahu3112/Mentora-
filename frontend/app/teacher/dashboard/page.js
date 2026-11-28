"use client";

import Link from "next/link";
import { useState } from "react";
import { teacherAPI } from "@/app/lib/api";
import TeacherLayout from "@/app/components/layouts/TeacherLayout";

export default function TeacherDashboard() {
  const [stats, setStats] = useState({
    assigned_batches: 0,
    published_assets: 0,
    pending_1on1: 0,
    attendance_rate: "0%",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      teacherAPI.getMyBatches().catch(() => []),
      teacherAPI.getMyResources().catch(() => []),
      teacherAPI.getPendingMentorship().catch(() => []),
      teacherAPI.getAttendanceStats().catch(() => ({ rate: "0%" })),
    ]).then(([batches, resources, mentorship, attendance]) => {
      setStats({
        assigned_batches: Array.isArray(batches) ? batches.length : 0,
        published_assets: Array.isArray(resources)
          ? resources.filter((r) => r.status === "published").length
          : 0,
        pending_1on1: Array.isArray(mentorship)
          ? mentorship.filter((m) => m.status === "pending").length
          : 0,
        attendance_rate: attendance.rate || "0%",
      });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <TeacherLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse h-8 w-48 bg-surface-container rounded" />
        </div>
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout>
      <section className="py-12 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-display text-[36px] text-on-surface tracking-tight mb-4">
            Teacher Dashboard
          </h1>
          <p className="font-body-md text-on-surface-variant mb-6">
            Your teaching dashboard. All data populates from assigned batches.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span>My Batches</span>
                <span className="font-display text-bold">{stats.assigned_batches}</span>
              </div>
            </div>
            <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span>Published Resources</span>
                <span className="font-display text-bold">{stats.published_assets}</span>
              </div>
            </div>
            <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span>1-on-1 Pending</span>
                <span className="font-display text-bold">{stats.pending_1on1}</span>
              </div>
            </div>
            <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span>Attendance Rate</span>
                <span className="font-display text-bold">{stats.attendance_rate}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TeacherLayout>
  );
}
