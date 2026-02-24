import React from "react";
import dataesthead from "@/public/datasetHead";

const fields: { name: string; type: string; description: string }[] = [
  {
    name: "course_id",
    type: "string",
    description: "Unique identifier for each course",
  },
  {
    name: "course_title",
    type: "string",
    description: "Title of the course",
  },
  {
    name: "course_instructor_name",
    type: "string",
    description: "Name of the course instructor",
  },
  {
    name: "skills_you_gain",
    type: "string",
    description: "List of skills acquired from the course",
  },
  {
    name: "total_course_mins",
    type: "number",
    description: "Total duration of the course in minutes",
  },
  {
    name: "total_no_of_lectures",
    type: "number",
    description: "Total number of lectures in the course",
  },
  {
    name: "ratings",
    type: "number",
    description: "Average rating of the course",
  },
  {
    name: "total_reviews",
    type: "number",
    description: "Total number of reviews for the course",
  },
  {
    name: "course_levels",
    type: "string",
    description:
      "Difficulty level of the course (e.g., Beginner, Intermediate, Advanced)",
  },
  {
    name: "course_links",
    type: "string",
    description: "Links to the course materials or website",
  },
  {
    name: "course_thumbnail_image",
    type: "string",
    description: "URL of the course thumbnail image",
  },
  {
    name: "raw_text",
    type: "string",
    description: "Unprocessed text data from the course description",
  },
  {
    name: "clean_text",
    type: "string",
    description: "Processed and cleaned text data from the course description",
  },
];

const tableCellStyle =
  "px-6 py-4 border border-gray-300 dark:border-gray-600 text-sm text-center";

const Dataset_table = () => {
  return (
    <section className="flex select-none justify-center px-4 sm:px-6 lg:px-8 py-2 md:py-20 lg:py-4 bg-background-light dark:bg-background-dark">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
        <div className="flex flex-col gap-2 md:gap-8">
          <h2 className="text-4xl md:text-4xl font-black w-fit leading-tight tracking-[-0.033em] bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60">
            Dataset Details
          </h2>
          <p className="text-base md:text-lg font-normal leading-relaxed text-[#637588] dark:text-[#9ca6ba]">
            Below is a detailed overview of the fields included in our curated
            dataset, designed to facilitate high-precision NLP tasks and machine
            learning model training. Each field is described along with its data
            type to help you understand the structure and content of the
            dataset. This comprehensive dataset contains over{" "}
            <strong>9,968</strong> records of educational metadata.
          </p>
          <div className=" overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:border-gray-600 text-base md:text-lg font-normal leading-relaxed text-[#637588] dark:text-[#9ca6ba]">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-1/4 px-6 py-3 border border-gray-300 dark:border-gray-600"
                  >
                    Field Name
                  </th>
                  <th
                    scope="col"
                    className="w-1/4 px-6 py-3 border border-gray-300 dark:border-gray-600"
                  >
                    Data Type
                  </th>
                  <th
                    scope="col"
                    className="w-2/4 px-6 py-3 border border-gray-300 dark:border-gray-600"
                  >
                    Description
                  </th>
                </tr>
                {fields.map((field) => (
                  <tr key={field.name}>
                    <td className={tableCellStyle}>{field.name}</td>
                    <td className={tableCellStyle}>{field.type}</td>
                    <td className={tableCellStyle}>{field.description}</td>
                  </tr>
                ))}
              </thead>
            </table>
          </div>
          <p className="text-base md:text-lg text-center font-normal leading-relaxed text-[#637588] dark:text-[#9ca6ba]">
            Note: The dataset is available for download in CSV and JSON formats
            for ease of use in various data analysis and machine learning
            applications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Dataset_table;
