# Spotify Clone API (Nidana)

A NestJS backend API for a Spotify-like music streaming application. This backend serves as the data management and business logic layer for the Spotify Clone project.

## Features

- **User Authentication**: Register, login, and JWT token-based authentication
- **Music Library**: Browse albums, artists, and songs
- **Search**: Search for songs, albums, and artists
- **Like System**: Add songs to favorites and view liked songs
- **Featured Content**: Discover trending and featured songs

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT & Passport
- **API Documentation**: Postman Collection

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Albums
- `GET /albums` - Get all albums
- `GET /albums/:id` - Get album details with its songs
- `POST /albums` - Create a new album (protected)

### Songs
- `GET /songs` - Get all songs
- `GET /songs/:id` - Get song details
- `GET /songs/featured` - Get featured/trending songs
- `GET /songs/search?q=query` - Search songs by title
- `POST /songs` - Create a new song (protected)
- `POST /songs/:id/like` - Like a song (protected)
- `DELETE /songs/:id/like` - Unlike a song (protected)

### User
- `GET /users/me/liked-songs` - Get current user's liked songs (protected)

## Getting Started

### Prerequisites

- Node.js (>= 18.x)
- npm or yarn
- PostgreSQL database

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=postgresql://username:password@localhost:5432/spotify
JWT_SECRET=your_jwt_secret_key
```

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run start:dev

# Seed the database with initial data
npm run seed
```

### Database Seeding

The application includes seed data for testing and development. Run the database seeder to populate your database with sample data:

```bash
npm run seed
```

This will create sample artists, albums, and songs.

## Error Handling

The API includes comprehensive error handling:

- Validation errors for invalid input data
- UUID format validation for IDs
- Not found errors for non-existent resources
- Authentication errors for protected routes

## Authentication

Protected routes require a JWT token. To access these routes:

1. Create a user with `POST /auth/register`
2. Login with `POST /auth/login`
3. Use the returned token in the Authorization header:
   `Authorization: Bearer your_token_here`

## Future Enhancements

- Playlists management
- User profile management
- Song recommendations
- Advanced search features
- Admin dashboard

## Version History

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.

## License

This project is proprietary and part of Nidana assessment. 