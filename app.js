const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const contactsRoutes = require('./routes/contactsRoutes'); 
const projectpersoRoutes = require('./routes/projectpersoRoutes'); 

app.use('/api/contacts', contactsRoutes); 
app.use('/api/projectperso', projectpersoRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
