"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminAPI } from "@/app/lib/api";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminAPI.getStudents(),
      adminAPI.getBatches(),
      adminAPI.getCourses(),
      adminAPI.getEnrollments(),
      adminAPI.getApplications(),
      adminAPI.getPayments(),
    ])
      .then(([s, b, c, e, a, p]) => {
        setStudents(Array.isArray(s) ? s : []);
        setBatches(Array.isArray(b) ? b : []);
        setCourses(Array.isArray(c) ? c : []);
        setEnrollments(Array.isArray(e) ? e : []);
        setApplications(Array.isArray(a) ? a : []);
        setPayments(Array.isArray(p) ? p : []);
      })
      .catch((err) => {
        setError(err.message || "Failed to load admin dashboard. Make sure you are signed in as Admin.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse flex items-center justify-center h-64">
        <div className="h-8 w-48 bg-[#082326] rounded" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[#0F4C5C]">Admin Dashboard</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/courses"
            className="px-4 py-2 rounded-lg bg-[#0F4C5C] text-white text-sm font-semibold hover:bg-[#E9C46A] hover:text-[#00363d] transition-colors"
          >
            + Manage Courses
          </Link>
          <Link
            href="/admin/teachers"
            className="px-4 py-2 rounded-lg bg-[#E9C46A] text-[#00363d] text-sm font-semibold hover:bg-[#D4A357] transition-colors"
          >
            + Manage Teachers
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] text-sm flex items-center justify-between gap-4">
          <span>{error}</span>
          <Link href="/auth/login" className="underline font-semibold whitespace-nowrap">
            Sign in as Admin
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/admin/students" className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20 hover:border-[#E9C46A]/60 transition-colors">
          <h3 className="text-sm font-medium text-secondary mb-2">Total Students</h3>
          <p className="text-2xl font-bold text-[#0F4C5C]">{students.length}</p>
        </Link>
        <Link href="/admin/enrollments" className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20 hover:border-[#E9C46A]/60 transition-colors">
          <h3 className="text-sm font-medium text-secondary mb-2">Active Enrollments</h3>
          <p className="text-2xl font-bold text-[#0F4C5C]">
            {enrollments.filter((e) => e.status === "active").length}
          </p>
        </Link>
        <Link href="/admin/applications" className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20 hover:border-[#E9C46A]/60 transition-colors">
          <h3 className="text-sm font-medium text-secondary mb-2">Pending Applications</h3>
          <p className="text-2xl font-bold text-[#E9C46A]">
            {applications.filter((a) => a.status === "pending").length}
          </p>
        </Link>
        <Link href="/admin/payments" className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20 hover:border-[#E9C46A]/60 transition-colors">
          <h3 className="text-sm font-medium text-secondary mb-2">Recorded Payments</h3>
          <p className="text-2xl font-bold text-[#E9C46A]">
            {payments.filter((p) => p.status === "recorded").length}
          </p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#082326] p-6 rounded-lg border border-[#8a9294]/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#0F4C5C]">Courses ({courses.length})</h2>
            <Link href="/admin/courses" className="text-xs text-[#E9C46A] hover:underline">
              View all →
            </Link>
          </div>
          {courses.length === 0 ? (
            <p className="text-sm text-secondary">No courses yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {courses.slice(0, 5).map((c) => (
                <li key={c.id} className="flex justify-between border-b border-[#8a9294]/10 pb-2">
                  <span>{c.name}</span>
                  <span className="text-secondary">₹{c.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-[#082326] p-6 rounded-lg border border-[#8a9294]/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#0F4C5C]">Batches ({batches.length})</h2>
            <Link href="/admin/batches" className="text-xs text-[#E9C46A] hover:underline">
              View all →
            </Link>
          </div>
          {batches.length === 0 ? (
            <p className="text-sm text-secondary">No batches yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {batches.slice(0, 5).map((b) => (
                <li key={b.id} className="flex justify-between border-b border-[#8a9294]/10 pb-2">
                  <span>{b.name}</span>
                  <span className="text-secondary">Cap: {b.max_capacity}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
