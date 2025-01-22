const express = require('express');
const router = express.Router();
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Home route
router.get('/', (req, res) => {
    res.send('Welcome to the Project1 API!');
});

// Fetch all documents
router.get('/documents', async (req, res) => {
    const db = mongodb.getDatabase();
    const collection = db.collection('project1'); // Replace with your collection name

    try {
        const documents = await collection.find({}).toArray();
        res.json(documents); // Return all documents as JSON
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch documents.');
    }
});

// Fetch a specific document by ID
router.get('/documents/:id', async (req, res) => {
    const db = mongodb.getDatabase();
    const collection = db.collection('project1'); // Replace with your collection name

    try {
        const documentId = req.params.id; // Get the ID from the URL
        const document = await collection.findOne({ _id: new ObjectId(documentId) }); // Find the document by ID

        if (!document) {
            res.status(404).send('Document not found.');
        } else {
            res.json(document); // Return the found document
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch document.');
    }
});

module.exports = router;
