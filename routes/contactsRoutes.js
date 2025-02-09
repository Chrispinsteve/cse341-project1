const express = require('express');
const { project1DB } = require('../data/database');
const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await project1DB.collection('project1').find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});

// Other CRUD routes (POST, PUT, DELETE) can follow a similar pattern

module.exports = router;
