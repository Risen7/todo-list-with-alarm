const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

let dateIn = new Date();
let dateStr = dateIn.toDateString();


function addTodo(event) {
    let todoInputDate = `${todoInput.value} - ${dateStr}`;
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInputDate; 
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //ADDING TO LOCAL STORAGE 
    saveLocalTodos(todoInputDate,);
    
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btn-div");
    todoDiv.appendChild(btnDiv);
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    btnDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    btnDiv.appendChild(trashButton);
    
    todoList.appendChild(todoDiv);
    todoInput.value = "";
    console.log(todoInputDate);
}

function deleteCheck(e) {
    const item = e.target;
    // console.log(item);

    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement.parentElement;
        todo.classList.add("slide");

        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed");
    }

    console.log(item.parentElement);    
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed": 
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveLocalTime(timeInput) {
    let times;
    if(localStorage.getItem("times") === null) {
        times = [];
    } else {
        times = JSON.parse(localStorage.getItem("times"));
    }
    times.push(timeInput);
    localStorage.setItem("times", JSON.stringify(times));
}

function getLocalTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // getLocalTimes();

        // function getLocalTimes(){
        //     let times;
        //     if(localStorage.getItem("times") === null) {
        //         times = [];
        //     } else {
        //         times = JSON.parse(localStorage.getItem("times"));
        //     }
        //     times.forEach(function(times) {
        //         const timeInputSpan = document.createElement("span");
        //         timeInputSpan.classList.add("timeInput");
        //         timeInputSpan.innerHTML = timeInput;
        //         todoDiv.appendChild(timeInputSpan);
        //     });
        // }

        const btnDiv = document.createElement("div");
        btnDiv.classList.add("btn-div");
        todoDiv.appendChild(btnDiv);
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add("complete-btn");
        btnDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li >';
        trashButton.classList.add("trash-btn");
        btnDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);

        // console.log(localStorage.getItem("times"))
        console.log(localStorage.getItem("todos"))
    });
}


    // let times;
    // if(localStorage.getItem("times") === null){
    //     times = [];
    // } else {
    //     times = JSON.parse(localStorage.getItem("times"));
    // }
    // times.forEach(function(timeInput) {
    //     const timeInput = document.createElement("span");
    //     timeInput.classList.add("timeInput");
    //     timeInput.innerText = timeInput;
    //     todoDiv.appendChild(timeInput);
    // });

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// TIME CLOCK --------------------------------------------------------------------------->

const myLabel = document.getElementById("myLabel");


update();
setInterval(update, 1000);

function update(){

    let date = new Date();
    myLabel.innerHTML = `${date.toDateString()} - ${formatTime(date)}`;

    function formatTime(){
        let hours = date.getHours();
        let mins = date.getMinutes();
        let secs = date.getSeconds();

        let amOrPm = hours >= 12 ? "PM" : "AM";  //to get AM or PM on standards hours

        hours = (hours % 12) || 12;  //to make military time 24hour to 12hours standard
        
        hours = formatZeroes(hours);
        mins = formatZeroes(mins);
        secs = formatZeroes(secs);

        return`${hours}:${mins}:${secs} ${amOrPm}`
    }

    function formatZeroes(time){
        time = time.toString();
        return time.length < 2 ? "0" + time : time;
    }


}