"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/app/lib/api";

const NAV_LINKS = [
  { href: "/teacher/dashboard", label: "Dashboard" },
  { href: "/teacher/batches", label: "Batches" },
  { href: "/teacher/students", label: "Students" },
  { href: "/teacher/resources", label: "Resources" },
  { href: "/teacher/mentorship", label: "Mentorship" },
  { href: "/teacher/attendance", label: "Attendance" },
  { href: "/teacher/profile", label: "Profile" },
];

export default function TeacherLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authAPI.logout();
    } catch {
      // ignore
    }
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-[#001719] text-on-surface">
      <nav className="bg-[#001719]/90 backdrop-blur-md border-b border-[#8a9294]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/teacher/dashboard" className="flex items-center gap-1">
              <span className="text-xl font-display font-bold text-[#0F4C5C]">Mentora</span>
              <span className="text-sm font-semibold text-[#E9C46A]">.</span>
            </Link>

            <div className="hidden md:flex items-center gap-4 text-sm font-medium text-on-surface-variant">
              {NAV_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-[#E9C46A] transition-colors">
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={handleSignOut}
                className="ml-2 px-3 py-1.5 rounded bg-[#082326] text-[#E9C46A] hover:bg-[#0F4C5C] hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </div>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden px-3 py-1.5 rounded border border-[#8a9294]/30 text-on-surface-variant"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-2 text-sm">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-[#082326] text-on-surface-variant hover:text-[#E9C46A]"
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={handleSignOut}
                className="mt-2 py-2 px-3 rounded bg-[#082326] text-[#E9C46A] text-left"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
