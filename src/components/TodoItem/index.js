import React, {useState, useEffect} from 'react'
import './index.css'
import { connect } from 'react-redux'


const TodoItem = ({ todo, dispatch }) => {
    const [todoInputText, setTodoInputText] = useState(todo.text);
    const [editMode, setEditMode] = useState(false);
    const [test, setTest] = useState(1); // used to trigger useEffect which then triggers rerender 

    // hacky way to "force" rerender on change with functional components (editMode activated, completed, save edit)
    useEffect(() => {
        // console.log("change");
    }, [editMode, test])

    const deleteTodo = evt => {
        dispatch({ type: 'DELETE_TODO', payload: todo });
    };

    const completeTodoHandler = evt => {
        todo.completed = !todo.completed;
        setTest(test+1); // without this it doesn't rerender
        dispatch({ type: 'EDIT_TODO', payload: todo });
    };

    const editTodoHandler = evt => {
        todo.text = todoInputText;
        dispatch({ type: 'EDIT_TODO', payload: todo });
        setEditMode(false);
    };

    const enterEditModeHandler = evt => {
        if (!todo.completed) { 
            setEditMode(!editMode);
            setTodoInputText(todo.text);
        }
    }

    const changeTextHandler = evt => setTodoInputText(evt.target.value);

    return (
        <li className={ 'todo-item ' + (todo.completed ? 'todo-item-done' : '')}>
            <div className='btn-container'>
                <button className={ 'btn btn-edit' } onClick={enterEditModeHandler}>&#9998;</button>
                <button className={ 'btn btn-delete' } onClick={ deleteTodo }>&#10006;</button>    
            </div>

            <div className='todo-content'>
                { editMode && !todo.completed
                    ? <textarea value={ todoInputText } className='todo-input' onChange={changeTextHandler}/>
                    :  <p title={todo.text}>{todo.text}</p>
                }
                
                { todo.completed ? <div className='todo-check-overlay'>&#10008;</div> : '' }
            </div>

            <div className='todo-done-container'>
                { editMode
                    ? <button className={ 'btn btn-save' } onClick={ editTodoHandler }>Save</button>
                    : <button className={ 'btn btn-done' } onClick={ completeTodoHandler }>{todo.completed ? 'Undo' : 'Done'}</button>
                }
            </div>
        </li>
    )
};


// not used, but React.memo could take a custom compare function as the second argument
// const comparePrevNext = (prevProps, nextProps) => {
//     return (
//         prevProps.todo.text === nextProps.todo.text && 
//         prevProps.todo.completed === nextProps.todo.completed
//     );
// }

export default connect()(TodoItem);
