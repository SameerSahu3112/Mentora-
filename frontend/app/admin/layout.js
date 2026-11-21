/**
 * Admin Portal Layout
 */

import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
