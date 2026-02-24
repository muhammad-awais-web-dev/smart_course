import React from "react";

const Home_Stats = () => {
  return (
    <div className="flex flex-1 justify-center py-5 px-4 md:px-10">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stat 1 */}
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-[#3b4354] hover:border-black dark:hover:border-white transition-colors group">
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
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-[#3b4354] hover:border-black dark:hover:border-white transition-colors group">
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
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-[#3b4354] hover:border-black dark:hover:border-white transition-colors group">
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
  );
};

export default Home_Stats;
