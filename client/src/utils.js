export const getGames = async () => {
  try {
    const games = await fetch(`${process.env.serverUrl}/emogames`);
    return games.json();
  } catch (err) {
    console.log(err);
  }
};

export const searchGames = async (query) => {
  try {
    const results = await fetch(`${process.env.serverUrl}/games?q=${query}`);
    return results.json();
  } catch (err) {
    console.log(err);
  }
};

export const guessGame = async (id, title) => {
  try {
    const result = await fetch(`${process.env.serverUrl}/guess?id=${id}&guess=${title}`);
    return result.json();
  } catch (err) {
    console.log(err);
  }
};
