const express = require('express');
const router = express.Router();
const mongodb = require('../data/database'); // Adjust path if necessary
const ObjectId = require('mongodb').ObjectId;

router.get('/documents/:id', async (req, res) => {
    const db = mongodb.getDatabase(); // Get the database instance
    const collection = db.collection('project1'); // Access the collection

    try {
        const docId = req.params.id; // Get the ID from the URL
        const doc = await collection.findOne({ _id: ObjectId(docId) }); // Query the document
        if (doc) {
            res.json(doc); // Respond with the document
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;