
const userInput = document.getElementById("userInput");
const userTaskList = document.getElementById("userTaskList");

function addTask() {
    if (userInput.value.trim() === "") {
        alert("Task Input empty!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `
            
        <div id = "list">
        <span>
            <span class="checkBtn"><i class="fa-regular fa-circle-check"></i></span>
            <span class="taskText">${userInput.value}</span>
        </span>
        <span>
            <span class="important"><i class="fa-regular fa-star"></i></span>
            <span class="ellipsisMenu">
            <i class="fa-solid fa-ellipsis"></i>
        </span>
        </div>
            
            
        <div id = "subMenu">
            <ul class="subMenuList" style="display: none;">
                <li class="editTask">
                    <span><i class="fa-solid fa-pen"></i></span>
                    <span>Edit task</span>
                </li>
                <li class="completedTask">
                    <span class="completedBtn" ><i class="fa-regular fa-circle-check"></i></span>
                    <span class="completedText">Mark as completed</span>
                </li>
                <li class="markAsImportant">
                    <span class="starBtn"><i class="fa-regular fa-star"></i></span>
                    <span class="importantText" >Mark as important</span>
                </li>
                <li class="deleteTask">
                    <span><i class="fa-solid fa-trash"></i></span>
                    <span>Delete task</span>
                </li>
            </ul>
        </div>    
        `;
        li.setAttribute("id", "listItem");
        userTaskList.appendChild(li);
        ellipsisDropDownMenu(li);
        editTask(li);
        taskCompletionCheck(li);
        importantTask(li);
        deleteTask(li);
        userTask.style.display = "block";

    }
    userInput.value = "";
}

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

function ellipsisDropDownMenu(taskElement) {
    const ellipsisMenu = taskElement.querySelector('.ellipsisMenu');
    const subMenuList = taskElement.querySelector('.subMenuList');

    ellipsisMenu.addEventListener('click', () => {
        subMenuList.style.display = subMenuList.style.display === 'none' ? 'block' : 'none';
    });
}

function editTask(taskElement) {
    const editTaskBtn = taskElement.querySelector('.editTask');
    const taskText = taskElement.querySelector('.taskText');
    const subMenuList = taskElement.querySelector('.subMenuList');

    editTaskBtn.addEventListener('click', () => {
        let editedTask = prompt("Edit your task here...", taskText.textContent);
        if (editedTask !== null && editedTask.trim() !== "") {
            taskText.textContent = editedTask.trim();
            subMenuList.style.display = 'none';
        }

    });
}

function taskCompletionCheck(taskElement) {
    const checkBtn = taskElement.querySelector('.checkBtn');
    const taskText = taskElement.querySelector('.taskText');
    const subMenuListItem = taskElement.querySelector('.completedTask');
    const completedBtn = taskElement.querySelector('.completedBtn');
    const completedText = taskElement.querySelector('.completedText');

    checkBtn.addEventListener('click', () => {
        checkBtn.classList.toggle('active');
        taskText.classList.toggle('completed');
        completedBtn.classList.toggle('active');
        completedText.classList.toggle('completed');
    });
    taskText.addEventListener('click',()=>{
        checkBtn.classList.toggle('active');
        taskText.classList.toggle('completed');
        completedBtn.classList.toggle('active');
        completedText.classList.toggle('completed');
    })

    subMenuListItem.addEventListener('click', () => {
        checkBtn.classList.toggle('active');
        taskText.classList.toggle('completed');
        completedBtn.classList.toggle('active');
        completedText.classList.toggle('completed');
        taskElement.querySelector('.subMenuList').style.display = 'none';
    });

    
}

function importantTask(taskElement) {
    const importantBtn = taskElement.querySelector('.important');
    const importantIcon = taskElement.querySelector('.fa-star');
    const markAsImportantItem = taskElement.querySelector('.markAsImportant');
    const starBtn = taskElement.querySelector('.starBtn');
    const importantText = taskElement.querySelector('.importantBtn');

    importantBtn.addEventListener('click', () => {
        starBtn.classList.toggle('starred');
        toggleImportant(taskElement, importantIcon);
    });

    markAsImportantItem.addEventListener('click', () => {
        toggleImportant(taskElement, importantIcon);
        starBtn.classList.toggle('starred');
        taskElement.querySelector('.subMenuList').style.display = 'none';
    });
}

function toggleImportant(taskElement, importantIcon) {
    importantIcon.classList.toggle('starred');
    const userImportantTask = document.getElementById('userImportantTask');
    const userImportantTaskList = document.getElementById('userImportantTaskList');
    const userTaskList = document.getElementById('userTaskList');

    if (importantIcon.classList.contains('starred')) {
        userImportantTaskList.appendChild(taskElement);
        userImportantTask.style.display = 'block';
    } else {
        userTaskList.appendChild(taskElement);
        if (userImportantTaskList.children.length === 0) {
            userImportantTask.style.display = 'none';
        }
    }
}

function deleteTask(taskElement) {
    const deleteTaskBtn = taskElement.querySelector('.deleteTask');

    deleteTaskBtn.addEventListener('click', () => {
        taskElement.remove();
        if (userTaskList.children.length === 0) {
            document.getElementById('userTask').style.display = 'none';
        }
        if (document.getElementById('userImportantTaskList').children.length === 0) {
            document.getElementById('userImportantTask').style.display = 'none';
        }
    });
}
function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll('#userTaskList li, #userImportantTaskList li');

    taskItems.forEach(taskItem => {
        const taskText = taskItem.querySelector('.taskText').textContent;
        const isCompleted = taskItem.querySelector('.taskText').classList.contains('completed');
        const isImportant = taskItem.querySelector('.fa-star').classList.contains('starred');

        tasks.push({ taskText, isCompleted, isImportant });
    });

}

