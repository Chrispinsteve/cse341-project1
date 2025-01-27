const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all contacts
const getAllContacts = async (req, res) => {
    const db = mongodb.getDatabase();
    const collection = db.collection('contacts');
    try {
        const contacts = await collection.find({}).toArray();
        res.json(contacts);
    } catch (err) {
        res.status(500).send('Error fetching contacts');
    }
};

// Get contact by ID
const getContactById = async (req, res) => {
    const db = mongodb.getDatabase();
    const collection = db.collection('contacts');
    try {
        const contact = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!contact) return res.status(404).send('Contact not found');
        res.json(contact);
    } catch (err) {
        res.status(500).send('Error fetching contact');
    }
};

// Create a new contact
const createContact = async (req, res) => {
    const db = mongodb.getDatabase();
    const collection = db.collection('contacts');
    try {
        const newContact = req.body;
        const result = await collection.insertOne(newContact);
        res.status(201).json(result.ops[0]);
    } catch (err) {
        res.status(500).send('Error creating contact');
    }
};

// Update a contact
const updateContact = async (req, res) => {
    const db = mongodb.getDatabase();
    const collection = db.collection('contacts');
    try {
        const updates = req.body;
        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updates }
        );
        if (result.matchedCount === 0) return res.status(404).send('Contact not found');
        res.send('Contact updated successfully');
    } catch (err) {
        res.status(500).send('Error updating contact');
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    const db = mongodb.getDatabase();
    const collection = db.collection('contacts');
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).send('Contact not found');
        res.send('Contact deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting contact');
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
};
