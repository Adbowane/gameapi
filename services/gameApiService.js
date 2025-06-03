const axios = require('axios');

class GameApiService {
  constructor() {
    this.apiBaseUrl = process.env.GAME_API_URL || 'https://api.example.com/games';
    this.apiKey = process.env.GAME_API_KEY;
  }

  async fetchGameById(externalId) {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/${externalId}`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch game: ${error.message}`);
    }
  }

  async searchGames(query) {
    try {
      const response = await axios.get(this.apiBaseUrl, {
        params: { search: query },
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search games: ${error.message}`);
    }
  }

  async fetchGameDetails(externalId) {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/${externalId}/details`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch game details: ${error.message}`);
    }
  }
}

module.exports = new GameApiService();