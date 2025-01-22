const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database already initialized!');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client.db(); // Access database instance
            console.log('Connected to MongoDB!');
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

module.exports = { initDb, getDatabase };
