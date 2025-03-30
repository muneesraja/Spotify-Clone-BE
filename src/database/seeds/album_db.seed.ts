import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';

// Define interfaces for seed data types
interface ArtistSeedData {
  name: string;
  imageUrl: string;
  description: string;
  isFeatured?: boolean;
}

interface AlbumSeedData {
  title: string;
  imageUrl: string;
  releaseDate: string;
  artistId?: string; // Old format
  artistName?: string; // New format
  isFeatured?: boolean;
}

/**
 * Seeds the database with artists and albums from JavaScript data files
 */
export async function seedAlbumDatabase(dataSource: DataSource) {
  console.log('Starting album database seeding process...');
  const artistRepository = dataSource.getRepository(Artist);
  const albumRepository = dataSource.getRepository(Album);

  // Determine the correct path to the data files
  // This handles both compiled JS (dist folder) and TS source (src folder)
  let basePath = path.join(__dirname, '..', '..', 'database', 'seeds', 'seed-planer');
  if (!fs.existsSync(basePath)) {
    // If running from compiled code, adjust the path
    basePath = path.join(__dirname, '..', 'seeds', 'seed-planer');
  }

  console.log(`Looking for seed data in: ${basePath}`);

  // Load data files
  let artistsSeedData: ArtistSeedData[] = [];
  let albumsSeedData: AlbumSeedData[] = [];

  try {
    // For artists.js
    const artistsFilePath = path.join(basePath, 'artists.js');
    if (fs.existsSync(artistsFilePath)) {
      // Use require() instead of dynamic import
      try {
        const artistsData = require(artistsFilePath);
        artistsSeedData = artistsData.artists || [];
        console.log(`Loaded ${artistsSeedData.length} artists from ${artistsFilePath}`);
      } catch (error) {
        console.error(`Error importing artists from ${artistsFilePath}:`, error);
      }
    } else {
      console.warn(`Artists data file not found at ${artistsFilePath}`);
    }

    // For albums.js
    const albumsFilePath = path.join(basePath, 'albums.js');
    if (fs.existsSync(albumsFilePath)) {
      // Use require() instead of dynamic import
      try {
        const albumsData = require(albumsFilePath);
        albumsSeedData = albumsData.albums || [];
        console.log(`Loaded ${albumsSeedData.length} albums from ${albumsFilePath}`);
      } catch (error) {
        console.error(`Error importing albums from ${albumsFilePath}:`, error);
      }
    } else {
      console.warn(`Albums data file not found at ${albumsFilePath}`);
    }
  } catch (error) {
    console.error('Error loading seed data files:', error);
    return;
  }

  // Validate if we have data to proceed
  if (artistsSeedData.length === 0) {
    console.error('No artists data found. Aborting seeding process.');
    return;
  }

  if (albumsSeedData.length === 0) {
    console.error('No albums data found. Aborting seeding process.');
    return;
  }

  // Map to store artist names to their database IDs
  const artistNameToIdMap = new Map<string, string>();

  // 1. Seed Artists
  console.log('Seeding artists...');
  for (const artistData of artistsSeedData) {
    try {
      let artist = await artistRepository.findOne({ where: { name: artistData.name } });
      if (!artist) {
        artist = artistRepository.create({
          name: artistData.name,
          imageUrl: artistData.imageUrl,
          description: artistData.description,
          isFeatured: artistData.isFeatured ?? false,
        });
        await artistRepository.save(artist);
        console.log(`  Created artist: ${artist.name} (ID: ${artist.id})`);
      } else {
        console.log(`  Artist already exists: ${artist.name} (ID: ${artist.id})`);
        
        // Update existing artist if needed
        let needsUpdate = false;
        
        if (artist.imageUrl !== artistData.imageUrl) {
          artist.imageUrl = artistData.imageUrl;
          needsUpdate = true;
        }
        
        if (artist.description !== artistData.description) {
          artist.description = artistData.description;
          needsUpdate = true;
        }
        
        if (artist.isFeatured !== artistData.isFeatured && artistData.isFeatured !== undefined) {
          artist.isFeatured = artistData.isFeatured;
          needsUpdate = true;
        }
        
        if (needsUpdate) {
          await artistRepository.save(artist);
          console.log(`  Updated artist: ${artist.name}`);
        }
      }
      // Store the artist name -> id mapping for album seeding
      artistNameToIdMap.set(artist.name, artist.id);
    } catch (error) {
      console.error(`  Error processing artist "${artistData.name}":`, error);
    }
  }
  console.log(`Finished seeding ${artistNameToIdMap.size} artists.`);

  // Create a report of any artists in albums that don't exist in the artists data
  const artistsInAlbums = new Set<string>();
  albumsSeedData.forEach(album => {
    let artistName = getArtistNameFromAlbum(album);
    if (artistName) {
      artistsInAlbums.add(artistName);
    }
  });

  const missingArtists = Array.from(artistsInAlbums).filter(name => !artistNameToIdMap.has(name));
  if (missingArtists.length > 0) {
    console.warn(`Warning: The following artists are referenced in albums but not found in artists data:`);
    missingArtists.forEach(name => console.warn(`  - "${name}"`));
  }

  // 2. Seed Albums
  console.log('Seeding albums...');
  let albumsCreated = 0;
  let albumsUpdated = 0;
  let albumsSkipped = 0;
  let albumsErrored = 0;
  let albumsWithMissingArtists = 0;

  for (const albumData of albumsSeedData) {
    try {
      // Get artist name from album data
      let artistName = getArtistNameFromAlbum(albumData);
      
      if (!artistName) {
        console.warn(`  Album "${albumData.title}" does not have a valid artist reference. Skipping album.`);
        albumsWithMissingArtists++;
        continue;
      }
      
      // Get the actual artist ID from our mapping
      const artistId = artistNameToIdMap.get(artistName);
      
      if (!artistId) {
        console.warn(`  Could not find artist ID for name "${artistName}" used in album "${albumData.title}". Skipping album.`);
        albumsWithMissingArtists++;
        continue;
      }

      // Check if album already exists (by title and artist ID)
      let album = await albumRepository.findOne({
        where: { title: albumData.title, artistId: artistId },
      });

      const releaseDate = new Date(albumData.releaseDate);
      
      if (!album) {
        album = albumRepository.create({
          title: albumData.title,
          imageUrl: albumData.imageUrl,
          releaseDate: releaseDate,
          artistId: artistId,
          isFeatured: albumData.isFeatured ?? false,
        });
        await albumRepository.save(album);
        console.log(`  Created album: "${album.title}" for artist: "${artistName}" (ID: ${artistId})`);
        albumsCreated++;
      } else {
        // Check if album needs updating
        let needsUpdate = false;
        
        if (album.imageUrl !== albumData.imageUrl) {
          album.imageUrl = albumData.imageUrl;
          needsUpdate = true;
        }
        
        // Handle the case where album.releaseDate might not be a proper Date object
        const currentReleaseTime = album.releaseDate instanceof Date ? album.releaseDate.getTime() : 0;
        const newReleaseTime = releaseDate.getTime();
        
        if (currentReleaseTime !== newReleaseTime) {
          album.releaseDate = releaseDate;
          needsUpdate = true;
        }
        
        if (album.isFeatured !== albumData.isFeatured && albumData.isFeatured !== undefined) {
          album.isFeatured = albumData.isFeatured;
          needsUpdate = true;
        }
        
        if (needsUpdate) {
          await albumRepository.save(album);
          console.log(`  Updated album: "${album.title}" for artist: "${artistName}"`);
          albumsUpdated++;
        } else {
          console.log(`  Album already exists: "${album.title}" for artist: "${artistName}"`);
          albumsSkipped++;
        }
      }
    } catch (error) {
      console.error(`  Error processing album "${albumData.title}":`, error);
      albumsErrored++;
    }
  }
  
  console.log(`Finished seeding albums:`);
  console.log(`  - Created: ${albumsCreated}`);
  console.log(`  - Updated: ${albumsUpdated}`);
  console.log(`  - Skipped (no changes): ${albumsSkipped}`);
  console.log(`  - Skipped (missing artist): ${albumsWithMissingArtists}`);
  console.log(`  - Errors: ${albumsErrored}`);
  console.log('Album database seeding completed successfully!');
}

/**
 * Helper function to get the artist name from an album data object
 * Handles both old (artistId) and new (artistName) formats
 */
function getArtistNameFromAlbum(albumData: AlbumSeedData): string | null {
  // First try the new format (artistName)
  if (albumData.artistName) {
    return albumData.artistName;
  }
  
  // If not found, try the old format (artistId)
  if (albumData.artistId) {
    return extractArtistName(albumData.artistId);
  }
  
  return null;
}

/**
 * Helper function to extract the artist name from the artistId field
 * Handles both direct names and expressions like 'artists.find(a => a.name === "Artist Name").name'
 */
function extractArtistName(artistId: string): string {
  if (typeof artistId !== 'string') {
    return String(artistId);
  }
  
  // If artistId contains the pattern "artists.find(..." it's using the original structure
  if (artistId.includes('artists.find')) {
    const match = artistId.match(/artists\.find\(a => a\.name === ['"](.+)['"]\)\.name/);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return artistId;
} 