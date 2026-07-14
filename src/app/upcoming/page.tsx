import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function UpcomingFeature() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-blue-200">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center justify-center pt-24 px-6 text-center">
        <div className="mb-8">
          <div className="w-16 h-2 accenture-gradient mx-auto mb-6"></div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">Coming Soon</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto font-light leading-relaxed mb-10">
            We're working hard to bring this feature to life. Check back later for updates!
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center accenture-gradient text-white font-bold py-4 px-10 shadow-lg hover:shadow-[0_0_20px_rgba(161,0,255,0.4)] transition-all duration-300 uppercase tracking-wider text-sm rounded-full"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <Footer data={{}} />
    </main>
  );
}
