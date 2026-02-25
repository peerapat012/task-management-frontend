import { Task, NewTask, User } from '@/types';

const API_BASE = '/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new ApiError(response.status, error.message);
  }

  return response.json();
}

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetchApi<{ success: boolean; data: User; message: string }>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return { user: response.data, token: '' };
  },

  register: async (name: string, email: string, password: string) => {
    const response = await fetchApi<{ success: boolean; data: User; message: string }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    return { user: response.data, token: '' };
  },

  logout: async () => {
    try {
      await fetchApi<{ success: boolean }>('/auth/signout', {
        method: 'POST',
      });
    } catch {
      // Ignore logout errors
    }
  },
};

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const taskApi = {
  getAll: async (params?: { search?: string; title?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.title) searchParams.set('title', params.title);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    
    const query = searchParams.toString();
    return fetchApi<PaginatedResponse<Task>>(`/tasks${query ? `?${query}` : ''}`);
  },

  getById: async (id: number) => {
    return fetchApi<Task>(`/tasks/${id}`);
  },

  create: async (task: NewTask) => {
    return fetchApi<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  },

  update: async (id: number, updates: Partial<NewTask>) => {
    return fetchApi<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  delete: async (id: number) => {
    return fetchApi<{ message: string }>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};
