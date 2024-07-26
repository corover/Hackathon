// src/components/DraggableElement.js
import React from 'react';
import { useDrag } from 'react-dnd';

const HtmlElementSection = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'element',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      {children}
    </div>
  );
};

export default HtmlElementSection;
