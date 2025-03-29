import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { DataSource } from 'typeorm';

export async function seedAlbums(dataSource: DataSource) {
  console.log('Starting album seeding process...');
  const artistRepository = dataSource.getRepository(Artist);
  const albumRepository = dataSource.getRepository(Album);

  // Define artists data directly in the file
  const artists = [
    {
      name: 'Kendrick Lamar',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb1d2f183c389431986427a1c7',
      description: 'American rapper, songwriter, and record producer',
      isFeatured: true,
    },
    {
      name: 'Future',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb9c03f5763546c26b2512f127',
      description: 'American rapper, singer, songwriter, and record producer',
      isFeatured: true,
    },
    {
      name: 'Shaboozey',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb3e132938198b1e45a201c109',
      description: 'American singer-songwriter',
      isFeatured: false,
    },
    {
      name: 'Post Malone',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb3b1c67c85858021ab0ff64d6',
      description: 'American rapper, singer, songwriter, and record producer',
      isFeatured: true,
    },
    {
      name: 'SZA',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2c84131569429402e1a90c11',
      description: 'American singer and songwriter',
      isFeatured: true,
    },
    {
      name: 'Morgan Wallen',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb9a80582234f5b84294697921',
      description: 'American country music singer and songwriter',
      isFeatured: true,
    },
    {
      name: 'Zach Bryan',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb9d151978f804c85248a3c57a',
      description: 'American singer-songwriter',
      isFeatured: false,
    },
    {
      name: 'Benson Boone',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb1e9381c8b3941f1f91b72e3a',
      description: 'American singer-songwriter',
      isFeatured: false,
    },
    {
      name: 'Lil Baby',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c',
      description: 'American rapper',
      isFeatured: false,
    },
    {
      name: 'Teddy Swims',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2964ffc9c9c3e9c9a6207869',
      description: 'American singer-songwriter',
      isFeatured: false,
    },
    {
      name: 'Sabrina Carpenter',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb24df50a98f98e0b2e8c2275f',
      description: 'American singer and actress',
      isFeatured: false,
    },
    {
      name: 'Jack Harlow',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d9a2699f7d9c9b4e3391d1c',
      description: 'American rapper',
      isFeatured: false,
    },
    {
      name: 'Noah Kahan',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb1d5f13c1b827889c25390623',
      description: 'American singer-songwriter',
      isFeatured: false,
    },
    {
      name: 'Tommy Richman',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb3b1c67c85858021ab0ff64d6', // Placeholder image
      description: 'American singer',
      isFeatured: false,
    },
    {
      name: 'Billie Eilish',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb1f83c8a9d012429e3681429c',
      description: 'American singer-songwriter',
      isFeatured: false,
    },
    {
      name: 'Drake',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb129ef9933834b6c3848b8989',
      description: 'Canadian rapper, singer, songwriter, and actor',
      isFeatured: true,
    },
    {
      name: '¥$',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273e5140156942629b3c58254c7', // Placeholder image
      description: 'Musical duo',
      isFeatured: false,
    },
    {
      name: 'Luke Combs',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb1f2e9178499a229a1b647f27',
      description: 'American country music singer and songwriter',
      isFeatured: false,
    },
    {
      name: 'Hozier',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1f7e6b1c0c9c43d9692429',
      description: 'Irish singer-songwriter and musician',
      isFeatured: false,
    },
    {
      name: 'Taylor Swift',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb1bd99b9c08611884c4542475',
      description: 'American singer-songwriter',
      isFeatured: false,
    },
      {
      name: 'GloRilla',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb1d2f183c389431986427a1c7', // Placeholder image
      description: 'American rapper',
      isFeatured: false,
    },
    {
      name: 'Doja Cat',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
      description: 'American rapper, singer, songwriter, and record producer',
      isFeatured: false,
    },
    {
      name: '21 Savage',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
      description: 'British-American rapper',
      isFeatured: false,
    },
    {
      name: 'Bryson Tiller',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
      description: 'American singer-songwriter',
      isFeatured: false,
    },
    {
      name: 'BossMan Dlow',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
      description: 'American rapper',
      isFeatured: false,
    },
    {
      name: 'Travis Scott',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
      description: 'American rapper, singer, songwriter, and record producer',
      isFeatured: false,
    },
    {
      name: 'Chris Stapleton',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
      description: 'American singer-songwriter',
      isFeatured: false,
    },
    {
      name: 'J. Cole',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
      description: 'American rapper, singer, songwriter, and record producer',
      isFeatured: false,
    },
    {
        name: 'Tate McRae',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
        description: 'Canadian singer-songwriter and dancer',
        isFeatured: false,
      },
      {
        name: 'FloyyMenor',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
        description: 'Brazilian singer',
        isFeatured: false,
      },
      {
        name: 'Gunna',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
        description: 'American rapper',
        isFeatured: false,
      },
      {
        name: 'YoungBoy Never Broke Again',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
        description: 'American rapper',
        isFeatured: false,
      },
      {
        name: 'Chappell Roan',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
        description: 'American singer-songwriter',
        isFeatured: false,
      },
      {
        name: 'Chris Brown',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
        description: 'American singer, songwriter, dancer, and actor',
        isFeatured: false,
      },
      {
        name: 'Rod Wave',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
        description: 'American rapper and singer',
        isFeatured: false,
      },
      {
        name: 'Kodak Black',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
        description: 'American rapper',
        isFeatured: false,
      },
      {
        name: 'Muni Long',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
        description: 'American singer and songwriter',
        isFeatured: false,
      },
      {
        name: 'Jhené Aiko',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
        description: 'American singer and songwriter',
        isFeatured: false,
      },
      {
        name: 'BigXthaPlug',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
        description: 'American rapper',
        isFeatured: false,
      },
      {
        name: 'Summer Walker',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
        description: 'American singer-songwriter',
        isFeatured: false,
      },
      {
      name: 'Xavi',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
      description: 'Mexican-American singer',
      isFeatured: false,
    },
    {
      name: 'Frank Ocean',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
      description: 'American singer-songwriter',
      isFeatured: false,
    },
    {
      name: 'Lil Durk',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
      description: 'American rapper and singer',
      isFeatured: false,
    },
    {
      name: 'Fuerza Regida',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
      description: 'Mexican band',
      isFeatured: false,
    },
    {
      name: 'Peso Pluma',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2d1c5a914385135111f1852c', // Placeholder image
      description: 'Mexican singer',
      isFeatured: false,
    },
    // Add Ed Sheeran if not present
    {
      name: 'Ed Sheeran',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb12a2ef08d00dd7451a6dbed6',
      description: 'English singer-songwriter',
      isFeatured: true,
    },
    // Add The Weeknd if not present
    {
      name: 'The Weeknd',
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea36',
      description: 'Canadian singer, songwriter, and record producer',
      isFeatured: true,
    }
  ];

  // Map to store artist names to their database IDs
  const artistNameToIdMap = new Map<string, string>();

  // 1. Seed Artists
  console.log('Seeding artists defined in album.seed.ts...');
  for (const artistData of artists) {
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
        // console.log(`  Artist already exists: ${artist.name}`);
      }
      artistNameToIdMap.set(artist.name, artist.id);
    } catch (error) {
      console.error(`  Error processing artist "${artistData.name}":`, error);
    }
  }
  console.log('Finished seeding artists.');

  // Define albums data directly in the file
  const albums = [
    {
      title: 'Not Like Us - Single',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2731d2f183c389431986427a1c7',
      releaseDate: '2024-05-04',
      artistName: 'Kendrick Lamar' // Use artistName for lookup
    },
    {
      title: 'WE DON\'T TRUST YOU',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2739c03f5763546c26b2512f127',
      releaseDate: '2024-03-22',
      artistName: 'Future'
    },
    {
        title: 'A Bar Song (Tipsy) - Single',
        imageUrl: 'https://i.scdn.co/image/ab67616d0000b2733e132938198b1e45a201c109',
        releaseDate: '2024-04-05',
        artistName: 'Shaboozey'
      },
      {
        title: 'I Had Some Help - Single',
        imageUrl: 'https://i.scdn.co/image/ab67616d0000b2733b1c67c85858021ab0ff64d6',
        releaseDate: '2024-05-10',
        artistName: 'Post Malone'
      },
    {
      title: 'SOS',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2732c84131569429402e1a90c11',
      releaseDate: '2022-12-09',
      artistName: 'SZA'
    },
    {
      title: 'One Thing At a Time',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2739a80582234f5b84294697921',
      releaseDate: '2023-03-03',
      artistName: 'Morgan Wallen'
    },
    {
      title: 'Zach Bryan',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2739d151978f804c85248a3c57a',
      releaseDate: '2023-08-25',
      artistName: 'Zach Bryan'
    },
    {
      title: 'Beautiful Things - Single',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2731e9381c8b3941f1f91b72e3a',
      releaseDate: '2024-01-18',
      artistName: 'Benson Boone'
    },
    {
      title: 'Street Gossip',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2732d1c5a914385135111f1852c',
      releaseDate: '2018-11-30',
      artistName: 'Lil Baby'
    },
    {
      title: 'I\'ve Tried Everything Dear But I Think I\'m Gonna Kill Myself',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2732964ffc9c9c3e9c9a6207869',
      releaseDate: '2023-09-29',
      artistName: 'Teddy Swims'
    },
    {
      title: 'Espresso - Single',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b27324df50a98f98e0b2e8c2275f',
      releaseDate: '2024-05-22',
      artistName: 'Sabrina Carpenter'
    },
    // ... (rest of the albums, using artistName instead of artistId)
    {
      title: '÷ (Divide)',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734764b8a9bb5fc4d7c13bdf70',
      releaseDate: '2017-03-03',
      artistName: 'Ed Sheeran',
      isFeatured: true,
    },
    {
      title: '× (Multiply)',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b27310454a06e9c83cf2a229bb2f',
      releaseDate: '2014-06-20',
      artistName: 'Ed Sheeran',
    },
    {
      title: '1989',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273047eac333eff0be4abe32cbf',
      releaseDate: '2014-10-27',
      artistName: 'Taylor Swift',
    },
    {
      title: 'Starboy',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273e214f5b8c2ca28cf44447a15',
      releaseDate: '2016-11-25',
      artistName: 'The Weeknd',
      isFeatured: true,
    },
  ];

  // 2. Seed Albums
  console.log('Seeding albums defined in album.seed.ts...');
  for (const albumData of albums) {
    try {
      // Find the artist ID using the map
      const artistId = artistNameToIdMap.get(albumData.artistName);

      if (!artistId) {
        console.warn(`  Could not find artist ID for name "${albumData.artistName}" used in album "${albumData.title}". Skipping album.`);
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
          artistId: artistId, // Use the actual ID from the map
          isFeatured: albumData.isFeatured ?? false,
        });
        await albumRepository.save(album);
        console.log(`  Created album: ${album.title} for artist ID: ${artistId}`);
      } else {
        // console.log(`  Album already exists: ${album.title}`);
      }
    } catch (error) {
      console.error(`  Error processing album "${albumData.title}":`, error);
    }
  }
  console.log('Finished seeding albums.');

  console.log('Album seeding completed successfully!');
} 