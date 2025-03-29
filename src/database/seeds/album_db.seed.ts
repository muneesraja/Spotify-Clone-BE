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
  artistId: string; // This holds either the artist name or an expression
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

  // Dynamically import data files
  let artistsSeedData: ArtistSeedData[] = [];
  let albumsSeedData: AlbumSeedData[] = [];

  try {
    // For artists.js
    const artistsFilePath = path.join(basePath, 'artists.js');
    if (fs.existsSync(artistsFilePath)) {
      const artistsModule = await import(`file://${artistsFilePath}`);
      artistsSeedData = artistsModule.artists;
      console.log(`Loaded ${artistsSeedData.length} artists from ${artistsFilePath}`);
    } else {
      console.warn(`Artists data file not found at ${artistsFilePath}`);
    }

    // For albums.js
    const albumsFilePath = path.join(basePath, 'albums.js');
    if (fs.existsSync(albumsFilePath)) {
      const albumsModule = await import(`file://${albumsFilePath}`);
      albumsSeedData = albumsModule.albums;
      console.log(`Loaded ${albumsSeedData.length} albums from ${albumsFilePath}`);
    } else {
      console.warn(`Albums data file not found at ${albumsFilePath}`);
    }
  } catch (error) {
    console.error('Error loading seed data files:', error);
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
        console.log(`  Created artist: ${artist.name}`);
      } else {
        console.log(`  Artist already exists: ${artist.name}`);
      }
      // Store the artist name -> id mapping for album seeding
      artistNameToIdMap.set(artist.name, artist.id);
    } catch (error) {
      console.error(`  Error processing artist "${artistData.name}":`, error);
    }
  }
  console.log(`Finished seeding ${artistNameToIdMap.size} artists.`);

  // 2. Seed Albums
  console.log('Seeding albums...');
  let albumsCreated = 0;
  let albumsSkipped = 0;
  let albumsErrored = 0;

  for (const albumData of albumsSeedData) {
    try {
      // Handle the artistId - the JS data has artistId as either a name or a lookup expression
      let artistName = albumData.artistId;
      // If artistId contains the pattern "artists.find(..." it's using the original structure
      // Extract just the artist name from it
      if (typeof artistName === 'string' && artistName.includes('artists.find')) {
        const match = artistName.match(/artists\.find\(a => a\.name === ['"](.+)['"]\)\.name/);
        if (match && match[1]) {
          artistName = match[1];
        }
      }

      // Get the actual artist ID from our mapping
      const artistId = artistNameToIdMap.get(artistName);
      
      if (!artistId) {
        console.warn(`  Could not find artist ID for name "${artistName}" used in album "${albumData.title}". Skipping album.`);
        albumsSkipped++;
        continue;
      }

      // Check if album already exists (by title and artist ID)
      let album = await albumRepository.findOne({
        where: { title: albumData.title, artistId: artistId },
      });

      if (!album) {
        album = albumRepository.create({
          title: albumData.title,
          imageUrl: albumData.imageUrl,
          releaseDate: new Date(albumData.releaseDate),
          artistId: artistId,
          isFeatured: albumData.isFeatured ?? false,
        });
        await albumRepository.save(album);
        console.log(`  Created album: ${album.title} for artist ID: ${artistId}`);
        albumsCreated++;
      } else {
        console.log(`  Album already exists: ${album.title}`);
        albumsSkipped++;
      }
    } catch (error) {
      console.error(`  Error processing album "${albumData.title}":`, error);
      albumsErrored++;
    }
  }
  
  console.log(`Finished seeding albums: ${albumsCreated} created, ${albumsSkipped} skipped, ${albumsErrored} errored.`);
  console.log('Album database seeding completed successfully!');
} 