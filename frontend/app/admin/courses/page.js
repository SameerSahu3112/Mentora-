"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminAPI } from "@/app/lib/api";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    exam_target: "JEE Main January",
    price: "",
    exam_date: "",
    description: "",
  });

  const loadCourses = () => {
    setLoading(true);
    adminAPI
      .getCourses()
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load courses"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await adminAPI.createCourse({
        name: form.name,
        exam_target: form.exam_target,
        price: Number(form.price),
        exam_date: form.exam_date || null,
        description: form.description || null,
        is_active: true,
      });
      setForm({ name: "", exam_target: "JEE Main January", price: "", exam_date: "", description: "" });
      setSuccess("Course created.");
      loadCourses();
    } catch (err) {
      setError(err.message || "Failed to create course");
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
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Courses</h1>

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
          placeholder="Course Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <select
          value={form.exam_target}
          onChange={(e) => setForm({ ...form, exam_target: e.target.value })}
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        >
          <option value="JEE Main January">JEE Main January</option>
          <option value="JEE Main April">JEE Main April</option>
          <option value="JEE Advanced">JEE Advanced</option>
        </select>
        <input
          type="number"
          min="0"
          step="1"
          placeholder="Price (INR)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <input
          type="date"
          value={form.exam_date}
          onChange={(e) => setForm({ ...form, exam_date: e.target.value })}
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded bg-[#0F4C5C] text-white font-semibold text-sm hover:bg-[#E9C46A] hover:text-[#00363d] transition-colors disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create Course"}
        </button>
      </form>

      <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Name</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Exam Target</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Price</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-secondary">
                  No courses found.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} className="border-b border-[#8a9294]/20 hover:bg-[#001719]/40">
                  <td className="px-4 py-3 text-sm font-medium text-[#E9C46A]">{course.name}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{course.exam_target || "N/A"}</td>
                  <td className="px-4 py-3 text-sm text-secondary">₹{course.price}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 rounded bg-[#E9C46A]/20 text-[#E9C46A] text-xs font-semibold">
                      {course.is_active ? "Active" : "Inactive"}
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
