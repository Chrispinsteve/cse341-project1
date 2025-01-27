const express = require('express');
const mongodb = require('./data/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/contacts', require('./routes/contacts'));

// Connect to database and start server
mongodb.initDb((err) => {
    if (err) {
        console.error('Failed to connect to database:', err);
    } else {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    }
});
