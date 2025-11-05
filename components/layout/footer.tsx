import Link from 'next/link';
import { Send, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">@</span>
              </div>
              <span className="font-bold text-xl">Better Notes V2</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              High-quality, handwritten medical notes for MBBS students. Created by a dedicated medical student to help you excel in your studies.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://t.me/betternotes"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-black transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="mailto:betternotes@example.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-black transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:+1234567890"
                className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-black transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/notes" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  All Notes
                </Link>
              </li>
              <li>
                <Link href="/#featured" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Featured Notes
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/notes?academicYear=first-year" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  First Year
                </Link>
              </li>
              <li>
                <Link href="/notes?academicYear=second-year" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Second Year
                </Link>
              </li>
              <li>
                <Link href="/notes?academicYear=third-year" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Third Year
                </Link>
              </li>
              <li>
                <Link href="/notes?academicYear=fourth-year" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Fourth Year
                </Link>
              </li>
              <li>
                <Link href="/notes?academicYear=fifth-year" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Fifth Year
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Better Notes V2. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Made with ❤️ for medical students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;