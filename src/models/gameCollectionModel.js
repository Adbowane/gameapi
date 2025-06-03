// In a real application, this would interact with a database
// For this example, we'll use an in-memory array

// Sample data for game collections
let gameCollections = [
  {
    id: '1',
    name: 'Retro Nintendo Collection',
    description: 'Classic Nintendo games from the 80s and 90s',
    games: [
      { id: '1', title: 'Super Mario Bros.', platform: 'NES', releaseYear: 1985 },
      { id: '2', title: 'The Legend of Zelda', platform: 'NES', releaseYear: 1986 },
      { id: '3', title: 'Super Metroid', platform: 'SNES', releaseYear: 1994 }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'PlayStation Classics',
    description: 'Must-play PlayStation titles',
    games: [
      { id: '1', title: 'Final Fantasy VII', platform: 'PS1', releaseYear: 1997 },
      { id: '2', title: 'Metal Gear Solid', platform: 'PS1', releaseYear: 1998 },
      { id: '3', title: 'God of War', platform: 'PS2', releaseYear: 2005 }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Modern Indie Games',
    description: 'Outstanding independent games from recent years',
    games: [
      { id: '1', title: 'Hollow Knight', platform: 'Multi', releaseYear: 2017 },
      { id: '2', title: 'Celeste', platform: 'Multi', releaseYear: 2018 },
      { id: '3', title: 'Hades', platform: 'Multi', releaseYear: 2020 }
    ],
    createdAt: new Date().toISOString()
  }
];

/**
 * Game Collection Model
 */
const gameCollectionModel = {
  /**
   * Find all game collections
   */
  findAll: async () => {
    return [...gameCollections];
  },

  /**
   * Find a game collection by ID
   */
  findById: async (id) => {
    return gameCollections.find(collection => collection.id === id) || null;
  },

  /**
   * Create a new game collection
   */
  create: async (collectionData) => {
    const newCollection = {
      id: Date.now().toString(),
      ...collectionData,
      createdAt: new Date().toISOString()
    };
    gameCollections.push(newCollection);
    return newCollection;
  },

  /**
   * Update a game collection
   */
  update: async (id, collectionData) => {
    const index = gameCollections.findIndex(collection => collection.id === id);
    if (index === -1) return null;

    const updatedCollection = {
      ...gameCollections[index],
      ...collectionData,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    gameCollections[index] = updatedCollection;
    return updatedCollection;
  },

  /**
   * Delete a game collection
   */
  delete: async (id) => {
    const index = gameCollections.findIndex(collection => collection.id === id);
    if (index === -1) return false;

    gameCollections.splice(index, 1);
    return true;
  }
};

module.exports = gameCollectionModel;