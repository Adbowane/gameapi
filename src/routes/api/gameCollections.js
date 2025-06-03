const express = require('express');
const gameCollectionsController = require('../../controllers/gameCollectionsController');
const validateRequest = require('../../middleware/validateRequest');
const { gameCollectionSchemas } = require('../../validations/gameCollectionValidations');

const router = express.Router();

/**
 * @route   GET /api/gamescollections
 * @desc    Get all game collections
 * @access  Public
 */
router.get('/', gameCollectionsController.getAllCollections);

/**
 * @route   GET /api/gamescollections/:id
 * @desc    Get a game collection by ID
 * @access  Public
 */
router.get('/:id', gameCollectionsController.getCollectionById);

/**
 * @route   POST /api/gamescollections
 * @desc    Create a new game collection
 * @access  Public
 */
router.post(
  '/', 
  validateRequest(gameCollectionSchemas.createCollection), 
  gameCollectionsController.createCollection
);

/**
 * @route   PUT /api/gamescollections/:id
 * @desc    Update a game collection
 * @access  Public
 */
router.put(
  '/:id', 
  validateRequest(gameCollectionSchemas.updateCollection), 
  gameCollectionsController.updateCollection
);

/**
 * @route   DELETE /api/gamescollections/:id
 * @desc    Delete a game collection
 * @access  Public
 */
router.delete('/:id', gameCollectionsController.deleteCollection);

module.exports = router;