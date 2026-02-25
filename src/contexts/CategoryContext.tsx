import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Category } from '@/types';

interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'createdAt'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

const STORAGE_KEY = 'taskflow_categories';

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCategories(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const addCategory = useCallback((category: Omit<Category, 'id' | 'createdAt'>) => {
    const newCategory: Category = {
      ...category,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setCategories((prev) => [...prev, newCategory]);
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat))
    );
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
}
