// Wait until the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // Don't re-save to Local Storage when loading
        });
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // If no taskText is passed (e.g., button press), get it from input
        if (taskText === undefined) {
            taskText = taskInput.value.trim();
        }

        // Prevent empty task
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove item from DOM and Local Storage
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            removeTaskFromLocalStorage(taskText);
        };

        // Add button to list item, and item to list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add button event
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Enter key to add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
