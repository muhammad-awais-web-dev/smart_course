"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

const Navbar = () => {
  const { user, clearToken } = useAuth();

  return (
    <nav className=" sticky top-0  z-50">
      <div className="flex flex-1 justify-center w-full border-b border-gray-200 dark:border-[#282e39] bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0">
        <div className="layout-content-container flex flex-col flex-1 px-4 md:px-10">
          <header className="flex items-center justify-between min-w-full whitespace-nowrap py-4">
            <div className="flex items-end justify-center gap-3 text-[#111318] dark:text-white hover:opacity-80 transition-opacity cursor-pointer">
              {/* Logo Placeholder */}
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Image
                    src="/WhiteRetinalSmartCourse.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                  />
                </div>
                <h2 className="text-2xl font-bold">Smart Course</h2>
              </Link>
            </div>
            <form className=" h-full w-full flex justify-center items-center gap-2 max-w-[800px]">
              <input
                type="text"
                className="w-full h-1/2 rounded-lg border border-white/20 bg-white dark:bg-gray-800 shadow-md"
              />
              <button
                type="submit"
                className=" bg-black border px-4 rounded-lg transition-colors border-white hover:bg-white hover:text-black h-1/2 "
              >
                {" "}
                Search{" "}
              </button>
            </form>
            <div className="flex flex-1 relative overflow-visible max-w-fit items-center gap-8">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium w-fit text-gray-700 dark:text-gray-300 hover:text-white transition-all"
                  >
                    Dashboard
                  </Link>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full border-4 transition-colors duration-300 border-transparent hover:border-blue-500 cursor-pointer"
                  />
                  <div className=" h-80 top-16 bg-gradient-to-br from-black/95 from-50% to-slate-600/95 gap-5 flex flex-col items-center p-5 border-white shadow-[0_0_5px_2px_#ffffffaa] right-14 rounded-2xl w-80 absolute">
                    <p>{user.email} </p>
                    <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full " />
                    <p>Hi, {user.name}!</p>
                  </div>
                </>
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
