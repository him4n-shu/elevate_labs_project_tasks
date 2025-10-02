// DOM elements
const usersContainer = document.getElementById('users-container');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const reloadBtn = document.getElementById('reload-btn');
const retryBtn = document.getElementById('retry-btn');

// API endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// State management
let isLoading = false;

/**
 * Show loading state
 */
function showLoading() {
    isLoading = true;
    loadingElement.classList.remove('hidden');
    errorElement.classList.add('hidden');
    usersContainer.innerHTML = '';
    reloadBtn.disabled = true;
    reloadBtn.style.opacity = '0.6';
}

/**
 * Hide loading state
 */
function hideLoading() {
    isLoading = false;
    loadingElement.classList.add('hidden');
    reloadBtn.disabled = false;
    reloadBtn.style.opacity = '1';
}

/**
 * Show error state
 * @param {string} message - Error message to display
 */
function showError(message) {
    hideLoading();
    errorMessage.textContent = message;
    errorElement.classList.remove('hidden');
    usersContainer.innerHTML = '';
}

/**
 * Hide error state
 */
function hideError() {
    errorElement.classList.add('hidden');
}

/**
 * Create a user card element
 * @param {Object} user - User data object
 * @returns {HTMLElement} - User card element
 */
function createUserCard(user) {
    const card = document.createElement('div');
    card.className = 'user-card';
    
    // Format address
    const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
    
    card.innerHTML = `
        <div class="user-name">${user.name}</div>
        
        <div class="user-info">
            <h4 class="email-icon">Email</h4>
            <p>${user.email}</p>
        </div>
        
        <div class="user-info">
            <h4 class="address-icon">Address</h4>
            <p>${address}</p>
        </div>
        
        <div class="user-info">
            <h4 class="phone-icon">Phone</h4>
            <p>${user.phone}</p>
        </div>
        
        <div class="user-info">
            <h4 class="website-icon">Website</h4>
            <p>${user.website}</p>
        </div>
    `;
    
    return card;
}

/**
 * Display users in the container
 * @param {Array} users - Array of user objects
 */
function displayUsers(users) {
    hideError();
    usersContainer.innerHTML = '';
    
    if (!users || users.length === 0) {
        showError('No users found.');
        return;
    }
    
    // Create and append user cards
    users.forEach(user => {
        const userCard = createUserCard(user);
        usersContainer.appendChild(userCard);
    });
    
    // Add a subtle animation to cards
    const cards = document.querySelectorAll('.user-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Fetch users from the API
 * @returns {Promise<Array>} - Promise that resolves to array of users
 */
async function fetchUsers() {
    try {
        console.log('Fetching users from API...');
        
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Add timeout using AbortController
            signal: AbortSignal.timeout(10000) // 10 second timeout
        });
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not valid JSON');
        }
        
        const users = await response.json();
        
        // Validate that we received an array
        if (!Array.isArray(users)) {
            throw new Error('Invalid data format: expected an array of users');
        }
        
        console.log(`Successfully fetched ${users.length} users`);
        return users;
        
    } catch (error) {
        console.error('Error fetching users:', error);
        
        // Handle different types of errors
        if (error.name === 'AbortError') {
            throw new Error('Request timed out. Please check your internet connection and try again.');
        } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Network error. Please check your internet connection and try again.');
        } else if (error.message.includes('HTTP Error')) {
            throw new Error(`Server error: ${error.message}. Please try again later.`);
        } else {
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    }
}

/**
 * Load and display users
 */
async function loadUsers() {
    if (isLoading) {
        console.log('Already loading, ignoring request');
        return;
    }
    
    showLoading();
    
    try {
        const users = await fetchUsers();
        displayUsers(users);
        hideLoading();
    } catch (error) {
        console.error('Error in loadUsers:', error);
        showError(error.message);
    }
}

/**
 * Handle reload button click
 */
function handleReload() {
    console.log('Reload button clicked');
    loadUsers();
}

/**
 * Handle retry button click
 */
function handleRetry() {
    console.log('Retry button clicked');
    loadUsers();
}

/**
 * Initialize the application
 */
function init() {
    console.log('Initializing User Directory App');
    
    // Add event listeners
    reloadBtn.addEventListener('click', handleReload);
    retryBtn.addEventListener('click', handleRetry);
    
    // Add keyboard support for buttons
    reloadBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleReload();
        }
    });
    
    retryBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleRetry();
        }
    });
    
    // Load users on initial page load
    loadUsers();
    
    // Add online/offline event listeners for better UX
    window.addEventListener('online', () => {
        console.log('Connection restored');
        if (errorElement.classList.contains('hidden') === false) {
            loadUsers();
        }
    });
    
    window.addEventListener('offline', () => {
        console.log('Connection lost');
        showError('You are currently offline. Please check your internet connection.');
    });
}

// Initialize the app when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchUsers,
        displayUsers,
        createUserCard,
        loadUsers
    };
}
