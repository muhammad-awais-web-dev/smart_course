'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Dataset_Hero from "@/components/dataset/Dataset_Hero";

const page = () => {
  return (
    <>
      <Navbar />
      <Dataset_Hero />
      <Footer />
    </>
      
  );
};

export default page;
