# To-Do List Web App

A modern, responsive To-Do List application built with Vanilla JavaScript, HTML, and CSS.

## Features

- ✅ Add new tasks with input validation
- ✅ Mark tasks as complete/incomplete
- ✅ Edit existing tasks
- ✅ Delete individual tasks
- ✅ Clear all completed tasks
- ✅ Clear all tasks
- ✅ Real-time task statistics
- ✅ Local storage persistence
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Keyboard shortcuts
- ✅ Notification system

## Getting Started

1. **Open the app**: Simply open `index.html` in your web browser
2. **Or use live-server**: 
   ```bash
   npx live-server
   ```

## How to Use

### Adding Tasks
- Type your task in the input field
- Click "Add Task" or press Enter
- Tasks are limited to 100 characters

### Managing Tasks
- **Complete**: Click the checkbox next to any task
- **Edit**: Click the "Edit" button to modify task text
- **Delete**: Click the "Delete" button to remove a task
- **Clear Completed**: Remove all completed tasks at once
- **Clear All**: Remove all tasks (with confirmation)

### Keyboard Shortcuts
- `Enter`: Add new task
- `Ctrl/Cmd + Enter`: Add task (when input is focused)
- `Escape`: Clear input field

## File Structure

```
todo-list/
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Features in Detail

### Data Persistence
- All tasks are automatically saved to browser's local storage
- Tasks persist between browser sessions
- No server required - completely client-side

### Responsive Design
- Works on desktop, tablet, and mobile devices
- Touch-friendly interface
- Adaptive layout

### User Experience
- Smooth animations for adding/removing tasks
- Visual feedback with notifications
- Empty state messaging
- Task statistics display
- Input validation and error handling

## Customization

You can easily customize the app by modifying:
- **Colors**: Update CSS variables in `style.css`
- **Animations**: Modify keyframes and transitions
- **Features**: Add new functionality in `script.js`
- **Layout**: Adjust HTML structure in `index.html`

## Technical Details

- **No Dependencies**: Pure Vanilla JavaScript
- **Modern ES6+**: Uses classes, arrow functions, and modern syntax
- **Event Delegation**: Efficient event handling
- **Local Storage**: Client-side data persistence
- **CSS Grid/Flexbox**: Modern layout techniques
- **Accessibility**: Semantic HTML and keyboard navigation
