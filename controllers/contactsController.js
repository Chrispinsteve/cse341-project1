const { getDb } = require('../data/database');
const { ObjectId } = require('mongodb');

exports.getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving contacts', error: err });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const db = getDb();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving contact', error: err });
  }
};