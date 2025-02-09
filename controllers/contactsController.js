const { dbProject1, dbProjectPerso } = require('../data/database');
const { ObjectId } = require('mongodb');

// Create Contact
exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, birthday, phone, professionalName, description, studies } = req.body;
    // Data Validation
    if (!firstName || !lastName || !email || !birthday || !phone || !professionalName || !description || !studies) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const contact = { firstName, lastName, email, birthday, phone, professionalName, description, studies };
    const result = await dbProject1.collection('contacts').insertOne(contact);
    
    res.status(201).json({ message: 'Contact created successfully', contact: result.ops[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error creating contact', error: err.message });
  }
};

// Get All Contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await dbProject1.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts', error: err.message });
  }
};

// Update Contact
exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, birthday, phone, professionalName, description, studies } = req.body;

    if (!firstName || !lastName || !email || !birthday || !phone || !professionalName || !description || !studies) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const updatedContact = await dbProject1.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (updatedContact.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating contact', error: err.message });
  }
};

// Delete Contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await dbProject1.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (deletedContact.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact', error: err.message });
  }
};
