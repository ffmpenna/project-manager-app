import { EllipsisVertical, MessageSquare } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import MembersList from './MemberList';
import { members } from '@/mocks/members.mock';
import { Button } from './ui/button';
import type { Task } from '@/types';
import { useDraggable } from '@dnd-kit/core';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 10,
        opacity: isDragging ? 0.7 : 1, // Feedback visual
      }
    : undefined;
  const priorityColor =
    task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  return (
    <div
      ref={setNodeRef} // 🎯 Registra como elemento arrastável
      style={style}
      {...listeners}
      {...attributes}
    >
      <Card className="flex flex-col shadow-none border-none hover:shadow-sm hover:cursor-grab active:cursor-grabbing transition-shadow">
        <CardHeader>
          <CardTitle>
            <div className="justify-between mb-2 flex items-center">
              <Badge className={priorityColor}>{task.priority}</Badge>

              <CardAction>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="hover:cursor-pointer hover:bg-accent rounded-sm py-1">
                      <EllipsisVertical size="20" />
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Leave</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardAction>
            </div>
            <p>{task.title}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{task.description}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <MembersList members={members} />
          <Button onPointerDown={(e) => e.stopPropagation()} variant="ghost" size="lg">
            <div className="flex text-gray-500 text-base items-center font-semibold gap-1">
              <MessageSquare /> 10
            </div>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
