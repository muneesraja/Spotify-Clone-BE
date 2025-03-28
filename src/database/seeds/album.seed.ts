import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { DataSource } from 'typeorm';

export async function seedAlbums(dataSource: DataSource) {
  const artistRepository = dataSource.getRepository(Artist);
  const albumRepository = dataSource.getRepository(Album);

  // Create artists first
  const artists = [
    {
      name: 'Ed Sheeran',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb12a2ef08d00dd7451a6dbed6',
      description: 'English singer-songwriter',
    },
    {
      name: 'Taylor Swift',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3bc19d84156',
      description: 'American singer-songwriter',
    },
    {
      name: 'The Weeknd',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebb5f9e28219c169fd4b9e8379',
      description: 'Canadian singer-songwriter and record producer',
    },
  ];
  
  for (const artistData of artists) {
    const existingArtist = await artistRepository.findOne({ where: { name: artistData.name } });
    if (!existingArtist) {
      await artistRepository.save(artistData);
    }
  }
  
  // Now that artists exist, get them and create albums
  const edSheeran = await artistRepository.findOne({ where: { name: 'Ed Sheeran' } });
  const taylorSwift = await artistRepository.findOne({ where: { name: 'Taylor Swift' } });
  const theWeeknd = await artistRepository.findOne({ where: { name: 'The Weeknd' } });
  
  if (!edSheeran || !taylorSwift || !theWeeknd) {
    console.error('Could not find required artists to seed albums');
    return;
  }
  
  const albums = [
    {
      title: '÷ (Divide)',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734764b8a9bb5fc4d7c13bdf70',
      releaseDate: '2017-03-03',
      artistId: edSheeran.id,
    },
    {
      title: '× (Multiply)',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b27310454a06e9c83cf2a229bb2f',
      releaseDate: '2014-06-20',
      artistId: edSheeran.id,
    },
    {
      title: '1989',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273047eac333eff0be4abe32cbf',
      releaseDate: '2014-10-27',
      artistId: taylorSwift.id,
    },
    {
      title: 'Red (Taylor\'s Version)',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b27318f5ca599cbc0aa7a7e5a311',
      releaseDate: '2021-11-12',
      artistId: taylorSwift.id,
    },
    {
      title: 'After Hours',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
      releaseDate: '2020-03-20',
      artistId: theWeeknd.id,
    },
    {
      title: 'Dawn FM',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d',
      releaseDate: '2022-01-07',
      artistId: theWeeknd.id,
    },
  ];
  
  for (const albumData of albums) {
    const existingAlbum = await albumRepository.findOne({ where: { title: albumData.title } });
    if (!existingAlbum) {
      await albumRepository.save(albumData);
    }
  }
  
  console.log('Albums and artists seeded successfully!');
} 