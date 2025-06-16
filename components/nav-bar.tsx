"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Fix hydration issue
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) =>
    pathname === path
      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
      : "text-gray-800 dark:text-gray-200";

  if (!mounted) return null; // ⛔ Prevent mismatch

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          MailerJS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className={`${isActive("/")} hover:text-indigo-600`}>
            Home
          </Link>
          <Link
            href="/api-doc"
            className={`${isActive("/api-doc")} hover:text-indigo-600`}
          >
            Docs
          </Link>
          <Link
            href="/send-mail"
            className={`${isActive("/send-mail")} hover:text-indigo-600`}
          >
            Send Mail
          </Link>

          

          {session ? (
            <>
              <Link
                href="/dashboard"
                className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 ${
                  pathname === "/dashboard" ? "ring-2 ring-indigo-300" : ""
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/api/auth/signin"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Login
            </Link>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">

          <div
          className=" text-2xl text-gray-800 dark:text-white cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 border-t border-gray-200 dark:border-gray-700"
          >
            <Link
              href="/"
              onClick={closeMenu}
              className={`block py-2 ${isActive("/")}`}
            >
              Home
            </Link>
            <Link
              href="/api-doc"
              onClick={closeMenu}
              className={`block py-2 ${isActive("/api-doc")}`}
            >
              Docs
            </Link>
            <Link
              href="/send-mail"
              onClick={closeMenu}
              className={`block py-2 ${isActive("/send-mail")}`}
            >
              Send Mail
            </Link>

          

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className={`block py-2 ${isActive("/dashboard")}`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                  className="block w-full text-left py-2 text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/api/auth/signin"
                onClick={closeMenu}
                className="block py-2 text-blue-600"
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
