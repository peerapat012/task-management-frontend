export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: Priority;
  categoryId: string | null;
  dueDate: string | null;
  reminder: string | null;
  createdAt: string;
  updatedAt: string;
}

export type Priority = 'high' | 'medium' | 'low';

export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export type FilterState = {
  status: 'all' | 'pending' | 'completed';
  priority: 'all' | 'high' | 'medium' | 'low';
  categoryId: 'all' | string;
  search: string;
};
