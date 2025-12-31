'use client';

import Image from 'next/image'
import Link from 'next/link'
import HomeContent from './HomeContent';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
    <Navbar />
    <HomeContent />
    </>
  )
}
