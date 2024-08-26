// NEW VERSION

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('tasks');

    // Fetch tasks on load
    fetchTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        // Send data to backend
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        }).then(() => {
            fetchTasks();
            taskForm.reset();
        });
    });

    function fetchTasks() {
        fetch('/tasks')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';
                tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>${task.title}: ${task.description}</span>
                        <div>
                            <button class="update" data-id="${task.id}">Update</button>
                            <button class="delete" data-id="${task.id}">Delete</button>
                        </div>
                    `;
                    taskList.appendChild(li);
                });

                // Add event listeners for the update and delete buttons
                document.querySelectorAll('.update').forEach(button => {
                    button.addEventListener('click', handleUpdate);
                });
                document.querySelectorAll('.delete').forEach(button => {
                    button.addEventListener('click', handleDelete);
                });
            });
    }

    function handleUpdate(e) {
        const id = e.target.getAttribute('data-id');
        const task = e.target.parentElement.parentElement.querySelector('span').textContent;
        const [title, description] = task.split(': ');

        document.getElementById('title').value = title.trim();
        document.getElementById('description').value = description.trim();

        taskForm.onsubmit = (e) => {
            e.preventDefault();
            const updatedTitle = document.getElementById('title').value;
            const updatedDescription = document.getElementById('description').value;

            fetch(`/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: updatedTitle, description: updatedDescription })
            }).then(() => {
                fetchTasks();
                taskForm.reset();
                taskForm.onsubmit = handleSubmit;
            });
        };
    }

    function handleDelete(e) {
        const id = e.target.getAttribute('data-id');

        fetch(`/tasks/${id}`, {
            method: 'DELETE'
        }).then(() => {
            fetchTasks();
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        }).then(() => {
            fetchTasks();
            taskForm.reset();
        });
    }
});
