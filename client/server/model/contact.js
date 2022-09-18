const mongoose = require("mongoose");
const Joi = require("joi");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 400,
  },
  message: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 4000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

function validateContact(contact) {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(255),
    email: Joi.string().required().min(6).max(400),
    message: Joi.string().required().min(2).max(4000),
  });
  return schema.validate(contact);
}

module.exports = { validateContact, Contact };
