"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { coursesAPI, teacherAPI } from "@/app/lib/api";

export default function TeacherResourcesPage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    course_id: "",
    title: "",
    type: "note",
    description: "",
  });

  useEffect(() => {
    coursesAPI
      .getAll()
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setCourses(list);
        if (list.length > 0) {
          setForm((prev) => ({ ...prev, course_id: list[0].id }));
        }
      })
      .catch(() => setCourses([]));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      const created = await teacherAPI.createResource({
        course_id: form.course_id,
        title: form.title,
        type: form.type,
        description: form.description || null,
      });
      if (created?.id) {
        await teacherAPI.publishResource(created.id);
      }
      setForm((prev) => ({ ...prev, title: "", description: "" }));
      setSuccess("Resource created and published.");
    } catch (err) {
      setError(err.message || "Failed to create resource");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="mb-6">
        <Link href="/teacher/dashboard" className="text-[#0F4C5C] hover:text-[#E9C46A] text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-2">My Resources</h1>
      <p className="text-secondary text-sm mb-6">
        Draft and publish resources for your assigned batches. Permanent deletion requires Admin dual-approval.
      </p>

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

      <form onSubmit={handleCreate} className="bg-[#082326] p-6 rounded-lg border border-[#8a9294]/20 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
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
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
          >
            <option value="note">Note</option>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="practice">Practice</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Resource Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <textarea
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 rounded bg-[#001719] border border-[#8a9294]/30 text-sm"
        />
        <button
          type="submit"
          disabled={submitting || !form.course_id}
          className="px-5 py-2.5 rounded bg-[#0F4C5C] text-white font-semibold text-sm hover:bg-[#E9C46A] hover:text-[#00363d] transition-colors disabled:opacity-50"
        >
          {submitting ? "Publishing..." : "Create & Publish Resource"}
        </button>
      </form>
    </div>
  );
}
