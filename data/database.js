// Import necessary modules
const { MongoClient } = require('mongodb');

// Load environment variables
require('dotenv').config();

// Initialize the MongoDB client
let project1DB;
let projectPersoDB;

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    // Connect to the project1 database
    const project1Client = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await project1Client.connect();
    project1DB = project1Client.db('project1'); // Use the project1 database
    console.log('✅ Connected to Project1 Database');

    // Connect to the projectperso database
    const projectPersoClient = new MongoClient(process.env.MONGODB_PROJECTPERSO, { useNewUrlParser: true, useUnifiedTopology: true });
    await projectPersoClient.connect();
    projectPersoDB = projectPersoClient.db('projectperso'); // Use the projectperso database
    console.log('✅ Connected to ProjectPerso Database');
  } catch (error) {
    console.error('❌ Failed to connect to databases:', error);
    throw error; // Rethrow error to handle it in app.js
  }
};

// Export the function and DB objects
module.exports = { connectToDatabase, project1DB, projectPersoDB };
