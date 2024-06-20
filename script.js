const userInput = document.getElementById("userInput");
// const userTaskList = document.getElementById("userTaskList");
// const userTask = document.getElementById("userTask");


function addTask(){
    if (userInput.value.trim() === "") {
        alert("Task Input empty!");
 }  
 else {
    let li = document.createElement("li"); 
    li.innerHTML = `
         <span>
            <span class="checkBtn"><i class="fa-regular fa-circle-check"></i></span>
            <span class="taskText">${userInput.value}</span>
        </span>
        <span>
            <span class="important"><i class="fa-regular fa-star"></i></span>
            <span class="ellipsisMenu">
            <i class="fa-solid fa-ellipsis"></i>
        </span>
        </span>
        <ul class="subMenuList" style="display: none;">
            <li>
                <span><i class="fa-solid fa-pen"></i></span>
                <span>Edit task</span>
            </li>
            <li onclick="completedTask()">
                <span><i class="fa-regular fa-circle-check"></i></span>
                <span>Mark as completed</span>
            </li>
            <li>
                <span><i class="fa-regular fa-star"></i></span>
                <span>Mark as important</span>
            </li>
            <li>
                <span><i class="fa-solid fa-trash"></i></span>
                <span>Delete task</span>
            </li>
        </ul>
    `;
    userTaskList.appendChild(li);
    taskCompletionCheck(li);
    editTask(li);
    userTask.style.display = "block";

    const ellipsisMenu = li.querySelector('.ellipsisMenu');
    const subMenuList = document.getElementById('subMenuList');
    
    ellipsisMenu.addEventListener('click', () => {
        subMenuList.style.display = subMenuList.style.display === 'none' ? 'block' : 'none';
    });
    // importantTask.addEventListener('click',(){
    //     importantTask.classList.toggle('starred');
    // } )
}
userInput.value ="";
} 



function taskCompletionCheck(taskElement){
    const userTask = document.getElementById("userTask");
    const userTaskList = userTask.querySelector('#userTaskList');
    const checkBtn = taskElement.querySelector('.checkBtn');
    const taskText = taskElement.querySelector('.taskText');
    const subMenuList = document.querySelector('#subMenuList');
    const subMenuListItem = subMenuList.querySelector('li:nth-child(2)');
    const checkedBtn = subMenuListItem.querySelector('#checkedBtn');
    const checkedTask = subMenuListItem.querySelector('#checkedTask');
    const important = userTaskList.querySelector('.important');
    const importantTask = userTaskList.querySelector('.fa-star');
    const markAsImportant = subMenuList.querySelector('li:nth-child(3)');
    const markAsImportantTask = markAsImportant.querySelector('#markAsImportantTask');
    
    checkBtn.addEventListener('click', () => {
        checkBtn.classList.toggle('active');
        taskText.classList.toggle('completed');
        checkedBtn.classList.toggle('active');
        checkedTask.classList.toggle('completed')
    });
    taskText.addEventListener('click', () => {
        checkBtn.classList.toggle('active');
        taskText.classList.toggle('completed');
        checkedBtn.classList.toggle('active');
        checkedTask.classList.toggle('completed')
    });
    subMenuListItem.addEventListener('click',()=>{
        checkBtn.classList.toggle('active');
        taskText.classList.toggle('completed');
        checkedBtn.classList.toggle('active');
        checkedTask.classList.toggle('completed')
    })
    important.addEventListener('click',()=>{
        importantTask.classList.toggle('starred');
        markAsImportantTask.classList.toggle('starred');

    })
    markAsImportant.addEventListener('click', ()=>{
        importantTask.classList.toggle('starred');
        markAsImportantTask.classList.toggle('starred');
    })
}


function editTask(taskElement){
    const subMenuList = document.querySelector('#subMenuList');
    const subMenuListItem = subMenuList.querySelector('li:nth-child(1)');
    const userTask = document.getElementById("userTask");
    const userTaskList = userTask.querySelector('#userTaskList');
    const editTaskBtn = subMenuList.querySelector('.editTask');
    const taskText = userTaskList.querySelector('.taskText');
    
    subMenuListItem.addEventListener('click',()=>{
        let editedTask = prompt("Edit your task here...", taskText.textContent);
        if (editedTask !== null && editedTask.trim() !== "") {
         taskText.textContent = editedTask.trim();
        }
    })
}
