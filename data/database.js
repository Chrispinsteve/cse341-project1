const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables

const project1URI = process.env.MONGODB_PROJECT1;
const projectPersoURI = process.env.MONGODB_PROJECTPERSO;

if (!project1URI || !projectPersoURI) {
  console.error("❌ One or both MongoDB connection strings are missing! Check .env file.");
  process.exit(1);
}

const project1Client = new MongoClient(project1URI, { useNewUrlParser: true, useUnifiedTopology: true });
const projectPersoClient = new MongoClient(projectPersoURI, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await project1Client.connect();
    await projectPersoClient.connect();
    console.log("✅ Connected to both Project1 and ProjectPerso databases!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

connectDB();

module.exports = {
  project1DB: project1Client.db('project1'),
  projectPersoDB: projectPersoClient.db('projectperso')
};
