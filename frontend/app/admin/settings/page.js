"use client";

export default function AdminSettings() {
  return (
    <main className="min-h-screen bg-[#001719] p-6">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6"><a href="/admin/dashboard" className="text-[#0F4C5C] hover:text-[#0F4C5C] text-sm font-medium">← Back to Dashboard</a></nav>
        <h1 className="text-2xl font-bold text-[#0F4C5C] mb-6">Settings</h1>
        <div className="bg-[#082326] p-6 rounded-lg shadow-sm border border-[#8a9294]/20">
          <h2 className="text-lg font-bold text-[#0F4C5C] mb-4">Application Settings</h2>
          <p className="text-secondary mb-4">Configuration options for the Mentora platform.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-[#8a9294]/20 rounded">
              <div>
                <h3 className="text-sm font-medium text-[#0F4C5C]">Site Name</h3>
                <p className="text-xs text-secondary">Mentora</p>
              </div>
              <input className="w-48 px-3 py-2 border border-[#8a9294]/20 rounded-md text-sm" value="Mentora" />
            </div>
            <div className="flex items-center justify-between p-4 border border-[#8a9294]/20 rounded">
              <div>
                <h3 className="text-sm font-medium text-[#0F4C5C]">Environment</h3>
                <p className="text-xs text-secondary">Production</p>
              </div>
              <span className="px-2 py-1 text-xs font-semibold bg-[#E9C46A]/20 text-[#E9C46A] border border-[#E9C46A]/20 rounded">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
