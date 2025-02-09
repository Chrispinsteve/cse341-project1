const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const mongoUrl1 = process.env.MONGODB_URL;
    const mongoUrl2 = process.env.MONGODB_PROJECTPERSO;

    if (!mongoUrl1 || !mongoUrl2) {
        console.error('❌ One or both MongoDB connection strings are missing! Check .env file.');
        process.exit(1);
    }

    try {
        await mongoose.createConnection(mongoUrl1);
        console.log('✅ Connected to Project1 Database');

        await mongoose.createConnection(mongoUrl2);
        console.log('✅ Connected to ProjectPerso Database');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
