const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const authMiddleware = require('../middleware/auth');
const { collectionValidationRules, collectionGameValidationRules, idParamValidation } = require('../middleware/validation');

router.post('/', authMiddleware, collectionValidationRules, collectionController.createCollection);
router.get('/', authMiddleware, collectionController.getUserCollections);
router.get('/:id', authMiddleware, idParamValidation, collectionController.getCollectionById);
router.put('/:id', authMiddleware, collectionValidationRules, idParamValidation, collectionController.updateCollection);
router.delete('/:id', authMiddleware, idParamValidation, collectionController.deleteCollection);
router.post('/:id/games', authMiddleware, collectionGameValidationRules, idParamValidation, collectionController.addGameToCollection);

module.exports = router;