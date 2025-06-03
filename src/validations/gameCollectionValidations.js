const Joi = require('joi');

// Game schema
const gameSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string().required(),
  platform: Joi.string().required(),
  releaseYear: Joi.number().integer().min(1950).max(new Date().getFullYear())
});

// Collection schemas
const gameCollectionSchemas = {
  createCollection: Joi.object({
    name: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10).max(500),
    games: Joi.array().items(gameSchema).min(1).required()
  }),
  
  updateCollection: Joi.object({
    name: Joi.string().min(3).max(100),
    description: Joi.string().min(10).max(500),
    games: Joi.array().items(gameSchema).min(1)
  })
};

module.exports = {
  gameCollectionSchemas
};