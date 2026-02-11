import { DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable'; // Útil para reordenar arrays

import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';
import Droppable from '@/components/Droppable';
import Draggable from '@/components/Draggable';

export default function Test() {
  const [isDragging, setIsDragging] = useState(false);
  const [containers, setContainers] = useState({
    'area-1': ['item-1', 'item-2'], // Item 1 e 2 começam na Caixa 1
    'area-2': ['item-3'], // Item 3 começa na Caixa 2
  });

  // Mapeia a ID do item para o seu conteúdo (opcional, mas útil)
  const items = {
    'item-1': 'Arrastável A',
    'item-2': 'Arrastável B',
    'item-3': 'Arrastável C',
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    // Se soltamos o item fora de qualquer Droppable, não fazemos nada.
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // 1. Encontrar o contêiner de ORIGEM e DESTINO
    // Funções auxiliares para encontrar a chave (ID do contêiner) que contém um item
    const findContainer = (id) => {
      if (id in containers) {
        return id; // É a ID de um contêiner
      }
      // Procura em qual contêiner o item ativo está atualmente
      return Object.keys(containers).find((key) => containers[key].includes(id));
    };

    const activeContainerId = findContainer(activeId);
    const overContainerId = findContainer(overId);

    // Se as caixas de origem e destino forem diferentes:
    if (activeContainerId !== overContainerId) {
      // Atualiza o estado
      setContainers((prevContainers) => {
        // 1. Array de origem (sem o item ativo)
        const newActiveContainerItems = prevContainers[activeContainerId].filter(
          (id) => id !== activeId,
        );

        // 2. Array de destino (com o item ativo adicionado)
        // Se soltamos em um item, encontramos a posição desse item (index) e inserimos antes/depois.
        // Se soltamos na caixa (overId === overContainerId), simplesmente adicionamos ao fim.
        const isOverAContainer = overId === overContainerId;
        const destinationItems = prevContainers[overContainerId] || [];
        const newOverContainerItems = isOverAContainer
          ? [...destinationItems, activeId] // Adiciona ao fim da lista de destino
          : arrayMove(
              destinationItems,
              destinationItems.findIndex((id) => id === overId),
              destinationItems.length,
            ); // Lógica mais complexa para inserção no meio, simplificada aqui

        return {
          ...prevContainers,
          [activeContainerId]: newActiveContainerItems,
          [overContainerId]:
            newOverContainerItems.length > 0 ? newOverContainerItems : [activeId], // Garante que o item seja adicionado
        };
      });
    }
  }

  function handleDragStart(event: DragStartEvent) {
    console.log('Início do arrasto:', event.active.id);
    setIsDragging(true);
  }

  return (
    <div>
      <h1>Test Page</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex' }}>
          {/* Renderiza a primeira caixa */}
          <Droppable id="area-1">
            <h3>Caixa 1</h3>
            {/* Mapeia os IDs dos itens do estado para renderizar os Draggables */}
            {containers['area-1'].map((id) => (
              <Draggable key={id} id={id}>
                {items[id]}
              </Draggable>
            ))}
            {/* Se a caixa estiver vazia, exibe uma mensagem */}
            {containers['area-1'].length === 0 && <p>Solte um item aqui.</p>}
          </Droppable>

          {/* Renderiza a segunda caixa */}
          <Droppable id="area-2">
            <h3>Caixa 2</h3>
            {containers['area-2'].map((id) => (
              <Draggable key={id} id={id}>
                {items[id]}
              </Draggable>
            ))}
            {containers['area-2'].length === 0 && <p>Solte um item aqui.</p>}
          </Droppable>
        </div>
      </DndContext>
    </div>
  );
}
