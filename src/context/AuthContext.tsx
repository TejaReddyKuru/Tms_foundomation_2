"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id?: number;
  name: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string, user_data: User) => void;
  logout: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('tms_token');
    const savedUser = localStorage.getItem('tms_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (newToken: string, user_data: User) => {
    setToken(newToken);
    setUser(user_data);
    localStorage.setItem('tms_token', newToken);
    localStorage.setItem('tms_user', JSON.stringify(user_data));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('tms_token');
    localStorage.removeItem('tms_user');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isModalOpen, openModal, closeModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
