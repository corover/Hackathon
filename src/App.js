import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [box1Items, setBox1Items] = useState([
        { id: 1, text: 'Paragraph',value:'p' },
        { id: 2, text: 'Image',value:'img'},
        { id: 3, text: 'Textarea',value:"Textarea" },
        { id: 4, text: 'text', value:"text"},
        { id: 5, text: 'h3',value:"h3" },
        { id: 6, text: 'h1',value:"h1" },
        { id: 7, text: 'label',value:"label" }
    ]);
    const [output,setOutput]=useState([])
    const [box2Items, setBox2Items] = useState([]);

    const handleDragStart = (e, item) => {
   
        e.dataTransfer
            .setData('text/plain', JSON.stringify(item));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetBox) => {
        e.preventDefault();
        const droppedItem = JSON.parse(
            e.dataTransfer
                .getData('text/plain')
        );

        if (targetBox === 'box1') {
            let isSameItemPresent = box1Items.some(
                item => item.id === droppedItem.id
                    && item.text === droppedItem.text
            );

            setBox1Items((prevItems) =>
                isSameItemPresent ?
                    [...prevItems] :
                    [...prevItems, droppedItem]
            );
            setBox2Items((prevItems) =>
                prevItems.filter(
                    (item) =>
                        item.id !== droppedItem.id
                )
            );
        } else if (targetBox === 'box2') {
            let isSameItemPresent = box2Items.some(
                item => item.id === droppedItem.id
                    && item.text === droppedItem.text
            );

            setBox2Items((prevItems) =>
             
                isSameItemPresent ?
                    [...prevItems] :
                    [...prevItems, droppedItem]
            );
            setBox1Items((prevItems) =>
                prevItems.filter(
                    (item) =>
                        item.id !== droppedItem.id
                )
            );
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = Array.from(formData.entries()).map(([key, value]) => ({
            id: key,
            value,
        }));
        const items = values.map((entry) => {
            const item = box2Items.find((i) => i.id === Number(entry.id));
            return { ...item, inputValue: entry.value };
        });


        setOutput([...output,...items])
        setBox2Items([])
        const submittedItems = items.map(item => ({
            id: item.id,
            text: item.text,
            value: item.value
        }));

        setBox1Items([...box1Items, ...submittedItems]);
    };
    const renderElement = (element) => {
        switch (element.value) {
            case "p":
                return <p key={element.id}>{element.inputValue}</p>;
            case "img":
                return <img key={element.id} src={element.inputValue} alt={element.text} />;
            case "h1":
                return <h1>{element.inputValue}</h1>;
            case "button":
                return <button key={element.id}>{element.inputValue}</button>;
            default:
                return <element.value >{element.inputValue}</element.value>;
        }
    };
    console.log(box1Items)
    console.log(output)

    return (
        <div className='mainDev'>
            <div className="container" >
                <div
                    className="box1"
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e, 'box1')}>
                    <h3>Tags</h3>
                    <ul>
                        {box1Items.map((item) => (
                            <li
                                key={item.id}
                                draggable
                                onDragStart={
                                    (e) =>
                                        handleDragStart(e, item)
                                }>
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    className="box2"
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e, 'box2')}  >

                    <h3>Editing</h3>
                    
                    <form onSubmit={handleSubmit}>
                    <ul>
                        {
                            box2Items.map((item) => (
                                <li
                                    key={item.id}
                                    draggable
                                    onDragStart={
                                        (e) =>
                                            handleDragStart(e, item)
                                    } >
                                    {item.text}
                                    <input type='text' name={item.id} ></input>
                                </li>
                            ))
                        }
                    </ul>
                    {box2Items.length > 0 && <button type="submit">Submit</button>}
                    </form>
                </div>
                <div
                    className="box3">
                      <h3>output page</h3>
                    {output && output.map(renderElement)}
                </div>
            </div>
        </div>
    );
};

export default App;
