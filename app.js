const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const contactsRoutes = require('./routes/contactsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use('/api/contacts', contactsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
