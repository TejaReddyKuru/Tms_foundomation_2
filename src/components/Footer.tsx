"use client";
import React from 'react';
import { FaFacebook, FaGithub, FaYoutube } from 'react-icons/fa';

export default function Footer({ data }: { data: any }) {
  return (
    <footer className="bg-[#0a0a0a] text-gray-400 py-16 border-t border-gray-800">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <a href="#home" className="flex items-center">
            {/* Logo Image */}
            <img 
              src="/assets/logo.jpg" 
              alt="TMS Foundation Logo" 
              className="h-16 w-auto object-contain bg-white/5 p-2 rounded-xl"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
                document.getElementById('footer-text-logo')!.style.display = 'block';
              }}
            />
            {/* Fallback Text Logo */}
            <div id="footer-text-logo" className="text-3xl font-black tracking-tighter hidden">
              <span className="accenture-gradient-text">TMS</span>
              <span className="text-white font-medium tracking-tight">Foundation</span>
            </div>
          </a>
          <p className="text-sm font-light tracking-wide max-w-xs text-center md:text-left">
            Empowering Youth, Developing India. Building sustainable solutions for rural communities.
          </p>
        </div>
        
        <div className="flex gap-6 text-2xl">
          {data?.facebook && <a href={data.facebook} target="_blank" rel="noreferrer" className="hover:text-[#A100FF] transition-colors"><FaFacebook /></a>}
          {data?.github && <a href={data.github} target="_blank" rel="noreferrer" className="hover:text-[#A100FF] transition-colors"><FaGithub /></a>}
          {data?.youtube && <a href={data.youtube} target="_blank" rel="noreferrer" className="hover:text-[#A100FF] transition-colors"><FaYoutube /></a>}
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-12 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light">
        <p>&copy; {new Date().getFullYear()} TMS Foundation. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/upcoming" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/upcoming" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
