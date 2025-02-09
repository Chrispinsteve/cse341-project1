const express = require('express');
const router = express.Router();
const { project1DB } = require('../data/database');  // Assuming you export your DB connection here

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API to manage contacts
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     tags: [Contacts]
 *     summary: Retrieve all contacts
 *     description: Returns a list of all contacts from the project1 database
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   birthday:
 *                     type: string
 *                   favoriteColor:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   studies:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req, res) => {
  try {
    const contacts = await project1DB.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     tags: [Contacts]
 *     summary: Retrieve a single contact by ID
 *     description: Returns a single contact from the project1 database based on the contact ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The contact's ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single contact
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 birthday:
 *                   type: string
 *                 favoriteColor:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 studies:
 *                   type: string
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await project1DB.collection('contacts').findOne({ _id: new require('mongodb').ObjectId(id) });
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contact' });
  }
});

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     tags: [Contacts]
 *     summary: Create a new contact
 *     description: Adds a new contact to the project1 database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               birthday:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               phone:
 *                 type: string
 *               studies:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req, res) => {
  try {
    const newContact = req.body;

    if (!newContact.firstName || !newContact.lastName || !newContact.email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await project1DB.collection('contacts').insertOne(newContact);
    res.status(201).json({ message: 'Contact created successfully', contact: result.ops[0] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create contact' });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     tags: [Contacts]
 *     summary: Update an existing contact
 *     description: Updates a contact's details in the project1 database based on the contact ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The contact's ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               birthday:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               phone:
 *                 type: string
 *               studies:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       404:
 *         description: Contact not found
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = req.body;

    if (!updatedContact.firstName || !updatedContact.lastName || !updatedContact.email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await project1DB.collection('contacts').updateOne(
      { _id: new require('mongodb').ObjectId(id) },
      { $set: updatedContact }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Contact not found or no changes made' });
    }

    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update contact' });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     tags: [Contacts]
 *     summary: Delete a contact
 *     description: Removes a contact from the project1 database based on the contact ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The contact's ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await project1DB.collection('contacts').deleteOne({ _id: new require('mongodb').ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contact' });
  }
});

module.exports = router;
