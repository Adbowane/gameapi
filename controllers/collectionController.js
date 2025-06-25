const { validationResult } = require('express-validator');
const Collection = require('../models/Collection');
const Game = require('../models/Game');
const CollectionGame = require('../models/CollectionGame');
const { logAction } = require('../services/logService');

const createCollection = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const collection = await Collection.create({
      ...req.body,
      user_id: req.user.userId,
    });

    await logAction(req.user.userId, 'create_collection', 'collections', collection.id, null, req.body);
    res.status(201).json(collection);
  } catch (error) {
    next(error);
  }
};

const getUserCollections = async (req, res, next) => {
  try {
    const collections = await Collection.findAll({
      where: { user_id: req.user.userId },
      include: [{ model: Game, through: CollectionGame }],
    });
    res.json(collections);
  } catch (error) {
    next(error);
  }
};

const getCollectionById = async (req, res, next) => {
  try {
    const collection = await Collection.findOne({
      where: { id: req.params.id, user_id: req.user.userId },
      include: [{ model: Game, through: CollectionGame }],
    });
    if (!collection) return res.status(404).json({ message: 'Collection not found' });
    res.json(collection);
  } catch (error) {
    next(error);
  }
};

const updateCollection = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const collection = await Collection.findOne({
      where: { id: req.params.id, user_id: req.user.userId },
    });
    if (!collection) return res.status(404).json({ message: 'Collection not found' });

    const oldValues = collection.toJSON();
    await collection.update(req.body);
    await logAction(req.user.userId, 'update_collection', 'collections', collection.id, oldValues, req.body);
    res.json(collection);
  } catch (error) {
    next(error);
  }
};

const deleteCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findOne({
      where: { id: req.params.id, user_id: req.user.userId },
    });
    if (!collection) return res.status(404).json({ message: 'Collection not found' });

    await collection.destroy();
    await logAction(req.user.userId, 'delete_collection', 'collections', collection.id, collection.toJSON(), null);
    res.json({ message: 'Collection deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const addGameToCollection = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { game_id, status, rating, personal_notes, play_time_hours, date_completed } = req.body;
    const collection = await Collection.findOne({
      where: { id: req.params.id, user_id: req.user.userId },
    });
    if (!collection) return res.status(404).json({ message: 'Collection not found' });

    const collectionGame = await CollectionGame.create({
      collection_id: req.params.id,
      game_id,
      status,
      rating,
      personal_notes,
      play_time_hours,
      date_completed,
    });

    await logAction(req.user.userId, 'add_game_to_collection', 'collection_games', collectionGame.id, null, req.body);
    res.status(201).json(collectionGame);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCollection,
  getUserCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
  addGameToCollection,
};