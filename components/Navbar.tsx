import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

const Navbar = () => {
  const { user, clearToken } = useAuth();

  return (
    <nav>
      <div className="flex flex-1 justify-center w-full z-10 border-b border-gray-200 dark:border-[#282e39] bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 md:px-10">
          <header className="flex items-center justify-between whitespace-nowrap py-4">
            <div className="flex items-end justify-center gap-3 text-[#111318] dark:text-white hover:opacity-80 transition-opacity cursor-pointer">
              {/* Logo Placeholder */}
              <div className="flex items-center justify-center">
                <Image
                  src="/WhiteRetinalSmartCourse.svg"
                  alt="Logo"
                  width={40}
                  height={40}
                />
              </div>
              <h2 className="text-2xl font-bold">Smart Course</h2>
            </div>
            <div className="flex flex-1 justify-end gap-8">
              {user ? (
                <button
                  onClick={clearToken}
                  className="flex min-w-[84px] bg-red-500 hover:bg-red-600 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary hover:bg-primary/90 transition-all text-white text-sm font-bold tracking-[0.015em] hover:shadow-[0_0_15px_2px_#EF4444ee]"
                >
                  <span className="truncate">Sign Out</span>
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex min-w-[84px] bg-blue-500 hover:bg-blue-600 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary hover:bg-primary/90 transition-all text-white text-sm font-bold tracking-[0.015em] hover:shadow-[0_0_15px_2px_#3B82F6ee]"
                >
                  <span className="truncate">Login</span>
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
