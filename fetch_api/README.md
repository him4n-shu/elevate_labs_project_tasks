# User Data Fetch - JSONPlaceholder API

A modern, responsive web application that fetches and displays user data from the JSONPlaceholder API using the Fetch API.

## Features

✅ **Fetch API Integration**: Uses modern JavaScript Fetch API to retrieve data from https://jsonplaceholder.typicode.com/users

✅ **Responsive Design**: Beautiful, modern UI that works on desktop and mobile devices

✅ **Error Handling**: Comprehensive error handling for network issues, timeouts, and API errors

✅ **Loading States**: Visual feedback during data loading with animated spinner

✅ **Reload Functionality**: Reload button to refetch data at any time

✅ **User-Friendly Display**: Clean card-based layout showing user information including:
- Name
- Email
- Full Address
- Phone Number
- Website

✅ **Accessibility**: Keyboard navigation support and semantic HTML

✅ **Network Status**: Automatic detection of online/offline status

## Files Structure

```
fetch_api/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling with modern design
├── script.js           # JavaScript with Fetch API implementation
└── README.md           # This documentation file
```

## How to Use

1. **Open the Application**: Open `index.html` in your web browser
2. **View Users**: The application automatically loads user data on page load
3. **Reload Data**: Click the "🔄 Reload Data" button to fetch fresh data
4. **Error Recovery**: If an error occurs, click "Try Again" to retry

## Testing Network Error Handling

To test the error handling functionality:

1. **Disable Internet**: Turn off your internet connection
2. **Reload Page**: Refresh the page or click reload button
3. **Observe Error**: You should see a user-friendly error message
4. **Re-enable Internet**: Turn your internet back on
5. **Retry**: The app will automatically detect when you're back online

## Technical Implementation

### Fetch API Usage
```javascript
const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(10000) // 10 second timeout
});
```

### Error Handling
- Network connectivity issues
- HTTP status errors (404, 500, etc.)
- JSON parsing errors
- Request timeouts (10 seconds)
- Invalid data format validation

### Data Processing
- Parses JSON response from API
- Validates data structure
- Loops through users array
- Dynamically creates HTML cards for each user
- Displays name, email, address, phone, and website

## Browser Compatibility

- Modern browsers supporting ES6+ features
- Fetch API support (all modern browsers)
- CSS Grid and Flexbox support

## Live Demo

Simply open `index.html` in any modern web browser to see the application in action.

## API Information

This application uses the JSONPlaceholder API:
- **Endpoint**: https://jsonplaceholder.typicode.com/users
- **Method**: GET
- **Response**: Array of 10 user objects
- **Free to use**: No API key required
