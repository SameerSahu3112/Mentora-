/**
 * Mentora Admin Audit Logs
 * Phase 10: Frontend Portal Completion
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(`${API_URL}/api/v1/admin/audit-logs`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse h-32 bg-border-color rounded" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6">
          <a href="/admin/dashboard" className="text-abyss-teal hover:text-abyss-teal-dark text-sm">
            &larr; Back to Dashboard
          </a>
        </nav>

        <h1 className="text-2xl font-bold text-abyss-teal mb-6">Audit Logs</h1>

        <div className="bg-primary rounded-lg shadow-sm border border-border-color overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-desert-sand-light border-b border-border-color">
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Time</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Actor</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Action</th>
                <th className="px-4 py-3 text-xs font-semibold text-abyss-teal uppercase">Entity</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-muted">
                    No audit logs found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="border-b border-border-color hover:bg-abyss-teal-light">
                    <td className="px-4 py-3 text-sm text-secondary">{new Date(log.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{log.actor_user_id || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{log.action}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{log.entity_type || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
