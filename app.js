const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const { initDb } = require('./data/database');
const contactsRoutes = require('./routes/contactsRoutes');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, the app is running!');
});

app.use(express.json());
app.use('/contacts', contactsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

initDb((err) => {
  if (err) {
    console.error('Failed to connect to database', err);
    return;
  }
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
});
