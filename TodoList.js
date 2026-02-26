if (typeof window !== "undefined") {
  let todoItemsContainer = document.getElementById("todoItemsContainer");
  let todoList = getTodoListFromLocalStorage();
  let todosCount = todoList.length;
  document.getElementById("addTodoButton").onclick = addTodo;
  todoList.forEach((eachTodo) => createTodo(eachTodo));

  function getTodoListFromLocalStorage() {
    return JSON.parse(localStorage.getItem("todoList")) || [];
  }

  function createTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;
    inputElement.onclick = () =>
      onTodoStatusChange(checkboxId, labelId, todoId);
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked) labelElement.classList.add("checked");
    labelContainer.appendChild(labelElement);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = () => deleteTodo(todoId);
    labelContainer.appendChild(deleteIcon);
  }

  function addTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    if (userInputElement.value === "") {
      alert("Enter Valid Text");
      return;
    } else {
      todosCount++;
      let todo = {
        text: userInputElement.value,
        uniqueNo: todosCount,
        isChecked: false,
      };
      if (
        todoList.some(
          (eachTodo) => eachTodo.text.toLowerCase() === todo.text.toLowerCase(),
        )
      ) {
        alert("Todo already exists");
        return;
      }
      todoList.push(todo);
      createTodo(todo);
      userInputElement.value = "";
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }

  function deleteTodo(todoId) {
    todoItemsContainer.removeChild(document.getElementById(todoId));
    let deleteElementIndex = todoList.findIndex(
      (eachTodo) => "todo" + eachTodo.uniqueNo === todoId,
    );
    todoList.splice(deleteElementIndex, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  function onTodoStatusChange(checkboxId, labelId, todoId) {
    document.getElementById(labelId).classList.toggle("checked");
    let i = todoList.findIndex(
      (eachTodo) => "todo" + eachTodo.uniqueNo === todoId,
    );
    todoList[i].isChecked = !todoList[i].isChecked;
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
}
