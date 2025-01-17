const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

const priorityOrder = {
    high: 1,
    medium: 2, 
    low: 3
};

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const taskItem = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    taskItem.classList.add(priority);
    taskItem.dataset.priority = priorityOrder[priority];

    taskSpan.addEventListener('click', () => {
        taskSpan.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });

    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteBtn);

    insertTaskInOrder(taskItem);

    taskInput.value = '';
    prioritySelect.value = 'low';
});

function insertTaskInOrder (newTask) {
    const tasks = Array.from(taskList.children);
    const newTaskPriority = parseInt(newTask.dataset.priority, 10);

    let inserted = false;
    for (let i = 0; i < tasks.length; i++) {
        const currentTaskPriority = parseInt(tasks[i].dataset.priority, 10);
        if (newTaskPriority < currentTaskPriority) {
            taskList.insertBefore(newTask, tasks[i]);
            inserted = true;
            break;
        }
    }

    if (!inserted) {
        taskList.appendChild(newTask);
    }
}