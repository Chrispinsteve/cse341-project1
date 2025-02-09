// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./data/database');
const contactsRoutes = require('./routes/contactsRoutes');
const projectPersoRoutes = require('./routes/projectpersoRoutes');

// Load environment variables
dotenv.config();
console.log('✅ Environment variables loaded.');

// Initialize the app
const app = express();
app.use(express.json());

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
