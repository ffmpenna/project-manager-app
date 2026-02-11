import TaskBoard from '@/components/TaskBoard';
import type { Project } from '@/types';
import { projects as allProjects } from '../mocks/projects.mock';
import { useParams } from 'react-router';

export default function Project() {
  const { projectId } = useParams<{ projectId: string }>();
  const project: Project | undefined = allProjects.find(
    (p) => p.id === Number(projectId),
  );
  return (
    <div className="p-5">
      <div className="flex flex-col p-4 gap-3">
        <h1 className="font-bold text-4xl">{project?.title}</h1>
        <TaskBoard />
      </div>
    </div>
  );
}
