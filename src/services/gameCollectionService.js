const gameCollectionModel = require('../models/gameCollectionModel');

/**
 * Service for handling game collection business logic
 */
const gameCollectionService = {
  /**
   * Get all game collections
   */
  getAllCollections: async () => {
    return await gameCollectionModel.findAll();
  },

  /**
   * Get a game collection by ID
   */
  getCollectionById: async (id) => {
    return await gameCollectionModel.findById(id);
  },

  /**
   * Create a new game collection
   */
  createCollection: async (collectionData) => {
    return await gameCollectionModel.create(collectionData);
  },

  /**
   * Update a game collection
   */
  updateCollection: async (id, collectionData) => {
    return await gameCollectionModel.update(id, collectionData);
  },

  /**
   * Delete a game collection
   */
  deleteCollection: async (id) => {
    return await gameCollectionModel.delete(id);
  }
};

module.exports = gameCollectionService;