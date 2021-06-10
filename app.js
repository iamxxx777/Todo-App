// Variables
const Input = document.querySelector('.input');
const Form = document.querySelector('.create');
const Clear = document.querySelector('.clear')
const Edit = document.getElementById('edit');
const Delete = document.querySelectorAll('.delete');
const Lists = document.querySelector('.lists');
const TodoList = document.querySelectorAll('.list');
const EditForm = document.querySelector('.form-edit');
const EditInput = document.querySelector('.edit-input');

var todos = [];

var flashes = [];

function createTodo(todo) {
    todos.push(todo);
}

function clearTodos() {
    while (Lists.hasChildNodes()) {
        Lists.removeChild(Lists.firstChild);
    }
}

function clearTodo(index) {
    if (Lists.hasChildNodes()) {
        Lists.removeChild(Lists.childNodes[index]);
    }
}

function addTodo() {
   
    todos.forEach((todo) => {
        var list = document.createElement('li');
        list.setAttribute('class', 'list');
        list.innerHTML = `
            <input class="list-item" type="text" value="${todo}">
            <div class="buttons">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>
            </div>
        `;
        document.getElementById('lists').appendChild(list);
    });

    flashes.push('Todo added successfully');

}


Form.addEventListener('submit', (e) => {
    e.preventDefault();
    var todo = Input.value;

    createTodo(todo);
    clearTodos();
    addTodo();
    flashTodo();
    localStorage.setItem('todos', JSON.stringify(todos));

    Input.value = '';
  
});

Clear.addEventListener('click', () => {
    flashes.push('List cleared succesfully');
    todos = [];
    clearTodos();
    flashTodo();
    localStorage.setItem('todos', "");
});

// Get the stored todolist onLoad
window.addEventListener('load', () => {
    var storage = localStorage.getItem('todos');

    if (storage) {
        todos = JSON.parse(storage);
        clearTodos();
        addTodo();
    }

});


Lists.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')) {
        var li = e.target.parentElement.parentElement;
        var todoD = li.childNodes[1].value;
       
        var element = (element) => element == todoD;
        var index = todos.findIndex(element);
        clearTodo(index);

        todos = todos.filter(todo => todo !== todoD);

        localStorage.setItem('todos', JSON.stringify(todos));

    }

    //Perform the Edit function

    if (e.target.classList.contains('edit')) {
        Form.classList.add('hide');
        EditForm.classList.add('show');
        
        //Get the input element via the parentElement
        var li = e.target.parentElement.parentElement;
        li.classList.add('edit-mode');
        var todoD = li.childNodes[1].value;

        EditInput.value = todoD;        

        // Find its index in the todos array
        var element = (element) => element == todoD;
        var index = todos.findIndex(element);

        // Submit the edited todo
        EditForm.addEventListener('submit', (e) => {
            e.preventDefault();
        
            todos[index] = EditInput.value;
            localStorage.setItem('todos', JSON.stringify(todos));
        
            Form.classList.remove('hide');
            EditForm.classList.remove('show');
            li.classList.remove('edit-mode');
            location.reload();
        });
    }
});

// Flash Messages this would have been cool with node enabled
const Flash = document.querySelector('.flash');

function flashTodo() {
    var li = document.createElement('li');
    li.setAttribute('class', 'flash-msg');

    Flash.classList.add('flash-show');
    li.innerText = flashes[0];
    Flash.appendChild(li);

    setTimeout(() => {
        flashes = [];
        li.remove();
        Flash.classList.remove('flash-show');
    }, 3000);
}










