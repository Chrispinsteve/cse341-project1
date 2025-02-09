const express = require('express');
const { projectPersoDB } = require('../data/database');  // Ensure correct import
const router = express.Router();

// GET all contacts from projectperso collection
router.get('/', async (req, res) => {
  try {
    const contacts = await projectPersoDB.collection('projectperso').find().toArray();  // Use projectperso collection
    res.status(200).json(contacts);
  } catch (error) {
    console.error('❌ Error fetching projectperso contacts:', error);
    res.status(500).json({ message: 'Failed to fetch projectperso contacts' });
  }
});

// Other CRUD routes (POST, PUT, DELETE) can follow a similar pattern

module.exports = router;
