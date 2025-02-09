const express = require('express');
const { connectDB } = require('./data/database'); // Import connectDB
const contactsRoutes = require('./routes/contactsRoutes');
const projectpersoRoutes = require('./routes/projectpersoRoutes');

const app = express();
app.use(express.json());

// Ensure database connects before setting up routes
connectDB().then(() => {
    app.use('/contacts', contactsRoutes);
    app.use('/projectperso', projectpersoRoutes);
    console.log('✅ Routes initialized successfully');
}).catch(err => {
    console.error('❌ Failed to initialize database:', err);
    process.exit(1);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
