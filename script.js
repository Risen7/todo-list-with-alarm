const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const testBtn = document.querySelector(".testBtn");
const ring = new Audio('alarm-ring.wav');
let setAlarm = document.getElementById("setAlarm");
const checkBx = document.getElementById("myCheck");
document.addEventListener("DOMContentLoaded", loadData);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
ring.loop = true;

let dateIn = new Date();
let dateStr = dateIn.toDateString(); 
let setTm = document.querySelector("#aSet");
let alarmListArr = [];
let alarmCount = 0;
let alarmTM;

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

    let hm = (hours<10 ? "0" + hours : hours)
    //-------------------------------------------------------------->

    // ADD ALARM---------------------------------------------------->
    alarmCount++;
    alarmTM = `${hm}:${minutes}:00 ${meridian}`;
    let alarmTime = `${hours}:${minutes} ${meridian}`
    let todoInputDate = `${todoInput.value} - ${dateStr}`;
    saveAlarm();
    // alarmListArr.push(alarmTM);
    //-------------------------------------------------------------->
// let alarmTime = `${setTm.value}`; - previous code
    if(todoInput.value === ''){
        alert("YOU MUST WRITE SOME TODO's! Empty not Allowed!")
    }
    else {
        let alarmTime = `${hours}:${minutes} ${meridian}`
        let todoInputDate = `${todoInput.value} - ${dateStr}`;

//Don't Save in Local Storage Alarm TIME input if no alarm or with alarm

        let todoInputDat = `${todoInput.value}<div class="setTm">${alarmTime}</div><span class="encTime">${dateStr}</span>`
        let todoInputDatNot = `${todoInput.value}<span class="encTime">${dateStr}</span>`
        event.preventDefault();
        const timeInput = document.createElement("span");
        timeInput.classList.add("encTime");
        timeInput.innerText = dateStr;
        const alrmInput = document.createElement("div");
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todoal");
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value; 
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        newTodo.appendChild(timeInput);

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

//Don't Display Alarm TIME input if no alarm or with alarm
        if(checkBx.checked == false) {
            alrmInput.classList.add("setTm");
            alrmInput.innerText = alarmTime;
            newTodo.appendChild(alrmInput);
            saveLocalTodos(todoInputDat)
            saveData();
            alert("Todo List with Alarm Set To" + ' ' + hm + ':' + minutes + ' ' + meridian);
        }
        else {
// saveLocalTodos(todoInputDatNot);
            saveData();
            alert("Todo Lists Set");
        }
    }
    console.log(localStorage.getItem("alarmData"), "--storage");
    console.log(alarmListArr, "--array")
};


function deleteCheck(e) {
    const item = e.target;
    // console.log(item);
    saveCheck = true;
    if(item.classList[0] === "trash-btn") {
        const todoal = item.parentElement.parentElement;
        todoal.classList.add("slide");

        removeLocalTodos(todoal);
        todoal.addEventListener("transitionend", function() {
            todoal.remove();
            saveData();
        });
    }

    if(item.classList[0] === "complete-btn") {
        const todoal = item.parentElement.parentElement;
        todoal.classList.toggle("completed"); 
        saveData();
    }

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

function saveData() {
    localStorage.setItem("todoData", todoList.innerHTML);
}

function saveAlarm() {
    alarmListArr.push(alarmTM);
    localStorage.setItem("alarmData", JSON.stringify(alarmListArr));
}

function loadData() {
    todoList.innerHTML = localStorage.getItem("todoData");
    loadAlarm();
}

function loadAlarm() {
    alarmListArr = JSON.parse(localStorage.getItem("alarmData"));
    console.log(alarmListArr);
}

function getLocalTodos() {
    let todosal;
    if(localStorage.getItem("todosal") === null) {
        todosal = [];
    } else {
        todosal = JSON.parse(localStorage.getItem("todosal"));
    }
    todosal.forEach(function(todoal) {
        let todoInputDate = `${todoInput.value} - ${dateStr}`;
        // event.preventDefault();
        const timeInput = document.createElement("span")
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todoal");
        // todoDiv.classList.add("completed");   - for completed task
        const newTodo = document.createElement("li");
        newTodo.innerHTML = todoal; 
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

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

// STOP ALARM

function stopAlarm(){
    ring.pause();
    document.querySelector(".testBtn").style.visibility= "hidden";
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

            //Alarm Trigger --------------------------------------------------->
        for(let i=0; i<alarmListArr.length; i++){
            if(alarmListArr[i] == `${hours}:${mins}:${secs} ${amOrPm}`){
                ring.load();
                ring.play();
                // console.log(`alarm ringing! + ${i}`)
                document.querySelector(".testBtn").style.visibility= "visible";
            // alert("ALARM IS RINGING")
            }
        }
        return`${hours}:${mins}:${secs} ${amOrPm}` 
    }
    function formatZeroes(time){
        time = time.toString();
        return time.length < 2 ? "0" + time : time;
    }
}


checkBx.onchange = function() {
    if(checkBx.checked){
        document.getElementById("setAlarm").style.visibility = "hidden";
    }
    else {
        document.getElementById("setAlarm").style.visibility = "visible";    
    }
}
    
 
