import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Task, FilterState, NewTask } from '@/types';
import { taskApi } from '@/lib/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface TaskContextType {
  tasks: Task[];
  filters: FilterState;
  isLoading: boolean;
  addTask: (task: Omit<NewTask, 'userId'>) => Promise<void>;
  updateTask: (id: number, updates: Partial<NewTask>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTaskStatus: (id: number) => Promise<void>;
  setFilters: (filters: Partial<FilterState>) => void;
  filteredTasks: Task[];
  refetch: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const defaultFilters: FilterState = {
  status: 'all',
  priority: 'all',
  categoryId: 'all',
  search: '',
};

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const response = await taskApi.getAll({ limit: 100 });
      setTasks(response.data);
    } catch (error: any) {
      showToast(error.message || 'Failed to fetch tasks', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [user, showToast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (task: Omit<NewTask, 'userId'>) => {
    if (!user) return;
    
    try {
      const newTask = await taskApi.create({ ...task, userId: user.id });
      setTasks((prev) => [...prev, newTask]);
      showToast('Task created successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to create task', 'error');
      throw error;
    }
  }, [user, showToast]);

  const updateTask = useCallback(async (id: number, updates: Partial<NewTask>) => {
    try {
      const updatedTask = await taskApi.update(id, updates);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      showToast('Task updated successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to update task', 'error');
      throw error;
    }
  }, [showToast]);

  const deleteTask = useCallback(async (id: number) => {
    try {
      await taskApi.delete(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      showToast('Task deleted successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to delete task', 'error');
      throw error;
    }
  }, [showToast]);

  const toggleTaskStatus = useCallback(async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const updatedTask = await taskApi.update(id, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updatedTask : t))
      );
    } catch (error: any) {
      showToast(error.message || 'Failed to update task status', 'error');
      throw error;
    }
  }, [tasks, showToast]);

  const setFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filters.status !== 'all' && task.status !== filters.status) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filters,
        isLoading,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        setFilters,
        filteredTasks,
        refetch: fetchTasks,
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
