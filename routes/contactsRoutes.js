const express = require('express');
const router = express.Router();
const { project1DB } = require('../data/database');

const collection = project1DB.collection('project1'); // Ensure correct collection

router.get('/', async (req, res) => {
  try {
    const contacts = await collection.find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts from Project1" });
  }
});

module.exports = router;
