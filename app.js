const express = require('express');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use('/', require('./routes'));

// Initialize database and start the server
mongodb.initDb((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
});
