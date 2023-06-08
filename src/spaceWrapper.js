import { useRef, useState } from 'react';
import { spacesInit } from './data/initData.js';
import TodoWrapper from './todoWrapper.js';

export default function SpaceWrapper() {
    const [spaces, setSpaces] = useState(spacesInit);
    const [currentSpace, setCurrentSpace] = useState("Default");
    const [isCreatingNewSpace, setIsCreatingNewSpace] = useState(false);
    const newSpaceRef = useRef(null);
    return (
        <div className='main-wrapper'>
            <div className='spaces'>
                <div className='space-wrapper'>
                    {spaces.map(space => <div className='space'>
                        <li className='space-item' onClick={() => setCurrentSpace(space)}>{space}</li>
                        <button className='space-remove' onClick={() => setSpaces(spaces.filter(spaceListed => spaceListed != space))}>X</button>
                    </div>)}
                </div>
                <div className='add-space' key="new">
                    {!isCreatingNewSpace && <button onClick={() => setIsCreatingNewSpace(true)}>+</button>}
                    {isCreatingNewSpace && <div className='new-space'>
                        <input ref={newSpaceRef}></input>
                        <button onClick={() => {
                            setSpaces([...spaces, newSpaceRef.current.value]);
                            console.log(spaces);
                            setIsCreatingNewSpace(false);
                        }}>Tick</button>
                    </div>}
                </div>
            </div>
            <TodoWrapper currentSpace={currentSpace} />
        </div>
    );
}