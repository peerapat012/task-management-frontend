export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type Priority = 'high' | 'medium' | 'low';
export type UserRole = 'user' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewTask {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
  userId: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export type FilterState = {
  status: 'all' | TaskStatus;
  priority: 'all' | Priority;
  categoryId: 'all' | string;
  search: string;
};
