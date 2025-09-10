export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export type TaskFilter = 'all' | 'pending' | 'completed';

export interface TaskFormData {
  title: string;
  description: string;
}