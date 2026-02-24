"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-background-light dark:bg-background-dark min-h-screen">
        {/* Hero Section */}
        <section className="flex justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-32 bg-background-light dark:bg-background-dark">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60">
                  About SmartCourse
                </h1>
                <p className="text-base md:text-lg font-normal leading-relaxed text-[#637588] dark:text-[#9ca6ba] max-w-[600px]">
                  Personalized course recommendations powered by AI and machine learning. We combine advanced data science with intuitive design to help you find your perfect learning path.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Introduction Section */}
        <section className="flex flex-1 justify-center py-5 px-4 md:px-10">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-2 rounded-2xl p-8 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-[#3b4354]">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-4">
                  How It Works
                </h2>
                <p className="text-base md:text-lg font-normal leading-relaxed text-[#637588] dark:text-[#9ca6ba]">
                  SmartCourse uses advanced machine learning algorithms to analyze your learning preferences and recommend the most relevant courses from our curated dataset. We employ two complementary models to give you the best recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Models Section */}
        <section className="flex flex-1 justify-center py-5 px-4 md:px-10">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="flex flex-col gap-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 leading-tight tracking-tight">
                Recommendation Models
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* TF-IDF Model */}
                <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-8 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60">
                      TF-IDF (Term Frequency-Inverse Document Frequency)
                    </h3>
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-base leading-relaxed">
                      <strong>Focus:</strong> Keyword-based matching
                    </p>
                  </div>
                  <p className="text-[#637588] dark:text-[#9ca6ba] text-base leading-relaxed">
                    TF-IDF analyzes the frequency of keywords in your query and course descriptions to find exact matches and related topics. This model excels at finding courses when you have specific keywords in mind.
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 border border-gray-300 dark:border-gray-700">
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-sm">
                      <strong>Best for:</strong> Searching for specific technologies, tools, or exact course topics
                    </p>
                  </div>
                </div>

                {/* Neural Model */}
                <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-8 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60">
                      Neural Network (BERT Embeddings)
                    </h3>
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-base leading-relaxed">
                      <strong>Focus:</strong> Semantic understanding
                    </p>
                  </div>
                  <p className="text-[#637588] dark:text-[#9ca6ba] text-base leading-relaxed">
                    Using the state-of-the-art all-MiniLM-L6-v2 sentence transformer model, this approach understands the meaning behind your words. It captures conceptual relationships and finds semantically similar courses even when exact keywords don't match.
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 border border-gray-300 dark:border-gray-700">
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-sm">
                      <strong>Best for:</strong> Natural language queries describing learning goals and career paths
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dataset Section */}
        <section className="flex flex-1 justify-center py-5 px-4 md:px-10">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="flex flex-col gap-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 leading-tight tracking-tight">
                Our Dataset
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stat 1 */}
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-[#3b4354] hover:border-black dark:hover:border-white transition-colors group">
                  <div className="flex justify-between items-start">
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-base font-medium">
                      Courses in Dataset
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-[#111318] dark:text-white text-3xl font-bold">
                      9,968
                    </p>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-[#3b4354] hover:border-black dark:hover:border-white transition-colors group">
                  <div className="flex justify-between items-start">
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-base font-medium">
                      Data Fields
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-[#111318] dark:text-white text-3xl font-bold">
                      13
                    </p>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-[#3b4354] hover:border-black dark:hover:border-white transition-colors group">
                  <div className="flex justify-between items-start">
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-base font-medium">
                      Data Source
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-[#111318] dark:text-white text-3xl font-bold">
                      Udemy
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-8">
                <h3 className="text-xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60">
                  Course Information Fields
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#111318] dark:text-white mb-4">
                      Basic Information
                    </h4>
                    <ul className="space-y-2 text-[#637588] dark:text-[#9ca6ba]">
                      <li>• Course ID</li>
                      <li>• Course Title</li>
                      <li>• Instructor Name</li>
                      <li>• Course Link</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111318] dark:text-white mb-4">
                      Details & Metadata
                    </h4>
                    <ul className="space-y-2 text-[#637588] dark:text-[#9ca6ba]">
                      <li>• Ratings / Reviews</li>
                      <li>• Course Level</li>
                      <li>• Duration (minutes)</li>
                      <li>• Skills Gained</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111318] dark:text-white mb-4">
                      Content Analysis
                    </h4>
                    <ul className="space-y-2 text-[#637588] dark:text-[#9ca6ba]">
                      <li>• Raw Course Text</li>
                      <li>• Cleaned Text (NLP processed)</li>
                      <li>• Thumbnail Image</li>
                      <li>• Number of Lectures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="flex flex-1 justify-center py-5 px-4 md:px-10">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="flex flex-col gap-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 leading-tight tracking-tight">
                Technology Stack
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-8">
                  <h3 className="text-xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60">
                    Frontend
                  </h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-900 dark:text-white font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-semibold text-[#111318] dark:text-white">
                          Next.js 16 + React 19
                        </p>
                        <p className="text-sm text-[#637588] dark:text-[#9ca6ba]">
                          Modern server and client components
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-900 dark:text-white font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-semibold text-[#111318] dark:text-white">
                          TypeScript
                        </p>
                        <p className="text-sm text-[#637588] dark:text-[#9ca6ba]">
                          Type-safe development
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-900 dark:text-white font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-semibold text-[#111318] dark:text-white">
                          TailwindCSS
                        </p>
                        <p className="text-sm text-[#637588] dark:text-[#9ca6ba]">
                          Responsive UI styling
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-8">
                  <h3 className="text-xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60">
                    Backend & ML
                  </h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-900 dark:text-white font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-semibold text-[#111318] dark:text-white">
                          Flask + SQLAlchemy
                        </p>
                        <p className="text-sm text-[#637588] dark:text-[#9ca6ba]">
                          RESTful API and database ORM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-900 dark:text-white font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-semibold text-[#111318] dark:text-white">
                          Scikit-learn
                        </p>
                        <p className="text-sm text-[#637588] dark:text-[#9ca6ba]">
                          TF-IDF vectorization and similarity
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-900 dark:text-white font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-semibold text-[#111318] dark:text-white">
                          Sentence-Transformers (BERT)
                        </p>
                        <p className="text-sm text-[#637588] dark:text-[#9ca6ba]">
                          Neural embeddings and semantic search
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="flex flex-1 justify-center py-5 px-4 md:px-10">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="flex flex-col gap-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 leading-tight tracking-tight">
                Key Features
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Feature 1 */}
                <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-6">
                  <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white text-xl">
                    🔐
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111318] dark:text-white mb-2">
                      Secure Authentication
                    </h4>
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-sm">
                      OAuth 2.0 integration with Google & GitHub, plus password-based auth
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-6">
                  <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white text-xl">
                    💾
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111318] dark:text-white mb-2">
                      Save & Bookmark
                    </h4>
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-sm">
                      Save your favorite recommendations and access them anytime
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-6">
                  <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white text-xl">
                    📊
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111318] dark:text-white mb-2">
                      Search History
                    </h4>
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-sm">
                      Track your previous searches and re-run them with a single click
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-6">
                  <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white text-xl">
                    🤖
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111318] dark:text-white mb-2">
                      Dual Model Comparison
                    </h4>
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-sm">
                      Compare keyword-based and semantic results side-by-side
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="flex flex-1 justify-center py-5 px-4 md:px-10">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-black dark:bg-white p-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 dark:from-[#111318] dark:to-[#111318]/70">
                Ready to Discover Your Perfect Course?
              </h2>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-300 dark:text-[#637588]">
                Start exploring personalized recommendations now
              </p>
              <Link
                href="/recommend"
                className="flex min-w-[160px] gap-4 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white dark:bg-black text-black dark:text-white text-base font-bold border-2 border-white dark:border-black hover:shadow-md transition-all duration-300 self-center"
              >
                <span className="truncate">Get Started</span>
                <svg height="25" width="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M17.92 11.62a1 1 0 0 0-.21-.33l-5-5a1 1 0 0 0-1.42 1.42l3.3 3.29H7a1 1 0 0 0 0 2h7.59l-3.3 3.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76Z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
