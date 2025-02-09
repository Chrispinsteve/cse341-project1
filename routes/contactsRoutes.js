const express = require('express');
const router = express.Router();
const { project1DB } = require('../data/database'); // Import connection

if (!project1DB) {
    console.error('❌ Database connection not established');
    process.exit(1);
}

const collection = project1DB.collection('project1'); // Ensure correct collection

// Example GET request
router.get('/', async (req, res) => {
    try {
        const contacts = await collection.find().toArray();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('❌ Error fetching contacts:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
