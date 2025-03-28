# Spotify Clone Database Schema

## Core Entities

### User
- `id`: UUID (PK)
- `email`: String (Unique)
- `username`: String
- `password`: String (Hashed)
- `isActive`: Boolean
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Artist
- `id`: UUID (PK)
- `name`: String
- `imageUrl`: String
- `description`: Text (Optional)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Album
- `id`: UUID (PK)
- `title`: String
- `imageUrl`: String
- `releaseDate`: Date
- `artistId`: UUID (FK to Artist)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Song
- `id`: UUID (PK)
- `title`: String
- `duration`: Integer (in seconds)
- `url`: String (audio file path)
- `imageUrl`: String (Optional, can use album cover if not provided)
- `albumId`: UUID (FK to Album)
- `artistId`: UUID (FK to Artist)
- `isFeatured`: Boolean (for trending section)
- `releaseDate`: Date
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### User_Liked_Songs (Junction Table)
- `id`: UUID (PK)
- `userId`: UUID (FK to User)
- `songId`: UUID (FK to Song)
- `likedAt`: Timestamp

## Relationships

1. **One-to-Many**: Artist → Albums
   - An artist can have many albums
   - Each album belongs to one artist

2. **One-to-Many**: Album → Songs
   - An album contains many songs
   - Each song belongs to one album

3. **One-to-Many**: Artist → Songs
   - An artist can have many songs
   - Each song belongs to one primary artist (ignoring features for simplicity)

4. **Many-to-Many**: User ↔ Songs (for liked songs)
   - A user can like many songs
   - A song can be liked by many users
   - Relationship stored in User_Liked_Songs junction table

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Artists
- `GET /artists` - Get all artists
- `GET /artists/:id` - Get artist details with their songs

### Albums
- `GET /albums` - Get all albums
- `GET /albums/:id` - Get album details with its songs

### Songs
- `GET /songs` - Get all songs
- `GET /songs/featured` - Get featured/trending songs
- `GET /songs/search?q=query` - Search songs by title
- `POST /songs/:id/like` - Like a song
- `DELETE /songs/:id/like` - Unlike a song
- `GET /users/me/liked-songs` - Get current user's liked songs
