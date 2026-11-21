/**
 * Mentora Admin Settings
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function AdminSettings() {
  return (
    <div className="admin-layout">
      <nav className="mb-6">
        <Link href="/admin/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-abyss-teal mb-6">Settings</h1>

      <div className="card">
        <h2 className="text-lg font-semibold text-abyss-teal mb-4">Application Settings</h2>
        <p className="text-secondary mb-4">Configuration options for the Mentora platform.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
            <div>
              <h3 className="text-sm font-medium text-abyss-teal">Site Name</h3>
              <p className="text-xs text-secondary">Mentora</p>
            </div>
            <input type="text" value="Mentora" className="w-48 px-3 py-2 border border-border-color rounded-md text-sm" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
            <div>
              <h3 className="text-sm font-medium text-abyss-teal">Environment</h3>
              <p className="text-xs text-secondary">Production</p>
            </div>
            <span className="badge badge-active">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
