import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'taskflow_auth';
const USER_KEY = 'taskflow_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.email === email) {
        setUser(parsed);
        localStorage.setItem(STORAGE_KEY, 'true');
        return true;
      }
    }
    
    const mockUser: User = {
      id: crypto.randomUUID(),
      name: email.split('@')[0],
      email,
      avatar: null,
    };
    setUser(mockUser);
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    localStorage.setItem(STORAGE_KEY, 'true');
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    const mockUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      avatar: null,
    };
    setUser(mockUser);
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    localStorage.setItem(STORAGE_KEY, 'true');
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

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
