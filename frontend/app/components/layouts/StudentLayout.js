"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authAPI } from "@/app/lib/api";

const NAV_LINKS = [
  { href: "/student/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/student/applications", label: "Applications", icon: "assignment" },
  { href: "/student/enrollments", label: "Enrollments", icon: "person_add" },
  { href: "/student/resources", label: "Resources", icon: "library_books" },
  { href: "/student/mentorship", label: "Mentorship", icon: "event" },
  { href: "/student/notifications", label: "Notifications", icon: "notifications" },
  { href: "/student/profile", label: "Profile", icon: "person" },
];

export default function StudentLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await authAPI.logout();
    } catch {
      // ignore
    }
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface">
      <nav className="sticky top-0 z-20 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/20">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded hover:bg-surface-container-high text-on-surface-variant"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[24px]">{mobileMenuOpen ? "close" : "menu"}</span>
            </button>
            <Link href="/student/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-display font-bold text-primary">Mentora</span>
              <span className="text-sm font-semibold text-secondary">.</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-on-surface-variant">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-secondary transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleSignOut}
              className="ml-2 px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
      {mobileMenuOpen && (
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-surface-container-low z-40 transform transition-transform lg:hidden">
          <div className="p-6 border-b border-outline-variant/20">
            <Link href="/student/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-display font-bold text-primary">Mentora</span>
              <span className="text-sm font-semibold text-secondary">.</span>
            </Link>
          </div>
          <nav className="p-4 space-y-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-primary-container text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleSignOut}
              className="mt-4 w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-secondary hover:text-error hover:bg-error/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">sign_out</span>
              Sign Out
            </button>
          </nav>
        </div>
      )}

      <main className="p-6 lg:p-8 space-y-8">{children}</main>
    </div>
  );
}