RESTful Book API
This project is a RESTful API for managing a list of books. It was built using Node.js and Express. The API provides CRUD (Create, Read, Update, Delete) functionality, with all book data stored in an in-memory array. This means no database is required, making the setup lightweight and fast.

What I Did
Initialized the Project: I set up a new Node.js project using npm init and installed the Express framework.

Created the Server: I wrote the core server code in index.js, which listens for requests on port 3000.

Implemented In-Memory Storage: I created a JavaScript array to act as a temporary database for storing book objects, each with a unique ID, title, and author.

Developed API Endpoints: I defined the four key RESTful endpoints to handle all data operations:

GET /books: Fetches the entire list of books.

POST /books: Adds a new book to the collection.

PUT /books/:id: Updates an existing book based on its ID.

DELETE /books/:id: Removes a specific book from the list.

Tested with Postman: I used Postman to verify that each endpoint works correctly, ensuring the API responds with the expected data and HTTP status codes.