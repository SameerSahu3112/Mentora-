"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminAPI } from "@/app/lib/api";

export default function AdminBatches() {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    course_id: "",
    name: "",
    start_date: "",
    end_date: "",
    max_capacity: "30",
  });

  const loadData = () => {
    setLoading(true);
    Promise.all([adminAPI.getBatches(), adminAPI.getCourses()])
      .then(([b, c]) => {
        const courseList = Array.isArray(c) ? c : [];
        setBatches(Array.isArray(b) ? b : []);
        setCourses(courseList);
        if (courseList.length > 0 && !form.course_id) {
          setForm((prev) => ({ ...prev, course_id: courseList[0].id }));
        }
      })
      .catch((err) => setError(err.message || "Failed to load batches"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await adminAPI.createBatch({
        course_id: form.course_id,
        name: form.name,
        start_date: form.start_date,
        end_date: form.end_date,
        max_capacity: Number(form.max_capacity),
        status: "active",
      });
      setForm((prev) => ({ ...prev, name: "", start_date: "", end_date: "", max_capacity: "30" }));
      setSuccess("Batch created.");
      loadData();
    } catch (err) {
      setError(err.message || "Failed to create batch");
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
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Batches</h1>

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
        <select
          value={form.course_id}
          onChange={(e) => setForm({ ...form, course_id: e.target.value })}
          required
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Batch Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <input
          type="number"
          min="1"
          placeholder="Max Capacity"
          value={form.max_capacity}
          onChange={(e) => setForm({ ...form, max_capacity: e.target.value })}
          required
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <input
          type="date"
          value={form.start_date}
          onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          required
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <input
          type="date"
          value={form.end_date}
          onChange={(e) => setForm({ ...form, end_date: e.target.value })}
          required
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <button
          type="submit"
          disabled={submitting || !form.course_id}
          className="px-4 py-2 rounded bg-[#0F4C5C] text-white font-semibold text-sm hover:bg-[#E9C46A] hover:text-[#00363d] transition-colors disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create Batch"}
        </button>
      </form>

      <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Batch Name</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Course</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Capacity</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Dates</th>
            </tr>
          </thead>
          <tbody>
            {batches.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-secondary">
                  No batches found.
                </td>
              </tr>
            ) : (
              batches.map((batch) => (
                <tr key={batch.id} className="border-b border-[#8a9294]/20 hover:bg-[#001719]/40">
                  <td className="px-4 py-3 text-sm font-medium text-[#E9C46A]">{batch.name}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{batch.course_name || "N/A"}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{batch.max_capacity}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 rounded bg-[#E9C46A]/20 text-[#E9C46A] text-xs font-semibold">
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-secondary">
                    {batch.start_date} to {batch.end_date}
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
