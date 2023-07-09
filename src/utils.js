/* eslint-disable no-prototype-builtins */
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

const randomInArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const getRandomGameId = (activeGameId) => {
  let save = window.localStorage.getItem("emoGuessrSave");

  if (save) {
    save = JSON.parse(save);
    // unseen games first
    let freshGames = gameData.filter((game) => {
      if (activeGameId && activeGameId === game.id) return false;
      return !save.hasOwnProperty(game.id);
    });
    // fallback to remaining games with bad guess
    if (freshGames.length === 0) {
      freshGames = gameData.filter((game) => {
        if (activeGameId && activeGameId === game.id) return false;
        return save.hasOwnProperty(game.id) && !save[game.id].guessed;
      });
      // cleared everything
      if (freshGames.length === 0) {
        return "victory";
      }
    }
    return randomInArr(freshGames).id;
  }

  // no save
  return randomInArr(gameData).id;
};

export const saveGame = (id, isValid) => {
  let save = window.localStorage.getItem("emoGuessrSave");

  if (save) {
    save = JSON.parse(save);
    save[id] = { guessed: isValid };
  } else save = { [id]: { guessed: isValid } };

  window.localStorage.setItem("emoGuessrSave", JSON.stringify(save));
};

export const clearSave = () => {
  if (confirm("Resetting all your guesses, are you sure?")) {
    window.localStorage.removeItem("emoGuessrSave");
    return true;
  } else return false;
};
