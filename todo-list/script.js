// To-Do List App - Vanilla JavaScript
class TodoApp {
    constructor() {
        this.tasks = [];
        this.taskIdCounter = 0;
        this.initializeElements();
        this.bindEvents();
        this.loadTasks();
        this.updateStats();
    }

    initializeElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.taskList = document.getElementById('taskList');
        this.totalTasks = document.getElementById('totalTasks');
        this.completedTasks = document.getElementById('completedTasks');
        this.remainingTasks = document.getElementById('remainingTasks');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.clearAllBtn = document.getElementById('clearAll');
    }

    bindEvents() {
        // Add task events
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        // Clear buttons events
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());

        // Task list events (event delegation)
        this.taskList.addEventListener('click', (e) => {
            if (e.target.classList.contains('task-checkbox')) {
                this.toggleTask(e.target.dataset.taskId);
            } else if (e.target.classList.contains('delete-btn')) {
                this.deleteTask(e.target.dataset.taskId);
            } else if (e.target.classList.contains('edit-btn')) {
                this.editTask(e.target.dataset.taskId);
            }
        });
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        
        if (taskText === '') {
            this.showNotification('Please enter a task!', 'error');
            return;
        }

        if (taskText.length > 100) {
            this.showNotification('Task is too long! Maximum 100 characters.', 'error');
            return;
        }

        const task = {
            id: this.taskIdCounter++,
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.renderTask(task);
        this.taskInput.value = '';
        this.updateStats();
        this.saveTasks();
        this.showNotification('Task added successfully!', 'success');
    }

    renderTask(task) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.dataset.taskId = task.id;

        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-task-id="${task.id}">
            <span class="task-text">${this.escapeHtml(task.text)}</span>
            <div class="task-actions">
                <button class="edit-btn" data-task-id="${task.id}">Edit</button>
                <button class="delete-btn" data-task-id="${task.id}">Delete</button>
            </div>
        `;

        this.taskList.appendChild(taskItem);
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id == taskId);
        if (task) {
            task.completed = !task.completed;
            const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
            
            if (task.completed) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }
            
            this.updateStats();
            this.saveTasks();
        }
    }

    deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(t => t.id == taskId);
        if (taskIndex !== -1) {
            const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
            taskItem.classList.add('removing');
            
            setTimeout(() => {
                this.tasks.splice(taskIndex, 1);
                taskItem.remove();
                this.updateStats();
                this.saveTasks();
                this.showNotification('Task deleted!', 'info');
            }, 300);
        }
    }

    editTask(taskId) {
        const task = this.tasks.find(t => t.id == taskId);
        if (!task) return;

        const newText = prompt('Edit task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            if (newText.trim().length > 100) {
                this.showNotification('Task is too long! Maximum 100 characters.', 'error');
                return;
            }
            
            task.text = newText.trim();
            const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
            const taskTextElement = taskItem.querySelector('.task-text');
            taskTextElement.textContent = task.text;
            this.saveTasks();
            this.showNotification('Task updated!', 'success');
        }
    }

    clearCompleted() {
        const completedTasks = this.tasks.filter(task => task.completed);
        if (completedTasks.length === 0) {
            this.showNotification('No completed tasks to clear!', 'info');
            return;
        }

        if (confirm(`Are you sure you want to delete ${completedTasks.length} completed task(s)?`)) {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.renderTasks();
            this.updateStats();
            this.saveTasks();
            this.showNotification('Completed tasks cleared!', 'success');
        }
    }

    clearAll() {
        if (this.tasks.length === 0) {
            this.showNotification('No tasks to clear!', 'info');
            return;
        }

        if (confirm(`Are you sure you want to delete all ${this.tasks.length} task(s)?`)) {
            this.tasks = [];
            this.renderTasks();
            this.updateStats();
            this.saveTasks();
            this.showNotification('All tasks cleared!', 'success');
        }
    }

    renderTasks() {
        this.taskList.innerHTML = '';
        this.tasks.forEach(task => this.renderTask(task));
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const remaining = total - completed;

        this.totalTasks.textContent = `Total: ${total}`;
        this.completedTasks.textContent = `Completed: ${completed}`;
        this.remainingTasks.textContent = `Remaining: ${remaining}`;

        // Show empty state if no tasks
        if (total === 0) {
            this.showEmptyState();
        } else {
            this.hideEmptyState();
        }
    }

    showEmptyState() {
        if (!document.querySelector('.empty-state')) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <h3>No tasks yet!</h3>
                <p>Add your first task above to get started.</p>
            `;
            this.taskList.appendChild(emptyState);
        }
    }

    hideEmptyState() {
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
    }

    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
        localStorage.setItem('todoTaskIdCounter', this.taskIdCounter.toString());
    }

    loadTasks() {
        const savedTasks = localStorage.getItem('todoTasks');
        const savedCounter = localStorage.getItem('todoTaskIdCounter');
        
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
            this.taskIdCounter = savedCounter ? parseInt(savedCounter) : this.tasks.length;
            this.renderTasks();
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to add task
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const taskInput = document.getElementById('taskInput');
        if (document.activeElement === taskInput) {
            e.preventDefault();
            document.getElementById('addBtn').click();
        }
    }
    
    // Escape to clear input
    if (e.key === 'Escape') {
        const taskInput = document.getElementById('taskInput');
        if (document.activeElement === taskInput) {
            taskInput.value = '';
            taskInput.blur();
        }
    }
});
