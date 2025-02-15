const { Schema } = require('mongoose');

const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  favoriteColor: { type: String, required: true },
  birthday: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = contactSchema;
