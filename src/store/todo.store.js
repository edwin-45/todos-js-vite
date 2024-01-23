import {Todo} from '../todos/models/todo.model'

const Filters = {
    All : 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos : [
        new Todo('tarea 1'),
        new Todo('tarea 2'),
    ], 
    filter: Filters.All,

}


const initStore = ()=>{
    console.log(state);
    console.log('store iniciado');
}

const getTodos = (filter = Filter.All)=>{
    switch(filter){
        case Filters.All:
            return [...state.todos];
        
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);

        default:
            throw new Error ('No es una valor valido');
    }
}

const loadStore = ()=> {
    throw new Error ('No implementado');
}

const addTodo = (description)=>{
    if(!description) throw new Error ( 'Descripcion vacio');
    state.todos.push(new Todo(description));
}

const toggleTodo = (todoId)=>{
    state.todos = state.todos.map(todo=>{
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    })    
}

const deleteTodo = (todoId)=>{
    state.todos = state.todos.filter(todo => todo.id !== todoId);
}

const deleteCompleted = ()=>{
    state.todos = state.todos.filter(todo => todo.done);
}

const setFilter = (newFilter = Filters.All)=>{
    state.filter = newFilter;
}

const getCurrentFilter = ()=>{
    return state.filter;
}


export default{
    initStore,
    getTodos,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
}


