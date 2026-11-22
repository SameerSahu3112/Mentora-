/**
 * Mentora Shared Footer Component
 * Brand: Abyssal Focus (Abyss Teal + Desert Sand)
 */

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-surface-container-high text-on-surface py-12">
      <div className="container mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-surface-container-high border border-primary/20 flex items-center justify-center text-primary font-display font-bold">
                M
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-on-surface">
                Mentora<span className="text-secondary">.</span>
              </span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              JEE preparation platform helping students in Classes 9–12 excel in JEE Main and JEE Advanced with structured modules and weekly 1:1 mentorship.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-secondary font-display mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>
                <Link href="/courses" className="hover:text-secondary transition-colors">
                  Courses & Batches
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-secondary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition-colors">
                  Contact / Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-secondary font-display mb-4 text-sm uppercase tracking-wider">
              Portals
            </h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>
                <Link href="/student/dashboard" className="hover:text-secondary transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/teacher/dashboard" className="hover:text-secondary transition-colors">
                  Teacher Faculty Desk
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-secondary transition-colors">
                  Admin Governance Desk
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-secondary font-display mb-4 text-sm uppercase tracking-wider">
              Mentorship Desk
            </h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>support@mentora.example.com</li>
              <li>+91 98765 43210</li>
              <li>Mon – Sat: 10:00 AM – 6:00 PM IST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-container-high mt-8 pt-8 text-center text-sm text-outline">
          <p>&copy; {new Date().getFullYear()} Mentora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
