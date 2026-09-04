"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// SVG Icons
const BookmarkIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    className="w-5 h-5"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 5a2 2 0 012-2h6a2 2 0 012 2v16l-7-3.5L5 21V5z"
    />
  </svg>
);

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    className="w-4 h-4 inline"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
    />
  </svg>
);

interface Course {
  course_id: number;
  course_title: string;
  course_instructor_name: string;
  course_levels: string;
  ratings: number;
  similarity_score: number;
  course_links: string;
  course_thumbnail_image?: string;
  total_no_of_lectures?: number;
  total_reviews?: string;
  [key: string]: any;
}

interface Recommendation {
  query: string;
  recommendations: Course[];
}

function RecommendContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState(initialQuery);
  const [modelType, setModelType] = useState<"both" | "tfidf" | "neural">(
    "both",
  );
  const [results, setResults] = useState<{
    tfidf?: Recommendation;
    neural?: Recommendation;
  }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedCourses, setSavedCourses] = useState<Set<number>>(new Set());

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
      return;
    }
    setIsAuthenticated(true);
    setIsLoading(false);

    // Load saved courses
    loadSavedCourses();

    // If there's an initial query, run it
    if (initialQuery) {
      runSearch(initialQuery);
    }
  }, [router, initialQuery]);

  const loadSavedCourses = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("http://localhost:5328/api/saved", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        const ids = new Set(
          (data.saved_courses?.map((c: Course) => c.course_id) ||
            []) as number[],
        );
        setSavedCourses(ids);
      }
    } catch (err) {
      console.error("Error loading saved courses:", err);
    }
  };

  const runSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query");
      return;
    }

    setLoading(true);
    setError("");
    setResults({});

    try {
      const token = localStorage.getItem("auth_token");
      const fetchOptions = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (modelType === "tfidf" || modelType === "both") {
        const tfidfResponse = await fetch(
          `http://localhost:5328/api/recommend_tfidf?query=${encodeURIComponent(searchQuery)}`,
          fetchOptions,
        );
        if (tfidfResponse.ok) {
          const tfidfData = await tfidfResponse.json();
          setResults((prev) => ({ ...prev, tfidf: tfidfData }));
        }
      }

      if (modelType === "neural" || modelType === "both") {
        const neuralResponse = await fetch(
          `http://localhost:5328/api/recommend_neural?query=${encodeURIComponent(searchQuery)}`,
          fetchOptions,
        );
        if (neuralResponse.ok) {
          const neuralData = await neuralResponse.json();
          setResults((prev) => ({ ...prev, neural: neuralData }));
        }
      }
    } catch (err: any) {
      setError("Failed to fetch recommendations. Please try again.");
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCourse = async (course: Course) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("http://localhost:5328/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          course_id: course.course_id,
          course_title: course.course_title,
          course_instructor_name: course.course_instructor_name,
          course_levels: course.course_levels,
          ratings: course.ratings,
          similarity_score: course.similarity_score,
          course_links: course.course_links,
          course_thumbnail_image: course.course_thumbnail_image,
          total_no_of_lectures: course.total_no_of_lectures,
          total_reviews: course.total_reviews,
        }),
      });

      if (response.ok) {
        setSavedCourses((prev) => {
          const newSet = new Set(prev);
          newSet.add(course.course_id);
          return newSet;
        });
      }
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  const handleRemoveSavedCourse = async (courseId: number) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `http://localhost:5328/api/save/${courseId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        setSavedCourses((prev) => {
          const newSet = new Set(prev);
          newSet.delete(courseId);
          return newSet;
        });
      }
    } catch (err) {
      console.error("Error removing saved course:", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-black dark:border-white mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navbar />

      {/* Hero Search Section */}
      <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-2">
            Find Your Perfect Course
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Discover personalized learning paths powered by AI
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for courses..."
                className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors shadow-sm hover:shadow-md"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

            {/* Model Selection */}
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Algorithm:
              </span>
              <div className="flex gap-3 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <input
                    type="radio"
                    value="tfidf"
                    checked={modelType === "tfidf"}
                    onChange={(e) => setModelType(e.target.value as any)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">TF-IDF</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <input
                    type="radio"
                    value="neural"
                    checked={modelType === "neural"}
                    onChange={(e) => setModelType(e.target.value as any)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Neural</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <input
                    type="radio"
                    value="both"
                    checked={modelType === "both"}
                    onChange={(e) => setModelType(e.target.value as any)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Both</span>
                </label>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        {Object.keys(results).length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {initialQuery
                ? "Loading results..."
                : "Enter a query to find courses"}
            </p>
          </div>
        )}

        {/* TF-IDF Results */}
        {results.tfidf && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-8">
              TF-IDF Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.tfidf.recommendations.map((course) => (
                <CourseCard
                  key={course.course_id}
                  course={course}
                  isSaved={savedCourses.has(course.course_id)}
                  onSave={() => handleSaveCourse(course)}
                  onRemove={() => handleRemoveSavedCourse(course.course_id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Neural Results */}
        {results.neural && (
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-8">
              Neural Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.neural.recommendations.map((course) => (
                <CourseCard
                  key={course.course_id}
                  course={course}
                  isSaved={savedCourses.has(course.course_id)}
                  onSave={() => handleSaveCourse(course)}
                  onRemove={() => handleRemoveSavedCourse(course.course_id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function CourseCard({
  course,
  isSaved,
  onSave,
  onRemove,
}: {
  course: Course;
  isSaved: boolean;
  onSave: () => void;
  onRemove: () => void;
}) {
  const FALLBACK_IMAGE = "https://placehold.co/600x400.png";
  const scorePercentage = Math.round((course.similarity_score || 0) * 100);
  const ratingCount = Math.round(course.ratings || 0);

  return (
    <div className="bg-white dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white hover:shadow-lg transition-all overflow-hidden h-full flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        <img
          src={course.course_thumbnail_image || FALLBACK_IMAGE}
          alt={course.course_title}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== FALLBACK_IMAGE) {
              target.src = FALLBACK_IMAGE;
            }
          }}
          className="w-full h-48 object-cover mb-4 rounded-lg"
        />
        <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-2 line-clamp-2">
          {course.course_title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-1">
          by {course.course_instructor_name || "Unknown"}
        </p>

        <div className="mb-6 space-y-3 flex-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Level
            </span>
            <span className="font-semibold text-black dark:text-white">
              {course.course_levels || "N/A"}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Rating
            </span>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} filled={i < ratingCount} />
              ))}
              <span className="ml-1 font-semibold text-black dark:text-white">
                {course.ratings?.toFixed(1)} ({parseInt(course.total_reviews?.toString() || "0").toLocaleString() || null})
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Lectures
            </span>
            <div className="flex items-center gap-2">
              <span className="ml-1 font-semibold text-black dark:text-white">
                {course.total_no_of_lectures || "N/A"}
              </span>
            </div>
          </div>

          {/* Relevance Score */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                Match Score
              </span>
              <span className="font-bold text-black dark:text-white text-base">
                {scorePercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-black dark:bg-white h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${scorePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
          <a
            href={course.course_links}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:shadow-md transition-all text-center text-sm"
          >
            View Course
          </a>
          <button
            onClick={isSaved ? onRemove : onSave}
            className={`px-4 py-2 font-medium rounded-lg transition-all text-sm flex items-center justify-center gap-2 border-2 ${
              isSaved
                ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-black dark:text-white hover:border-black dark:hover:border-white"
            }`}
          >
            <BookmarkIcon filled={isSaved} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RecommendPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-black dark:border-white mb-4" />
            <p className="text-gray-700 dark:text-gray-300">Loading recommendations...</p>
          </div>
        </div>
      }
    >
      <RecommendContent />
    </Suspense>
  );
}
