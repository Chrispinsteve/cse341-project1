const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// Define routes
router.post('/', contactsController.createContact);
router.get('/', contactsController.getAllContacts);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
