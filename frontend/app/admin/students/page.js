"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminAPI } from "@/app/lib/api";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI
      .getStudents()
      .then((data) => setStudents(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load students"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="animate-pulse h-32 bg-[#082326] rounded" />;
  }

  return (
    <div>
      <nav className="mb-6">
        <Link href="/admin/dashboard" className="text-[#0F4C5C] hover:text-[#E9C46A] text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Students</h1>

      {error && (
        <div className="mb-4 p-3 rounded bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] text-sm">
          {error}
        </div>
      )}

      <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Student ID</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Name</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Email</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Phone</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Class</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-secondary">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="border-b border-[#8a9294]/20 hover:bg-[#001719]/40">
                  <td className="px-4 py-3 text-sm font-medium text-[#E9C46A]">{student.student_id}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{student.full_name}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{student.email}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{student.phone}</td>
                  <td className="px-4 py-3 text-sm text-secondary">Class {student.class_level}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
