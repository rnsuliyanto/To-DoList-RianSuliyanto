// Get the DOM elements
const addBtn = document.getElementById("add-btn");
const newTaskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const completeAllBtn = document.getElementById("complete-all-btn");
const clearBtn = document.getElementById("clear-btn");
const saveBtn = document.getElementById("save-btn");

// Load saved tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task function
function addTask() {
    const taskText = newTaskInput.value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const listItem = createTaskElement(taskText);

    taskList.appendChild(listItem);
    updateTaskNumbers();

    newTaskInput.value = "";
}

// Create task element
function createTaskElement(taskText, completed = false) {
    const listItem = document.createElement("li");

    if (completed) {
        listItem.classList.add("completed");
    }

    const taskNumber = document.createElement("span");
    taskNumber.classList.add("task-number");

    const taskSpan = document.createElement("span");
    taskSpan.innerText = taskText;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("task-buttons");

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete");
    completeBtn.innerText = "Complete";
    completeBtn.addEventListener("click", () => {
        listItem.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(listItem);
        updateTaskNumbers();
    });

    buttonsDiv.appendChild(completeBtn);
    buttonsDiv.appendChild(deleteBtn);

    listItem.appendChild(taskNumber);
    listItem.appendChild(taskSpan);
    listItem.appendChild(buttonsDiv);

    return listItem;
}

// Update task numbers
function updateTaskNumbers() {
    const tasks = taskList.querySelectorAll("li");
    tasks.forEach((task, index) => {
        task.querySelector(".task-number").innerText = `${index + 1}.`;
    });
}

// Complete all tasks
completeAllBtn.addEventListener("click", () => {
    const tasks = taskList.querySelectorAll("li");
    tasks.forEach((task) => {
        task.classList.add("completed");
    });
});

// Clear the task list
clearBtn.addEventListener("click", () => {
    taskList.innerHTML = "";
});

// Save the task list to local storage
saveBtn.addEventListener("click", () => {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((task) => {
        tasks.push({
            text: task.querySelector("span").innerText,
            completed: task.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    alert("List saved!");
});

// Load tasks from local storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    savedTasks.forEach((task) => {
        const listItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(listItem);
    });
    updateTaskNumbers();
}

// Add button event listener
addBtn.addEventListener("click", addTask);

// Allow pressing "Enter" to add the task
newTaskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
