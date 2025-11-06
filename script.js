const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${todo.text}</span>
      <div class="actions">
        <button onclick="editTodo(${index})">✏️</button>
        <button onclick="deleteTodo(${index})">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    input.value = '';
    saveAndRender();
  }
});

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveAndRender();
}

function editTodo(index) {
  const newText = prompt('Edit task:', todos[index].text);
  if (newText !== null) {
    todos[index].text = newText.trim();
    saveAndRender();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

renderTodos();