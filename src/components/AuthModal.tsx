"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function AuthModal() {
  const { isModalOpen, closeModal, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post('auth/login', { email, password });
        login(res.data.access, res.data.user);
        closeModal();
        if (res.data.user.role === 'Admin') {
          window.location.href = 'http://localhost:8000/admin';
        }
      } else {
        await api.post('auth/register', { name, email, phone, password });
        // Automatically log them in after registration
        const res = await api.post('auth/login', { email, password });
        login(res.data.access, res.data.user);
        closeModal();
      }
    } catch (err: any) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.data?.email) {
        setError(`Email: ${err.response.data.email[0]}`);
      } else if (err.response?.data?.name) {
        setError(`Name: ${err.response.data.name[0]}`);
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative"
        >
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-colors"
          >
            <FaTimes />
          </button>

          <div className="p-8">
            <h2 className="text-3xl font-black mb-2 tracking-tight text-center">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 text-center mb-8">
              {isLogin ? 'Login to register for events.' : 'Join us to access exclusive features.'}
            </p>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#A100FF] focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#A100FF] focus:bg-white transition-colors"
                    />
                  </div>
                </>
              )}

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#A100FF] focus:bg-white transition-colors"
                />
              </div>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#A100FF] focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full accenture-gradient text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider text-sm mt-4"
              >
                {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-gray-500 hover:text-[#A100FF] text-sm transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
