let todoList = {

    todos : [],
    
displayToDo : function() {
    if (this.todos.length === 0){
    console.log('You to do is empty')
    } else { 
    for (i = 0 ; i<this.todos.length ; i++){
    if (this.todos[i].completed === true){
    console.log('(x)' +  this.todos[i].todoText);
    } else {
    console.log('( )' +  this.todos[i].todoText);
    }
    }
  }
},
addToDo : function(todoText) {
    this.todos.push({
    todoText : todoText,
    completed : false
    })
    this.displayToDo();
    },
    
changeToDo : function(position,todoText) {
    this.todos[position].todoText = todoText;
    this.displayToDo();
    },
    
deleteToDo : function(position) {
    this.todos.splice(position,1);
    this.displayToDo();
    },
    
toggleCompleted : function(position) {
    let todo = this.todos[position]
    todo.completed = !todo.completed;
    this.displayToDo();
    },


toggleAll : function() {
    let totalTodo = this.todos.length;
    let completedTodo = 0;

    for (i = 0 ; i < totalTodo ; i++){
        if (this.todos[i].completed === true){
            completedTodo++;
        }
    }
    if (totalTodo === completedTodo){
        for (i = 0 ; i < totalTodo ; i++){
            this.todos[i].completed = false;
        }
        } else {
        for (i = 0 ; i < totalTodo ; i++){
            this.todos[i].completed = true;
            }    
        }
    this.displayToDo();
    }
}

// refactoring function to make it more readable
let handlers = {
    displayList : function(){
        todoList.displayToDo();
    },

    addToDo : function() {
    let addToDoTextInput = document.querySelector('#addToDoTextInput');
    todoList.addToDo(addToDoTextInput.value) 
    addToDoTextInput.value = '';
    },
    
    changeToDo : function() {
      let changePositionNumInput = document.querySelector('#changePositionNumInput')  
      let changeTextInput = document.querySelector('#changeTextInput')  
      todoList.changeToDo(changePositionNumInput.valueAsNumber , changeTextInput.value);
      changePositionNumInput.value = '';  
      changeTextInput.value = '';  
    },

    deleteToDo : function() {
      let deletePositionInput = document.querySelector('#deletePositionInput')  
      todoList.deleteToDo(deletePositionInput.valueAsNumber);
      deletePositionInput.value = '';  
    },

    toggleCompleted : function() {
        let togglePositionInput = document.querySelector('#togglePositionInput');
        todoList.toggleCompleted(togglePositionInput.valueAsNumber) 
        togglePositionInput.value = '';
    },

    toggleAll : function(){
        todoList.toggleAll();
    }
};
