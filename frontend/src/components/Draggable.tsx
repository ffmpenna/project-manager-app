import { useDraggable } from '@dnd-kit/core';

export default function Draggable({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
        // Aplica a transformação de movimento (translação)
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef} // 1. Atribui a referência ao nó para o dnd-kit
      style={{
        ...style,
        padding: 10,
        border: '1px solid blue',
        cursor: 'grab',
        margin: 10,
      }}
      {...listeners} // 2. Adiciona os manipuladores de eventos de arrastar (mousedown, touchstart, etc.)
      {...attributes} // 3. Adiciona atributos ARIA e de acessibilidade
    >
      {children}
    </div>
  );
}
