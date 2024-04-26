document.addEventListener("DOMContentLoaded", fetchTodos);

function fetchTodos() {
  const userName = document.getElementById("userNameDropdown").value;
  fetch("http://localhost:8000/todos", {
    headers: {
      "Content-Type": "application/json",
      name: userName, // Ensure header matches what backend expects
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById("todoList");
      list.innerHTML = "";
      data.data.forEach((todo) => {
        const li = document.createElement("li");
        li.textContent = todo.title;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => deleteTodo(todo.id);
        li.appendChild(deleteBtn);
        list.appendChild(li);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function addTodo() {
  const title = document.getElementById("todoInput").value;
  const userName = document.getElementById("userNameDropdown").value;
  if (title) {
    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        name: userName,
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add todo");
        return response.json();
      })
      .then(() => {
        fetchTodos(); // Refresh the list after adding
        document.getElementById("todoInput").value = ""; // Clear input after adding
      })
      .catch((error) => console.error("Error:", error));
  } else {
    alert("Please enter a todo.");
  }
}

function deleteTodo(id) {
  const userName = document.getElementById("userNameDropdown").value;
  fetch(`http://localhost:8000/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      name: userName,
    },
  })
    .then((response) => {
      if (!response.ok) alert("You are not authorized to delete this todo.");

      fetchTodos(); // Refresh the list after deleting
    })
    .catch((error) => console.error("Error:", error));
}
