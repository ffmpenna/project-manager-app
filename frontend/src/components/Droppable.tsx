import { useDroppable } from '@dnd-kit/core';

export default function Droppable({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
    backgroundColor: isOver ? 'lightblue' : 'lightgray',
    padding: 20,
    minHeight: 100,
    border: '2px dashed black',
    margin: 10,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
