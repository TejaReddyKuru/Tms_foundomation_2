"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Programs({ data }: { data: any[] }) {
  const programs = data?.length ? data : [
    { id: 1, title: 'Life Sciences', description: 'Innovations in biology and healthcare. We are building research hubs in villages to support local bio-diversity and health solutions.', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Agriculture', description: 'Modernizing farming and rural agriculture by introducing sustainable technologies and precision farming techniques to local farmers.', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'EViNetCo', description: 'Electric vehicles and clean energy network. Establishing charging stations and promoting green transport in remote areas.', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <section id="programs" className="py-32 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-1 accenture-gradient"></div>
            <span className="text-[#A100FF] font-bold tracking-widest uppercase text-sm">Focus Areas</span>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-black tracking-tight"
          >
            Our Programs & Wings
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program: any, idx: number) => {
            const imageUrl = program.image?.startsWith('http') ? program.image : (program.image?.startsWith('/') ? program.image : `http://localhost:8000${program.image}`);
            
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group bg-white flex flex-col hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden border border-gray-100"
              >
                {/* Accent Top Bar on Hover */}
                <div className="absolute top-0 left-0 w-full h-1 accenture-gradient transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20"></div>
                
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={imageUrl} 
                    alt={program.title}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-10 flex-1 flex flex-col bg-white z-10 relative">
                  <h3 className="text-2xl font-black mb-4 text-black group-hover:text-[#A100FF] transition-colors tracking-tight">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed font-light flex-1">
                    {program.description}
                  </p>
                  <a href="/upcoming" className="self-start text-black font-bold uppercase tracking-wider text-sm flex items-center gap-2 group-hover:text-[#A100FF] transition-colors">
                    Explore Details <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
