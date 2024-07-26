// src/components/LayoutPreview.js
import React from 'react';

const LayoutPreview = ({ elements }) => {
  const renderElement = (element, index) => {
    const Tag = element.type;
    console.log(elements);
    return (
      <div key={index} style={{ marginBottom: '10px' }}>
        {element.type === 'img' ? (
          <Tag src={element.content} alt="Image" style={{ maxWidth: '100%' }} />
        ) : (
          <Tag>{element.content}</Tag>
        )}
      </div>
    );
  };

  return (
    <div>
      {elements.map((element, index) => renderElement(element, index))}
    </div>
  );
};

export default LayoutPreview;
