// Load tasks from local storage on page load
window.onload = function() {
  loadTasks();
};

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

  saveTasks();  // Save tasks after adding
}

function removeTask(button) {
  const li = button.parentElement;
  li.remove();
  saveTasks();  // Save tasks after removing
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push(li.textContent.replace("Delete", "").trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    const taskList = document.getElementById("taskList");
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `${task} <button onclick="removeTask(this)">Delete</button>`;
      taskList.appendChild(li);
    });
  }
}


document.getElementById("taskInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

