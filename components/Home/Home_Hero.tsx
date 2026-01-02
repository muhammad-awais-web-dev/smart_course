import React from "react";
import Link from "next/link";
import LottePlayer from "../LottePlayer";

const Home_Hero = () => {
  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-32 bg-background-light dark:bg-background-dark">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
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
                <span>PERSONALIZED LEARNING PATHS</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60">
                Find Your Next Skill, Faster
              </h1>
              <h2 className="text-base md:text-lg font-normal leading-relaxed text-[#637588] dark:text-[#9ca6ba] max-w-[600px] mx-auto lg:mx-0">
                Overwhelmed by options? SmartCourse uses advanced machine
                learning to analyze thousands of courses and filter out the
                noise, delivering recommendations that actually fit your career
                goals.
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
              <Link
                href="/dataset"
                className="flex min-w-[160px] gap-4 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent border border-[#3b4354] hover:border-primary hover:text-primary text-[#111318] dark:text-white text-base font-bold transition-all duration-300"
              >
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
                    backgroundImage: "url('https://i.pravatar.cc/100?img=1')",
                  }}
                ></div>
                <div
                  className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-300 bg-cover"
                  style={{
                    backgroundImage: "url('https://i.pravatar.cc/100?img=2')",
                  }}
                ></div>
                <div
                  className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-300 bg-cover"
                  style={{
                    backgroundImage: "url('https://i.pravatar.cc/100?img=3')",
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
            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-card-dark rounded-2xl overflow-hidden border border-[#3b4354]/50 shadow-2xl">
              {/* You can replace this Image with a screenshot of your Pandas DataFrame or Jupyter Notebook later */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                data-alt="Abstract futuristic blue data network visualization"
              >
                <LottePlayer src="/MapAnimation.json" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>

              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-3">
                <div className="bg-background-dark/80 backdrop-blur-md p-4 rounded-xl border border-white/10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-2">
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
  );
};

export default Home_Hero;
