let todoList = {
    todos : [],
    
addToDo : function(todoText) {
    this.todos.push({
    todoText : todoText,
    completed : false
    })
    },
    
changeToDo : function(position,todoText) {
    this.todos[position].todoText = todoText;
    },
    
deleteToDo : function(position) {
    this.todos.splice(position,1);
    },
    
toggleCompleted : function(position) {
    let todo = this.todos[position]
    todo.completed = !todo.completed;
    },

toggleAll : function() {
    let totalTodo = this.todos.length;
    let completedTodo = 0;

    //Get number of complete to do
    this.todos.forEach(function(todo){
        if(todo.completed === true){
            completedTodo++
        }
    }),

    //Case 1 : If everthing true ,makes everthing false.
    this.todos.forEach(function(todo) {
        if(totalTodo === completedTodo){
            todo.completed = false;
    //Case 2 : otherwise make everything true
        } else {
            todo.completed = true;
        }
    })
}
};

// Refactoring function to make it more readable...
// Coresponding with HTML with 'onclick' events
let handlers = {
addToDo : function() {
    let addToDoTextInput = document.querySelector('#addToDoTextInput');
    todoList.addToDo(addToDoTextInput.value) 
    addToDoTextInput.value = '';
    view.displayToDo();
    },

changeToDo : function() {
    let changePositionNumInput = document.querySelector('#changePositionNumInput')  
    let changeTextInput = document.querySelector('#changeTextInput')  
    todoList.changeToDo(changePositionNumInput.valueAsNumber , changeTextInput.value);
    changePositionNumInput.value = '';  
    changeTextInput.value = '';  
    view.displayToDo();
},

deleteToDo : function(position) {
    todoList.deleteToDo(position);
    view.displayToDo();
},

toggleCompleted : function() {
    let togglePositionInput = document.querySelector('#togglePositionInput');
    todoList.toggleCompleted(togglePositionInput.valueAsNumber) 
    togglePositionInput.value = '';
    view.displayToDo();
},

toggleAll : function(){
    todoList.toggleAll();
    view.displayToDo();
    }    
};//End of refactoring function


/*requirement
1.append new li (contains text from user) to DOM (ul)
2.display text when user click add ( w/ todoTextWithCompletion)*/
let view = {
     
displayToDo: function() {   
    let todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    todoList.todos.forEach(function (todo, position){ // callback also pass position parameter
    let todosLi = document.createElement('li');
    let todoTextWithCompletion = '';

    // show to do text from user's input with ( )
    if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
    } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
    }

    //append new Li to Ul
    todosLi.id = position;
    todosLi.textContent = todoTextWithCompletion;
    todosLi.appendChild(this.createDeleteButton())// append className = 'deleteButton' to each Li
    todosUl.appendChild(todosLi);
    },this)}, // this refered to view 
    // using forEach in callback function have to use this format
    //arr.forEach(callback(currentValue [, index [, array]])[, thisArg]
    //that why ewr


//create delete button for each to do
createDeleteButton : function() {
    let deleteButton = document.createElement('button')
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");
    return deleteButton;
    },


    // create addEventListner for Ul insdead of each Li (in case of preventing from systematic problem later)
    setUpEventListener : function() {
        let todosUl = document.querySelector('ul')
        
    todosUl.addEventListener('click' , function(event) {
    //Get the element that was clicked on.
    let elementClicked = event.target;
    //if delete btn is clicked(checked by className 'deleteButton') 
    // => delete that id (in that parentNode)
    if(elementClicked.className === 'deleteButton'){
        handlers.deleteToDo(parseInt(elementClicked.parentNode.id))
        }
    })
  }
};//End of display setting

view.setUpEventListener();

