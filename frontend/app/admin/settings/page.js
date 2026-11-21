"use client";

export default function AdminSettings() {
  return (
    <main className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <a href="/admin/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm">
            &larr; Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Settings</h1>

        <div className="bg-primary p-6 rounded-lg shadow-sm border border-border-color">
          <h2 className="text-lg font-semibold text-abyss-teal mb-4">Application Settings</h2>
          <p className="text-secondary mb-4">
            Configuration options for the Mentora platform.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border-color rounded">
              <div>
                <h3 className="text-sm font-medium text-abyss-teal">Site Name</h3>
                <p className="text-xs text-secondary">Mentora</p>
              </div>
              <input className="w-48 px-3 py-2 border border-border-color rounded-md text-sm" value="Mentora" />
            </div>
            <div className="flex items-center justify-between p-4 border border-border-color rounded">
              <div>
                <h3 className="text-sm font-medium text-abyss-teal">Environment</h3>
                <p className="text-xs text-secondary">Production</p>
              </div>
              <span className="px-2 py-1 text-xs font-semibold bg-abyss-teal-light text-abyss-teal border border-abyss-teal rounded">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
