import React, { useEffect, useState } from 'react';
import HtmlElementSection from './htmlElementSection';
import DropZone from './canvas';
import LayoutPreview from './layoutPreview';

const App = () => {
  const [elements, setElements] = useState([]);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    // fetch('https://api.example.com/elements') // Replace with your API endpoint
    //   .then(response => response.json())
    //   .then(data => setApiData(data))
    //   .catch(error => console.error('Error fetching data:', error));
    setApiData([
        { "type": "h1", "content": "Heading" },
        { "type": "p", "content": "Paragraph" },
        { "type": "img","content": "Image", "src": "https://via.placeholder.com/150", "alt": "Placeholder Image" }
      ]
      )
  }, []);

  const handleDrop = (type) => {
    const newElement = { type, content: type === 'img' ? '' : 'Enter text here...' };
    setElements([...elements, newElement]);
  };

  const handleChange = (index, content) => {
    const updatedElements = elements.map((el, i) => 
      i === index ? { ...el, content } : el
    );
    setElements(updatedElements);
  };

  const renderElement = (element, index) => {
    const Tag = element.type;
    return (
      <div key={index} style={{ marginBottom: '10px' }}>
        {element.type === 'img' ? (
          <>
            <Tag src={element.content} style={{ maxWidth: '100%' }} />
            <input
              type="text"
              placeholder="Enter image URL"
              value={element.content}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </>
        ) : (
          <>
            <Tag>{element.content}</Tag>
            <input
              type="text"
              value={element.content}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px' }}>
          <h3>Elements</h3>
          {apiData.map((item, index) => (
            <HtmlElementSection key={index} type={item.type}>
              {/* {item.type === 'img' ? (
                <img src={item.src} alt={item.alt} style={{ maxWidth: '100%' }} />
              ) : (
                <item.type>{item.content}</item.type>
              )} */}
              {
                <h>{item.content}</h>
              }
            </HtmlElementSection>
          ))}
        </div>
        <div>
          <h3>Editor</h3>
          <DropZone onDrop={handleDrop}>
            {elements.map((element, index) => renderElement(element, index))}
          </DropZone>
        </div>
      <div style={{width: '45vw'}}>
      <h3>Preview</h3>
        <LayoutPreview elements={elements} />
      </div>
      </div>
    </div>
  );
};

export default App;
