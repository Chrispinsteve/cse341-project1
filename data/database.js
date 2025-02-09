const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUrl1 = process.env.MONGODB_URL; // For project1
const mongoUrl2 = process.env.MONGODB_PROJECTPERSO; // For projectperso

if (!mongoUrl1 || !mongoUrl2) {
    console.error('❌ One or both MongoDB connection strings are missing! Check .env file.');
    process.exit(1);
}

let databases = {}; // Store database connections

const connectDB = async () => {
    try {
        const client1 = new MongoClient(mongoUrl1, { useNewUrlParser: true, useUnifiedTopology: true });
        await client1.connect();
        databases.project1DB = client1.db(); // Assign the first DB

        const client2 = new MongoClient(mongoUrl2, { useNewUrlParser: true, useUnifiedTopology: true });
        await client2.connect();
        databases.projectpersoDB = client2.db(); // Assign the second DB

        console.log('✅ Connected to Project1 Database');
        console.log('✅ Connected to ProjectPerso Database');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = { connectDB, databases };
