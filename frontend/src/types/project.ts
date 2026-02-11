import type { Task } from './task';

export type Project = {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  color: string;
  status: string;
  tasks: Task[];
};

export interface ProjectCardProps {
  project: Project;
}
