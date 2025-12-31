'use client';

import Navbar from '@/components/Navbar';
import Home_Hero from '@/components/Home/Home_Hero';
import Home_Stats from '@/components/Home/Home_Stats';
import Home_Features from '@/components/Home/Home_Features';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
    <Navbar />
    <Home_Hero />
    <Home_Stats />
    <Home_Features />
    <Footer />
    </>
  )
}
