"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDebounce } from "@uidotdev/usehooks";

import gameData from "../../data/game-data.json";
import { searchGames, guessGame, getRandomGameId, saveGame } from "@/utils";

export default function EmoGuess({ params }) {
  const [query, setQuery] = useState("");
  const [guess, setGuess] = useState(null);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [emojis, setEmojis] = useState("");
  const [message, setMessage] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const router = useRouter();

  useEffect(() => {
    const search = async () => {
      let results = [];
      if (debouncedQuery) {
        results = await searchGames(debouncedQuery);
      }
      setResults(results);
    };

    search();
  }, [debouncedQuery]);

  useEffect(() => {
    const currentGame = gameData.find((g) => g.id === params.id);
    setEmojis(currentGame.emojis);
  }, [params]);

  const onQueryChange = (e) => {
    setGuess(null);
    const newGuess = e.target.value;
    if (newGuess.length === 0) setResults([]);
    setQuery(e.target.value);
  };

  const tryGuess = (title) => {
    setShowResults(false);
    setGuess(title);
    const { isValid } = guessGame(params.id, title);
    if (isValid) {
      setMessage("Correct !");
    } else {
      setMessage("Wrong :(");
    }
    saveGame(params.id, isValid);
  };

  const newGame = () => {
    router.push(`/${getRandomGameId(params.id)}`);
  };

  if (!emojis) return;

  // clean this up and implement hints
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 bg-base">
      <div className="flex flex-col w-96 items-center">
        <div className="my-4 text-xl">{message}</div>
        <div className="m-2 p-2 h-16 w-fit rounded-xl bg-surface0 text-center text-4xl">
          {emojis}
        </div>
        <div className="relative">
          <input
            className="w-full bg-crust rounded-lg text-xl p-2 focus:outline focus:outline-lavender"
            type="text"
            value={guess ? guess : query}
            onChange={onQueryChange}
            onFocus={() => setShowResults(true)}
            onBlur={async () => {
              setTimeout(() => {
                setShowResults(false);
              }, 200);
            }}
            placeholder="Game is..."
          />
          <div className="absolute mt-2 flex flex-col w-full max-h-36 overflow-y-scroll">
            {showResults &&
              results.map((result) => {
                return (
                  <button
                    className="p-2 border border-surface1 bg-crust hover:bg-surface0"
                    key={result}
                    onClick={() => tryGuess(result)}
                  >
                    {result}
                  </button>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col">
          <button className="m-4 p-2 bg-maroon text-base rounded-xl shadow-md" onClick={newGame}>
            New Game
          </button>
          <Link className="m-4 p-2 bg-blue text-base rounded-xl shadow-md" href="/progress">
            View your progress
          </Link>
        </div>
      </div>
    </div>
  );
}
