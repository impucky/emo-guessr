const express = require("express");
const cors = require("cors");

const gameTitles = require("./data/game-titles.json");
const gameData = require("./data/game-data.json");

const app = express();
app.use(cors());

app.get("/api/emogames", (req, res) => {
  res.status(200).json(gameData.map((game) => ({ id: game.id, emojis: game.emojis })));
});

app.get("/api/games", (req, res) => {
  let { q: query } = req.query;

  if (!query || Object.keys(req.query).length !== 1) return res.status(400).end();

  query = query.toLowerCase();

  const results = gameTitles
    .filter((title) => {
      const terms = query.split(" ");

      if (terms.length === 1) {
        return title.toLowerCase().includes(query);
      }

      let match = true;

      terms.forEach((t) => {
        if (!title.toLowerCase().includes(t)) match = false;
      });

      return match;
    })
    .slice(0, 11);

  res.status(200).json(results);
});

app.get("/api/guess", (req, res) => {
  const { id, guess } = req.query;

  if (!id || !guess || Object.keys(req.query).length !== 2) return res.status(400).end();

  const game = gameData.find((game) => game.id === id);

  if (!game) res.status(400).json({ error: "non-existent id" });

  if (game.title === guess || game.aliases?.includes(guess)) {
    res.status(200).json({ validGuess: true });
  } else res.status(200).json({ validGuess: false });
});

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
