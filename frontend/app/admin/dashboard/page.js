"use client";

import Link from "next/link";
import { useState } from "react";
import { adminAPI } from "@/app/lib/api";
import AdminLayout from "@/app/components/layouts/AdminLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_students: 0,
    active_enrollments: 0,
    pending_applications: 0,
    pending_payments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminAPI.getStudents().catch(() => []),
      adminAPI.getEnrollments().catch(() => []),
      adminAPI.getApplications().catch(() => []),
      adminAPI.getPayments().catch(() => []),
    ]).then(([students, enrollments, applications, payments]) => {
      setStats({
        total_students: Array.isArray(students) ? students.length : 0,
        active_enrollments: Array.isArray(enrollments)
          ? enrollments.filter((e) => e.status === "active").length
          : 0,
        pending_applications: Array.isArray(applications)
          ? applications.filter((a) => a.status === "pending").length
          : 0,
        pending_payments: Array.isArray(payments)
          ? payments.filter((p) => p.status === "pending_payment").length
          : 0,
      });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse h-8 w-48 bg-surface-container rounded" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-12 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-display text-[36px] text-on-surface tracking-tight mb-4">
            Admin Dashboard
          </h1>
          <p className="font-body-md text-on-surface-variant mb-6">
            Administrative console. All data populates from the system.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span>Total Students</span>
                <span className="font-display text-bold">{stats.total_students}</span>
              </div>
            </div>
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span>Active Enrollments</span>
                <span className="font-display text-bold">{stats.active_enrollments}</span>
              </div>
            </div>
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span>Pending Applications</span>
                <span className="font-display text-bold">{stats.pending_applications}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}
