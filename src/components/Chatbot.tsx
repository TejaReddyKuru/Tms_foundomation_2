"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('tms_chat_history');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([{ sender: 'bot', text: 'Hello! I am the TMS AI Assistant. How can I help you today?' }]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tms_chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('chat/', { message: input });
      setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I am having trouble connecting.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 sm:w-96 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden mb-4 border border-gray-100"
          >
            <div className="accenture-gradient p-5 flex justify-between items-center text-white">
              <div className="flex items-center gap-3 font-bold tracking-widest uppercase text-sm">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                  <FaRobot className="text-white" />
                </div>
                TMS Assistant
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full">
                <FaTimes />
              </button>
            </div>
            
            <div className="h-96 overflow-y-auto p-5 flex flex-col gap-4 bg-[#F8F9FA] scrollbar-thin scrollbar-thumb-gray-200">
              {messages.map((msg, i) => (
                <div key={i} className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-[#A100FF] text-white self-end rounded-2xl rounded-br-sm shadow-md' 
                    : 'bg-white text-gray-800 border border-gray-100 self-start shadow-sm rounded-2xl rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="bg-white border border-gray-100 text-gray-800 self-start p-4 flex gap-2 shadow-sm rounded-2xl rounded-bl-sm">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-100 flex gap-3 items-center shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about TMS..."
                className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#A100FF] focus:bg-white rounded-full transition-all text-sm shadow-inner"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="accenture-gradient text-white w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <FaPaperPlane className="text-sm ml-[-2px]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="accenture-gradient p-5 rounded-full shadow-[0_10px_25px_rgba(161,0,255,0.4)] text-white hover:shadow-[0_15px_35px_rgba(161,0,255,0.6)] transition-all flex items-center justify-center float-right"
        >
          <FaRobot className="text-2xl" />
        </motion.button>
      )}
    </div>
  );
}
