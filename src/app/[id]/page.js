"use client";

import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

import gameData from "../../data/game-data.json";
import GameSearch from "@/components/GameSearch";
import Emojis from "@/components/Emojis";
import NewGameButton from "@/components/NewGameButton";
import ProgressButton from "@/components/ProgressButton";
import HintPanel from "@/components/HintPanel";
import { guessGame, saveGame } from "@/utils";

export default function EmoGuess({ params }) {
  const [emojis, setEmojis] = useState([]);
  const [currentGame, setCurrentGame] = useState({});
  const [validGuess, setValidGuess] = useState(null);

  useEffect(() => {
    const currentGame = gameData.find((g) => g.id === params.id);
    setCurrentGame(currentGame);
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

  const hints = (({ year, genre, developer }) => ({ year, genre, developer }))(currentGame);

  return (
    <Transition
      show={emojis.length > 0}
      appear="true"
      className="relative z-0 h-full flex flex-col items-center justify-start gap-2 py-4"
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <h2 className="text-2xl my-4">Can you guess the video game behind these emojis ?</h2>
      <div className="h-8">
        {validGuess === true ? "Correct !" : validGuess === false ? "Wrong :(" : ""}
      </div>
      <Emojis emojis={emojis} validGuess={validGuess} />
      <GameSearch tryGuess={tryGuess} />
      <div className="flex flex-col items-center gap-2">
        <NewGameButton currentGameId={params.id} />
        <ProgressButton />
        <HintPanel hints={hints} />
      </div>
    </Transition>
  );
}
