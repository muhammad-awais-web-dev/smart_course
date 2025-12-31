'use client';

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const HomeContent = () => {
  return (
    <>
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none mix-blend-screen"></div>

        <div className="layout-container flex h-full grow flex-col">
          {/* Hero Section */}
          <div className="flex flex-1 justify-center py-10 md:py-20 px-4 md:px-10">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
              <div className="@container">
                <div className="flex flex-col gap-10 md:gap-16 lg:flex-row items-center">
                  {/* Hero Text */}
                  <div className="flex flex-col gap-8 flex-1 text-center lg:text-left">
                    <div className="flex flex-col gap-4">
                      <div className="inline-flex hover:text-blue-500 hover:border-blue-500 transition-colors duration-300 items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                        <svg
                          height="25"
                          width="25"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="none">
                            <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                            <path
                              d="M14 6.24c.335 0 .588.141.777.342c.305.324.434.801.624 1.196a11.71 11.71 0 0 0 4.429 4.91l.434.257c.393.239.735.518.736 1.053c.001.732-.636.986-1.17 1.313a11.711 11.711 0 0 0-4.429 4.91c-.19.396-.32.873-.624 1.197c-.188.201-.442.342-.777.342s-.589-.141-.777-.342c-.176-.187-.292-.422-.395-.662l-.15-.36a4.365 4.365 0 0 0-.079-.174a11.71 11.71 0 0 0-4.429-4.91l-.321-.191c-.433-.26-.85-.556-.849-1.123c.002-.73.637-.982 1.17-1.309a11.71 11.71 0 0 0 4.429-4.91c.19-.396.32-.873.624-1.197c.188-.2.442-.342.777-.342Zm-7.253-.415c.149.183.238.39.34.601c.274.57.688 1.06 1.201 1.422l.198.13c.856.525.888 1.41.12 1.964l-.12.08a3.7 3.7 0 0 0-1.4 1.552l-.114.242c-.097.2-.21.391-.406.518c-.315.202-.817.202-1.132 0c-.265-.17-.39-.488-.52-.76a3.701 3.701 0 0 0-1.4-1.552c-.178-.11-.348-.213-.495-.367a1.081 1.081 0 0 1 .001-1.312c.15-.156.31-.252.495-.365a3.7 3.7 0 0 0 1.399-1.552c.104-.216.187-.414.34-.6a1.071 1.071 0 0 1 1.493 0ZM10 2a1 1 0 0 1 1 1a1 1 0 1 1 0 2a1 1 0 1 1-2 0a1 1 0 1 1 0-2a1 1 0 0 1 1-1Z"
                              fill="currentColor"
                            />
                          </g>
                        </svg>
                        <span>AI-Powered Recommendations</span>
                      </div>
                      <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60">
                        Intelligent Course Discovery via NLP
                      </h1>
                      <h2 className="text-base md:text-lg font-normal leading-relaxed text-[#637588] dark:text-[#9ca6ba] max-w-[600px] mx-auto lg:mx-0">
                        Stop searching, start learning. We utilize{" "}
                        <strong>TF-IDF vectorization</strong> and{" "}
                        <strong>N-Gram analysis</strong> to process thousands of
                        course descriptions and match them to your specific
                        learning goals.
                      </h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <button className="flex min-w-[160px] gap-4 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold bg-[rgba(37,106,244,0.5)] shadow-[0_0_20px_rgba(37,106,244,0.5)] hover:shadow-[0_0_30px_rgba(37,106,244,0.7)] hover:scale-105 transition-all duration-300">
                        <span className="truncate">Get Recommendation</span>
                        <svg
                          height="25"
                          width="25"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.92 11.62a1 1 0 0 0-.21-.33l-5-5a1 1 0 0 0-1.42 1.42l3.3 3.29H7a1 1 0 0 0 0 2h7.59l-3.3 3.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                      <Link href='/dataset' className="flex min-w-[160px] gap-4 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent border border-[#3b4354] hover:border-primary hover:text-primary text-[#111318] dark:text-white text-base font-bold transition-all duration-300">
                        <span className="truncate">View Dataset</span>
                        <svg
                          height="25"
                          width="25"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          >
                            <path d="M4 6a8 3 0 1 0 16 0A8 3 0 1 0 4 6" />
                            <path d="M4 6v6a8 3 0 0 0 16 0V6" />
                            <path d="M4 12v6a8 3 0 0 0 16 0v-6" />
                          </g>
                        </svg>
                      </Link>
                    </div>

                    {/* Social Proof / Activity */}
                    <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
                      <div className="flex -space-x-3">
                        <div
                          className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-300 bg-cover"
                          style={{
                            backgroundImage:
                              "url('https://i.pravatar.cc/100?img=1')",
                          }}
                        ></div>
                        <div
                          className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-300 bg-cover"
                          style={{
                            backgroundImage:
                              "url('https://i.pravatar.cc/100?img=2')",
                          }}
                        ></div>
                        <div
                          className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-300 bg-cover"
                          style={{
                            backgroundImage:
                              "url('https://i.pravatar.cc/100?img=3')",
                          }}
                        ></div>
                        <div className="w-10 h-10 bg-black rounded-full border-2 border-background-light dark:border-background-dark bg-primary text-white flex items-center justify-center text-xs font-bold">
                          +2k
                        </div>
                      </div>
                      <p className="text-sm text-[#637588] dark:text-[#9ca6ba]">
                        Students matched this week
                      </p>
                    </div>
                  </div>

                  {/* Hero Visual */}
                  <div className="flex-1 w-full relative group perspective-1000">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-card-dark rounded-2xl overflow-hidden border border-[#3b4354]/50 shadow-2xl">
                      {/* You can replace this Image with a screenshot of your Pandas DataFrame or Jupyter Notebook later */}
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        data-alt="Abstract futuristic blue data network visualization"
                      >
                        <Player 
                          autoplay
                          loop
                          src="/MapAnimation.json"
                        />
                        {/* <Image
                          src="/world.png" // Placeholder or map image
                          height={512}
                          width={512}
                          alt="Data Network"
                          className=" h-full w-full object-cover opacity-60"
                        /> */}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>

                      {/* Floating Card */}
                      <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-3">
                        <div className="bg-background-dark/80 backdrop-blur-md p-4 rounded-xl border border-white/10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/20 rounded-lg text-primary flex items-center justify-center">
                              <svg
                                height="25"
                                width="25"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="m14.72 8.79l-4.29 4.3l-1.65-1.65a1 1 0 1 0-1.41 1.41l2.35 2.36a1 1 0 0 0 .71.29a1 1 0 0 0 .7-.29l5-5a1 1 0 0 0 0-1.42a1 1 0 0 0-1.41 0ZM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                            <span className="text-sm font-bold text-white">
                              Model Training Complete
                            </span>
                          </div>
                          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[98%] bg-green-400 bg-primary rounded-full"></div>
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-gray-400">
                            <span>Processing Bi-Grams</span>
                            <span className="text-primary">TF-IDF: 0.98</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="flex flex-1 justify-center py-5 px-4 md:px-10">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stat 1 */}
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-[#3b4354] hover:border-primary/50 transition-colors group">
                  <div className="flex justify-between items-start">
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-base font-medium">
                      Data Points Cleaned
                    </p>
                    <svg
                      height="25"
                      width="25"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.364 5.138v12.02h17.272V5.138H1.364ZM.909 1.5h18.182c.502 0 .909.4.909.895v15.21a.902.902 0 0 1-.91.895H.91c-.503 0-.91-.4-.91-.895V2.395C0 1.9.407 1.5.91 1.5Zm5.227 1.759c0-.37.306-.671.682-.671c.377 0 .682.3.682.671v13.899c0 .37-.305.67-.682.67a.676.676 0 0 1-.682-.67V3.259Zm6.96-.64c.377 0 .682.3.682.67v4.995h4.91c.377 0 .683.301.683.672c0 .37-.306.671-.682.671l-4.911-.001v3.062h5.002c.377 0 .682.3.682.671c0 .37-.305.671-.682.671h-5.002v3.158a.676.676 0 0 1-.682.671a.676.676 0 0 1-.681-.67l-.001-3.159H1.001a.676.676 0 0 1-.682-.67c0-.371.305-.672.682-.672h11.413V9.626L.909 9.627a.676.676 0 0 1-.682-.671c0-.37.306-.671.682-.671l11.505-.001V3.289c0-.37.306-.67.682-.67Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-[#111318] dark:text-white text-3xl font-bold">
                      9.9k+
                    </p>
                    <p className="text-[#0bda5e] text-sm font-medium bg-[#0bda5e]/10 px-2 py-0.5 rounded">
                      Pandas
                    </p>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-[#3b4354] hover:border-primary/50 transition-colors group">
                  <div className="flex justify-between items-start">
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-base font-medium">
                      Vectors Generated
                    </p>
                    <svg
                      height="25"
                      width="25"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M5 6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
                        <path d="M9 9h6v6H9zm-6 1h2m-2 4h2m5-11v2m4-2v2m7 5h-2m2 4h-2m-5 7v-2m-4 2v-2" />
                      </g>
                    </svg>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-[#111318] dark:text-white text-3xl font-bold">
                      12k+
                    </p>
                    <p className="text-[#0bda5e] text-sm font-medium bg-[#0bda5e]/10 px-2 py-0.5 rounded">
                      Scikit-Learn
                    </p>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-[#3b4354] hover:border-primary/50 transition-colors group">
                  <div className="flex justify-between items-start">
                    <p className="text-[#637588] dark:text-[#9ca6ba] text-base font-medium">
                      Recommendation Accuracy
                    </p>
                    <svg
                      height="25"
                      width="25"
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M13.48 7.516a6.5 6.5 0 1 1-6.93-7" />
                        <path d="M9.79 8.09A3 3 0 1 1 5.9 4.21M7 7l2.5-2.5m2 .5l-2-.5l-.5-2l2-2l.5 2l2 .5z" />
                      </g>
                    </svg>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-[#111318] dark:text-white text-3xl font-bold">
                      92%
                    </p>
                    <p className="text-[#0bda5e] text-sm font-medium bg-[#0bda5e]/10 px-2 py-0.5 rounded">
                      Cosine Sim
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="flex flex-1 justify-center py-20 px-4 md:px-10 relative overflow-hidden">
            <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 z-10">
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-4 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-[#111318] dark:text-white">
                    Built on Data Science Principles
                  </h2>
                  <p className="text-[#637588] dark:text-[#9ca6ba] text-lg font-normal max-w-[720px]">
                    Experience a recommendation engine powered by robust Python
                    libraries and advanced statistical analysis.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Feature 1 */}
                  <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-8 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/10">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                      <svg
                        height="25"
                        width="25"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 19V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                          <path
                            d="M13.856 13.85a3.429 3.429 0 1 0-4.855-4.842a3.429 3.429 0 0 0 4.855 4.842Zm0 0L16 16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[#111318] dark:text-white text-xl font-bold leading-tight">
                        TF-IDF Vectorization
                      </h3>
                      <p className="text-[#637588] dark:text-[#9ca6ba] text-base leading-relaxed">
                        We transform course text into numerical vectors,
                        allowing our model to understand the importance of
                        specific keywords (Uni-grams & Bi-grams) within the
                        curriculum.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-8 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/10">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-500">
                      <svg
                        height="25"
                        width="25"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 2H5a3 3 0 0 0-3 3v1.17a3 3 0 0 0 .25 1.2v.06a2.81 2.81 0 0 0 .59.86L9 14.41V21a1 1 0 0 0 .47.85A1 1 0 0 0 10 22a1 1 0 0 0 .45-.11l4-2A1 1 0 0 0 15 19v-4.59l6.12-6.12a2.81 2.81 0 0 0 .59-.86v-.06a3 3 0 0 0 .29-1.2V5a3 3 0 0 0-3-3Zm-5.71 11.29A1 1 0 0 0 13 14v4.38l-2 1V14a1 1 0 0 0-.29-.71L5.41 8h13.18ZM20 6H4V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[#111318] dark:text-white text-xl font-bold leading-tight">
                        Smart Data Cleaning
                      </h3>
                      <p className="text-[#637588] dark:text-[#9ca6ba] text-base leading-relaxed">
                        Raw data is meticulously processed using Pandas. We
                        handle missing values and normalize text to ensure
                        high-quality input for our models.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-8 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/10">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                      <svg
                        height="25"
                        width="25"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M944 224c-44.192 0-79.999 35.824-79.999 80c0 9.072 1.84 17.632 4.607 25.76L673.6 497.68C659.92 486.784 642.848 480 624 480c-21.743 0-41.407 8.736-55.808 22.816l-152.752-76.48C412.465 384.848 378.241 352 336 352c-44.175 0-80 35.824-80 80c0 12.096 2.88 23.44 7.68 33.712L107.936 645.296C99.2 642.032 89.872 640 80 640c-44.176 0-80 35.824-80 80s35.824 80 80 80s80-35.824 80-80c0-10.64-2.176-20.767-5.952-30.048l158.272-181.92C319.856 510.368 327.696 512 336 512c23.28 0 44.047-10.112 58.671-26l149.408 74.912C544.608 604.656 580.127 640 624 640c44.193 0 80-35.824 80-80c0-1.424-.336-2.752-.416-4.16L911.68 377.072C921.584 381.456 932.463 384 944 384c44.193 0 80-35.808 80-80c0-44.176-35.807-80-79.999-80z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[#111318] dark:text-white text-xl font-bold leading-tight">
                        Cosine Similarity
                      </h3>
                      <p className="text-[#637588] dark:text-[#9ca6ba] text-base leading-relaxed">
                        Our engine calculates the angle between the vector of
                        your interests and course vectors to find mathematically
                        precise matches.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="flex flex-1 justify-center py-10 px-4 md:px-10 border-t border-gray-200 dark:border-[#282e39] bg-background-light dark:bg-background-dark mt-auto">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 text-center">
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Image
                    src="/WhiteRetinalSmartCourse.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                  />
                  <span className="text-xl font-bold text-[#111318] dark:text-white">
                    Smart Course
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-8">
                  <a
                    className="text-[#637588] dark:text-[#9ca6ba] hover:text-primary transition-colors text-sm font-medium"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                  <a
                    className="text-[#637588] dark:text-[#9ca6ba] hover:text-primary transition-colors text-sm font-medium"
                    href="#"
                  >
                    Terms of Service
                  </a>
                  <a
                    className="text-[#637588] dark:text-[#9ca6ba] hover:text-primary transition-colors text-sm font-medium"
                    href="#"
                  >
                    Documentation
                  </a>
                </div>
                <div className="flex justify-center gap-6">
                  <a
                    className="text-[#637588] dark:text-[#9ca6ba] hover:text-primary transition-colors hover:scale-110 transform duration-200"
                    href="https://github.com/muhammad-awais-web-dev/"
                  >
                    <svg
                      height="25"
                      width="25"
                      viewBox="0 0 432 416"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    className="text-[#637588] dark:text-[#9ca6ba] hover:text-primary transition-colors hover:scale-110 transform duration-200"
                    href="https://www.linkedin.com/in/muhammad-awais-web-dev/"
                  >
                    <svg
                      height="25"
                      width="25"
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.574 1.767a1.316 1.316 0 0 1-1.287 1.326A1.346 1.346 0 0 1 .99 1.767A1.326 1.326 0 0 1 2.287.5a1.316 1.316 0 0 1 1.287 1.267M1.129 5.449c0-.762.485-.643 1.158-.643c.673 0 1.148-.119 1.148.643v7.424c0 .772-.485.614-1.148.614c-.663 0-1.158.158-1.158-.614zm4.306.001c0-.426.158-.585.405-.634c.248-.05 1.099 0 1.396 0c.297 0 .416.485.406.851a2.485 2.485 0 0 1 2.217-.99a2.97 2.97 0 0 1 3.148 3.098v5.068c0 .772-.475.614-1.149.614c-.673 0-1.148.158-1.148-.614V8.884A1.425 1.425 0 0 0 9.206 7.34A1.435 1.435 0 0 0 7.74 8.914v3.959c0 .772-.485.614-1.158.614c-.673 0-1.148.158-1.148-.614V5.449Z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <a
                    className="text-[#637588] dark:text-[#9ca6ba] hover:text-primary transition-colors hover:scale-110 transform duration-200"
                    href="https://x.com/WebMorph_Studio"
                  >
                    <svg
                      height="25"
                      width="25"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
                <p className="text-[#637588] dark:text-[#9ca6ba] text-sm">
                  © 2025 Smart Course AI Project. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default HomeContent;
