import { useState, useReducer } from "react";

export default function Todo(initTodo) {
    const [todoData, dispatchTodoData] = useReducer(todoReducer, initTodo);
    const [isEditing, setIsEditing] = useState(false);
    function todoReducer(state, action) {
        switch (action.type) {
            case 'completed': {
                return {
                    ...state,
                    status: 1 - state.status
                };
            }
            case 'edited': {
                return {
                    ...state,
                    data: action.data,
                    importance: action.importance
                };
            }
        }
        throw Error('Unknown action: ' + action.type);
    };
    return (
        <div className="todo-item" draggable={false} key={todoData.key}>
            {!isEditing && <p className="todo-data">{todoData.data}</p>}
            {isEditing && <input className="todo-edit" value={todoData.data} onChange={
                (e) => dispatchTodoData({
                    type: 'edited',
                    data: e.target.value,
                    importance: 0
                })
            }></input>}
            <button onClick={
                () => setIsEditing(!isEditing)
            } className="todo-edit">{isEditing ? "Done" : "Edit"}</button>
            <p className="todo-status">{todoData.status == '0' ? "Incomplete" : "Complete"}</p>
            <p className="todo-importance">Importance: {"☆".repeat(todoData.importance)}</p>
            <button onClick={
                () => dispatchTodoData({
                    type: 'completed'
                })
            } className="todo-button">{todoData.status == '0' ? "Mark as Completed" : "Mark as Incomplete"}</button>
        </div>
    );
}