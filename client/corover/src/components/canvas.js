// src/components/DropZone.js
import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, children }) => {
    console.log(children,'child')
  const [{ isOver }, drop] = useDrop({
    accept: 'element',
    drop: (item) => onDrop(item.type),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        height: '81vh',
        width: '45vw',
        border: '2px dashed gray',
        padding: '20px',
        backgroundColor: isOver ? 'lightgreen' : 'white',
      }}
    >
      {children}
    </div>
  );
};

export default DropZone;
