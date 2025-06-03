module.exports = {
  ROLES: {
    USER: 'user',
    ADMIN: 'admin',
  },
  GAME_STATUSES: ['owned', 'wishlist', 'playing', 'completed', 'dropped'],
  GAME_RATINGS: ['E', 'E10+', 'T', 'M', 'AO', 'RP'],
  MAX_RATING: 10,
  MIN_RATING: 1,
  DEFAULT_PAGE_LIMIT: 10,
  JWT_EXPIRES_IN: '1d',
};