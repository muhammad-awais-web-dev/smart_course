"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  provider: string;
}

interface SearchHistoryItem {
  id: number;
  query: string;
  model_type: string;
  result_count: number;
  created_at: string;
  saved_courses?: SavedCourse[];
}

interface SavedCourse {
  id: number;
  course_id: number;
  course_title: string;
  course_instructor_name: string;
  course_levels: string;
  ratings: number;
  similarity_score: number;
  course_links: string;
  saved_at: string;
}

export default function DashboardPage() {
  const { user, loading, error, clearErrors, clearToken } = useAuth();
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [savedCourses, setSavedCourses] = useState<SavedCourse[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    // Only redirect if loading is complete and there's no user
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    // Fetch search history and saved courses when user is authenticated
    if (user && !loading) {
      fetchSearchHistory();
      fetchSavedCourses();
    }
  }, [user, loading]);

  const fetchSearchHistory = async () => {
    try {
      setHistoryLoading(true);
      const token = localStorage.getItem("auth_token");
      const response = await fetch("http://localhost:5328/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSearchHistory(data.history || []);
      }
    } catch (err) {
      console.error("Error fetching search history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchSavedCourses = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("http://localhost:5328/api/saved", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSavedCourses(data.saved_courses || []);
      }
    } catch (err) {
      console.error("Error fetching saved courses:", err);
    }
  };

  const handleRemoveSavedCourse = async (courseId: number) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`http://localhost:5328/api/save/${courseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setSavedCourses(savedCourses.filter((c) => c.course_id !== courseId));
      }
    } catch (err) {
      console.error("Error removing saved course:", err);
    }
  };

  const handleSearchAgain = (query: string) => {
    router.push(`/recommend?q=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900 dark:border-white mb-4"></div>
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
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-4">
              Your Profile
            </h2>
            <div className="flex items-center justify-between">
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
                  <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Signed in with{" "}
                    <span className="capitalize font-medium">{user?.provider}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 mb-6 border-2 border-gray-300 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-2">
              Welcome, {user?.name?.split(" ")[0]}!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Start exploring personalized course recommendations tailored to your
              interests!
            </p>
            <Link
              href="/recommend"
              className="inline-block px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg transition-colors hover:shadow-md"
            >
              Search for Courses
            </Link>
          </div>

          {/* Saved Courses Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-4">
              Saved Courses ({savedCourses.length})
            </h2>
            {savedCourses.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No saved courses yet.{" "}
                <Link href="/recommend" className="text-gray-700 dark:text-gray-300 hover:underline font-semibold">
                  Start searching
                </Link>{" "}
                to save your favorite courses!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedCourses.map((course) => (
                  <div
                    key={course.course_id}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                  >
                    <h3 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 line-clamp-2 mb-2">
                      {course.course_title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {course.course_instructor_name || "Unknown"}
                    </p>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-600 dark:text-gray-300">
                        Rating: {course.ratings?.toFixed(1) || "N/A"}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {course.course_levels || "All Levels"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={course.course_links}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-3 py-2 bg-black dark:bg-white text-white dark:text-black text-sm rounded transition-colors hover:shadow-md"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleRemoveSavedCourse(course.course_id)}
                        className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-400 text-sm rounded transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search History Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-4">
              Search History
            </h2>
            {historyLoading ? (
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            ) : searchHistory.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No search history yet. Start{" "}
                <Link href="/recommend" className="text-gray-700 dark:text-gray-300 hover:underline font-semibold">
                  searching for courses
                </Link>
                !
              </p>
            ) : (
              <div className="space-y-3">
                {searchHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.query}
                      </p>
                      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span>Model: {item.model_type.toUpperCase()}</span>
                        <span>{item.result_count} results</span>
                        <span>
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSearchAgain(item.query)}
                      className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm rounded transition-colors ml-4 hover:shadow-md"
                    >
                      Search Again
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
