const { body, param, query } = require('express-validator');
const User = require('../models/User');
const Game = require('../models/Game');
const Collection = require('../models/Collection');
const Platform = require('../models/Platform');
const Genre = require('../models/Genre');

const userValidationRules = [
  body('username').notEmpty().isLength({ max: 50 }).custom(async (value) => {
    const user = await User.findOne({ where: { username: value } });
    if (user) throw new Error('Username already exists');
    return true;
  }),
  body('email').isEmail().custom(async (value) => {
    const user = await User.findOne({ where: { email: value } });
    if (user) throw new Error('Email already exists');
    return true;
  }),
  body('password').isLength({ min: 6 }),
  body('first_name').optional().isLength({ max: 50 }),
  body('last_name').optional().isLength({ max: 50 }),
];

const loginValidationRules = [
  body('email').isEmail(),
  body('password').notEmpty(),
];

const gameValidationRules = [
  body('title').notEmpty().isLength({ max: 255 }),
  body('external_api_id').optional().isLength({ max: 100 }),
  body('description').optional().isString(),
  body('release_date').optional().isDate(),
  body('genre').optional().isLength({ max: 100 }),
  body('platform').optional().isLength({ max: 100 }),
  body('developer').optional().isLength({ max: 100 }),
  body('publisher').optional().isLength({ max: 100 }),
  body('cover_image_url').optional().isURL({ require_protocol: false }),
  body('metacritic_score').optional().isInt({ min: 0, max: 100 }),
  body('rating').optional().isIn(['E', 'E10+', 'T', 'M', 'AO', 'RP']),
  body('platforms').optional().isArray().custom(async (value) => {
    const platforms = await Platform.findAll({ where: { id: value } });
    if (platforms.length !== value.length) throw new Error('Invalid platform IDs');
    return true;
  }),
  body('genres').optional().isArray().custom(async (value) => {
    const genres = await Genre.findAll({ where: { id: value } });
    if (genres.length !== value.length) throw new Error('Invalid genre IDs');
    return true;
  }),
];

const collectionValidationRules = [
  body('name').notEmpty().isLength({ max: 100 }),
  body('description').optional().isString(),
  body('is_public').optional().isBoolean(),
];

const collectionGameValidationRules = [
  body('game_id').isInt().custom(async (value) => {
    const game = await Game.findByPk(value);
    if (!game) throw new Error('Invalid game ID');
    return true;
  }),
  body('status').optional().isIn(['owned', 'wishlist', 'playing', 'completed', 'dropped']),
  body('rating').optional().isInt({ min: 1, max: 10 }),
  body('personal_notes').optional().isString(),
  body('play_time_hours').optional().isFloat({ min: 0 }),
  body('date_completed').optional().isDate(),
];

const idParamValidation = [
  param('id').isInt().custom(async (value, { req }) => {
    const model = req.baseUrl.includes('collections') ? Collection : Game;
    const item = await model.findByPk(value);
    if (!item) throw new Error('Invalid ID');
    return true;
  }),
];

module.exports = {
  userValidationRules,
  loginValidationRules,
  gameValidationRules,
  collectionValidationRules,
  collectionGameValidationRules,
  idParamValidation,
};