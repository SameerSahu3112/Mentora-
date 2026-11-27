"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminAPI } from "@/app/lib/api";

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const loadResources = () => {
    setLoading(true);
    adminAPI
      .getResources()
      .then((data) => setResources(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load resources"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleUnpublish = async (id) => {
    setError("");
    setBusyId(id);
    try {
      await adminAPI.unpublishResource(id);
      loadResources();
    } catch (err) {
      setError(err.message || "Failed to unpublish resource");
    } finally {
      setBusyId(null);
    }
  };

  const statusColors = {
    draft: "bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]",
    published: "bg-[#0F4C5C]/20 text-[#E9C46A] border border-[#0F4C5C]",
    unpublished: "bg-[#E9C46A]/20 text-[#E9C46A] border border-[#E9C46A]",
    deleted: "bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]",
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
      <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Resources</h1>

      {error && (
        <div className="mb-4 p-3 rounded bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] text-sm">
          {error}
        </div>
      )}

      <div className="bg-[#082326] rounded-lg shadow-sm border border-[#8a9294]/20 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#082326]/50 border-b border-[#8a9294]/20">
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Title</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Type</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Uploader</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#0F4C5C] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-secondary">
                  No resources found.
                </td>
              </tr>
            ) : (
              resources.map((resource) => (
                <tr key={resource.id} className="border-b border-[#8a9294]/20 hover:bg-[#001719]/40">
                  <td className="px-4 py-3 text-sm font-medium text-[#E9C46A]">{resource.title}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{resource.type}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        statusColors[resource.status] || "bg-[#8a9294]/20 text-[#8a9294] border border-[#8a9294]"
                      }`}
                    >
                      {resource.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-secondary">{resource.uploader_id || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">
                    {resource.status === "published" && (
                      <button
                        type="button"
                        disabled={busyId === resource.id}
                        onClick={() => handleUnpublish(resource.id)}
                        className="px-2.5 py-1 rounded bg-[#93000a] text-white text-xs font-semibold disabled:opacity-50"
                      >
                        Unpublish
                      </button>
                    )}
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
