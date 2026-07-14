"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What is TMS?",
    answer: "Tarunavadaanenasaha Muktbharatonnayana Samstha (TMS) is a Section 8 non-profit organization dedicated to empowering youth and rural India through education, research, innovation and community development."
  },
  {
    question: "What is IndiaYouth?",
    answer: "IndiaYouth is another name used by TMS. It provides a collaborative platform where people from anywhere in the world can contribute towards national development."
  },
  {
    question: "Why TMS?",
    answer: "TMS gives flexibility to work remotely on projects that benefit society while collaborating with like-minded people."
  },
  {
    question: "What is .info?",
    answer: "The .info extension reminds members that the mission is spreading useful information to villages and rural communities."
  },
  {
    question: "What is PURA?",
    answer: "PURA means Provision of Urban Amenities in Rural Areas, a vision introduced by Dr. A.P.J. Abdul Kalam."
  },
  {
    question: "How do you reach villages?",
    answer: "Using internet connectivity and local volunteers who act as bridges between villages and the rest of the world."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-1 accenture-gradient"></div>
            <span className="text-[#A100FF] font-bold tracking-widest uppercase text-sm">Knowledge Base</span>
            <div className="w-12 h-1 accenture-gradient"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight">Questions & Answers</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-none overflow-hidden transition-all duration-300 hover:border-[#A100FF]"
            >
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center bg-gray-50 focus:outline-none"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-bold text-lg text-black tracking-tight">{faq.question}</span>
                <span className={`text-2xl text-[#A100FF] transform transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white"
                  >
                    <div className="px-8 py-6 border-t border-gray-100 text-gray-600 font-light leading-relaxed text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
