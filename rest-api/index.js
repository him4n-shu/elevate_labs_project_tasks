// Step 1: Initialize Express and set up the server
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Step 2: Create an in-memory array to store book objects
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// Simple welcome route to confirm the server is running
app.get('/', (req, res) => {
    res.send('Welcome to the Book REST API!');
});

// Step 3: Implement CRUD endpoints

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
    // Check if both title and author are provided in the request body
    if (!req.body.title || !req.body.author) {
        return res.status(400).json({ error: 'Title and author are required.' });
    }

    // Create a new book object with a unique ID
    const newBook = {
        id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title: req.body.title,
        author: req.body.author,
    };

    // Add the new book to the in-memory array
    books.push(newBook);
    // Respond with the newly created book and a 201 Created status code
    res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    // Find the book by its ID
    const book = books.find(b => b.id === bookId);

    // If the book is not found, return a 404 Not Found error
    if (!book) {
        return res.status(404).json({ error: 'Book not found.' });
    }
    
    // Update the book's title and author if they are provided in the request body
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    
    // Respond with the updated book
    res.json(book);
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const initialLength = books.length;

    // Filter the array to remove the book with the specified ID
    books = books.filter(b => b.id !== bookId);
    
    // If the length of the array didn't change, the book was not found
    if (books.length === initialLength) {
        return res.status(404).json({ error: 'Book not found.' });
    }
    
    // Respond with a 204 No Content status code
    res.status(204).send();
});

// Step 4: Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});