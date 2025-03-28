import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Song } from '../../songs/entities/song.entity';
import { DataSource } from 'typeorm';

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

  // Create songs for each album
  const songsData = [
    // Ed Sheeran - ÷ (Divide)
    {
      albumTitle: '÷ (Divide)',
      songs: [
        {
          title: 'Shape of You',
          duration: 233,
          url: 'https://example.com/music/shape-of-you.mp3',
          isFeatured: true,
          releaseDate: '2017-01-06',
        },
        {
          title: 'Castle on the Hill',
          duration: 261,
          url: 'https://example.com/music/castle-on-the-hill.mp3',
          isFeatured: false,
          releaseDate: '2017-01-06',
        },
        {
          title: 'Galway Girl',
          duration: 170,
          url: 'https://example.com/music/galway-girl.mp3',
          isFeatured: false,
          releaseDate: '2017-03-03',
        },
      ],
    },
    // Taylor Swift - 1989
    {
      albumTitle: '1989',
      songs: [
        {
          title: 'Blank Space',
          duration: 231,
          url: 'https://example.com/music/blank-space.mp3',
          isFeatured: true,
          releaseDate: '2014-11-10',
        },
        {
          title: 'Shake It Off',
          duration: 219,
          url: 'https://example.com/music/shake-it-off.mp3',
          isFeatured: true,
          releaseDate: '2014-08-18',
        },
        {
          title: 'Style',
          duration: 231,
          url: 'https://example.com/music/style.mp3',
          isFeatured: false,
          releaseDate: '2015-02-13',
        },
      ],
    },
    // The Weeknd - After Hours
    {
      albumTitle: 'After Hours',
      songs: [
        {
          title: 'Blinding Lights',
          duration: 200,
          url: 'https://example.com/music/blinding-lights.mp3',
          isFeatured: true,
          releaseDate: '2019-11-29',
        },
        {
          title: 'Save Your Tears',
          duration: 215,
          url: 'https://example.com/music/save-your-tears.mp3',
          isFeatured: false,
          releaseDate: '2020-03-20',
        },
        {
          title: 'In Your Eyes',
          duration: 237,
          url: 'https://example.com/music/in-your-eyes.mp3',
          isFeatured: false,
          releaseDate: '2020-03-20',
        },
      ],
    },
  ];

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