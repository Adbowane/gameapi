const Game = require('./Game');
const Platform = require('./Platform');
const Collection = require('./Collection');
const CollectionGame = require('./CollectionGame');
const Genre = require('./Genre');

// Associations Game <-> Platform
Game.belongsToMany(Platform, { through: 'GamePlatform', foreignKey: 'game_id', otherKey: 'platform_id' });
Platform.belongsToMany(Game, { through: 'GamePlatform', foreignKey: 'platform_id', otherKey: 'game_id' });

// Associations Collection <-> Game
Collection.belongsToMany(Game, { through: CollectionGame, foreignKey: 'collection_id', otherKey: 'game_id' });
Game.belongsToMany(Collection, { through: CollectionGame, foreignKey: 'game_id', otherKey: 'collection_id' });

// Associations Game <-> Genre
Game.belongsToMany(Genre, { through: 'GameGenre', foreignKey: 'game_id', otherKey: 'genre_id' });
Genre.belongsToMany(Game, { through: 'GameGenre', foreignKey: 'genre_id', otherKey: 'game_id' });

module.exports = { Game, Platform, Collection, CollectionGame, Genre };