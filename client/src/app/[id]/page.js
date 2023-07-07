"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { getGames, searchGames, guessGame } from "@/utils";

export default function EmoGuess({ params }) {
  const [games, setGames] = useState([]);
  const [guess, setGuess] = useState("");
  const [results, setResults] = useState([]);
  const [emojis, setEmojis] = useState("");
  const [guessing, setGuessing] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  // todo debounce search
  useEffect(() => {
    const search = async () => {
      const results = await searchGames(guess);
      setResults(results);
    };

    if (guess.length > 0 && !guessing) {
      search();
    }
  }, [guess]);

  useEffect(() => {
    const init = async () => {
      const games = await getGames();
      setGames(games);
      const currentGame = games.find((g) => g.id === params.id);
      setEmojis(currentGame.emojis);
    };
    init();
  }, [params]);

  const onGuessChange = (e) => {
    const newGuess = e.target.value;
    if (newGuess.length === 0) setResults([]);
    setGuess(e.target.value);
  };

  const tryGuess = async (title) => {
    setGuessing(true);
    setGuess(title);
    const { validGuess } = await guessGame(params.id, title);
    if (validGuess) {
      setMessage("Correct !");
      setResults([]);
    } else {
      setMessage("Wrong :(");
    }
    setGuessing(false);
  };

  const newGame = () => {
    const randomGame = games[Math.floor(Math.random() * games.length)];
    router.push(`/${randomGame.id}`);
  };

  // clean this up and implement hints
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2">
      <div className="flex flex-col w-96">
        <div className="m-2 text-center text-4xl">{emojis}</div>
        <div>
          {message}
          <input
            className="w-full bg-slate-200 text-xl p-2"
            type="text"
            value={guess}
            onChange={onGuessChange}
            placeholder="Game is..."
          />
        </div>
        <div className="flex flex-col w-full max-h-36 overflow-y-scroll">
          {results &&
            results.map((result) => {
              return (
                <button
                  className="p-2 border hover:bg-slate-100"
                  key={result}
                  onClick={() => tryGuess(result)}
                >
                  {result}
                </button>
              );
            })}
        </div>
        <div className="flex justify-center">
          <button
            className="m-4 p-2 bg-sky-200 hover:bg-sky-300 rounded-xl shadow-md"
            onClick={newGame}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}
