const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getDocumentById = async (req, res) => {
    const db = mongodb.getDatabase();
    const collection = db.collection('project1');

    try {
        const docId = req.params.id;
        const doc = await collection.findOne({ _id: ObjectId(docId) });
        if (doc) {
            res.json(doc);
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = {
    getDocumentById,
};
