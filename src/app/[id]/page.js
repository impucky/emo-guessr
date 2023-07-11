"use client";

import { useState, useEffect } from "react";

import gameData from "../../data/game-data.json";
import GameSearch from "@/components/GameSearch";
import Emojis from "@/components/Emojis";
import NewGameButton from "@/components/NewGameButton";
import ProgressButton from "@/components/ProgressButton";
import { guessGame, saveGame } from "@/utils";

export default function EmoGuess({ params }) {
  const [emojis, setEmojis] = useState([]);
  const [validGuess, setValidGuess] = useState(null);

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

  // todo implement hints
  return (
    <div className="relative z-0 h-full flex flex-col items-center justify-center gap-2 bg-base">
      <div className="h-8">
        {validGuess === true ? "Correct !" : validGuess === false ? "Wrong :(" : ""}
      </div>
      <Emojis emojis={emojis} validGuess={validGuess} />
      <GameSearch tryGuess={tryGuess} />
      <div className="flex flex-col items-center text-base text-lg">
        <NewGameButton currentGameId={params.id} />
        <ProgressButton />
      </div>
    </div>
  );
}
