import { useState } from 'react';
import { BoardColumn } from './BoardColumn';
import TaskCard from './TaskCard';
import { projects } from '@/mocks/projects.mock';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import type { TaskStatus } from '@/types';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

const columnDefs: {
  id: 'to_do' | 'in_progress' | 'done';
  title: string;
  color: string;
}[] = [
  { id: 'to_do', title: 'To Do', color: 'blue' },
  { id: 'in_progress', title: 'In Progress', color: 'yellow' },
  { id: 'done', title: 'Done', color: 'green' },
];

export default function TaskBoard() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // O arrasto só começa após mover 5px
      },
    }),
  );
  const [tasks, setTasks] = useState(
    projects[0].tasks.map((t) => ({ ...t, id: String(t.id), status: t.status })),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const destinationStatus = over.id; // A ID do Droppable (BoardColumn) é o novo status

    // 1. Verifica se o destino é uma coluna válida
    if (columnDefs.some((col) => col.id === destinationStatus)) {
      // 2. Atualiza o array de tarefas, mudando o status da tarefa arrastada
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, status: destinationStatus as TaskStatus }
            : task,
        ),
      );
    }
  }
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="py-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {columnDefs.map((column) => (
          <BoardColumn
            key={column.id}
            id={column.id} // ID do Droppable
            title={column.title}
          >
            {/* Filtra as tarefas para exibir APENAS as que têm o status da coluna atual */}
            {tasks
              .filter((task) => task.status === column.id)
              .map((task) => (
                <TaskCard key={task.id} task={task} /> // Passa o objeto completo da tarefa
              ))}
          </BoardColumn>
        ))}
      </div>
    </DndContext>
  );
}
