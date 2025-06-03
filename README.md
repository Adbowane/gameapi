# Video Game Collections API

A RESTful API for managing video game collections, built with Express.js.

## Features

- Full CRUD operations for video game collections
- RESTful API design
- Input validation
- Error handling
- Modular architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Game Collections

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/gamescollections | Get all game collections |
| GET | /api/gamescollections/:id | Get a specific game collection |
| POST | /api/gamescollections | Create a new game collection |
| PUT | /api/gamescollections/:id | Update a game collection |
| DELETE | /api/gamescollections/:id | Delete a game collection |

## Project Structure

```
src/
├── app.js             # Express app setup
├── server.js          # Entry point
├── config/            # Configuration settings
├── routes/            # Route definitions
├── controllers/       # Route controllers
├── models/            # Data models
├── services/          # Business logic
├── middleware/        # Custom middleware
├── validations/       # Request validation schemas
```

## Running in Production

```
npm start
```

## License

MIT