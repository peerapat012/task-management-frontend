import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { authApi } from '@/lib/api';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = 'taskflow_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem(USER_KEY);
    
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const { user } = await authApi.login(email, password);
      setUser(user);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      showToast('Login successful', 'success');
      return true;
    } catch (error: any) {
      showToast(error.message || 'Login failed', 'error');
      return false;
    }
  }, [showToast]);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const { user } = await authApi.register(name, email, password);
      setUser(user);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      showToast('Registration successful', 'success');
      return true;
    } catch (error: any) {
      showToast(error.message || 'Registration failed', 'error');
      return false;
    }
  }, [showToast]);

  const logout = useCallback(() => {
    setUser(null);
    authApi.logout();
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('token');
    showToast('Logged out successfully', 'info');
  }, [showToast]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
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
