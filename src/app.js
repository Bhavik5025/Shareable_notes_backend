const express = require("express");
const cors = require("cors"); // Import CORS middleware
const app = express();
require("../db_connection/conn"); // Assuming this file establishes the DB connection
const Router = require("../routers/notes_api.js");
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
    origin: "http://localhost:3001", // Change this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Use the Router module
app.use(Router);

// Starting the server and logging the port it listens on
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Catch-all for any unexpected routes
app.use((req, res, next) => {
    res.status(404).send("Sorry, this route does not exist");
});
