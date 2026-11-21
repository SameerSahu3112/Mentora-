/**
 * Teacher Portal Layout
 */

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TeacherLayout({ children }) {
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
