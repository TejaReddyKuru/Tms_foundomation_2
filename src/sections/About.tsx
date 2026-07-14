"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function About({ data }: { data: any }) {
  const heading = data?.heading || "About TMS Foundation";
  const content = data?.content || "We are a Section 8 non-profit organization focused on integrated rural development, youth empowerment, and bridging the gap between urban amenities and rural areas through innovation and technology.";

  return (
    <section id="about" className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1 bg-black"></div>
              <span className="text-black font-bold tracking-widest uppercase text-sm">Who We Are</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-black leading-tight tracking-tight">
              {heading}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed font-light mb-10">
              {content}
            </p>
            
            <a href="#contact" className="inline-flex items-center text-[#A100FF] font-bold uppercase tracking-wider text-sm hover:gap-4 transition-all duration-300">
              Contact Us <span className="ml-2">→</span>
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex flex-col gap-10 justify-center"
          >
            <div className="group border-l-4 border-gray-200 hover:border-[#A100FF] pl-8 py-2 transition-colors duration-300">
              <h3 className="font-black text-black text-2xl mb-4 tracking-tight">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                Spreading useful information to villages and empowering rural communities through education, research, and innovation.
              </p>
            </div>
            
            <div className="group border-l-4 border-gray-200 hover:border-[#460073] pl-8 py-2 transition-colors duration-300">
              <h3 className="font-black text-black text-2xl mb-4 tracking-tight">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                Implementing PURA (Provision of Urban Amenities in Rural Areas) as envisioned by Dr. A.P.J. Abdul Kalam.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
