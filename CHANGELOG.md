# Changelog

## [1.1.0] - 2025-03-28

### Changed
- Refactored user registration route from `/users` to `/auth/register` to consolidate all authentication-related routes under the `/auth` prefix
- Updated API documentation to reflect the new route structure
- Fixed testing to use the updated routes
- Fixed song ID validation and error handling in end-to-end tests

### Added
- Comprehensive tests for DTOs (CreateSongDto, CreateAlbumDto, CreateArtistDto)
- New Jest configuration for DTO tests (`jest-dto.json`)
- New npm script `test:dto` for running DTO validation tests

## [1.0.0] - 2025-03-27

### Added
- Initial release of the Spotify Clone API
- User authentication with JWT
- CRUD operations for songs, albums, and artists
- Features for liking/unliking songs
- Search functionality
- Featured songs

### Changed
- Initial release, no changes yet.

### Fixed
- UUID validation for route parameters
- Clear error messages for invalid UUIDs
- Response format standardization for like/unlike operations 