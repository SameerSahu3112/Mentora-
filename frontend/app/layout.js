/**
 * Mentora Root Layout
 * Brand: Abyss Teal (~80%) + Desert Sand (~20%)
 */

import './globals.css';

export const metadata = {
  title: 'Mentora — JEE Preparation Platform',
  description: 'Student-focused JEE preparation platform with courses, batches, mentorship, and learning resources.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
