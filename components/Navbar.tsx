"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useTheme } from "next-themes";

// SVG Icons
const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const KeyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.544 2.914 1.19.092-.926.35-1.546.636-1.903-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.286.098-2.676 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.817c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.39.203 2.423.1 2.676.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.192 20 14.435 20 10.017 20 4.484 15.522 0 10 0z" clipRule="evenodd" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const Navbar = () => {
  const { user, clearToken } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recommend?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50">
      <div className="flex justify-center w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black backdrop-blur-sm">
        <div className="flex flex-col flex-1 px-4 md:px-10 w-full max-w-7xl">
          <header className="flex items-center justify-between min-w-full py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image
                src="/WhiteRetinalSmartCourse.svg"
                alt="Smart Course"
                width={40}
                height={40}
              />
              <span className="hidden md:block text-lg font-bold text-black dark:text-white">
                Smart Course
              </span>
            </Link>

            {/* Search Bar */}
            {user && (
              <form className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8" onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="flex-1 px-4 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:shadow-md transition-all"
                >
                  Go
                </button>
              </form>
            )}

            {/* Navigation & Auth */}
            <div className="flex items-center gap-6">
              {user ? (
                <>
                  <nav className="hidden lg:flex items-center gap-6">
                    <Link
                      href="/recommend"
                      className={`text-sm font-medium transition-colors ${
                        isActive("/recommend")
                          ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                          : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      Search
                    </Link>
                    <Link
                      href="/dashboard"
                      className={`text-sm font-medium transition-colors ${
                        isActive("/dashboard")
                          ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                          : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dataset"
                      className={`text-sm font-medium transition-colors ${
                        isActive("/dataset")
                          ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                          : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      Dataset
                    </Link>
                    <Link
                      href="/about"
                      className={`text-sm font-medium transition-colors ${
                        isActive("/about")
                          ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                          : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      About
                    </Link>
                  </nav>

                  {/* Avatar Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="relative w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors overflow-hidden"
                    >
                      <img
                        src={user.avatar || "https://via.placeholder.com/40"}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white dark:bg-gray-950 border-2 border-gray-300 dark:border-gray-700 shadow-lg overflow-hidden animate-in fade-in duration-200">
                        {/* User Header */}
                        <div className="bg-gray-100 dark:bg-gray-900 p-4 border-b-2 border-gray-300 dark:border-gray-700">
                          <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                          <p className="text-lg font-bold text-black dark:text-white">{user.name}</p>
                        </div>

                        {/* Menu Items */}
                        <div className="p-4 space-y-3">
                          <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                            Settings
                          </h3>

                          <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-sm font-medium text-black dark:text-white"
                          >
                            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                          </button>

                          <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mt-4">
                            Password
                          </h3>
                          
                          {user.provider === "password" && (
                            <button
                              onClick={() => {
                                router.push("/change-password");
                                setDropdownOpen(false);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-sm font-medium text-black dark:text-white"
                            >
                              <KeyIcon />
                              <span>Change Password</span>
                            </button>
                          )}

                          {user.provider !== "password" && (
                            <button
                              onClick={() => {
                                router.push("/add-password");
                                setDropdownOpen(false);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-sm font-medium text-black dark:text-white"
                            >
                              <KeyIcon />
                              <span>Add Password</span>
                            </button>
                          )}
                        </div>

                        {/* Logout */}
                        <div className="p-3">
                          <button
                            onClick={() => {
                              clearToken();
                              setDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm font-bold text-black dark:text-white border-2 border-gray-300 dark:border-gray-700"
                          >
                            <LogoutIcon />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-2.5 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:shadow-md transition-all"
                >
                  Login
                </Link>
              )}
            </div>
          </header>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
