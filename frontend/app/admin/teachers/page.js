"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminAPI } from "@/app/lib/api";

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    bio: "",
    password: "",
  });

  const loadTeachers = () => {
    setLoading(true);
    adminAPI
      .getTeachers()
      .then((data) => setTeachers(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load teachers"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await adminAPI.createTeacher({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone || null,
        bio: form.bio || null,
        password: form.password,
      });
      setForm({ full_name: "", email: "", phone: "", bio: "", password: "" });
      setSuccess("Teacher account created.");
      loadTeachers();
    } catch (err) {
      setError(err.message || "Failed to create teacher");
    } finally {
      setSubmitting(false);
    }
  };

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
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Teachers</h1>

      {error && (
        <div className="mb-4 p-3 rounded bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 rounded bg-[#0F4C5C]/20 border border-[#0F4C5C] text-[#E9C46A] text-sm">
          {success}
        </div>
      )}

      <form
        onSubmit={handleCreate}
        className="bg-[#082326] p-5 rounded-lg border border-[#8a9294]/20 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          required
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <input
          type="password"
          placeholder="Temporary Password (min 8 chars)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          minLength={8}
          required
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <input
          type="text"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <input
          type="text"
          placeholder="Bio (optional)"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded bg-[#0F4C5C] text-white font-semibold text-sm hover:bg-[#E9C46A] hover:text-[#00363d] transition-colors disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create Teacher"}
        </button>
      </form>

      <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Name</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Email</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Phone</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-secondary">
                  No teachers found.
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-[#8a9294]/20 hover:bg-[#001719]/40">
                  <td className="px-4 py-3 text-sm font-medium text-[#E9C46A]">{teacher.full_name}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{teacher.email || "N/A"}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{teacher.phone || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 rounded bg-[#0F4C5C]/20 text-[#E9C46A] text-xs font-semibold">
                      Active
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
