import { useRouter } from "next/navigation";
import { FastArrowRight } from "iconoir-react";

import { getRandomGameId } from "@/utils";

const NewGameButton = ({ currentGameId }) => {
  const router = useRouter();

  const newGame = () => {
    router.push(`/${getRandomGameId(currentGameId)}`);
  };

  return (
    <button
      className="flex w-fit gap-2 m-4 p-2 bg-lavender hover:brightness-125 rounded-xl shadow-md"
      onClick={newGame}
    >
      Next game
      <FastArrowRight />
    </button>
  );
};

export default NewGameButton;
