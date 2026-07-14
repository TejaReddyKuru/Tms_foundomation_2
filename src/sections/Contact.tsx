"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { useForm, ValidationError } from '@formspree/react';

export default function Contact({ data }: { data: any }) {
  const address = data?.address || "Hyderabad, Telangana, India";
  const phone = data?.phone || "+91 9999999999";
  const email = data?.email || "info@tmsfoundation.org";
  
  const [state, handleSubmit] = useForm('mlgqeqzz');

  return (
    <section id="contact" className="relative flex flex-col lg:flex-row min-h-[800px]">
      {/* Left Side: Dark Theme */}
      <div className="w-full lg:w-1/2 bg-[#0a0a0a] text-white py-32 px-6 lg:px-24 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2 h-full accenture-gradient z-10 hidden lg:block"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative z-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 accenture-gradient"></div>
            <span className="text-[#A100FF] font-bold tracking-widest uppercase text-sm">Contact Us</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight">Get In Touch</h2>
          <p className="text-gray-400 mb-16 text-xl font-light leading-relaxed max-w-lg">
            Reach out to us to learn more about our programs, partnership opportunities, or to join our volunteer network.
          </p>
          
          <div className="flex flex-col gap-10">
            <div className="flex items-start gap-6 group">
              <div className="text-3xl text-[#A100FF] mt-1 group-hover:scale-110 transition-transform">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="font-bold text-white tracking-widest uppercase text-sm mb-2">Location</h4>
                <p className="text-gray-400 font-light text-lg">{address}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 group">
              <div className="text-3xl text-[#A100FF] mt-1 group-hover:scale-110 transition-transform">
                <FaPhone />
              </div>
              <div>
                <h4 className="font-bold text-white tracking-widest uppercase text-sm mb-2">Phone</h4>
                <p className="text-gray-400 font-light text-lg">{phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 group">
              <div className="text-3xl text-[#A100FF] mt-1 group-hover:scale-110 transition-transform">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="font-bold text-white tracking-widest uppercase text-sm mb-2">Email</h4>
                <p className="text-gray-400 font-light text-lg">{email}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Right Side: Light Theme */}
      <div className="w-full lg:w-1/2 bg-white py-32 px-6 lg:px-24 flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-black mb-10 text-black tracking-tight">Send a Message</h3>
          {state.succeeded ? (
            <div className="bg-[#F8F9FA] p-8 border border-gray-100 flex flex-col items-center justify-center text-center">
              <FaCheckCircle className="text-5xl text-[#A100FF] mb-6" />
              <h4 className="text-2xl font-bold text-black mb-4 tracking-tight">Thanks for reaching out!</h4>
              <p className="text-gray-600">We've received your message and will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div>
                <label className="block text-black font-bold uppercase tracking-widest text-xs mb-3">Your Name</label>
                <input type="text" name="name" className="w-full px-0 py-4 bg-transparent border-b-2 border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-[#A100FF] transition-colors rounded-none" placeholder="John Doe" required />
                <div className="text-red-500 text-xs mt-2 font-bold tracking-widest uppercase">
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>
              </div>
              <div>
                <label className="block text-black font-bold uppercase tracking-widest text-xs mb-3">Your Email</label>
                <input type="email" name="email" className="w-full px-0 py-4 bg-transparent border-b-2 border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-[#A100FF] transition-colors rounded-none" placeholder="john@example.com" required />
                <div className="text-red-500 text-xs mt-2 font-bold tracking-widest uppercase">
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>
              <div>
                <label className="block text-black font-bold uppercase tracking-widest text-xs mb-3">Message</label>
                <textarea name="message" rows={4} className="w-full px-0 py-4 bg-transparent border-b-2 border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-[#A100FF] transition-colors rounded-none resize-none" placeholder="How can we collaborate?" required></textarea>
                <div className="text-red-500 text-xs mt-2 font-bold tracking-widest uppercase">
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
              </div>
              <button type="submit" disabled={state.submitting} className="self-start mt-4 accenture-gradient text-white font-bold py-5 px-12 uppercase tracking-widest text-sm hover:shadow-[0_10px_30px_rgba(161,0,255,0.3)] transition-all duration-300 disabled:opacity-50">
                {state.submitting ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
