export const createTodoHtml = (todo)=>{
    
    if(!todo) throw new Error ('Todo requerido');
    const html = `<h1>hola</h1>`;
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
}