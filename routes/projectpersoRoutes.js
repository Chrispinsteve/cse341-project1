const express = require('express');
const router = express.Router();
const { projectPersoDB } = require('../data/database');

const collection = projectPersoDB.collection('projectperso'); // Ensure correct collection

router.get('/', async (req, res) => {
  try {
    const contacts = await collection.find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts from ProjectPerso" });
  }
});

module.exports = router;
