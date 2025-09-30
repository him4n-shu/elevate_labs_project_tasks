# Contact Form with JavaScript Validation

A modern, responsive contact form with comprehensive client-side validation.

## Features

- **Real-time Validation**: Validates inputs as users type and on blur
- **Email Validation**: Uses regex pattern for proper email format validation
- **Error Messages**: Clear, user-friendly error messages below each field
- **Success Feedback**: Shows success message on valid form submission
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## Validation Rules

### Name Field
- Required field
- Minimum 2 characters
- Only letters and spaces allowed

### Email Field
- Required field
- Must be valid email format (using regex validation)
- Tests for proper email structure

### Message Field
- Required field
- Minimum 10 characters
- Maximum 500 characters

## Files

- `index.html` - Main HTML structure
- `styles.css` - CSS styling and responsive design
- `script.js` - JavaScript validation logic

## How to Use

1. Open `index.html` in a web browser
2. Fill out the form fields
3. Validation occurs in real-time as you type
4. Submit button is only enabled when all fields are valid
5. Success message appears on valid submission

## Testing Edge Cases

The form handles various edge cases:
- Empty inputs
- Invalid email formats
- Special characters in name field
- Message length limits
- Whitespace-only inputs

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge