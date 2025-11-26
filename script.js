
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    document.getElementById('add-btn').addEventListener('click', () => {
        const input = document.getElementById('task-input');
        const taskText = input.value.trim();

        if (taskText !== "") {
            addTask(taskText);
            input.value = "";
        }
    });
});


function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
}


function addTask(taskText, save = true) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove");
    removeButton.onclick = () => removeTask(taskText, li);

    li.appendChild(removeButton);
    taskList.appendChild(li);

    if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}


function removeTask(taskText, listItem) {
    listItem.remove();

    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}