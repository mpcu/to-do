document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task before adding.");
    return;
  }

  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.innerHTML = `${taskText} <button onclick="removeTask(this)">Delete</button>`;

  taskList.appendChild(li);
  taskInput.value = "";

  saveTasks(); // Save tasks after adding a new one
}

function removeTask(button) {
  const li = button.parentElement;
  li.remove();
  saveTasks(); // Save tasks after removing one
}

function saveTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push(li.firstChild.textContent.trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");

  savedTasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="removeTask(this)">Delete</button>`;
    taskList.appendChild(li);
  });
}
