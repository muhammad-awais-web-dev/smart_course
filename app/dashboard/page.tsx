"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  provider: string;
}

export default function DashboardPage() {
  const { user, loading, error, clearErrors, clearToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if loading is complete and there's no user
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error.length > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-red-500">
          <p>{error[0]}</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <header>
          <Navbar />
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* User Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Profile
            </h2>
            <div className="flex items-center gap-4">
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {user?.email}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Signed in with{" "}
                  <span className="capitalize font-medium">
                    {user?.provider}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome, {user?.name?.split(" ")[0]}! 👋
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              You have successfully authenticated with your {user?.provider}{" "}
              account. Start exploring personalized course recommendations!
            </p>
          </div>

          {/* Course Recommendations Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Course Recommendations
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get started by searching for courses or topics you're interested
              in.
            </p>
            {/* Add your course search and recommendation UI here */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Course recommendation interface coming soon...
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
