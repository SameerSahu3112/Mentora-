/**
 * Mentora Footer Component
 * Brand: Abyss Teal + Desert Sand
 */

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-border-color mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-abyss-teal mb-4">Mentora</h3>
            <p className="text-secondary text-sm">
              JEE preparation platform with mentorship and quality resources.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-abyss-teal mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li>
                <Link href="/courses" className="hover:text-abyss-teal transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-abyss-teal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-abyss-teal transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-abyss-teal transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-abyss-teal mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li>
                <Link href="/student/dashboard" className="hover:text-abyss-teal transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/teacher/dashboard" className="hover:text-abyss-teal transition-colors">
                  Teacher Portal
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-abyss-teal transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-abyss-teal mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li>support@mentora.example.com</li>
              <li>+91 98765 43210</li>
              <li>Mon - Sat: 10:00 AM - 6:00 PM IST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-color mt-8 pt-8 text-center text-sm text-secondary">
          <p>&copy; {new Date().getFullYear()} Mentora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
