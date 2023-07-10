/* eslint-disable no-prototype-builtins */
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

import gameData from "../../data/game-data.json";
import { clearSave, getRandomGameId } from "@/utils";

export default function Victory() {
  const router = useRouter();

  const [gameList, setGameList] = useState(null);

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

  const startOver = () => {
    if (clearSave()) router.push(`/${getRandomGameId()}`);
  };

  const total = gameList && gameList.filter((game) => game.guessed).length;

  if (!gameList) return <div className="h-full grid place-items-center text-4xl">...</div>;

  return (
    <div className="flex flex-col items-center justify-evenly h-full py-2">
      <h2 className="text-3xl m-2 text-center">
        FOUND:&nbsp;
        {`${total} / ${gameList.length}`}
      </h2>
      <div className="flex flex-wrap justify-center max-w-5xl">
        {gameList.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </div>
      <button
        className="p-2 rounded-xl text-red hover:text-maroon border border-red hover:border-maroon transition"
        onClick={startOver}
      >
        START OVER
      </button>
    </div>
  );
}

const Game = ({ game }) => {
  const statusOutline = () => {
    if (!game.played) return;
    if (game.played && !game.guessed) return "outline outline-red";
    return "outline outline-green";
  };

  return (
    <Link
      className={`bg-surface0 hover:bg-surface1 text-xl sm:text-2xl m-1 sm:m-2 h-20 rounded-lg w-56 sm:w-56 flex flex-col text-center items-center justify-evenly transition ${statusOutline()}`}
      href={`/${game.id}`}
    >
      {game.emojis && <div>{game.emojis}</div>}
      <div className="text-[1rem] leading-tight">{game.title}</div>
    </Link>
  );
};
