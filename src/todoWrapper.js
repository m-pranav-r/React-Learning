import { useState, useRef, useEffect } from 'react';
import { todosInit } from './data/initData.js';
import Todo from './todo.js';

function dragstart_handler() {

}

function dragend_handler() {

}

export default function TodoWrapper({ currentSpace }) {
    const [todos, setTodos] = useState(todosInit);
    const [isNewTodo, setNewTodo] = useState(false);
    const dataRef = useRef(null);
    const importanceRef = useRef(null);
    useEffect(() => {
        localStorage.setItem("todo_data", todos);
    }, [todos]);
    return (
        <div className='todo-wrapper'>
            {todos.filter(todo => todo.space == currentSpace).sort((a, b) => a.importance < b.importance).map(todo => {
                return (
                    <div className='todo-last'>
                        < Todo {...todo} />
                        <button className='todo-remove' onClick={() => setTodos(todos.filter(anyTodo => anyTodo != todo))}>Remove Task</button>
                    </div>
                );
            })}
            {
                !isNewTodo ? <button onClick={() => setNewTodo(true)}>Add new Todo</button> :
                    <div className='new-todo-item'>
                        <form>
                            <p className='new-todo-data'>Name: </p><input ref={dataRef} ></input>
                            <p className='new-todo-importance'>Importance: </p>
                            <select name="importance" defaultValue={"1"} ref={importanceRef} className='new-todo-stars-wrapper' >
                                <option value="1" className='new-todo-stars'>☆</option>
                                <option value="2" className='new-todo-stars'>☆☆</option>
                                <option value="3" className='new-todo-stars'>☆☆☆</option>
                            </select>
                            <button onClick={() => {
                                if (dataRef.current.value == '') {
                                    alert("Enter data field!");
                                }
                                else {
                                    setTodos([
                                        ...todos,
                                        {
                                            key: Math.random() * 1000,
                                            data: dataRef.current.value,
                                            importance: importanceRef.current.value,
                                            status: "0",
                                            space: currentSpace
                                        }
                                    ]);
                                }
                                setNewTodo(false);
                            }}>Add</button>
                        </form>
                    </div>
            }
        </div >
    );
}