/**
 * Mentora Navbar Component
 * Brand: Abyssal Focus (Abyss Teal + Desert Sand)
 */

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container-high sticky top-0 z-50">
      <div className="container mx-auto px-gutter py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-decoration-none">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high border border-primary/20 flex items-center justify-center text-primary font-display font-bold text-lg">
              M
            </div>
            <span className="text-2xl font-bold font-display tracking-tight text-on-surface">
              Mentora<span className="text-secondary">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/courses" className="text-on-surface-variant hover:text-secondary transition-colors text-sm font-medium">
              Courses & Batches
            </Link>
            <Link href="/about" className="text-on-surface-variant hover:text-secondary transition-colors text-sm font-medium">
              About Us
            </Link>
            <Link href="/testimonials" className="text-on-surface-variant hover:text-secondary transition-colors text-sm font-medium">
              Testimonials
            </Link>
            <Link href="/contact" className="text-on-surface-variant hover:text-secondary transition-colors text-sm font-medium">
              Contact / Help
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/auth/login"
              className="text-on-surface hover:text-secondary font-medium transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-surface-container"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="bg-secondary text-on-secondary px-4 py-2 rounded-lg font-semibold hover:bg-secondary-fixed transition-colors text-sm shadow-sm"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
