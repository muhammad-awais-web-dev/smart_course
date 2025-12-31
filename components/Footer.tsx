import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
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
  );
};

export default Footer;
