const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const clientProjectPerso = new MongoClient(process.env.MONGODB_PROJECTPERSO, { useNewUrlParser: true, useUnifiedTopology: true });

let dbProject1;
let dbProjectPerso;

const initDb = (callback) => {
  client.connect()
    .then(() => {
      console.log('✅ Project1 Database connected successfully!');
      dbProject1 = client.db('project1');
      return clientProjectPerso.connect();
    })
    .then(() => {
      console.log('✅ ProjectPerso Database connected successfully!');
      dbProjectPerso = clientProjectPerso.db('projectperso');
      callback();
    })
    .catch((err) => {
      console.error('❌ Database connection failed', err);
      callback(err);
    });
};

module.exports = { dbProject1, dbProjectPerso, initDb };
