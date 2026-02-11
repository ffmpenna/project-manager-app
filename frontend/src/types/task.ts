export type TaskStatus = 'to_do' | 'in_progress' | 'done';

export interface Task {
  id: string | number;
  title: string;
  description?: string;
  priority?: string;
  status: TaskStatus;
  assignedTo?: {
    name: string;
    avatarUrl: string;
  };
}
