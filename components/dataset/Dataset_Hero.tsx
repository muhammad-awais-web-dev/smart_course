import React from "react";
import Link from "next/link";
import LottePlayer from "../LottePlayer";

const Fields: string[] = [
  "course_id",
  "course_title",
  "course_instructor_name",
  "skills_you_gain",
  "total_course_mins",
  "total_no_of_lectures",
  "ratings",
  "total_reviews",
  "course_levels",
  "course_links",
  "course_thumbnail_image",
  "raw_text",
  "clean_text",
];

const Dataset_Hero = () => {
  return (
    <section className="flex select-none justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-32 bg-background-light dark:bg-background-dark">
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
                <span>HIGH-DIMENSIONAL DATASET</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/100 dark:from-white dark:to-white/60">
                Curated Data for High-Precision NLP.
              </h1>
              <p className="text-base md:text-lg font-normal leading-relaxed text-[#637588] dark:text-[#9ca6ba] max-w-[600px] mx-auto lg:mx-0">
                Explore the structured dataset that powers our content filtering
                system. Containing over <strong>9,968</strong> records of rich
                educational metadata, this dataset includes clean course titles,
                tags, and lengthy descriptions ready for feature extraction and
                machine learning model training.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="dataset.csv"
                download={"Dataset.csv"}
                className="flex min-w-[160px] gap-4 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold bg-[rgba(37,106,244,0.5)] shadow-[0_0_20px_rgba(37,106,244,0.5)] hover:shadow-[0_0_30px_rgba(37,106,244,0.7)] hover:scale-105 transition-all duration-300"
              >
                <span className="truncate">
                  Download Dataset{" "}
                  <span className=" text-green-600 ">(CSV)</span>{" "}
                </span>
                <svg
                  height="25"
                  width="25"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.31 12.051c.381 0 .69.314.69.7v4.918c-.006.67-.127 1.2-.399 1.594c-.328.476-.908.692-1.747.737l-15.903-.002c-.646-.046-1.168-.302-1.507-.777c-.302-.423-.446-.95-.444-1.558V12.75c0-.386.309-.7.69-.7c.38 0 .688.314.688.7v4.913c0 .333.065.572.182.736c.081.114.224.184.44.201l15.817.001c.42-.023.627-.1.655-.14c.084-.123.146-.393.15-.8V12.75c0-.386.308-.7.689-.7ZM9.99 0c.38 0 .69.313.69.7l-.001 10.869l3.062-3.079a.682.682 0 0 1 .975.004a.707.707 0 0 1-.004.99l-4.356 4.38a.682.682 0 0 1-.973-.003l-4.296-4.38a.707.707 0 0 1 .002-.99a.682.682 0 0 1 .975.002L9.3 11.794V.699C9.3.313 9.61 0 9.99 0Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="dataset.json"
                download={"Dataset.csv"}
                className="flex min-w-[160px] gap-4 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold bg-[rgba(37,106,244,0.5)] shadow-[0_0_20px_rgba(37,106,244,0.5)] hover:shadow-[0_0_30px_rgba(37,106,244,0.7)] hover:scale-105 transition-all duration-300"
              >
                <span className="truncate">
                  Download Dataset{" "}
                  <span className=" text-orange-600 ">(Json)</span>
                </span>
                <svg
                  height="25"
                  width="25"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.31 12.051c.381 0 .69.314.69.7v4.918c-.006.67-.127 1.2-.399 1.594c-.328.476-.908.692-1.747.737l-15.903-.002c-.646-.046-1.168-.302-1.507-.777c-.302-.423-.446-.95-.444-1.558V12.75c0-.386.309-.7.69-.7c.38 0 .688.314.688.7v4.913c0 .333.065.572.182.736c.081.114.224.184.44.201l15.817.001c.42-.023.627-.1.655-.14c.084-.123.146-.393.15-.8V12.75c0-.386.308-.7.689-.7ZM9.99 0c.38 0 .69.313.69.7l-.001 10.869l3.062-3.079a.682.682 0 0 1 .975.004a.707.707 0 0 1-.004.99l-4.356 4.38a.682.682 0 0 1-.973-.003l-4.296-4.38a.707.707 0 0 1 .002-.99a.682.682 0 0 1 .975.002L9.3 11.794V.699C9.3.313 9.61 0 9.99 0Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="flex-1 w-full relative group perspective-1000">
            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-card-dark rounded-2xl overflow-hidden border border-[#3b4354]/50 shadow-2xl">
              {/* You can replace this Image with a screenshot of your Pandas DataFrame or Jupyter Notebook later */}
              <div
                className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center before:absolute before:inset-0 before:bg-black/20"
                data-alt="Abstract futuristic blue data network visualization"
              >
                <div className="flex flex-col items-center justify-center">
                  <span className=" text-7xl font-extrabold flex items-end leading-tight tracking-[-0.033em] bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/100 dark:from-white dark:to-white/60">
                    9,900
                    <span className=" text-5xl font-extrabold pb-3">+</span>
                  </span>
                  <span className=" text-5xl font-light flex items-end leading-tight tracking-[-0.033em] bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/100 dark:from-white dark:to-white/60">
                    Courses
                  </span>
                </div>
                <code className="relative select-text mt-8 p-4 bg-black/30 rounded-lg text-sm font-mono text-left text-white/90 w-[90%] max-w-[600px] shadow-lg border border-white/10">
                  <span className=" text-green-500 ">{"{"}</span>
                  <div className=" w-full h-fit pl-5">
                    <span className=" text-blue-300 ">FileSize:</span>
                    <span className=" text-amber-600 ">"5.79MB",</span>
                    <br />
                    <span className=" text-blue-300 ">ExportType:</span>
                    <span className=" text-amber-600 ">"CSV & Json",</span>
                    <br />
                    <span className=" text-blue-300 ">Fields:</span>
                    <br />
                    <span className=" text-green-500">{"["}</span>
                    <div className=" w-full  h-fit pl-5 flex flex-wrap gap-0">
                      {Fields.map((field, index) => (
                        <React.Fragment key={index}>
                          <span className=" text-amber-600">"{field}"</span>
                          {index < Fields.length - 1 && <span>,</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <span className=" text-green-500 ">{"]"}</span>
                  </div>
                  <span className=" text-green-500 ">{"}"}</span>
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dataset_Hero;
