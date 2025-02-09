const { Schema } = require('mongoose');

const projectpersoSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  professionalName: { type: String, required: true },
  description: { type: String, required: true },
  birthday: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = projectpersoSchema;
