const express = require('express');
const router = express.Router();
const { databases } = require('../data/database'); // Import databases object

router.get('/', async (req, res) => {
    try {
        if (!databases.project1DB) {
            return res.status(500).json({ error: 'Database connection not established' });
        }

        const collection = databases.project1DB.collection('project1'); // Use the correct collection
        const contacts = await collection.find().toArray();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('❌ Error fetching contacts:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
