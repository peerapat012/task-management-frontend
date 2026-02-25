import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Task, FilterState } from '@/types';

interface TaskContextType {
  tasks: Task[];
  filters: FilterState;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  filteredTasks: Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const STORAGE_KEY = 'taskflow_tasks';

const defaultFilters: FilterState = {
  status: 'all',
  priority: 'all',
  categoryId: 'all',
  search: '',
};

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    } else {
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Welcome to TaskFlow',
          description: 'This is your first task. You can edit or delete it.',
          status: 'pending',
          priority: 'medium',
          categoryId: null,
          dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
          reminder: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Complete project setup',
          description: 'Set up the development environment',
          status: 'completed',
          priority: 'high',
          categoryId: null,
          dueDate: new Date(Date.now() - 86400000).toISOString(),
          reminder: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setTasks(mockTasks);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleTaskStatus = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'completed' ? 'pending' : 'completed',
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  }, []);

  const setFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filters.status !== 'all' && task.status !== filters.status) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.categoryId !== 'all' && task.categoryId !== filters.categoryId) return false;
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filters,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        setFilters,
        filteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
