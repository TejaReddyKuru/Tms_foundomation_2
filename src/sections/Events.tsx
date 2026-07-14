"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FaTimes } from 'react-icons/fa';

export default function Events({ data }: { data: any[] }) {
  const { user, openModal } = useAuth();
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [registering, setRegistering] = useState<boolean>(false);
  const [message, setMessage] = useState<{id: number, text: string, type: 'success' | 'error'} | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    full_name: user?.name || '',
    email: user?.email || '',
    phone: '',
    university: '',
    department: '',
    year: '1',
    registration_number: '',
    gender: 'Other',
  });
  const [resume, setResume] = useState<File | null>(null);

  const events = data?.length ? data : [
    { id: 1, title: 'Annual Youth Summit', date: '2026-08-15', description: 'Join youth leaders across India for a day of inspiration, networking, and planning for rural development.', banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Rural Tech Expo', date: '2026-09-10', description: 'Showcasing innovations in rural technology, clean energy, and sustainable agriculture techniques.', banner: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800' }
  ];

  const handleRegisterClick = (e: React.MouseEvent, eventId: number) => {
    e.preventDefault();
    if (!user) {
      openModal();
      return;
    }
    setSelectedEventId(eventId);
    setFormData({ ...formData, full_name: user.name || '', email: user.email || '' });
    setMessage(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId || !resume) return;

    setRegistering(true);
    
    const form = new FormData();
    form.append('event', selectedEventId.toString());
    form.append('full_name', formData.full_name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('university', formData.university);
    form.append('department', formData.department);
    form.append('year', formData.year);
    form.append('registration_number', formData.registration_number);
    form.append('gender', formData.gender);
    form.append('resume', resume);

    try {
      const res = await api.post(`register-event`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage({ id: selectedEventId, text: 'Successfully registered!', type: 'success' });
      setSelectedEventId(null);
    } catch (err: any) {
      const errMsg = err.response?.data?.error || err.response?.data?.detail || 'Failed to register. Please check your inputs.';
      setMessage({ id: selectedEventId, text: errMsg, type: 'error' });
      // Keep modal open on error so they can fix it
    } finally {
      setRegistering(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <section id="events" className="py-32 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-1 accenture-gradient"></div>
            <span className="text-[#A100FF] font-bold tracking-widest uppercase text-sm">Join Us</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-black tracking-tight">Upcoming Events</h2>
        </div>

        <div className="space-y-8 max-w-5xl">
          {events.map((event: any, idx: number) => {
            const bannerUrl = event.banner_image?.startsWith('http') ? event.banner_image : (event.banner_image?.startsWith('/') ? event.banner_image : (event.banner_image ? `http://localhost:8000${event.banner_image}` : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'));
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white group border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row relative"
              >
                {/* Accent Left Bar */}
                <div className="absolute left-0 top-0 w-1 h-full accenture-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="w-full md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                  <img 
                    src={bannerUrl}
                    alt={event.title}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-10 w-full md:w-2/3 flex flex-col justify-center">
                  <div className="inline-block bg-[#0a0a0a] text-white font-bold py-2 px-4 text-sm mb-6 self-start tracking-widest uppercase">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 className="text-3xl font-black mb-4 text-black group-hover:text-[#A100FF] transition-colors tracking-tight">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed font-light text-lg">
                    {event.description}
                  </p>
                  
                  {message?.id === event.id && message ? (
                    <div className={`self-start font-bold uppercase tracking-wider text-sm py-2 px-4 rounded-full ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {message.text}
                    </div>
                  ) : (
                    <button 
                      onClick={(e) => handleRegisterClick(e, event.id)}
                      className="self-start text-black font-bold uppercase tracking-wider text-sm flex items-center gap-2 group-hover:text-[#A100FF] transition-colors"
                    >
                      Register Now <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedEventId && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedEventId(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-colors"
              >
                <FaTimes />
              </button>
              
              <div className="p-8">
                <h2 className="text-2xl font-black mb-2">Event Registration</h2>
                <p className="text-gray-500 mb-6 text-sm">Please provide your details below.</p>

                {message && message.id === selectedEventId && message.type === 'error' && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 border border-red-100">
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto px-1 pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" required value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl" />
                    <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="tel" placeholder="Phone" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl" />
                    <input type="text" placeholder="University" required value={formData.university} onChange={e => setFormData({...formData, university: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Department" required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl" />
                    <select required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl">
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="5">5th Year</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Registration Number" required value={formData.registration_number} onChange={e => setFormData({...formData, registration_number: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl" />
                    <select required value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border rounded-xl">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Resume (PDF, DOC, DOCX - Max 5MB)</label>
                    <input type="file" required accept=".pdf,.doc,.docx" onChange={e => setResume(e.target.files?.[0] || null)} className="w-full text-sm" />
                  </div>

                  <button type="submit" disabled={registering} className="w-full accenture-gradient text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all mt-4">
                    {registering ? 'Submitting...' : 'Confirm Registration'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
