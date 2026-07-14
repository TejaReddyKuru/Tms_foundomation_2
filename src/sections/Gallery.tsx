"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Gallery({ data }: { data: any[] }) {
  const images = data?.length ? data : [
    { id: 1, image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800', title: 'Community Outreach' },
    { id: 2, image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', title: 'Education Camp' },
    { id: 3, image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', title: 'Medical Camp' },
    { id: 4, image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800', title: 'Leadership Workshop' },
  ];

  return (
    <section id="gallery" className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 accenture-gradient"></div>
              <span className="text-[#A100FF] font-bold tracking-widest uppercase text-sm">Visual Journey</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-black tracking-tight">Impact Gallery</h2>
          </div>
          <a href="/upcoming" className="inline-block text-black font-bold uppercase tracking-wider text-sm hover:text-[#A100FF] transition-colors">
            View All Media →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((item: any, idx: number) => {
            const imageUrl = item.image?.startsWith('http') ? item.image : (item.image?.startsWith('/') ? item.image : `http://localhost:8000${item.image}`);
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative aspect-[16/9] group cursor-pointer overflow-hidden bg-gray-100"
              >
                <img 
                  src={imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#A100FF]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white font-black text-3xl tracking-tight block text-center">{item.title}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
