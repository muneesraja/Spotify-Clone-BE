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
    {
      albumTitle: 'Not Like Us - Single',
      songs: [
        {
          title: 'Not Like Us',
          duration: 634, // 10:34
          url: 'https://example.com/music/Not Like Us.mp3',
          isFeatured: true,
          releaseDate: '2024-05-04',
        },
      ],
    },
    {
      albumTitle: 'WE DON\'T TRUST YOU',
      songs: [
        {
          title: 'Like That',
          duration: 617,  // 10:17
          url: 'https://example.com/music/Like That.mp3',
          isFeatured: true,
          releaseDate: '2024-03-22',
        },
         {
          title: 'Type Shit',
          duration: 320,
          url: 'https://example.com/music/Type Shit.mp3',
          isFeatured: false,
          releaseDate: '2024-03-22',
        },
        {
          title: 'WAIT FOR U (feat. Drake & Tems)',
          duration: 249,
          url: 'https://example.com/music/WAIT FOR U (feat. Drake & Tems).mp3',
          isFeatured: false,
          releaseDate: '2022-04-29',
        },
         {
          title: 'Stick Talk',
          duration: 206,
          url: 'https://example.com/music/Stick Talk.mp3',
          isFeatured: false,
          releaseDate: '2024-03-22',
        },
         {
          title: 'March Madness',
          duration: 342,
          url: 'https://example.com/music/March Madness.mp3',
          isFeatured: false,
          releaseDate: '2015-07-17',
        },
        {
          title: 'Mask Off',
          duration: 209,
          url: 'https://example.com/music/Mask Off.mp3',
          isFeatured: false,
          releaseDate: '2017-02-24',
        },
        {
          title: 'Low Life (feat. The Weeknd)',
          duration: 366,
          url: 'https://example.com/music/Low Life (feat. The Weeknd).mp3',
          isFeatured: false,
          releaseDate: '2016-02-05',
        }
      ],
    },
      {
        albumTitle: 'A Bar Song (Tipsy) - Single',
        songs: [
          {
            title: 'A Bar Song (Tipsy)',
            duration: 389, //6:29
            url: 'https://example.com/music/A Bar Song (Tipsy).mp3',
            isFeatured: false,
            releaseDate: '2024-04-05',
          },
        ],
      },
      {
        albumTitle: 'I Had Some Help - Single',
        songs: [
          {
            title: 'I Had Some Help',
            duration: 269,
            url: 'https://example.com/music/I Had Some Help.mp3',
            isFeatured: false,
            releaseDate: '2024-05-10',
          },
        ],
      },
    {
      albumTitle: 'SOS',
      songs: [
        {
          title: 'Snooze',
          duration: 245,
          url: 'https://example.com/music/Snooze.mp3',
          isFeatured: true,
          releaseDate: '2022-12-09',
        },
        {
          title: 'Saturn',
          duration: 194,
          url: 'https://example.com/music/Saturn.mp3',
          isFeatured: false,
          releaseDate: '2023-02-09',
        },
        {
          title: 'Good Days',
          duration: 277,
          url: 'https://example.com/music/Good Days.mp3',
          isFeatured: false,
          releaseDate: '2020-12-25',
        },
        {
          title: 'Kill Bill',
          duration: 153,
          url: 'https://example.com/music/Kill Bill.mp3',
          isFeatured: false,
          releaseDate: '2022-12-09',
        },
         {
          title: 'Nobody Gets Me',
          duration: 231,
          url: 'https://example.com/music/Nobody Gets Me.mp3',
          isFeatured: false,
          releaseDate: '2022-12-09',
        }
      ],
    },
    {
      albumTitle: 'One Thing At a Time',
      songs: [
        {
          title: 'Last Night',
          duration: 196,
          url: 'https://example.com/music/Last Night.mp3',
          isFeatured: true,
          releaseDate: '2023-03-03',
        },
        {
          title: 'Thinkin’ Bout Me',
          duration: 208,
          url: 'https://example.com/music/Thinkin’ Bout Me.mp3',
          isFeatured: false,
          releaseDate: '2023-03-03',
        },
        {
          title: 'Cowgirls',
          duration: 214,
          url: 'https://example.com/music/Cowgirls.mp3',
          isFeatured: false,
          releaseDate: '2023-03-03',
        },
        {
          title: 'Chasin\' You',
          duration: 237,
          url: 'https://example.com/music/Chasin\' You.mp3',
          isFeatured: false,
          releaseDate: '2019-07-26',
        },
        {
          title: 'You Proof',
          duration: 183,
          url: 'https://example.com/music/You Proof.mp3',
          isFeatured: false,
          releaseDate: '2022-05-13',
        },
        {
          title: 'Wasted On You',
          duration: 213,
          url: 'https://example.com/music/Wasted On You.mp3',
          isFeatured: false,
          releaseDate: '2021-01-08',
        },
        {
           title: 'Spin You Around (1_24)',
            duration: 248,
            url: 'https://example.com/music/Spin You Around (1_24).mp3',
            isFeatured: false,
            releaseDate: '2023-03-03',
          },
          {
            title: 'More Than My Hometown',
            duration: 257,
            url: 'https://example.com/music/More Than My Hometown.mp3',
            isFeatured: false,
            releaseDate: '2020-06-12',
          },
          {
            title: 'Lies Lies Lies',
            duration: 231,
            url: 'https://example.com/music/Lies Lies Lies.mp3',
            isFeatured: false,
            releaseDate: '2021-04-23'
          }
      ],
    },
    {
      albumTitle: 'Zach Bryan',
      songs: [
        {
          title: 'I Remember Everything (feat. Kacey Musgraves)',
          duration: 263,
          url: 'https://example.com/music/I Remember Everything (feat. Kacey Musgraves).mp3',
          isFeatured: true,
          releaseDate: '2023-08-25',
        },
        {
          title: 'Pink Skies',
          duration: 220,
          url: 'https://example.com/music/Pink Skies.mp3',
          isFeatured: false,
          releaseDate: '2023-08-25',
        },
        {
          title: 'Oklahoma Smokeshow',
          duration: 202,
          url: 'https://example.com/music/Oklahoma Smokeshow.mp3',
          isFeatured: false,
          releaseDate: '2023-08-25',
        },
        {
          title: 'Something in the Orange',
          duration: 208,
          url: 'https://example.com/music/Something in the Orange.mp3',
          isFeatured: false,
          releaseDate: '2022-04-22',
        },
        {
          title: 'Revival',
          duration: 226,
          url: 'https://example.com/music/Revival.mp3',
          isFeatured: false,
          releaseDate: '2023-08-25',
        },
        {
           title: 'Tourniquet',
            duration: 214,
            url: 'https://example.com/music/Tourniquet.mp3',
            isFeatured: false,
            releaseDate: '2023-08-25',
          },
          {
            title: 'Burn, Burn, Burn',
            duration: 246,
            url: 'https://example.com/music/Burn, Burn, Burn.mp3',
            isFeatured: false,
            releaseDate: '2023-08-25'
          }
      ],
    },
    {
      albumTitle: 'Beautiful Things - Single',
      songs: [
        {
          title: 'Beautiful Things',
          duration: 204,
          url: 'https://example.com/music/Beautiful Things.mp3',
          isFeatured: false,
          releaseDate: '2024-01-18',
        },
      ],
    },
    {
      albumTitle: 'Street Gossip',
      songs: [
        {
          title: 'Freestyle',
          duration: 189,
          url: 'https://example.com/music/Freestyle.mp3',
          isFeatured: false,
          releaseDate: '2018-11-30',
        },
        {
          title: 'Sum 2 Prove',
          duration: 247,
          url: 'https://example.com/music/Sum 2 Prove.mp3',
          isFeatured: false,
          releaseDate: '2020-02-28',
        },
        {
          title: 'Low Down',
          duration: 176,
          url: 'https://example.com/music/Low Down.mp3',
          isFeatured: false,
          releaseDate: '2018-11-30',
        },
        {
          title: 'Woah',
          duration: 191,
          url: 'https://example.com/music/Woah.mp3',
          isFeatured: false,
          releaseDate: '2019-11-29',
        },
        {
           title: 'In A Minute',
            duration: 238,
            url: 'https://example.com/music/In A Minute.mp3',
            isFeatured: false,
            releaseDate: '2020-02-28',
          }
      ],
    },
    {
      albumTitle: 'I\'ve Tried Everything Dear But I Think I\'m Gonna Kill Myself',
      songs: [
        {
          title: 'Lose Control',
          duration: 222,
          url: 'https://example.com/music/Lose Control.mp3',
          isFeatured: false,
          releaseDate: '2023-09-29',
        },
      ],
    },
      {
      albumTitle: 'Espresso - Single',
      songs: [
        {
          title: 'Espresso',
          duration: 189,
          url: 'https://example.com/music/Espresso.mp3',
          isFeatured: false,
          releaseDate: '2024-05-22',
        },
      ],
    },
      {
      albumTitle: 'Jack Harlow Come Home the Kids Miss You',
      songs: [
        {
           title: 'Lovin On Me',
            duration: 190,
            url: 'https://example.com/music/Lovin On Me.mp3',
            isFeatured: false,
            releaseDate: '2023-11-10',
          }
      ]
    },
      {
      albumTitle: 'Stick Season',
      songs: [
        {
          title: 'Stick Season',
          duration: 212,
          url: 'https://example.com/music/Stick Season.mp3',
          isFeatured: false,
          releaseDate: '2022-10-14',
        },
      ],
    },
      {
        albumTitle: 'MILLION DOLLAR BABY - Single',
        songs: [
          {
            title: 'MILLION DOLLAR BABY',
            duration: 179,
            url: 'https://example.com/music/MILLION DOLLAR BABY.mp3',
            isFeatured: false,
            releaseDate: '2024-04-26',
          },
        ],
      },
    {
      albumTitle: 'HIT ME HARD AND SOFT',
      songs: [
        {
          title: 'BIRDS OF A FEATHER',
          duration: 247,
          url: 'https://example.com/music/BIRDS OF A FEATHER.mp3',
          isFeatured: false,
          releaseDate: '2024-05-17',
        },
         {
          title: 'WILDFLOWER',
          duration: 302,
          url: 'https://example.com/music/WILDFLOWER.mp3',
          isFeatured: false,
          releaseDate: '2024-05-17',
        }
      ],
    },
    {
      albumTitle: 'So Far Gone',
      songs: [
        {
          title: 'Best I Ever Had',
          duration: 257,
          url: 'https://example.com/music/Best I Ever Had.mp3',
          isFeatured: false,
          releaseDate: '2009-09-15',
        },
      ],
    },
    {
      albumTitle: 'Please Please Please - Single',
      songs: [
        {
          title: 'Please Please Please',
          duration: 200,
          url: 'https://example.com/music/Please Please Please.mp3',
          isFeatured: false,
          releaseDate: '2024-06-06'
        }
      ]
    },
      {
      albumTitle: 'For All The Dogs',
      songs: [
        {
          title: 'Rich Baby Daddy',
          duration: 395,
          url: 'https://example.com/music/Rich Baby Daddy.mp3',
          isFeatured: false,
          releaseDate: '2023-10-06',
        },
      ],
    },
      {
      albumTitle: 'Get It Sexyy - Single',
      songs: [
        {
          title: 'Get It Sexyy',
          duration: 178,
          url: 'https://example.com/music/Get It Sexyy.mp3',
          isFeatured: false,
          releaseDate: '2023-06-02',
        }
      ]
    },
    {
      albumTitle: 'I NEVER LIKED YOU',
      songs: [
  
        {
          title: 'WAIT FOR U (feat. Drake & Tems)',
          duration: 249,
          url: 'https://example.com/music/WAIT FOR U (feat. Drake & Tems).mp3',
          isFeatured: false,
          releaseDate: '2022-04-29',
        },
      ],
    },
      {
      albumTitle: 'Vultures 1',
      songs: [
        {
          title: 'CARNIVAL (feat. Rich The Kid, Playboi Carti)',
          duration: 304,
          url: 'https://example.com/music/CARNIVAL (feat. Rich The Kid, Playboi Carti).mp3',
          isFeatured: false,
          releaseDate: '2024-02-10',
        }
      ]
    },
      {
      albumTitle: 'Too Sweet - Single',
      songs: [
        {
          title: 'Too Sweet',
          duration: 312,
          url: 'https://example.com/music/Too Sweet.mp3',
          isFeatured: false,
          releaseDate: '2024-03-22',
        }
      ]
    },
    {
      albumTitle: 'Fast Car - Single',
      songs: [
        {
          title: 'Fast Car',
          duration: 290,
          url: 'https://example.com/music/Fast Car.mp3',
          isFeatured: false,
          releaseDate: '2023-04-07',
        },
      ],
    },
      {
      albumTitle: 'Yeah Glo! - Single',
      songs: [
        {
          title: 'Yeah Glo!',
          duration: 171,
          url: 'https://example.com/music/Yeah Glo!.mp3',
          isFeatured: false,
          releaseDate: '2024-05-17',
        }
      ]
    },
      {
        albumTitle: 'Agora Hills - Single',
        songs: [
          {
            title: 'Agora Hills',
            duration: 310,
            url: 'https://example.com/music/Agora Hills.mp3',
            isFeatured: false,
            releaseDate: '2023-08-04',
          },
        ],
      },
      {
      albumTitle: 'American Dream',
      songs: [
        {
          title: 'redrum',
          duration: 382,
          url: 'https://example.com/music/redrum.mp3',
          isFeatured: false,
          releaseDate: '2024-01-12',
        }
      ]
    },
    {
      albumTitle: 'TRAPSOUL',
      songs: [
        {
          title: 'Whatever She Wants',
          duration: 198,
          url: 'https://example.com/music/Whatever She Wants.mp3',
          isFeatured: false,
          releaseDate: '2024-05-17',
        },
         {
          title: 'Don\'t',
          duration: 206,
          url: 'https://example.com/music/Don\'t.mp3',
          isFeatured: false,
          releaseDate: '2015-10-02',
        },
        {
          title: 'Exchange',
          duration: 256,
          url: 'https://example.com/music/Exchange.mp3',
          isFeatured: false,
          releaseDate: '2015-10-02',
        }
      ],
    },
    {
      albumTitle: 'UTOPIA',
      songs: [
        {
          title: 'FE!N (feat. Playboi Carti)',
          duration: 208,
          url: 'https://example.com/music/FE!N (feat. Playboi Carti).mp3',
          isFeatured: false,
          releaseDate: '2023-07-28',
        },
         {
          title: 'HIGHEST IN THE ROOM',
          duration: 175,
          url: 'https://example.com/music/HIGHEST IN THE ROOM.mp3',
          isFeatured: false,
          releaseDate: '2019-10-04'
        }
      ],
    },
    {
      albumTitle: 'Traveller',
      songs: [
        {
          title: 'Tennessee Whiskey',
          duration: 285,
          url: 'https://example.com/music/Tennessee Whiskey.mp3',
          isFeatured: false,
          releaseDate: '2015-05-05',
        },
      ],
    },
    {
      albumTitle: 'Born Sinner',
      songs: [
        {
          title: 'Power Trip',
          duration: 274,
          url: 'https://example.com/music/Power Trip.mp3',
          isFeatured: false,
          releaseDate: '2013-06-18',
        },
      ],
    },
    {
      albumTitle: 'Scorpion',
      songs: [
        {
          title: 'Nonstop',
          duration: 239,
          url: 'https://example.com/music/Nonstop.mp3',
          isFeatured: false,
          releaseDate: '2018-06-29',
        },
         {
          title: 'You Broke My Heart',
          duration: 265,
          url: 'https://example.com/music/You Broke My Heart.mp3',
          isFeatured: false,
          releaseDate: '2023-10-06',
        },
        {
          title: 'Wants and Needs',
          duration: 194,
          url: 'https://example.com/music/Wants and Needs.mp3',
          isFeatured: false,
          releaseDate: '2021-03-05',
        },
         {
          title: 'Virginia Beach',
          duration: 295,
          url: 'https://example.com/music/Virginia Beach.mp3',
          isFeatured: false,
          releaseDate: '2023-10-06',
        },
        {
          title: 'God\'s Plan',
          duration: 198,
          url: 'https://example.com/music/God\'s Plan.mp3',
          isFeatured: false,
          releaseDate: '2018-01-19',
        },
        {
          title: 'Passionfruit',
          duration: 288,
          url: 'https://example.com/music/Passionfruit.mp3',
          isFeatured: false,
          releaseDate: '2017-03-18',
        },
        {
          title: 'No Guidance (feat. Drake)',
          duration: 261,
          url: 'https://example.com/music/No Guidance (feat. Drake).mp3',
          isFeatured: false,
          releaseDate: '2019-06-28',
        },
        {
          title: 'IDGAF',
          duration: 240,
          url: 'https://example.com/music/IDGAF.mp3',
          isFeatured: false,
          releaseDate: '2023-10-06'
        }
      ],
    },
    {
      albumTitle: 'Beautiful Crazy - Single',
      songs: [
        {
          title: 'Beautiful Crazy',
          duration: 212,
          url: 'https://example.com/music/Beautiful Crazy.mp3',
          isFeatured: false,
          releaseDate: '2018-12-14',
        },
      ],
    },
      {
        albumTitle: 'The Tortured Poets Department',
        songs: [
          {
            title: 'Fortnight',
            duration: 228,
            url: 'https://example.com/music/Fortnight.mp3',
            isFeatured: false,
            releaseDate: '2024-04-19',
          }
        ]
      },
      {
      albumTitle: 'Gettin\' Old',
      songs: [
        {
          title: 'Where the Wild Things Are',
          duration: 270,
          url: 'https://example.com/music/Where the Wild Things Are.mp3',
          isFeatured: false,
          releaseDate: '2023-03-24',
        },
      ],
    },
      {
        albumTitle: 'greedy - Single',
        songs: [
          {
            title: 'greedy',
            duration: 175,
            url: 'https://example.com/music/greedy.mp3',
            isFeatured: false,
            releaseDate: '2023-09-15',
          }
        ]
      },
    {
      albumTitle: 'Certified Lover Boy',
      songs: [
        {
          title: 'Knife Talk',
          duration: 212,
          url: 'https://example.com/music/Knife Talk.mp3',
          isFeatured: false,
          releaseDate: '2021-09-03',
        },
         {
          title: 'First Person Shooter',
          duration: 211,
          url: 'https://example.com/music/First Person Shooter.mp3',
          isFeatured: false,
          releaseDate: '2023-10-06'
        }
      ],
    },
      {
        albumTitle: 'Gata Only - Single',
        songs: [
          {
            title: 'Gata Only',
            duration: 206,
            url: 'https://example.com/music/Gata Only.mp3',
            isFeatured: false,
            releaseDate: '2024-05-03',
          }
        ]
      },
    {
      albumTitle: 'My Turn',
      songs: [
        {
          title: 'Woah',
          duration: 191,
          url: 'https://example.com/music/Woah.mp3',
          isFeatured: false,
          releaseDate: '2019-11-29',
        },
      ],
    },
      {
        albumTitle: 'a Gift & a Curse',
        songs: [
          {
            title: 'fukumean',
            duration: 161,
            url: 'https://example.com/music/fukumean.mp3',
            isFeatured: false,
            releaseDate: '2023-06-16',
          }
        ]
      },
    {
      albumTitle: 'Birds in the Trap Sing McKnight',
      songs: [
        {
          title: 'HIGHEST IN THE ROOM',
          duration: 175,
          url: 'https://example.com/music/HIGHEST IN THE ROOM.mp3',
          isFeatured: false,
          releaseDate: '2019-10-04',
        },
      ],
    },
    {
      albumTitle: 'Don\'t Try This At Home',
      songs: [
        {
          title: 'Kacey Talk',
          duration: 197,
          url: 'https://example.com/music/Kacey Talk.mp3',
          isFeatured: false,
          releaseDate: '2023-04-21',
        },
         {
          title: 'Valuable Pain',
          duration: 195,
          url: 'https://example.com/music/Valuable Pain.mp3',
          isFeatured: false,
          releaseDate: '2023-04-21'
        }
      ],
    },
      {
        albumTitle: 'Good Luck, Babe! - Single',
        songs: [
          {
            title: 'Good Luck, Babe!',
            duration: 204,
            url: 'https://example.com/music/Good Luck, Babe!.mp3',
            isFeatured: false,
            releaseDate: '2024-06-28',
          }
        ]
      },
    {
      albumTitle: 'Issa Album',
      songs: [
        {
          title: 'Bank Account',
          duration: 205,
          url: 'https://example.com/music/Bank Account.mp3',
          isFeatured: false,
          releaseDate: '2017-06-16',
        },
      ],
    },
    {
      albumTitle: 'Indigo',
      songs: [
        {
          title: 'Under The Influence',
          duration: 192,
          url: 'https://example.com/music/Under The Influence.mp3',
          isFeatured: false,
          releaseDate: '2019-06-28',
        },
      ],
    },
    {
      albumTitle: 'Nostalgia',
      songs: [
        {
          title: 'Great Gatsby',
          duration: 168,
          url: 'https://example.com/music/Great Gatsby.mp3',
          isFeatured: false,
          releaseDate: '2023-09-01',
        },
      ],
    },
      {
      albumTitle: 'Wanna Be - Single',
      songs: [
        {
          title: 'Wanna Be',
          duration: 194,
          url: 'https://example.com/music/Wanna Be.mp3',
          isFeatured: false,
          releaseDate: '2024-05-31',
        }
      ]
    },
    {
      albumTitle: 'More Life',
      songs: [
        {
          title: 'Passionfruit',
          duration: 288,
          url: 'https://example.com/music/Passionfruit.mp3',
          isFeatured: false,
          releaseDate: '2017-03-18',
        },
      ],
    },
    {
      albumTitle: 'Dying to Live',
      songs: [
        {
          title: 'No Flockin\'',
          duration: 198,
          url: 'https://example.com/music/No Flockin\'.mp3',
          isFeatured: false,
          releaseDate: '2014-06-11',
        },
      ],
    },
      {
        albumTitle: 'Made For Me - Single',
        songs: [
          {
            title: 'Made For Me',
            duration: 208,
            url: 'https://example.com/music/Made For Me.mp3',
            isFeatured: false,
            releaseDate: '2023-09-15',
          }
        ]
      },
      {
        albumTitle: 'Chilombo',
        songs: [
          {
            title: 'Sativa',
            duration: 322,
            url: 'https://example.com/music/Sativa.mp3',
            isFeatured: false,
            releaseDate: '2017-07-21'
          }
        ]
      },
        {
        albumTitle: 'Mmhmm - Single',
        songs: [
          {
            title: 'Mmhmm',
            duration: 163,
            url: 'https://example.com/music/Mmhmm.mp3',
            isFeatured: false,
            releaseDate: '2024-04-26',
          }
        ]
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