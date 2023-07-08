import gameData from "./data/game-data.json";

export const searchGames = async (query) => {
  try {
    const results = await fetch(`/api/search?q=${query}`);
    return results.json();
  } catch (err) {
    console.log(err);
  }
};

export const guessGame = (id, title) => {
  const game = gameData.find((game) => game.id === id);

  if (game.title === title || game.aliases?.includes(title)) {
    return { isValid: true };
  } else return { isValid: false };
};

export const getRandomGameId = () => {
  return gameData[Math.floor(Math.random() * gameData.length)].id;
};
