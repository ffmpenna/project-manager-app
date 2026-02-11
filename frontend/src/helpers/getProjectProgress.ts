import type { Task } from '@/types';

export const getProjectProgress = (tasks: Task[]) => {
  let done = 0;
  let inProgress = 0;
  let todo = 0;

  for (const task of tasks) {
    switch (task.status) {
      case 'done':
        done++;
        break;
      case 'in_progress':
        inProgress++;
        break;
      case 'to_do':
        todo++;
        break;
    }
  }

  const total = done + inProgress + todo;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  return {
    done,
    inProgress,
    todo,
    total,
    progress,
  };
};
