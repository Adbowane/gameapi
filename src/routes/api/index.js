const express = require('express');
const gameCollectionsRoutes = require('./gameCollections');

const router = express.Router();

router.use('/gamescollections', gameCollectionsRoutes);

module.exports = router;