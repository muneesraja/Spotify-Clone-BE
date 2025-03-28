# Spotify Clone API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication

### Register User
```
POST /auth/register
```

**Request Body**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

**Response (201 Created)**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "username",
  "isActive": true,
  "createdAt": "2025-03-28T00:00:00.000Z",
  "updatedAt": "2025-03-28T00:00:00.000Z"
}
```

### Login
```
POST /auth/login
```

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK)**
```json
{
  "access_token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username"
  }
}
```

## Albums

### Get All Albums
```
GET /albums
```

**Response (200 OK)**
```json
[
  {
    "id": "uuid",
    "title": "Album Title",
    "imageUrl": "https://example.com/album.jpg",
    "releaseDate": "2023-01-01",
    "artistId": "uuid",
    "createdAt": "2025-03-28T00:00:00.000Z",
    "updatedAt": "2025-03-28T00:00:00.000Z",
    "artist": {
      "id": "uuid",
      "name": "Artist Name",
      "imageUrl": "https://example.com/artist.jpg",
      "description": "Artist description"
    }
  }
]
```

### Get Album by ID
```
GET /albums/:id
```

**Response (200 OK)**
```json
{
  "id": "uuid",
  "title": "Album Title",
  "imageUrl": "https://example.com/album.jpg",
  "releaseDate": "2023-01-01",
  "artistId": "uuid",
  "createdAt": "2025-03-28T00:00:00.000Z",
  "updatedAt": "2025-03-28T00:00:00.000Z",
  "artist": {
    "id": "uuid",
    "name": "Artist Name",
    "imageUrl": "https://example.com/artist.jpg",
    "description": "Artist description"
  },
  "songs": [
    {
      "id": "uuid",
      "title": "Song Title",
      "duration": 180,
      "url": "https://example.com/song.mp3",
      "imageUrl": "https://example.com/song.jpg",
      "albumId": "uuid",
      "artistId": "uuid",
      "isFeatured": false,
      "releaseDate": "2023-01-01"
    }
  ]
}
```

## Songs

### Get All Songs
```
GET /songs
```

**Response (200 OK)**
```json
[
  {
    "id": "uuid",
    "title": "Song Title",
    "duration": 180,
    "url": "https://example.com/song.mp3",
    "imageUrl": "https://example.com/song.jpg",
    "albumId": "uuid",
    "artistId": "uuid",
    "isFeatured": false,
    "releaseDate": "2023-01-01",
    "createdAt": "2025-03-28T00:00:00.000Z",
    "updatedAt": "2025-03-28T00:00:00.000Z",
    "artist": {
      "id": "uuid",
      "name": "Artist Name"
    },
    "album": {
      "id": "uuid",
      "title": "Album Title"
    }
  }
]
```

### Get Featured Songs
```
GET /songs/featured
```

**Response (200 OK)**
```json
[
  {
    "id": "uuid",
    "title": "Featured Song",
    "duration": 180,
    "url": "https://example.com/song.mp3",
    "imageUrl": "https://example.com/song.jpg",
    "albumId": "uuid",
    "artistId": "uuid",
    "isFeatured": true,
    "releaseDate": "2023-01-01",
    "artist": {
      "id": "uuid",
      "name": "Artist Name"
    },
    "album": {
      "id": "uuid",
      "title": "Album Title"
    }
  }
]
```

### Search Songs
```
GET /songs/search?q=query
```

**Response (200 OK)**
```json
[
  {
    "id": "uuid",
    "title": "Song With Query",
    "duration": 180,
    "url": "https://example.com/song.mp3",
    "imageUrl": "https://example.com/song.jpg",
    "albumId": "uuid",
    "artistId": "uuid",
    "isFeatured": false,
    "releaseDate": "2023-01-01",
    "artist": {
      "id": "uuid",
      "name": "Artist Name"
    },
    "album": {
      "id": "uuid",
      "title": "Album Title"
    }
  }
]
```

### Like a Song (Protected)
```
POST /songs/:id/like
```

**Headers**
```
Authorization: Bearer jwt_token_here
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Song \"Song Title\" added to your liked songs"
}
```

### Unlike a Song (Protected)
```
DELETE /songs/:id/like
```

**Headers**
```
Authorization: Bearer jwt_token_here
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Song \"Song Title\" removed from your liked songs"
}
```

## User

### Get User's Liked Songs (Protected)
```
GET /users/me/liked-songs
```

**Headers**
```
Authorization: Bearer jwt_token_here
```

**Response (200 OK)**
```json
[
  {
    "id": "uuid",
    "title": "Liked Song",
    "duration": 180,
    "url": "https://example.com/song.mp3",
    "imageUrl": "https://example.com/song.jpg",
    "albumId": "uuid",
    "artistId": "uuid",
    "isFeatured": false,
    "releaseDate": "2023-01-01",
    "artist": {
      "id": "uuid",
      "name": "Artist Name"
    },
    "album": {
      "id": "uuid",
      "title": "Album Title"
    }
  }
]
```

## Error Handling

### Invalid UUID Format
```
GET /songs/invalid-id
```

**Response (400 Bad Request)**
```json
{
  "statusCode": 400,
  "message": "Invalid ID format: invalid-id is not a valid UUID",
  "error": "Bad Request"
}
```

### Resource Not Found
```
GET /songs/00000000-0000-0000-0000-000000000000
```

**Response (404 Not Found)**
```json
{
  "statusCode": 404,
  "message": "Song with ID \"00000000-0000-0000-0000-000000000000\" not found",
  "error": "Not Found"
}
```

### Unauthorized Access
```
POST /songs/:id/like
```
(without authentication token)

**Response (401 Unauthorized)**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
``` 