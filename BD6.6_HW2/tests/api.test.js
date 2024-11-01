const request = require('supertest');
const http = require('http');
const { getAllGames } = require('../controllers');
const { app } = require('../index');
const { describe } = require('node:test');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllGames: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3010, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Controller Function tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all games', () => {
    let mockGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];

    getAllGames.mockReturnValue(mockGames);

    let result = getAllGames();
    expect(result).toEqual(mockGames);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints tests', () => {
  it('GET /games should retrieve all games', async () => {
    const res = await request(server).get('/games');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      games: [
        {
          gameId: 1,
          title: 'The Legend of Zelda: Breath of the Wild',
          genre: 'Adventure',
          platform: 'Nintendo Switch',
        },
        {
          gameId: 2,
          title: 'Red Dead Redemption 2',
          genre: 'Action',
          platform: 'PlayStation 4',
        },
        {
          gameId: 3,
          title: 'The Witcher 3: Wild Hunt',
          genre: 'RPG',
          platform: 'PC',
        },
      ],
    });
    expect(res.body.games.length).toBe(3);
  });

  it('GET /games/details/:id retrieve a game', async () => {
    const res = await request(server).get('/games/details/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      game: {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
    });
    
  });
});
