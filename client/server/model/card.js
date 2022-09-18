const mongoose = require("mongoose");
const Joi = require("joi");

const cardSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  dishDescription: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 2048,
  },
  dishIngredients: {
    type: Array,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  dishInstructions: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 4096,
  },
  dishImage: {
    type: String || Object,
    minLength: 11,
    maxLength: 1024,
  },
  dishPreparationTime: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  dishDifficulty: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  favoriteNumber: {
    type: Number,
    required: true,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Card = mongoose.model("Card", cardSchema);

function validateCard(values) {
  const schema = Joi.object({
    dishName: Joi.string().min(2).max(255).required(),
    dishDescription: Joi.string().min(2).max(2048).required(),
    dishIngredients: Joi.array()
      .items(Joi.string().min(2).max(255).required())
      .required(),
    dishInstructions: Joi.string().min(2).max(4096).required(),
    dishPreparationTime: Joi.string().min(2).max(20).required(),
    dishDifficulty: Joi.string().min(2).max(20).required(),
    label: Joi.string(),
    favoriteNumber: Joi.number().required(),
    dishImage: Joi.string(),
  });

  return schema.validate(values);
}

module.exports = { validateCard, Card };
