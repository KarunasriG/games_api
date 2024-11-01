const cors = require('cors');
const express = require('express');
const { getAllGames, getGameById } = require('./controllers');

const app = express();

app.use(cors());
app.use(express.json());

// retrieve all games
app.get('/games', async (req, res) => {
  const games = getAllGames();
  res.json({ games });
});

app.get('/games/details/:id', async (req, res) => {
  const game = getGameById(parseInt(req.params.id));
  res.json({ game });
});

module.exports = { app };
