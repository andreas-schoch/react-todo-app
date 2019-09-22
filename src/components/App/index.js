import React from 'react';
import './index.css';
import TodoList from '../TodoList';
import AddTodoForm from '../../components/AddTodoForm';
import Filter from '../Filter';
import Footer from '../Footer';

const App = () => {   
    return (
        <>
            <div className='todo-list-wrapper'>
                <h1>React Todo App</h1>
                <AddTodoForm />
                <Filter />
                <TodoList />
            </div>
            <Footer />
        </>
    )
}

export default App;
