const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
    const uri = process.env.MONGODB_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB successfully!');
        const db = client.db('project1'); // Ensure this matches your database name
        console.log('Accessed database:', db.databaseName);
    } catch (err) {
        console.error('Connection failed:', err.message);
    } finally {
        await client.close();
    }
}

testConnection();
