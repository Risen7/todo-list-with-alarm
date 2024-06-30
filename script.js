const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const testBtn = document.querySelector(".testBtn");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
// testBtn.addEventListener("click", getLocalTodos);

let dateIn = new Date();
let dateStr = dateIn.toDateString(); 
let setTm = document.querySelector("#aSet");

function addTodo(event) {
    //12 hour format input time--------------------------------------->
    var timeSplit = setTm.value.split(':'),
    hours,
    minutes,
    meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
        meridian = 'PM';
        hours -= 12;
    } else if (hours < 12) {
        meridian = 'AM';
    if (hours == 0) {
        hours = 12;
    }
    } else {
        meridian = 'PM';
    }
      alert("Alarm Set To " + hours + ':' + minutes + ' ' + meridian);
    //-------------------------------------------------------------->
    // let alarmTime = `${setTm.value}`; - previous code
    let alarmTime = `${hours}:${minutes} ${meridian}`
    let todoInputDate = `${todoInput.value} - ${dateStr}`;
    let todoInputDat = `${todoInput.value}<div class="setTm">${alarmTime}</div><span class="encTime">${dateStr}</span>`
    event.preventDefault();
    const timeInput = document.createElement("span");
    timeInput.classList.add("encTime");
    timeInput.innerText = dateStr;
    const alrmInput = document.createElement("div");
    alrmInput.classList.add("setTm");
    alrmInput.innerText = alarmTime;
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoal");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; 
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    newTodo.appendChild(timeInput);
    newTodo.appendChild(alrmInput);

    //ADDING TO LOCAL STORAGE 
    // saveLocalTodos(todoInput.value,);
    saveLocalTodos(todoInputDat)

    
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btn-div");
    todoDiv.appendChild(btnDiv);
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></li>';
    completedButton.classList.add("complete-btn");
    btnDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-x"></li>';
    trashButton.classList.add("trash-btn");
    btnDiv.appendChild(trashButton);
    
    todoList.appendChild(todoDiv);
    todoInput.value = "";
    // console.log(todoInputDate);
}

function deleteCheck(e) {
    const item = e.target;
    // console.log(item);

    if(item.classList[0] === "trash-btn") {
        const todoal = item.parentElement.parentElement;
        todoal.classList.add("slide");

        removeLocalTodos(todoal);
        todoal.addEventListener("transitionend", function() {
            todoal.remove();
        });
    }

    if(item.classList[0] === "complete-btn") {
        const todoal = item.parentElement.parentElement;
        todoal.classList.toggle("completed");
    }

    // console.log(item.parentElement);    
}

function filterTodo(e) {
    const todosal = todoList.childNodes;
    todosal.forEach(function(todoal) {
        switch(e.target.value) {
            case "all": 
                todoal.style.display = "flex";
                break;
            case "completed": 
                if(todoal.classList.contains("completed")) {
                    todoal.style.display = "flex";
                } else {
                    todoal.style.display = "none";
                }
                break;
            case "incomplete":
                if(!todoal.classList.contains("completed")) {
                    todoal.style.display = "flex";
                } else {
                    todoal.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todoal) {
    let todosal;
    if(localStorage.getItem("todosal") === null) {
        todosal = [];
    } else {
        todosal = JSON.parse(localStorage.getItem("todosal"));
    }
    todosal.push(todoal);
    localStorage.setItem("todosal", JSON.stringify(todosal));
}

function getLocalTodos() {
    let todosal;
    if(localStorage.getItem("todosal") === null) {
        todosal = [];
    } else {
        todosal = JSON.parse(localStorage.getItem("todosal"));
    }
    todosal.forEach(function(todoal) {
        // const todoDiv = document.createElement("div");
        // todoDiv.classList.add("todo");
        // const newTodo = document.createElement("li");
        // newTodo.innerText = todo;
        // newTodo.classList.add("todo-item");
        // todoDiv.appendChild(newTodo);

        let todoInputDate = `${todoInput.value} - ${dateStr}`;
        // event.preventDefault();
        const timeInput = document.createElement("span")
        // timeInput.classList.add("encTime");
        // timeInput.innerText = dateStr;
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todoal");
        const newTodo = document.createElement("li");
        newTodo.innerHTML = todoal; 
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // newTodo.appendChild(timeInput);

        const btnDiv = document.createElement("div");
        btnDiv.classList.add("btn-div");
        todoDiv.appendChild(btnDiv);
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></li>';
        completedButton.classList.add("complete-btn");
        btnDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-x"></li >';
        trashButton.classList.add("trash-btn");
        btnDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);

        // console.log(localStorage.getItem("todosal"))
    });
}

function removeLocalTodos(todoal) {
    let todosal;
    if(localStorage.getItem("todosal") === null) {
        todosal = [];
    } else {
        todosal = JSON.parse(localStorage.getItem("todosal"));
    }

    const todoIndex = todoal.children[0].innerHTML;
    todosal.splice(todosal.indexOf(todoIndex), 1);
    localStorage.setItem("todosal", JSON.stringify(todosal));
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
