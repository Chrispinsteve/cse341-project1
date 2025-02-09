const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUrl1 = process.env.MONGODB_URL;
const mongoUrl2 = process.env.MONGODB_PROJECTPERSO;

if (!mongoUrl1 || !mongoUrl2) {
    console.error('❌ One or both MongoDB connection strings are missing! Check .env file.');
    process.exit(1);
}

let project1DB, projectpersoDB; 

const connectDB = async () => {
    try {
        const client1 = new MongoClient(mongoUrl1);
        await client1.connect();
        project1DB = client1.db(); // Connect to the default DB in `MONGODB_URL`

        const client2 = new MongoClient(mongoUrl2);
        await client2.connect();
        projectpersoDB = client2.db(); // Connect to the default DB in `MONGODB_PROJECTPERSO`

        console.log('✅ Connected to Project1 Database');
        console.log('✅ Connected to ProjectPerso Database');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// Export database connections
module.exports = { connectDB, project1DB, projectpersoDB };
