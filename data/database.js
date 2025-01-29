const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let db;

const initDb = async (callback) => {
  // Check if the database is already initialized
  if (db) {
    console.log("Database is already initialized!");
    return callback(null, db);
  }

  // Ensure the MONGODB_URL is set in the environment variables
  if (!process.env.MONGODB_URL) {
    console.error("MONGODB_URL is not set in environment variables.");
    return callback(new Error("Missing MONGODB_URL in environment variables."));
  }

  // Attempt to connect to the database
  try {
    console.log("Attempting to connect to database...");
    const client = await MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    db = client.db();
    console.log('✅ Database connected successfully!');
    callback(null, db);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    callback(err);
  }
};

const getDb = () => {
  if (!db) throw new Error('Database not initialized. Call initDb first.');
  return db;
};

module.exports = { initDb, getDb };
