"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Course {
  course_id: number;
  course_title: string;
  course_instructor_name: string;
  course_levels: string;
  ratings: number;
  course_links: string;
}

interface SavedCourse extends Course {
  saved_at: string;
  similarity_score: number;
}

interface RecommendedCourse extends Course {
  similarity_score: number;
}

interface SearchHistoryItem {
  id: number;
  query: string;
  model_type: string;
  result_count: number;
  created_at: string;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Data states
  const [savedCourses, setSavedCourses] = useState<SavedCourse[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedCourse[]>([]);
  
  // Loading states
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  
  // Error states
  const [errorCourses, setErrorCourses] = useState<string>("");
  const [errorHistory, setErrorHistory] = useState<string>("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  // Fetch data on mount
  useEffect(() => {
    if (user && !loading) {
      loadSavedCourses();
      loadSearchHistory();
    }
  }, [user, loading]);

  const getAuthHeader = () => {
    const token = localStorage.getItem("auth_token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const loadSavedCourses = async () => {
    try {
      setLoadingCourses(true);
      setErrorCourses("");
      
      const response = await fetch("http://localhost:5328/api/saved", {
        headers: getAuthHeader(),
      });

      if (!response.ok) throw new Error(`Failed to load saved courses: ${response.status}`);
      
      const data = await response.json();
      setSavedCourses(data.saved_courses || []);
      
      // Auto-load recommendations if courses exist
      if (data.saved_courses && data.saved_courses.length > 0) {
        loadRecommendations(data.saved_courses);
      }
    } catch (err) {
      setErrorCourses(err instanceof Error ? err.message : "Failed to load saved courses");
    } finally {
      setLoadingCourses(false);
    }
  };

  const loadSearchHistory = async () => {
    try {
      setLoadingHistory(true);
      setErrorHistory("");
      
      console.log("Fetching search history...");
      
      const response = await fetch("http://localhost:5328/api/history", {
        headers: getAuthHeader(),
      });

      if (!response.ok) throw new Error(`Failed to load history: ${response.status}`);
      
      const data = await response.json();
      console.log("Search history response:", data);
      
      setSearchHistory(data.history || []);
    } catch (err) {
      console.error("Error loading history:", err);
      setErrorHistory(err instanceof Error ? err.message : "Failed to load search history");
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadRecommendations = async (courses: SavedCourse[]) => {
    try {
      setLoadingRecommendations(true);
      
      // Build query from last 5 saved course titles
      const query = courses
        .slice(0, 5)
        .map(c => c.course_title)
        .join(", ");
      
      if (!query) return;

      console.log("Fetching recommendations for last 5 saved courses:", query);

      const response = await fetch("http://localhost:5328/api/recommend", {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
          query,
          model_type: "both",
        }),
      });

      if (!response.ok) throw new Error(`Failed to load recommendations: ${response.status}`);
      
      const data = await response.json();
      console.log("Recommendations received:", data);
      
      const savedIds = new Set(courses.map(c => c.course_id));
      
      // Filter out already saved courses
      const filtered = (data.recommendations || [])
        .filter((course: RecommendedCourse) => !savedIds.has(course.course_id))
        .slice(0, 10);
      
      setRecommendations(filtered);
    } catch (err) {
      console.error("Error loading recommendations:", err);
      setRecommendations([]);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const handleRemoveSavedCourse = async (courseId: number) => {
    try {
      const response = await fetch(`http://localhost:5328/api/save/${courseId}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });

      if (response.ok) {
        setSavedCourses(prev => prev.filter(c => c.course_id !== courseId));
      }
    } catch (err) {
      console.error("Error removing saved course:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900 dark:border-white mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        {/* Header */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-2">
            Welcome, {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your saved courses and discover personalized recommendations
          </p>
        </section>

        {/* Saved Courses */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Saved Courses ({savedCourses.length})
            </h2>
            <Link
              href="/recommend"
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:shadow-md transition-all"
            >
              Find More
            </Link>
          </div>

          {loadingCourses ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Loading courses...</p>
            </div>
          ) : errorCourses ? (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-200">
              <p className="font-semibold mb-2">Error Loading Courses</p>
              <p className="text-sm">{errorCourses}</p>
              <button
                onClick={loadSavedCourses}
                className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
              >
                Retry
              </button>
            </div>
          ) : savedCourses.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No saved courses yet
              </p>
              <Link
                href="/recommend"
                className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:shadow-md transition-all"
              >
                Start Searching
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedCourses.map(course => (
                <div
                  key={course.course_id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-all group"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                    {course.course_title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    by {course.course_instructor_name}
                  </p>
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="text-gray-600 dark:text-gray-400">
                      ⭐ {course.ratings?.toFixed(1) || "N/A"}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {course.course_levels || "All"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={course.course_links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-3 py-2 bg-black dark:bg-white text-white dark:text-black text-sm rounded font-medium hover:shadow-md transition-all"
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
        </section>

        {/* Recommendations */}
        {savedCourses.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Recommended For You ({recommendations.length})
            </h2>

            {loadingRecommendations ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Generating recommendations...</p>
              </div>
            ) : recommendations.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center text-gray-600 dark:text-gray-400">
                No recommendations available at this time
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {recommendations.map(course => (
                  <div
                    key={course.course_id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-all flex flex-col"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 text-sm">
                      {course.course_title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 mb-3">
                      {course.course_instructor_name}
                    </p>
                    <div className="flex items-center justify-between text-xs mb-3 flex-grow">
                      <span className="text-gray-600 dark:text-gray-400">
                        ⭐ {course.ratings?.toFixed(1) || "N/A"}
                      </span>
                      <span className="text-[#0bda5e] font-medium">
                        {(course.similarity_score * 100).toFixed(0)}%
                      </span>
                    </div>
                    <a
                      href={course.course_links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center px-3 py-2 bg-black dark:bg-white text-white dark:text-black text-xs rounded font-medium hover:shadow-md transition-all"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Search History */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Search History
          </h2>

          {loadingHistory ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Loading history...</p>
            </div>
          ) : errorHistory ? (
            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-yellow-800 dark:text-yellow-200">
              <p className="font-semibold mb-2">Warning</p>
              <p className="text-sm">{errorHistory}</p>
              <button
                onClick={loadSearchHistory}
                className="mt-3 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm transition-colors"
              >
                Retry
              </button>
            </div>
          ) : searchHistory.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center text-gray-600 dark:text-gray-400">
              No search history yet. Start searching on the{" "}
              <Link href="/recommend" className="text-blue-500 hover:underline">
                recommendation page
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {searchHistory.map(item => (
                <div
                  key={item.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {item.query}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Model: {item.model_type.toUpperCase()} • Results: {item.result_count}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap ml-4">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
