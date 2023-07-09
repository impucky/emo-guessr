"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { clearSave, getRandomGameId } from "@/utils";

export default function Victory() {
  const router = useRouter();

  const startOver = () => {
    if (clearSave()) router.push(`/${getRandomGameId()}`);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-crust">
      <div className="bg-surface0 p-4 w-1/2 rounded-xl flex flex-col items-center justify-center gap-3 text-2xl font-semibold">
        <p>You&apos;ve guessed every single game 🙀</p>
        <p>Thanks for playing!</p>
        <p>
          If you want more, check out{" "}
          <Link className="underline text-blue hover:text-sky" href="https://emovicon.app/">
            Emovicon
          </Link>
        </p>
        <p className="text-xl mt-8">
          Go to the{" "}
          <Link className="underline text-blue hover:text-sky" href="#">
            full list of games
          </Link>
        </p>
        <p className="text-xl">
          Or maybe you want to{" "}
          <button className="text-red hover:text-maroon" onClick={startOver}>
            start over
          </button>
          ?
        </p>
      </div>
    </div>
  );
}
