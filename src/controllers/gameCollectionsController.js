const gameCollectionService = require('../services/gameCollectionService');

/**
 * Controller for game collections
 */
const gameCollectionsController = {
  /**
   * Get all game collections
   */
  getAllCollections: async (req, res, next) => {
    try {
      const collections = await gameCollectionService.getAllCollections();
      res.status(200).json({
        success: true,
        count: collections.length,
        data: collections
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get a game collection by ID
   */
  getCollectionById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const collection = await gameCollectionService.getCollectionById(id);
      
      if (!collection) {
        const error = new Error('Game collection not found');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        success: true,
        data: collection
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create a new game collection
   */
  createCollection: async (req, res, next) => {
    try {
      const newCollection = await gameCollectionService.createCollection(req.body);
      res.status(201).json({
        success: true,
        data: newCollection
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update a game collection
   */
  updateCollection: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedCollection = await gameCollectionService.updateCollection(id, req.body);
      
      if (!updatedCollection) {
        const error = new Error('Game collection not found');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        success: true,
        data: updatedCollection
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete a game collection
   */
  deleteCollection: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await gameCollectionService.deleteCollection(id);
      
      if (!deleted) {
        const error = new Error('Game collection not found');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        success: true,
        message: 'Game collection deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = gameCollectionsController;