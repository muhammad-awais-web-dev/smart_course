import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <main>
      <Navbar />
      <div className=" w-full items-center justify-center flex flex-col ">
        <div className="layout-content-container flex flex-col max-w-[1200px] w-full flex-1 px-4 md:px-10">
          <div className="flex items-center justify-between whitespace-nowrap py-4">
            <h1 className="text-4xl w-fit md:text-6xl font-black leading-tight tracking-[-0.033em] bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60">
              Dataset
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
