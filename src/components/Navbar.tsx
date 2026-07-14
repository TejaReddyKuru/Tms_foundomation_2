"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, openModal, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed z-50 transition-all duration-300 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl top-6 rounded-full border ${
        scrolled 
          ? 'bg-black/30 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border-white/20 py-3' 
          : 'bg-black/20 backdrop-blur-md py-4 border-white/10 shadow-lg'
      }`}
    >
      <div className="w-full px-6 lg:px-10 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-4">
          {/* Logo Image */}
          <img 
            src="/assets/logo.jpg" 
            alt="TMS Foundation Logo" 
            className="h-12 w-auto rounded-full object-contain drop-shadow-md"
            onError={(e) => {
              // Fallback to text if the image is missing
              (e.target as HTMLElement).style.display = 'none';
              document.getElementById('text-logo')!.style.display = 'block';
            }}
          />
          {/* Fallback Text Logo */}
          <div id="text-logo" className="text-3xl font-black tracking-tighter hidden drop-shadow-sm">
            <span className="accenture-gradient-text">TMS</span>
            <span className="text-gray-900 font-medium tracking-tight">Foundation</span>
          </div>
        </a>
        
        <div className="hidden md:flex gap-10 items-center">
          {['Home', 'About', 'Programs', 'Gallery', 'Events', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-bold text-white hover:text-[#A100FF] transition-all uppercase tracking-widest hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            >
              {item}
            </a>
          ))}
          {user ? (
            <div className="flex items-center gap-4 border-l border-white/20 pl-4 ml-2">
              <span className="text-white/80 text-xs font-bold tracking-widest hidden lg:block uppercase">{user.name}</span>
              {user.name.toLowerCase() === 'admin' && (
                <a href="/admin/" className="text-xs font-bold text-[#A100FF] hover:text-white transition-all uppercase tracking-widest">Dashboard</a>
              )}
              <button onClick={logout} className="text-xs font-bold text-white hover:text-red-400 transition-all uppercase tracking-widest">Logout</button>
            </div>
          ) : (
            <button onClick={openModal} className="text-xs font-bold text-white hover:text-black transition-all uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full hover:bg-white border border-white/30 ml-2">Login</button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
