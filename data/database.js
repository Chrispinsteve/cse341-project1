const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let db;

const initDb = async (callback) => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    db = client.db();
    console.log('Database connected successfully!');
    callback(null, db);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  if (!db) throw new Error('Database not initialized');
  return db;
};

module.exports = { initDb, getDb };
