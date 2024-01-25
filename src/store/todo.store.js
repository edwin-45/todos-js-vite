import {Todo} from '../todos/models/todo.model'

export const Filters = {
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
    loadStore();
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
   if(!localStorage.getItem('state')) return;
   const {todos=[], filter = Filters.All} = JSON.parse(localStorage.getItem('state'))
   state.todos  = todos;
   state.filter = filter;
}


const saveStateToLocalStore = ()=>{
    
    localStorage.setItem('state',JSON.stringify(state));
}

const addTodo = (description)=>{
    if(!description) throw new Error ( 'Descripcion vacio');
    state.todos.push(new Todo(description));
    saveStateToLocalStore();
}

const toggleTodo = (todoId)=>{
    state.todos = state.todos.map(todo=>{
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    })    
    saveStateToLocalStore();
}

const deleteTodo = (todoId)=>{
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStore();
}

const deleteCompleted = ()=>{
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStore();
}

const setFilter = (newFilter = Filters.All)=>{
    state.filter = newFilter;
    saveStateToLocalStore();
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


