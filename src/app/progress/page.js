/* eslint-disable no-prototype-builtins */
"use client";

import { useState, useEffect } from "react";

import gameData from "../../data/game-data.json";
import GameList from "@/components/GameList";
import ResetButton from "@/components/ResetButton";

export default function Victory() {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    const save = JSON.parse(window.localStorage.getItem("emoGuessrSave"));

    const list = gameData
      .map((game) => {
        const played = save && save.hasOwnProperty(game.id);
        const guessed = played && save[game.id].guessed;
        return {
          id: game.id,
          title: guessed ? game.title : "???",
          played,
          guessed,
          emojis: played ? game.emojis : null,
        };
      })
      .sort((a, b) => a.id < b.id);
    setGameList(list);
  }, []);

  return (
    <div className="h-full flex flex-col items-center py-2">
      <GameList list={gameList} />
      <ResetButton text="START OVER" outline icon />
    </div>
  );
}
