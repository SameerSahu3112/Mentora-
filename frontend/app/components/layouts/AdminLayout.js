"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authAPI } from "@/app/lib/api";

const NAV_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/students", label: "Students", icon: "group" },
  { href: "/admin/teachers", label: "Teachers", icon: "school" },
  { href: "/admin/courses", label: "Courses", icon: "book" },
  { href: "/admin/batches", label: "Batches", icon: "table_chart" },
  { href: "/admin/applications", label: "Applications", icon: "assignment" },
  { href: "/admin/enrollments", label: "Enrollments", icon: "person_add" },
  { href: "/admin/payments", label: "Payments", icon: "account_balance_wallet" },
  { href: "/admin/resources", label: "Resources", icon: "library_books" },
  { href: "/admin/mentorship", label: "Mentorship", icon: "event" },
  { href: "/admin/approvals", label: "Approvals", icon: "gavel" },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: "history" },
  { href: "/admin/settings", label: "Settings", icon: "settings" },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface-container-low border-r border-outline-variant/20 transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-outline-variant/20">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-display font-bold text-primary">Mentora</span>
              <span className="text-sm font-semibold text-secondary">.</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-container text-on-primary"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-outline-variant/20">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-secondary hover:text-error hover:bg-error/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">sign_out</span>
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && typeof window !== "undefined" && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`lg:pl-64 min-h-screen`}>
        <header className="sticky top-0 z-20 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20">
          <div className="flex items-center justify-between h-16 px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded hover:bg-surface-container-high text-on-surface-variant"
                aria-label="Toggle sidebar"
              >
                <span className="material-symbols-outlined text-[24px]">{sidebarOpen ? "close" : "menu"}</span>
              </button>
              <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface hidden sm:block">
                Mentora Admin
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSignOut}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">sign_out</span>
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8 space-y-8">{children}</main>
      </div>
    </div>
  );
}