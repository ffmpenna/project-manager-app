import type { Project } from '@/types/index';
import { CardHeader, CardAction, CardTitle, CardDescription } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical, CircleSmall } from 'lucide-react';
import { Link } from 'react-router';

interface ProjectCardHeaderProps {
  project: Project;
  onEdit: () => void;
  onLeave: () => void;
}

export function ProjectCardHeader({ project, onEdit, onLeave }: ProjectCardHeaderProps) {
  return (
    <CardHeader>
      <CardAction>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="hover:cursor-pointer hover:bg-accent rounded-sm py-1">
              <EllipsisVertical size="20" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem onClick={onLeave} className="text-red-600">
              Leave
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardAction>

      <CardTitle className="flex items-center gap-1">
        <CircleSmall color={project.color} fill={project.color} size={15} />
        <Link className="hover:text-primary" to={`projects/${project.id}`}>
          {project.title}
        </Link>
      </CardTitle>

      <CardDescription>{project.description}</CardDescription>
    </CardHeader>
  );
}
