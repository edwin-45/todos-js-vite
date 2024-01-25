import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo.store'
import { renderTodos, renderPending } from './use-cases';

const ElementIDs = {
    todoList : '.todo-list',
    newTodoInput: '#new-todo-input',
    CleaerCompleted: '.clear-completed',
    TodoFilters : '.filtro',
    PendingCountLabel: '#pending-count',
}

export const App = (elementId)=>{

    const displayTodos = ()=>{
        const todos = todoStore.getTodos(todoStore.getCurrentFilter()); 
        
        renderTodos(ElementIDs.todoList, todos);
        updatePendingCount();
       

    }

    const updatePendingCount = ()=>{
        renderPending(ElementIDs.PendingCountLabel);
    }


    (()=>{

        

        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencia HTML 
    const newDescripcionInput = document.querySelector(ElementIDs.newTodoInput);

    const todoListUL = document.querySelector(ElementIDs.todoList);

    const deleteCompletedTodo = document.querySelector(ElementIDs.CleaerCompleted);

    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);


    
    newDescripcionInput.addEventListener('keyup', (event)=>{
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';

    } );

    todoListUL.addEventListener('click',(event)=>{
        
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click',(event)=>{
        
        if(event.target.className === 'destroy'){
            const element = event.target.closest('[data-id]');
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos(); 
        }
        return;
       
        
    }); 

   deleteCompletedTodo.addEventListener('click',()=>{

    todoStore.deleteCompleted();
    displayTodos(); 

   }) 


   filtersLIs.forEach(element =>{
    console.log('hola mundo');
    element.addEventListener('click', (element)=> {
        filtersLIs.forEach(el => el.classList.remove('selected'));

        element.target.classList.add('selected');

        switch(element.target.text){
            case 'Todos':
                todoStore.setFilter(Filters.All)
                break;
            case 'Completados':
                todoStore.setFilter(Filters.Completed)
                break;
            case 'Pendientes':
                todoStore.setFilter(Filters.Pending)
                break;
        }
        displayTodos();
    }); 
});
}