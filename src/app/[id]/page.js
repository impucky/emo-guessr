"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ClipboardCheck, FastArrowRight } from "iconoir-react";

import gameData from "../../data/game-data.json";
import GameSearch from "@/components/GameSearch";
import { guessGame, getRandomGameId, saveGame } from "@/utils";

export default function EmoGuess({ params }) {
  const [emojis, setEmojis] = useState("");
  const [validGuess, setValidGuess] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const currentGame = gameData.find((g) => g.id === params.id);
    setEmojis(currentGame.emojis);
  }, [params]);

  const tryGuess = (title) => {
    const { isValid } = guessGame(params.id, title);
    if (isValid) {
      setValidGuess(true);
    } else {
      setValidGuess(false);
    }
    saveGame(params.id, isValid);
  };

  const newGame = () => {
    router.push(`/${getRandomGameId(params.id)}`);
  };

  if (!emojis) return;

  // todo implement hints
  return (
    <div className="relative z-0 h-full flex flex-col items-center justify-center gap-2 bg-base">
      <div className="h-8">
        {validGuess === true ? "Correct !" : validGuess === false ? "Wrong :(" : ""}
      </div>
      <div
        className={`grid items-center m-2 p-4 min-h-16 w-fit rounded-xl bg-surface0 text-center text-4xl shadow-md ${
          validGuess === true
            ? "outline outline-green"
            : validGuess === false
            ? "outline outline-red"
            : ""
        }`}
      >
        {emojis}
      </div>
      <GameSearch tryGuess={tryGuess} />
      <div className="flex flex-col items-center text-base text-lg">
        <button
          className="flex w-fit gap-2 m-4 p-2 bg-lavender hover:brightness-125 rounded-xl shadow-md"
          onClick={newGame}
        >
          Next game
          <FastArrowRight />
        </button>
        <Link
          className="flex gap-2 m-4 p-2 bg-yellow hover:brightness-125 rounded-xl shadow-md"
          href="/progress"
        >
          View your progress
          <ClipboardCheck />
        </Link>
      </div>
    </div>
  );
}
