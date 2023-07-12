"use client";

import { useState, useEffect } from "react";

import gameData from "../../data/game-data.json";
import GameSearch from "@/components/GameSearch";
import Emojis from "@/components/Emojis";
import NewGameButton from "@/components/NewGameButton";
import ProgressButton from "@/components/ProgressButton";
import HintPanel from "@/components/HintPanel";
import { isValidGuess, saveGame } from "@/utils";

export default function EmoGuess({ params }) {
  const [emojis, setEmojis] = useState([]);
  const [currentGame, setCurrentGame] = useState({});
  const [guessStatus, setGuessStatus] = useState("none");

  useEffect(() => {
    setEmojis([]);
    const currentGame = gameData.find((g) => g.id === params.id);
    setCurrentGame(currentGame);
    setEmojis(currentGame.emojis);
  }, [params]);

  const tryGuess = (title) => {
    const isValid = isValidGuess(params.id, title);
    setGuessStatus("pending");
    setTimeout(() => {
      if (isValid) {
        setGuessStatus("valid");
      } else {
        setGuessStatus("wrong");
      }
    }, 500);
    saveGame(params.id, isValid);
  };

  const hints = (({ year, genre, developer }) => ({ year, genre, developer }))(currentGame);

  return (
    <div className="relative z-0 h-full flex flex-col items-center justify-start gap-2 py-4">
      <h2 className="text-xl sm:text-2xl my-8 text-center">
        Can you guess the video game behind these emojis ?
      </h2>
      <Emojis emojis={emojis} status={guessStatus} />
      <GameSearch tryGuess={tryGuess} />
      <div className="flex flex-col items-center gap-2">
        <NewGameButton currentGameId={params.id} />
        <ProgressButton />
        <HintPanel hints={hints} />
      </div>
    </div>
  );
}
