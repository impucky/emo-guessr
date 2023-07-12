"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import JSConfetti from "js-confetti";

import gameData from "../../data/game-data.json";
import LoadingDots from "@/components/LoadingDots";
import ResetButton from "@/components/ResetButton";

export default function Victory() {
  const [isWinner, setIsWinner] = useState();

  useEffect(() => {
    const save = JSON.parse(window.localStorage.getItem("emoGuessrSave"));
    if (
      Object.values(save).length === gameData.length &&
      Object.values(save).every((game) => game.guessed)
    ) {
      setIsWinner(true);
      console.log("winner");
    } else {
      console.log("shouldnt be here");
      setIsWinner(false);
    }
  }, []);

  useEffect(() => {
    if (!isWinner) return;
    const emojis = gameData.reduce((acc, game) => {
      return acc.push(game.emojis);
    }, []);
    const options = { emojis, emojiSize: 16, confettiNumber: 150 };
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti(options);
    setTimeout(() => jsConfetti.addConfetti(options), 1500);
    setTimeout(() => jsConfetti.addConfetti(options), 3000);
  }, [isWinner]);

  if (typeof isWinner === "undefined")
    return (
      <div className="w-full h-full grid items-center">
        <LoadingDots />
      </div>
    );

  if (!isWinner)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center text-2xl">
        <h2>Hey, you shouldn&apos;t be here!</h2>
        <Link className="text-blue underline hover:brightness-125 transition" href="/">
          Go to a random game
        </Link>
      </div>
    );

  return (
    <div className="h-full flex flex-col items-center justify-center px-2">
      <div className="bg-surface0 border border-2 border-green shadow-lg p-4 w-fit rounded-xl flex flex-col items-center justify-center gap-3 text-2xl font-semibold text-center">
        <p>You&apos;ve guessed every single game 🙀</p>
        <p>Thanks for playing!</p>
        <p>
          If you want more, check out&nbsp;
          <Link
            className="underline text-blue hover:brightness-125 transition"
            href="https://emovicon.app/"
          >
            Emovicon
          </Link>
          <span className="ml-1 text-sm font-light">which I ripped off entirely</span>
        </p>
        <p className="text-xl mt-8">
          Go to the&nbsp;
          <Link className="underline text-blue hover:brightness-125 transition" href="/progress">
            full list of games
          </Link>
        </p>
        <div className="text-xl">
          Or maybe you want to&nbsp;
          <ResetButton text="start over" /> ?
        </div>
      </div>
    </div>
  );
}
