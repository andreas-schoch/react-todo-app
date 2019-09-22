import React, {Component} from 'react'
import './index.css'
import { connect } from 'react-redux'


class AddTodoForm extends Component {
    state = { todoText: '' }

    onChangeHandler = (evt) => this.setState({ todoText: evt.target.value });

    todoTextValid = () => { return this.state.todoText.length > 3 }

    addTodo = (evt) => {
        evt.preventDefault();
        if (this.todoTextValid()) {
            const newTodo = { text: this.state.todoText, completed: false };
            this.props.dispatch( { type: 'ADD_TODO', payload: newTodo } );
            this.setState({ todoText: '' });
        }
    }

    render() {
        return (
            <form className='new-todo-form'>
                <input type='text' id='new-todo' aria-label='new-todo' placeholder='Enter a new Todo' value={ this.state.todoText } 
                    onChange={ this.onChangeHandler } className={ this.todoTextValid() ? 'valid' : 'invalid'} />

                <button onClick={ this.addTodo } className='btn btn-add'>Add</button>
            </form>
        )
    }
}

export default connect()(AddTodoForm);
