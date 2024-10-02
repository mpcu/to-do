document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  const addButton = document.getElementById("addButton");
  addButton.addEventListener("click", addTask);

  const taskInput = document.getElementById("taskInput");
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;

  if (taskText === "") {
    alert("Please enter a task before adding.");
    return;
  }

  if (!startTime || !endTime) {
    alert("Please enter both start and end time.");
    return;
  }

  const taskList = document.getElementById("taskList");
  const li = createTaskElement(taskText, startTime, endTime);

  taskList.appendChild(li);
  taskInput.value = "";
  document.getElementById("startTime").value = "";
  document.getElementById("endTime").value = "";

  saveTasks(); // Save tasks after adding a new one
}

function createTaskElement(taskText, startTime, endTime, completed = false) {
  const li = document.createElement("li");
  li.className = completed ? "completed" : "";
  li.innerHTML = `
    <span>${taskText}</span> 
    <span class="time">${startTime} - ${endTime}</span>
    <button onclick="removeTask(this)">Delete</button>
  `;

  li.addEventListener("click", toggleTaskCompletion);
  return li;
}

function toggleTaskCompletion(e) {
  if (e.target.tagName !== "BUTTON") {
    const li = e.currentTarget;
    li.classList.toggle("completed");
    saveTasks(); // Save the new completion status
  }
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
    const taskText = li.firstChild.textContent.trim();
    const timeText = li.querySelector(".time").textContent;
    const [startTime, endTime] = timeText.split(" - ");
    const completed = li.classList.contains("completed");
    tasks.push({ text: taskText, startTime, endTime, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");

  savedTasks.forEach(({ text, startTime, endTime, completed }) => {
    const li = createTaskElement(text, startTime, endTime, completed);
    taskList.appendChild(li);
  });
}
