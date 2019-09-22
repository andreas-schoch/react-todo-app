import { combineReducers, createStore } from 'redux'
import uuid from 'uuid'



// only used when no previous redux state found in local storage
const initial = {
    filters: [
        { name: 'all', active: true },
        { name: 'pending', active: false },
        { name: 'completed', active: false }
    ],
    todos: [
        { text: "default todo1", completed: false, id: uuid() }, // using a single hashmap with the id as key might be better
        { text: "default todo2", completed: false, id: uuid() },
        { text: "default todo3", completed: true, id: uuid() },
        { text: "default todo4", completed: false, id: uuid() }
    ]
}

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : initial;

const todoReducer = (state=persistedState.todos, action) => {
    // Note: payload is always a todo object, the id identifies it for existing ones
    // in case of adding a todo, a new id will be created here (if you pass one it will be overwritten)
    const newState = [...state];

    switch(action.type) {
        case 'ADD_TODO':
            action.payload.id = uuid();
            return state.concat(action.payload);

        case 'DELETE_TODO':
            console.log(action.payload);
            const index = newState.findIndex(todo => todo.id === action.payload.id );
            console.log(newState.splice(index, 1));
            return newState;

        case 'EDIT_TODO':
            const i = state.findIndex(todo => todo.id === action.payload.id);
            newState[i] = action.payload;
            return newState;
            
        default:
            return state;
    }
}

const filterReducer = (state=persistedState.filters, action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return action.payload;
        default:
                return state;
    }
}

const reducer = combineReducers({
    todos: todoReducer,
    filters: filterReducer
});


const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // connect to Redux Chrome Extension
); 


// save state in local storage on every state change (debouncing not necessary in this simple app)
store.subscribe(() => localStorage.setItem('reduxState', JSON.stringify(store.getState() )));


export default store;