const todoForm = document.querySelector(".form-todo");
const todoInput = document.querySelector(".form-todo input[type='text']");
const todoList = document.querySelector(".todo-list");
const newLi = document.createElement("li");

function renderTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    const newLi = document.createElement("li");
    const newLiInnerHtml = `<span>${todo}</span>
                <div>
                  <button class="done rounded-lg bg-red-300 px-4 py-1 mr-3">
                    Done
                  </button>
                  <button class="delete rounded-lg bg-red-300 px-4 py-1">
                    Delete
                  </button>
                </div>`;
    newLi.innerHTML = newLiInnerHtml;
    todoList.appendChild(newLi);
  });
}

window.addEventListener("DOMContentLoaded", renderTodos);

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodoText = todoInput.value;
  if (newTodoText === "") {
    alert("You must write something");
  } else {
    const newLi = document.createElement("li");
    const newLiInnerHtml = `<span>${newTodoText}</span>
                <div>
                  <button class="done rounded-lg bg-red-300 px-4 py-1 mr-3">
                    Done
                  </button>
                  <button class="delete rounded-lg bg-red-300 px-4 py-1">
                    Delete
                  </button>
                </div>`;
    newLi.innerHTML = newLiInnerHtml;
    todoList.appendChild(newLi);
    todoInput.value = "";

    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(newTodoText);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});

todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("done")) {
    const liSpan = e.target.parentNode.previousElementSibling;
    liSpan.classList.add("btn-done");
  }

  if (e.target.classList.contains("delete")) {
    const targetLi = e.target.parentNode.parentNode;
    targetLi.remove();

    const todoText = targetLi.querySelector("span").innerText;
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = todos.filter((todo) => todo !== todoText);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
});
