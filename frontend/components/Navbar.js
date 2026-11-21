/**
 * Mentora Navbar Component
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-primary border-b border-border-color">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-abyss-teal">
            Mentora
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/courses" className="text-secondary hover:text-abyss-teal transition-colors">
              Courses
            </Link>
            <Link href="/about" className="text-secondary hover:text-abyss-teal transition-colors">
              About Us
            </Link>
            <Link href="/testimonials" className="text-secondary hover:text-abyss-teal transition-colors">
              Testimonials
            </Link>
            <Link href="/contact" className="text-secondary hover:text-abyss-teal transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="text-abyss-teal hover:text-abyss-teal-dark font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="bg-abyss-teal text-white px-4 py-2 rounded-md hover:bg-abyss-teal-dark transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
