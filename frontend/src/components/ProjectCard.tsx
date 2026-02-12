import EditProjectDialog from './EditProjectDialog';
import LeaveProjectDialog from './LeaveProjectDialog';
import { Card, CardFooter } from './ui/card';
import { useState } from 'react';
import { ProjectCardHeader } from './ProjectCardHeader';
import { ProjectCardProgress } from './ProjectCardProgress';
import type { Project } from '@/types';
import { ProjectCardMembers } from './ProjectCardMembers';

interface ProjectCardProps {
  project: Project;
}
const colorOptions = [
  '#E57373',
  '#F06292',
  '#BA68C8',
  '#9575CD',
  '#7986CB',
  '#64B5F6',
  '#4DD0E1',
  '#4DB6AC',
  '#81C784',
  '#AED581',
  '#DCE775',
  '#FFF176',
  '#FFD54F',
  '#FFB74D',
  '#FF8A65',
  '#A1887F',
  '#90A4AE',
  '#F48FB1',
  '#CE93D8',
  '#B0BEC5',
];

export default function ProjectCard({ project }: ProjectCardProps) {
  const [openLeave, setOpenLeave] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <Card className="h-full flex flex-col">
      <ProjectCardHeader
        project={project}
        onEdit={() => setOpenEdit(true)}
        onLeave={() => setOpenLeave(true)}
      />
      <ProjectCardProgress {...project} />
      <CardFooter>
        <ProjectCardMembers />
      </CardFooter>

      <EditProjectDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        initialData={{
          title: project.title,
          description: project.description,
          color: project.color,
        }}
        onSubmit={(data) => {
          console.log('Novo projeto:', data);
          project.title = data.title;
          project.description = data.description;
          project.color = data.color;
          setOpenEdit(false);
        }}
        colorOptions={colorOptions}
      />

      <LeaveProjectDialog
        open={openLeave}
        onOpenChange={setOpenLeave}
        onConfirm={() => {
          console.log('User left');
          setOpenLeave(false);
        }}
      />
    </Card>
  );
}
