"use client";

import './globals.css';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Mentora — JEE Preparation Platform',
  description: 'Student-focused JEE preparation platform with courses, batches, mentorship, and learning resources.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
