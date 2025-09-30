// Contact Form Validation Script
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    // Email validation regex pattern
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Function to show error message
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    // Function to clear error message
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // Function to validate name
    function validateName(name) {
        if (!name || name.trim() === '') {
            return 'Name is required';
        }
        if (name.trim().length < 2) {
            return 'Name must be at least 2 characters long';
        }
        if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
            return 'Name can only contain letters and spaces';
        }
        return null;
    }

    // Function to validate email
    function validateEmail(email) {
        if (!email || email.trim() === '') {
            return 'Email is required';
        }
        if (!emailRegex.test(email.trim())) {
            return 'Please enter a valid email address';
        }
        return null;
    }

    // Function to validate message
    function validateMessage(message) {
        if (!message || message.trim() === '') {
            return 'Message is required';
        }
        if (message.trim().length < 10) {
            return 'Message must be at least 10 characters long';
        }
        if (message.trim().length > 500) {
            return 'Message must be less than 500 characters';
        }
        return null;
    }

    // Function to validate all fields
    function validateForm() {
        let isValid = true;
        
        // Validate name
        const nameError = validateName(nameInput.value);
        const nameErrorElement = document.getElementById('nameError');
        if (nameError) {
            showError(nameInput, nameErrorElement, nameError);
            isValid = false;
        } else {
            clearError(nameInput, nameErrorElement);
        }

        // Validate email
        const emailError = validateEmail(emailInput.value);
        const emailErrorElement = document.getElementById('emailError');
        if (emailError) {
            showError(emailInput, emailErrorElement, emailError);
            isValid = false;
        } else {
            clearError(emailInput, emailErrorElement);
        }

        // Validate message
        const messageError = validateMessage(messageInput.value);
        const messageErrorElement = document.getElementById('messageError');
        if (messageError) {
            showError(messageInput, messageErrorElement, messageError);
            isValid = false;
        } else {
            clearError(messageInput, messageErrorElement);
        }

        return isValid;
    }

    // Real-time validation on input
    nameInput.addEventListener('blur', function() {
        const nameError = validateName(this.value);
        const nameErrorElement = document.getElementById('nameError');
        if (nameError) {
            showError(this, nameErrorElement, nameError);
        } else {
            clearError(this, nameErrorElement);
        }
    });

    emailInput.addEventListener('blur', function() {
        const emailError = validateEmail(this.value);
        const emailErrorElement = document.getElementById('emailError');
        if (emailError) {
            showError(this, emailErrorElement, emailError);
        } else {
            clearError(this, emailErrorElement);
        }
    });

    messageInput.addEventListener('blur', function() {
        const messageError = validateMessage(this.value);
        const messageErrorElement = document.getElementById('messageError');
        if (messageError) {
            showError(this, messageErrorElement, messageError);
        } else {
            clearError(this, messageErrorElement);
        }
    });

    // Clear errors on input
    nameInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this, document.getElementById('nameError'));
        }
    });

    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this, document.getElementById('emailError'));
        }
    });

    messageInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this, document.getElementById('messageError'));
        }
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Validate form
        if (validateForm()) {
            // Show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form after 3 seconds (for demo purposes)
            setTimeout(() => {
                form.style.display = 'block';
                successMessage.style.display = 'none';
                form.reset();
                
                // Clear all errors
                clearError(nameInput, document.getElementById('nameError'));
                clearError(emailInput, document.getElementById('emailError'));
                clearError(messageInput, document.getElementById('messageError'));
            }, 3000);
        }
    });

    // Test edge cases function (for development/testing)
    function testEdgeCases() {
        console.log('Testing edge cases...');
        
        // Test empty inputs
        console.log('Empty name:', validateName(''));
        console.log('Empty email:', validateEmail(''));
        console.log('Empty message:', validateMessage(''));
        
        // Test invalid email formats
        console.log('Invalid email 1:', validateEmail('invalid-email'));
        console.log('Invalid email 2:', validateEmail('test@'));
        console.log('Invalid email 3:', validateEmail('@domain.com'));
        console.log('Invalid email 4:', validateEmail('test..test@domain.com'));
        
        // Test special characters in name
        console.log('Name with numbers:', validateName('John123'));
        console.log('Name with symbols:', validateName('John@Doe'));
        
        // Test message length
        console.log('Short message:', validateMessage('Hi'));
        console.log('Long message:', validateMessage('a'.repeat(501)));
    }

    // Uncomment the line below to run edge case tests in console
    // testEdgeCases();
});
