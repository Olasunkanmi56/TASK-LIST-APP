// Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn =  document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

// Load All Event Listeners
loadAllEventListeners();
// Load All Event Listeners
function loadAllEventListeners() {
    // Add task event
form.addEventListener('submit', addTask);
   // Remove task event
taskList.addEventListener('click', removeTask);
   // Clear task event 
clearBtn.addEventListener('click', clearTasks);
   // filter task 
filter.addEventListener('keyup', filterTasks);
   // DOM Load event 
document.addEventListener('DOMContentLoaded', getTasks);

}
// Get Tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
       tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
tasks.forEach(function(task){
   // Create li element 
   const li = document.createElement('li');
   // Add class
li.className = 'collection-item';
   // Create a TextNode and append to li 
li.appendChild(document.createTextNode(task));
   //  Create new link element 
const link = document.createElement('a');
   // Add class
link.className = 'delete-item secondary-content';
   // Add icon html
link.innerHTML = '<i class ="fa fa-remove"></i>';
   //Append link to li
li.appendChild(link);
   // Append li to ul
taskList.appendChild(li); 
});
}
     // Add Task
function addTask(e) { 
    if (taskInput.value === '') {
        alert('Add a task');
    }
    // Create li element 
const li = document.createElement('li');
    // Add class
li.className = 'collection-item';
    // Create a TextNode and append to li 
li.appendChild(document.createTextNode(taskInput.value));
    //  Create new link element 
const link = document.createElement('a');
    // Add class
link.className = 'delete-item secondary-content';
    // Add icon html
link.innerHTML = '<i class ="fa fa-remove"></i>';
    //Append link to li
li.appendChild(link);
    // Append li to ul
taskList.appendChild(li); 
    //  Store in LS
storeTaskInLocalStorage(taskInput.value);
   // Clear input
taskInput.value = '';
  e.preventDefault();
}
 // Store Task
 function storeTaskInLocalStorage(task) {
     let tasks;
     if(localStorage.getItem('tasks') === null){
        tasks = [];
     }else {
         tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.push(task);
     localStorage.setItem('tasks', JSON.stringify(tasks));
 }

   // Remove Tasks
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are you sure'))  {
          e.target.parentElement.parentElement.remove();

          // Remove from LS
        removeTaskfromLocalStorage( e.target.parentElement.parentElement);
      }
    }
}
    // Remove from LS
    function removeTaskfromLocalStorage(taskItem) {
        let tasks;
    if(localStorage.getItem('tasks') === null){
       tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
     if(taskItem.textContent === task){
     tasks.splice(index, 1)
     }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }

   // Clear Tasks
function clearTasks(){
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

   // Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.diplay = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}