const url = process.env.NEXT_PUBLIC_SERVER_URL;

export const getGames = async () => {
  try {
    const games = await fetch(`${url}/emogames`);
    return games.json();
  } catch (err) {
    console.log(err);
  }
};

export const searchGames = async (query) => {
  try {
    const results = await fetch(`${url}/games?q=${query}`);
    return results.json();
  } catch (err) {
    console.log(err);
  }
};

export const guessGame = async (id, title) => {
  try {
    const result = await fetch(`${url}/guess?id=${id}&guess=${title}`);
    return result.json();
  } catch (err) {
    console.log(err);
  }
};
