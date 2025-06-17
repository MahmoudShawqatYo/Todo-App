let addBtn = document.getElementById("addBtn");
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

let tasks = [];

window.onload = function () {
  let savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach((task) => {
      createTaskElement(task);
    });
  }
};

function createTaskElement(taskText) {
  let li = document.createElement("li");

  let span = document.createElement("span");
  span.textContent = taskText;

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete");

  deleteBtn.addEventListener("click", function () {
    li.remove();
    tasks = tasks.filter((t) => t !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

addBtn.addEventListener("click", function () {
  let taskText = taskInput.value.trim();

  if (taskText !== "") {
    createTaskElement(taskText);
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
  }
});

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addBtn.click();
  }
});
