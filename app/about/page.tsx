"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <section className="bg-black dark:bg-white text-white dark:text-black border-b-2 border-gray-300 dark:border-gray-700 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-4">About Smart Course</h1>
            <p className="text-xl text-gray-100 dark:text-gray-900">
              Personalized course recommendations powered by AI and machine learning
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Introduction */}
          <section className="mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-300 dark:border-gray-700">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-6">
                How It Works
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Smart Course uses advanced machine learning algorithms to analyze your
                learning preferences and recommend the most relevant courses from our
                curated dataset. We employ two complementary models to give you the best
                recommendations.
              </p>
              <Link
                href="/recommend"
                className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg transition-colors hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </section>

          {/* Models Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-8">
              Recommendation Models
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* TF-IDF Model */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-4">
                  TF-IDF (Term Frequency-Inverse Document Frequency)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Focus:</strong> Keyword-based matching
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  TF-IDF analyzes the frequency of keywords in your query and course
                  descriptions to find exact matches and related topics. This model
                  excels at finding courses when you have specific keywords in mind.
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 border border-gray-300 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Best for:</strong> Searching for specific technologies, tools,
                    or exact course topics
                  </p>
                </div>
              </div>

              {/* Neural Model */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-4">
                  Neural Network (BERT Embeddings)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Focus:</strong> Semantic understanding
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Using the state-of-the-art all-MiniLM-L6-v2 sentence transformer model,
                  this approach understands the meaning behind your words. It captures
                  conceptual relationships and finds semantically similar courses even
                  when exact keywords don't match.
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 border border-gray-300 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Best for:</strong> Natural language queries describing learning
                    goals and career paths
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Dataset Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-8">
              Our Dataset
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border border-gray-300 dark:border-gray-700">
                <p className="text-4xl font-bold text-black dark:text-white mb-2">9,968</p>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  Courses
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border border-gray-300 dark:border-gray-700">
                <p className="text-4xl font-bold text-black dark:text-white mb-2">13</p>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  Data Fields
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border border-gray-300 dark:border-gray-700">
                <p className="text-4xl font-bold text-black dark:text-white mb-2">Udemy</p>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  Source
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-6">
                Course Information Fields
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Basic Information
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Course ID</li>
                    <li>Course Title</li>
                    <li>Instructor Name</li>
                    <li>Course Link</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Details & Metadata
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Ratings / Reviews</li>
                    <li>Course Level</li>
                    <li>Duration (minutes)</li>
                    <li>Skills Gained</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Content Analysis
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Raw Course Text</li>
                    <li>Cleaned Text (NLP processed)</li>
                    <li>Thumbnail Image</li>
                    <li>Number of Lectures</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-8">
              Technology Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-6">
                  Frontend
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-black dark:text-white text-xl font-bold">→</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Next.js 16 + React 19
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Modern server and client components
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-black dark:text-white text-xl font-bold">→</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        TypeScript
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Type-safe development
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-black dark:text-white text-xl font-bold">→</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        TailwindCSS
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Responsive UI styling
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-6">
                  Backend & ML
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-black dark:text-white text-xl font-bold">→</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Flask + SQLAlchemy
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        RESTful API and database ORM
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-black dark:text-white text-xl font-bold">→</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Scikit-learn
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        TF-IDF vectorization and similarity
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-black dark:text-white text-xl font-bold">→</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Sentence-Transformers (BERT)
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Neural embeddings and semantic search
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Features Highlight */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-8">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex gap-4">
                <span className="text-4xl">🔐</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Secure Authentication
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    OAuth 2.0 integration with Google & GitHub, plus password-based auth
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex gap-4">
                <span className="text-4xl">💾</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Save & Bookmark
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Save your favorite recommendations and access them anytime
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex gap-4">
                <span className="text-4xl text-black dark:text-white">→</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Search History
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Track your previous searches and re-run them with a single click
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex gap-4">
                <span className="text-4xl">🤝</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Dual Model Comparison
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Compare keyword-based and semantic results side-by-side
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-black dark:bg-white rounded-lg shadow-md p-8 text-white dark:text-black border-2 border-gray-300 dark:border-gray-700">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-4">Ready to Discover Your Perfect Course?</h2>
              <p className="text-xl mb-6 opacity-90">
                Start exploring personalized recommendations now
              </p>
              <Link
                href="/recommend"
                className="inline-block px-8 py-3 bg-white dark:bg-black text-black dark:text-white font-semibold rounded-lg hover:shadow-lg transition-all border-2 border-gray-300 dark:border-gray-700"
              >
                Get Started
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
