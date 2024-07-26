import React from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

const DraggableItem: React.FC = () => {
  const handleStart = (e: DraggableEvent, data: DraggableData) => {
    console.log('Start:', e, data);
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    console.log('Dragging:', e, data);
  };

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    console.log('Stop:', e, data);
  };

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={undefined}
      grid={[1, 1]}
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div className="handle text-white p-2 cursor-pointer w-[100px] absolute">
        <img src="/sunglasses.png" alt="Sunglasses" draggable="false" />
      </div>
    </Draggable>
  );
};

export default DraggableItem;
