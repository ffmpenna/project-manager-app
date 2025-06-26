type Task = {
  id: number;
  title: string;
};

type Tasks = {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
};

export const getProjectProgress = (tasks: Tasks): number => {
  const done = tasks.done.length;
  const total = tasks.todo.length + tasks.inProgress.length + done;

  if (total === 0) return 0;

  const progress = (done / total) * 100;
  return Math.round(progress);
};
