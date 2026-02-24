import React from "react";

const Home_Features = () => {
  return (
    <div className="flex flex-1 justify-center py-20 px-4 md:px-10 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-black/5 dark:bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 z-10">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 leading-tight tracking-tight">
              Built on Data Science Principles
            </h2>
            <p className="text-[#637588] dark:text-[#9ca6ba] text-lg font-normal max-w-[720px]">
              Experience a recommendation engine powered by robust Python
              libraries and advanced statistical analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-8 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10">
              <div className="w-12 h-12 rounded-lg bg-gray-300/50 dark:bg-gray-700/50 flex items-center justify-center text-black dark:text-white">
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
                <h3 className="text-xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60">
                  TF-IDF Vectorization
                </h3>
                <p className="text-[#637588] dark:text-[#9ca6ba] text-base leading-relaxed">
                  We transform course text into numerical vectors, allowing our
                  model to understand the importance of specific keywords
                  (Uni-grams & Bi-grams) within the curriculum.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-8 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10">
              <div className="w-12 h-12 rounded-lg bg-gray-300/50 dark:bg-gray-700/50 flex items-center justify-center text-black dark:text-white">
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
                <h3 className="text-xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60">
                  Smart Data Cleaning
                </h3>
                <p className="text-[#637588] dark:text-[#9ca6ba] text-base leading-relaxed">
                  Raw data is meticulously processed using Pandas. We handle
                  missing values and normalize text to ensure high-quality input
                  for our models.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-[#3b4354] bg-card-light dark:bg-card-dark p-8 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10">
              <div className="w-12 h-12 rounded-lg bg-gray-300/50 dark:bg-gray-700/50 flex items-center justify-center text-black dark:text-white">
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
                <h3 className="text-xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60">
                  Cosine Similarity
                </h3>
                <p className="text-[#637588] dark:text-[#9ca6ba] text-base leading-relaxed">
                  Our engine calculates the angle between the vector of your
                  interests and course vectors to find mathematically precise
                  matches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_Features;
