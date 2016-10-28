export default {
  artists: {
    href: 'https://api.spotify.com/v1/search?query=slipknot&offset=0&limit=1&type=artist',
    items: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/05fG473iIaoy82BF1aGhL8',
        },
        followers: {
          href: null,
          total: 1338750,
        },
        genres: [
          'alternative metal',
          'groove metal',
          'nu metal',
          'post-grunge',
          'rap metal',
          'rap rock',
          'rock',
        ],
        href: 'https://api.spotify.com/v1/artists/05fG473iIaoy82BF1aGhL8',
        id: '05fG473iIaoy82BF1aGhL8',
        images: [
          {
            height: 749,
            url: 'https://i.scdn.co/image/0d4156d2128ea5589296f10da242b2f0a917153d',
            width: 1000,
          },
          {
            height: 479,
            url: 'https://i.scdn.co/image/7b3df593f9c812f20096e0228c4e8bc48774d654',
            width: 640,
          },
          {
            height: 150,
            url: 'https://i.scdn.co/image/4f9017a0a2d85753832ee3e24e879a87ec9b6594',
            width: 200,
          },
          {
            height: 48,
            url: 'https://i.scdn.co/image/1f438753b0ac3c017aa6e9dc15aaee4d292f3163',
            width: 64,
          },
        ],
        name: 'Slipknot',
        popularity: 77,
        type: 'artist',
        uri: 'spotify:artist:05fG473iIaoy82BF1aGhL8',
      },
    ],
    limit: 1,
    next: 'https://api.spotify.com/v1/search?query=slipknot&offset=1&limit=1&type=artist',
    offset: 0,
    previous: null,
    total: 3,
  },
};
