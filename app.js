const express = require('express');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./data/database');
const contactsRoutes = require('./routes/contactsRoutes');
const projectPersoRoutes = require('./routes/projectpersoRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Load environment variables
dotenv.config();
console.log('✅ Environment variables loaded.');

// Initialize the app
const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project API',
      version: '1.0.0',
      description: 'API documentation for the Project1 and ProjectPerso databases',
    },
  },
  apis: ['./routes/*.js'], // Path to your route files for documentation
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use routes
app.use('/api/contacts', contactsRoutes);
app.use('/api/projectperso', projectPersoRoutes);

// Start the server after database connection
const PORT = process.env.PORT || 3000;

// Connect to the databases and start the server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to connect to databases:', error);
  });
