"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) =>
    pathname === path ? "text-indigo-600 font-semibold" : "text-gray-800";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          MailerJS
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className={`hover:text-indigo-600 ${isActive("/")}`}>
            Home
          </Link>
          <Link href="/docs" className={`hover:text-indigo-600 ${isActive("/docs")}`}>
            Docs
          </Link>
          <Link href="/pricing" className={`hover:text-indigo-600 ${isActive("/pricing")}`}>
            Pricing
          </Link>

          {session ? (
            <>
              <Link
                href="/dashboard"
                className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition ${
                  pathname === "/dashboard" ? "ring-2 ring-indigo-300" : ""
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
              <div className="flex items-center gap-2 ml-4 text-gray-600">
                <FaUserCircle className="text-lg" />
                <span className="text-sm">{session.user?.email}</span>
              </div>
            </>
          ) : (
            <Link
              href="/api/auth/signin"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div
          className="md:hidden text-2xl text-gray-800 cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white px-4 pb-4 border-t"
          >
            <Link
              href="/"
              onClick={closeMenu}
              className={`block py-2 hover:text-indigo-600 ${isActive("/")}`}
            >
              Home
            </Link>
            <Link
              href="/docs"
              onClick={closeMenu}
              className={`block py-2 hover:text-indigo-600 ${isActive("/docs")}`}
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              onClick={closeMenu}
              className={`block py-2 hover:text-indigo-600 ${isActive("/pricing")}`}
            >
              Pricing
            </Link>

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className={`block py-2 font-semibold hover:text-indigo-600 ${
                    isActive("/dashboard")
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                  className="block w-full text-left py-2 text-red-500 font-semibold hover:text-red-600"
                >
                  Logout
                </button>
                <div className="mt-2 flex items-center gap-2 text-gray-600">
                  <FaUserCircle />
                  <span className="text-sm">{session.user?.email}</span>
                </div>
              </>
            ) : (
              <Link
                href="/api/auth/signin"
                onClick={closeMenu}
                className="block py-2 text-blue-600 font-semibold hover:text-blue-700"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
