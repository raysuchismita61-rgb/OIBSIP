let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");

const pendingList = document.getElementById("pendingList");

const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");

const completedCount = document.getElementById("completedCount");

const pendingEmpty = document.getElementById("pendingEmpty");

const completedEmpty = document.getElementById("completedEmpty");

document
.getElementById("addBtn")
.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){

if(e.key==="Enter") addTask();

});

function addTask(){

const text = taskInput.value.trim();

if(text==="") return;

tasks.push({

text:text,

completed:false,

added:new Date().toLocaleString(),

completedTime:""

});

taskInput.value="";

save();

render();

}

function render(){

pendingList.innerHTML="";

completedList.innerHTML="";

let pending=0;

let completed=0;

tasks.forEach((task,index)=>{

const li=document.createElement("li");

const text=document.createElement("div");

text.className="taskText";

text.textContent=task.text;

const time=document.createElement("div");

time.className="time";

time.innerHTML=

"Added: "+task.added+

(task.completed?

"<br>Completed: "+task.completedTime:"");

const btns=document.createElement("div");

btns.className="buttons";

const complete=document.createElement("button");

complete.className="complete";

complete.textContent=task.completed?

"Undo":"Complete";

complete.onclick=()=>{

task.completed=!task.completed;

if(task.completed)

task.completedTime=new Date().toLocaleString();

else

task.completedTime="";

save();

render();

};

const edit=document.createElement("button");

edit.className="edit";

edit.textContent="Edit";

edit.onclick=()=>{

const newText=prompt(

"Edit Task",

task.text);

if(newText){

task.text=newText;

save();

render();

}

};

const del=document.createElement("button");

del.className="delete";

del.textContent="Delete";

del.onclick=()=>{

tasks.splice(index,1);

save();

render();

};

btns.appendChild(complete);

btns.appendChild(edit);

btns.appendChild(del);

li.appendChild(text);

li.appendChild(time);

li.appendChild(btns);

if(task.completed){

completed++;

completedList.appendChild(li);

}

else{

pending++;

pendingList.appendChild(li);

}

});

pendingCount.textContent=pending;

completedCount.textContent=completed;

pendingEmpty.style.display=

pending===0?"block":"none";

completedEmpty.style.display=

completed===0?"block":"none";

}

function save(){

localStorage.setItem(

"tasks",

JSON.stringify(tasks)

);

}

render();