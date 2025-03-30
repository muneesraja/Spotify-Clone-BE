import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Song } from '../../songs/entities/song.entity';
import { DataSource } from 'typeorm';
import { songs as songsData } from './seed-planer/songs';

export async function seedSongs(dataSource: DataSource) {
  const albumRepository = dataSource.getRepository(Album);
  const artistRepository = dataSource.getRepository(Artist);
  const songRepository = dataSource.getRepository(Song);

  // Get all albums
  const albums = await albumRepository.find({ relations: ['artist'] });
  
  if (albums.length === 0) {
    console.error('No albums found in database. Please seed albums first.');
    return;
  }

  for (const albumData of songsData) {
    const album = albums.find(a => a.title === albumData.albumTitle);
    
    if (!album) {
      console.warn(`Album "${albumData.albumTitle}" not found, skipping songs.`);
      continue;
    }

    for (const songData of albumData.songs) {
      const existingSong = await songRepository.findOne({
        where: { 
          title: songData.title,
          albumId: album.id 
        }
      });

      if (!existingSong) {
        await songRepository.save({
          ...songData,
          albumId: album.id,
          artistId: album.artist.id,
          imageUrl: album.imageUrl, // Use album cover as song image
        });
      }
    }
  }

  console.log('Songs seeded successfully!');
} 