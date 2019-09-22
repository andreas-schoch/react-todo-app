import React from 'react'
import './index.css'
import TodoItem from '../TodoItem'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'


const TodoList = ({ filters, todos }) => {
    return (
        <ul className={'todo-container'}>
            { todos.map( todo => <TodoItem todo={ todo } key={ todo.id } /> ) }
        </ul>
    )
};


TodoList.propTypes  = {
    todos: PropTypes.array.isRequired
}


const mapStateToProps = (state) => {
    const getFilteredTodos = () => {
        const  activeFilter = state.filters.find( filter => filter.active === true );
        if (activeFilter.name === 'all') { return state.todos; }
        if (activeFilter.name === 'pending') { return state.todos.filter( todo => !todo.completed ); }
        if (activeFilter.name === 'completed') { return state.todos.filter( todo => todo.completed ); }
     }
    return {
        todos: getFilteredTodos(),
        filters: state.filters,
    }
}

export default connect(mapStateToProps)(TodoList);
// export default React.memo(connect(mapStateToProps)(TodoList)); // memo can prevent unnecessary rerenders. Not necessary here.
