"use client";

import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-10">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            📬 Mail Server
          </h2>
          <p className="text-sm">
            A unified email gateway for Gmail, Outlook, and Zoho. Send, manage,
            and monitor emails with ease and security.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Quick Links
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/api-doc" className="hover:underline">
                API Docs
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Legal
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/security" className="hover:underline">
                Security Practices
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Connect With Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope />
              <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className="hover:underline">
                Email Support
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaGlobe />
              <a
                href={process.env.NEXT_PUBLIC_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Website
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaGithub />
              <a
                href="https://github.com/jubayershuvo/mailer-js"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaLinkedin />
              <a
                href="https://www.linkedin.com/in/jubayershuvo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t mt-10 pt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Mail Server by Md Jubayer. All rights reserved.
      </div>
    </footer>
  );
}
