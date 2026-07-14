"use client";
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getHomeData } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Programs from '../sections/Programs';
import Gallery from '../sections/Gallery';
import Events from '../sections/Events';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';

const queryClient = new QueryClient();

function HomeContent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['homeData'],
    queryFn: getHomeData,
    retry: false
  });

  // Even if API fails, we show fallback UI from sections
  return (
    <main className="min-h-screen bg-white selection:bg-blue-200 relative overflow-hidden">
      {/* Translucent Watermark Background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/assets/logo.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '50vw',
          opacity: 0.05,
          mixBlendMode: 'multiply'
        }}
      />
      
      <div className="relative z-10">
        <Navbar />
        <Hero data={data?.hero} />
        <About data={data?.about} />
        <Programs data={data?.programs} />
        <Gallery data={data?.gallery} />
        <Events data={data?.events} />
        <FAQ />
        <Contact data={data?.contact} />
        <Footer data={data?.contact} />
        <Chatbot />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeContent />
    </QueryClientProvider>
  );
}
