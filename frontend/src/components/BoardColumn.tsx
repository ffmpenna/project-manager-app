import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const columnStyles = {
  to_do: {
    color: 'blue',
    dotClass: 'bg-blue-500',
    barClass: 'bg-blue-500',
  },
  in_progress: {
    color: 'yellow',
    dotClass: 'bg-yellow-500',
    barClass: 'bg-yellow-500',
  },
  done: {
    color: 'green',
    dotClass: 'bg-green-500',
    barClass: 'bg-green-500',
  },
};

interface BoardColumnProps {
  id: 'to_do' | 'in_progress' | 'done';
  title?: string;
  children: React.ReactNode;
}

export function BoardColumn({ id, title, children }: BoardColumnProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const styles = columnStyles[id];

  const droppableStyle = {
    outline: isOver ? '2px dashed #a0aec0' : '',
    'outline-offset': isOver ? '4px' : '',
  };

  return (
    <div
      ref={setNodeRef}
      className={`
        relative p-4 rounded-l 
        bg-gray-100 dark:bg-neutral-900 
        flex flex-col gap-4 shadow-sm
        min-w-[280px] 
      `}
    >
      {styles.barClass && (
        <div
          id="color-bar"
          className={`absolute left-0 top-0 h-full w-1.5 rounded-l-xl ${styles.barClass}`}
        />
      )}

      <div className="flex items-center gap-2">
        {styles.dotClass && (
          <div id="dot" className={`w-2 h-2 rounded-full ${styles.dotClass}`} />
        )}

        {title && (
          <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            {title}
          </h2>
        )}
      </div>

      <div style={droppableStyle} className="flex flex-col rounded-xl h-full gap-3 ">
        {children}
      </div>
    </div>
  );
}
