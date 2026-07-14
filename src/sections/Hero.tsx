"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ data }: { data: any }) {
  const title = data?.title || "Empowering Youth for a Better Tomorrow";
  const subtitle = data?.subtitle || "Tarunavadaanenasaha Muktbharatonnayana Samstha (TMS)";
  const description = data?.description || "Join us in our mission to bring sustainable development, education, and innovation to rural India through community collaboration.";
  const buttonText = data?.button_text || "Explore Our Mission";

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#0a0a0a] overflow-hidden pt-24">
      {/* Accent Line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="absolute top-0 right-0 w-1/3 h-2 accenture-gradient origin-right z-20"
      ></motion.div>
      
      {/* Background Graphic with continuous floating animation */}
      <div className="absolute top-1/2 right-0 opacity-20 pointer-events-none" style={{ transform: 'translateY(-50%)' }}>
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 5, -2, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="800" height="800" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#A100FF" d="M45,-78.1C58.3,-69.5,69.2,-56,76.5,-41.3C83.7,-26.7,87.4,-11,85.6,4.3C83.8,19.6,76.5,34.5,66.6,46.9C56.6,59.3,44,69.2,29.9,74.9C15.8,80.6,0.3,82.1,-14.8,79.5C-29.9,77,-44.6,70.5,-55.5,59.9C-66.5,49.2,-73.7,34.5,-77.7,19.1C-81.8,3.7,-82.7,-12.3,-77.4,-26.8C-72.1,-41.3,-60.7,-54.3,-47,-62.7C-33.3,-71,-16.7,-74.8,-0.2,-74.5C16.3,-74.2,32.6,-69.8,45,-78.1Z" transform="translate(100 100) scale(1.2)" />
          </svg>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-4"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-[2px] accenture-gradient"
            ></motion.div>
            <span className="text-[#A100FF] font-bold tracking-widest uppercase text-sm">{subtitle}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl"
          >
            {title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed font-light"
          >
            {description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center gap-6"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={data?.button_link || "#about"}
              className="inline-flex items-center justify-center accenture-gradient text-white font-bold py-4 px-10 shadow-lg hover:shadow-[0_0_30px_rgba(161,0,255,0.5)] transition-shadow uppercase tracking-wider text-sm rounded-full"
            >
              {buttonText}
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#programs"
              className="inline-flex items-center justify-center border-2 border-white/20 text-white font-bold py-4 px-10 hover:bg-white hover:text-black transition-colors uppercase tracking-wider text-sm rounded-full backdrop-blur-sm"
            >
              Our Programs
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
