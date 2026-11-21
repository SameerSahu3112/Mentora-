/**
 * Student Portal Layout
 */

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function StudentLayout({ children }) {
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
