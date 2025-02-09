const express = require('express');
const { connectDB } = require('./data/database'); // Import connectDB
const contactsRoutes = require('./routes/contactsRoutes');
const projectpersoRoutes = require('./routes/projectpersoRoutes');

const app = express();
app.use(express.json());

const startServer = async () => {
    await connectDB(); // Ensure database connection first
    app.use('/contacts', contactsRoutes);
    app.use('/projectperso', projectpersoRoutes);
    console.log('✅ Routes initialized successfully');
};

startServer().catch((err) => {
    console.error('❌ Failed to initialize database:', err);
    process.exit(1);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
