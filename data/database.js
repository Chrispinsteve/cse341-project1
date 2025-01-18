const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
        .then((client) => {
            database = client.db(); // Correctly access the database instance
            console.log('Database connected successfully!');
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

module.exports = {
    initDb,       // Exported with lowercase 'Db'
    getDatabase,
};
